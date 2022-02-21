<template>
  <h1>登入頁面</h1>
  <button type="button" @click="login">登入</button>
</template>

<script>
export default {
  // 後續步驟：Email 登入、寫入 Cookies、轉址
  methods: {
    login() {
      this.$router.push('/admin/products');
    },
  },
};
</script>
