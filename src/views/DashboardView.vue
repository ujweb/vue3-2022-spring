<template>
  <div class="container" v-if="checkAccount">
    <h1>測試</h1>
  </div>
  <router-view v-if="checkAccount" />
</template>

<script>
export default {
  data() {
    return {
      checkAccount: false,
    };
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)signinToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.checkSignin();
  },
  methods: {
    checkSignin() {
      const checkUserApi = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http.post(checkUserApi)
        .then((response) => {
          console.log(response);
          this.checkAccount = true;
        })
        .catch((error) => {
          console.dir(error);
          alert(error.response.data.message);
          this.$router.push('/login');
        });
    },
  },
};
</script>
