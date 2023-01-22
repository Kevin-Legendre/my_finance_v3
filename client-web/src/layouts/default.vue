<template>
  <el-container id="default" direction="vertical">
    default
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
@import './theme';
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
  html {
    font-family: 'Noto Sans',-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    font-weight: 400;
    font-size: 14px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    color: $--color-text-primary;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .el-button--primary {
    background-color: $--color-primary;
    border-color: $--color-primary;
  }

  #form-login {
    width: 300px;
    margin: 0 auto;
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    .el-button--primary {
      width: 100%;
    }
  }
</style>
