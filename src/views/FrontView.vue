<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
    <div class="container">
      <a class="navbar-brand" href="#">Container</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample07"
        aria-controls="navbarsExample07"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExample07">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">關於</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/admin"
            >
              後台管理
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container py-5">
    <router-view />
    <router-link to="/cart"
      class="
        cart-button
        position-fixed end-0 bottom-0 p-1 m-2
        btn-outline-secondary text-decoration-none
        rounded-circle border border-1
      "
      v-if="cart.amout>0"
    >
      <span class="position-absolute translate-middle badge rounded-pill bg-danger">
        {{ cart.amout }}
      </span>
      <span class="d-block material-icons">
        shopping_cart
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {
        data: [],
        amout: 0,
      },
    };
  },
  mounted() {
    const getCartApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
    this.$http.get(getCartApi)
      .then((response) => {
        // console.log(response);
        this.cart.data = response.data.data.carts;
        this.cart.data.forEach((element) => {
          this.cart.amout += element.qty;
        });
      });
  },
};
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "src/assets/sass/variables";
  @import "~bootstrap/scss/mixins";

  .navbar-dark .navbar-nav .nav-link.router-link-exact-active {
    color: $white;
  }
  .cart-button {
    .badge {
      top: 0.3125rem;
      left: calc(100% - 0.3125rem);
      padding: $badge-padding-y * 0.75 $badge-padding-x * 0.75;
      letter-spacing: -.025em;
    }
  }
</style>
