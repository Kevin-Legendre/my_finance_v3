<template>
  <div id="form-login">
    <h1>Inscription</h1>
    <el-form ref="formSignup" :model="form" :rules="rules">
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="Email" />
      </el-form-item>
      <el-form-item prop="firstName">
        <el-input v-model="form.firstName" placeholder="Prénom" />
      </el-form-item>
      <el-form-item prop="lastName">
        <el-input v-model="form.lastName" placeholder="Nom" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" placeholder="Mot de passe" />
      </el-form-item>
      <el-button type="primary" round @click.prevent="submit">Inscription</el-button>
    </el-form>
    <div class="align-center"><el-button type="text" @click="$router.push('/signin')">Se connecter</el-button></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
      },
      rules: {
        firstName: [
          { required: true, message: 'Ce champ est requis', trigger: 'blur' },
          { min: 3, message: 'Min 3 charactères', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Ce champ est requis', trigger: 'blur' },
          { min: 3, message: 'Min 3 charactères', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Ce champ est requis', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Ce champ est requis', trigger: 'blur' },
          { type: 'email', message: 'L\'adresse email est invalid', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.formSignup.validate((valid) => {
        if (valid) {
          this.$store.dispatch('signup', this.form)
            .catch((err) => {
              if (err.message.toString().match(/409/)) {
                this.$message.error('Cet email est déjà utilisé.')
              } else {
                this.$message.error('Erreur de champs lors de l\'inscription.')
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
