<template>
  <div id="form-login">
    <h1>Connexion</h1>
    <el-form ref="formSignup" :model="form" :rules="rules">
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="Email" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" placeholder="Mot de passe" />
      </el-form-item>
      <el-button type="primary" round @click.prevent="submit">Se connecter</el-button>
    </el-form>
    <div class="align-center">Pas encore de compte ? <el-button type="text" @click="$router.push('/signup')">Inscrivez vous</el-button></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Ce champ est requis', trigger: 'blur' },
          { type: 'email', message: 'L\'adresse email est invalid', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Ce champ est requis', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.formSignin.validate((valid) => {
        if (valid) {
          this.$store.dispatch('signin', this.form)
            .catch((err) => {
              if (err.toString().match(/403/)) {
                this.$message.error('Email ou mot de passe incorrect.')
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
