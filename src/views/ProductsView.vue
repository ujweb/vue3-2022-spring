<template>
  <h1 class="mb-2">產品列表</h1>
  <VueLoading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="dots"
    color="white"
    background-color="black"
  ></VueLoading>
  <div class="cards">
    <div class="card border-0" v-for="product in products" :key="product.id">
      <router-link
        :to="`/product/${product.id}`"
        class="card-img-3by2"
      >
        <img :src="product.imageUrl" class="card-img" :alt="product.title">
      </router-link>
      <div class="card-body">
        <span class="badge bg-secondary bg-opacity-50 rounded-pill mb-1">
          {{ product.category }}
        </span>
        <router-link
          :to="`/product/${product.id}`"
          class="d-block h4 card-title text-truncate link-black text-decoration-none"
        >
          {{ product.title }}
        </router-link>
        <p class="mb-1">
          <del class="d-block fs-7 text-secondary">
            原價：{{ product.origin_price.toLocaleString() }}
          </del>
          <span class="d-block fs-5">
            特價：{{ product.price.toLocaleString() }}
          </span>
        </p>
        <div class="row">
          <div class="col pe-0 me-1 mt-1">
            <router-link
              :to="`/product/${product.id}`"
              class="d-block w-100 btn btn-sm btn-outline-secondary"
            >
              查看更多
            </router-link>
          </div>
          <div class="col ps-0 mt-1">
            <button
              type="button"
              class="d-block w-100 btn btn-sm btn-primary"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      products: [],
    };
  },
  inject: ['provideCart'],
  mounted() {
    const getProductsApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
    this.$http.get(getProductsApi)
      .then((response) => {
        this.products = response.data.products;
        this.isLoading = false;
      });
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/functions"; // 必要的方法
@import "src/assets/sass/variables"; // 自行定義的變數路徑
@import "~bootstrap/scss/mixins";
.cards {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  @include media-breakpoint-up(sm) {
    grid-template-columns: 1fr 1fr;
  }
  @include media-breakpoint-up(lg) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .card-img-3by2 {
    position: relative;
    display: block;
    overflow: hidden;
    &::before {
      content: '';
      display: block;
      width: 100%;
      padding-top: 66.666666666666667%;
    }
    > .card-img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 101%;
      height: 101%;
      object-fit: cover;
      transform: translate(-50%, -50%);
    }
  }
}
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
