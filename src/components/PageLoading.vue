<template>
  <VueLoading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="dots"
    color="white"
    background-color="black"
  ></VueLoading>
</template>
<script>

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    this.$emitter.on('page-loading', (boolean) => {
      this.isLoading = boolean;
    });
  },
};
</script>
