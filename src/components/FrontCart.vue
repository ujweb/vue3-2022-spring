<template>
  <router-link to="/cart"
    class="
      cart-button
      position-fixed end-0 bottom-0 p-1 m-2
      btn-outline-secondary text-decoration-none
      rounded-circle border border-1
    "
    v-if="provideCart.amount>0"
  >
    <span class="position-absolute translate-middle badge rounded-pill bg-danger">
      {{ provideCart.amount }}
    </span>
    <span class="d-block material-icons">
      shopping_cart
    </span>
  </router-link>
</template>

<script>
export default {
  inject: ['provideCart'],
};
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "src/assets/sass/variables";
  @import "~bootstrap/scss/mixins";

  .cart-button {
    .badge {
      top: 0.3125rem;
      left: calc(100% - 0.3125rem);
      padding: $badge-padding-y * 0.75 $badge-padding-x * 0.75;
      letter-spacing: -.025em;
    }
  }
</style>
