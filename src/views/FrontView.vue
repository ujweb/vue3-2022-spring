<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white border-bottom"
    aria-label="Eighth navbar example"
  >
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
    <front-cart></front-cart>
  </div>
</template>

<script>
import FrontCart from '@/components/FrontCart.vue';

export default {
  components: { FrontCart },
  data() {
    return {
      cart: {
        data: [],
        amount: 0,
      },
    };
  },
  provide() {
    return {
      provideCart: this.cart,
    };
  },
  mounted() {
    this.getCartAmount();
  },
  methods: {
    updateCart(type, id, qty = 1) {
      // console.log(type);
      const data = {
        product_id: id,
        qty,
      };
      let cartUrl = null;
      let method = null;
      if (type === '新增購物車') {
        cartUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
        method = 'post';
      } else if (type === '編輯購物車') {
        cartUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${this.$route.params.id}`;
        method = 'put';
      }
      this.$http[method](cartUrl, { data })
        .then((response) => {
          console.log(response);
          // this.getCart();
          console.log(this);
          this.$forceUpdate();
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    getCartAmount() {
      const getCartApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(getCartApi)
        .then((response) => {
          // console.log(response);
          this.cart.data = response.data.data.carts;
          this.cart.data.forEach((element) => {
            this.cart.amount += element.qty;
          });
        });
    },
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
</style>
