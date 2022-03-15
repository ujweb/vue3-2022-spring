<template>
  <div class="container-fluid">
    <div class="row">
      <aside
        class="bg-light sidebar min-vh-100 py-2"
      >
      <div class="position-sticky h-100 d-flex flex-column">
        <h3 class="fs-3 mb-2 pb-2 border-bottom">後台系統</h3>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link to="/admin/products">
              <span class="material-icons-outlined me-1">inventory_2</span>
              <span>產品管理</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders">
              <span class="material-icons-outlined me-1">summarize</span>
              <span>訂單管理</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons">
              <span class="material-icons-outlined me-1">confirmation_number</span>
              <span>優惠券管理</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/articles">
              <span class="material-icons-outlined me-1">description</span>
              <span>文章管理</span>
            </router-link>
          </li>
        </ul>
        <div class="mt-auto"></div>
        <ul class="nav flex-column border-top">
          <li class="nav-item">
            <button
              type="button"
              class="w-100"
              @click.prevent="logout"
            >
              登出
            </button>
          </li>
        </ul>
      </div>
      </aside>
      <div class="content-wrapper p-2">
        <router-view v-if="checkAccount" />
      </div>
    </div>
  </div>
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
        .then(() => {
          this.checkAccount = true;
        })
        .catch((error) => {
          console.dir(error);
          alert(error.response.data.message);
          this.$router.push('/login');
        });
    },
    logout() {
      const logoutUrl = `${process.env.VUE_APP_API}/logout`;
      this.$http.post(logoutUrl)
        .then((response) => {
          console.log(response);
          this.$router.push('/login'); // 登出成功後返回登入首頁
        })
        .catch((error) => {
          console.dir(error);
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "src/assets/sass/variables";
  @import "~bootstrap/scss/mixins";

  aside {
    width: 250px;
    .nav-item {
      + .nav-item {
        margin-top: 0.25rem;
      }
      > a, > button {
        display: flex;
        align-items: center;
        padding: 0.75rem 0.5rem;
        color: $black;
        text-decoration: none;
        border: 0;
        background-color: transparent;
        appearance: none;
        &:hover {
          color: $primary;
        }
        &.router-link-exact-active {
          background-color: rgba($black, 0.05);
        }
      }
    }
  }
  .content-wrapper {
    width: calc(100% - 250px);
  }
</style>
