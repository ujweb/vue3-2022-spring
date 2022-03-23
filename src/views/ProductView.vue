<template>
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <div class="col-12 mb-1 card-main card-3by2">
          <img class="img-fluid px-0" :src="mainImg" :alt="product.title">
        </div>
        <div class="col-12 px-4">
          <div class="row justify-content-center">
            <div class="col">
              <div class="row card-3by2">
                <button
                  type="button"
                  class="p-0 border-0"
                  :class="{ 'opacity-50': mainImg === product.imageUrl }"
                  @click="changeImg(product.imageUrl)"
                >
                  <img class="img-fluid px-0" :src="product.imageUrl" :alt="`${product.title}`" >
                </button>
              </div>
            </div>
            <div
              class="col ms-1 card-3by2"
              v-for="(item, index) in product.imagesUrl"
              :key="`img${index}`"
            >
              <div class="row">
                <button
                  type="button"
                  class="p-0 border-0"
                  :class="{ 'opacity-50': mainImg === item }"
                  @click="changeImg(item)"
                >
                  <img class="img-fluid px-0" :src="item" :alt="`${product.title}-${index+1}`">
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-md-0 mt-2">
      <span class="badge bg-secondary rounded-pill mb-1">
        {{ product.category }}
      </span>
      <h1>
        {{ product.title }}
      </h1>
      <div>
        <del class="fs-7 text-secondary">
          原價：NT$ {{ toNumber(product.origin_price) }}
        </del>
      </div>
      <div>
        <span class="h3 text-primary mb-0">
          NT$ {{ toNumber(product.price) }}
        </span>
        <span class="fs-6 text-secondary">
          / {{ product.unit }}
        </span>
      </div>
      <p class="description fs-7 text-secondary mt-2">
        {{ product.description }}
      </p>
      <form class="d-flex mt-4">
        <select id="amountSelect" v-model.number="cart.qty" class="form-select w-auto me-1">
          <option
            v-for="idx in 10"
            :selected="cart.qty"
            :key="`${idx}晚`"
          >
            {{ idx }}
          </option>
        </select>
        <button
          class="btn btn-primary"
          type="button"
          @click="updateCart('新增購物車')"
        >
          加入購物車
        </button>
      </form>
    </div>
    <div class="col-md-12 my-4">
      <hr class="bg-secondary">
    </div>
    <div class="col-md-12">
      <h4>商品詳情</h4>
      <p class="description" v-html="product.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductView',
  data() {
    return {
      product: {
        imageUrl: 'placeholder.png',
        imagesUrl: [
          'placeholder.png',
          'placeholder.png',
          'placeholder.png',
        ],
      },
      mainImg: 'placeholder.png',
      loaded: false,
      cart: {
        qty: 1,
      },
    };
  },
  inject: ['provideCart'],
  mounted() {
    this.getProduct();
    this.getCart();
    this.$emitter.on('add-cart', (res) => {
      const { item, qty } = res;
      this.addCart(item, qty);
    });
  },
  methods: {
    getProduct() {
      const getProductApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`;
      this.$http.get(getProductApi)
        .then((response) => {
          this.$emitter.emit('page-loading', false);
          this.product = response.data.product;
          this.mainImg = response.data.product.imageUrl;
        });
    },
    changeImg(img) {
      this.mainImg = img;
    },
    toNumber(val) {
      return Number.parseInt(val, 10).toLocaleString();
    },
    toParagraph(text) {
      console.log(text);
    },
    updateCart(type) {
      this.$emitter.emit('add-cart', type);
    },
  },
};
</script>

<style lang="scss" scoped>
  .description {
    white-space: pre-wrap;
  }
  %card-outer {
    position: relative;
    display: block;
    overflow: hidden;
  }
  %card-before {
    content: '';
    display: block;
    width: 100%;
  }
  %card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card-3by2 {
    &.card-main {
      @extend %card-outer;
      &::before {
        @extend %card-before;
        padding-top: calc((100% + 40px) * 0.66666666666666667);
      }
      >img {
        @extend %card-image
      }
    }
    &:not(.card-main) {
      @extend %card-outer;
      button {
        &::before {
          @extend %card-before;
          padding-top: 66.666666666666667%;
        }
        img {
          @extend %card-image
        }
      }
    }
  }
</style>
