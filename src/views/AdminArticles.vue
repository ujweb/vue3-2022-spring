<template>
  <div class="d-flex align-items-center justify-content-between">
    <h1 class="mb-0">後台文章列表</h1>
    <router-link to="article" class="btn btn-sm btn-primary">新增文章</Router-link>
  </div>
  <div class="row">
    <div class="col">
      <div class="table-responsive py-2">
        <table class="table text-center align-middle">
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bsModal: null,
      modal: {
        title: '',
        temp: {},
        content: '',
      },
    };
  },
  mounted() {
    this.getCoupons();
  },
  methods: {
    getCoupons() {
      this.$emitter.emit('page-loading', false);
    },
  },
};
</script>
