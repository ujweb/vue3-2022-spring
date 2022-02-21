<template>
  <h1>產品列表</h1>
  <div class="cards">
    <div class="card" v-for="product in products" :key="product.id">
      <img :src="product.imageUrl" class="card-img-top" :alt="product.title">
      <div class="card-body">
        <span class="badge bg-secondary bg-secondary bg-opacity-50 rounded-pill mb-1">
          {{ product.category }}
        </span>
        <h4 class="card-title text-truncate">{{ product.title }}</h4>
        <p class="card-text line-clamp">
          {{ product.description }}
        </p>
        <p class="mb-1">
          <del class="d-block fs-7 text-secondary">
            原價：{{ product.origin_price.toLocaleString() }}
          </del>
          <span class="d-block fs-5">
            特價：{{ product.price.toLocaleString() }}
          </span>
        </p>
        <button type="button" class="btn btn-sm btn-outline-secondary me-1 mt-1">查看更多</button>
        <button type="button" class="btn btn-sm btn-primary mt-1">加入購物車</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      products: [],
      paginations: {},
      loaded: false,
      modal: {
        title: '',
        content: '',
        temp: {},
      },

    };
  },
  mounted() {
    const getProductsApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
    this.$http.get(getProductsApi)
      .then((response) => {
        this.products = response.data.products;
        this.loaded = true;
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
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
  @include media-breakpoint-up(xl) {
    grid-template-columns: auto auto auto auto;
  }
}
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
