<template>
  <div class="modal fade" id="deleteModal" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body p-3">
          <h2 class="mb-2"><slot name="title"></slot></h2>
          <p>
            <slot></slot>
          </p>
          <div class="d-flex align-items-center justify-content-end mt-2">
          <button
            type="button"
            class="btn btn-outline-danger me-1"
            data-bs-dismiss="modal"
            @click="clearTemp();"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="deleteProduct(data); clearTemp();"
          >
            確認
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modal'],
  emits: ['delete-data'],
  data() {
    return {
      data: {},
      return: {
        title: null,
        content: null,
      },
    };
  },
  methods: {
    deleteProduct(product) {
      // console.log(product);
      const adminProductUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`;
      this.$http.delete(adminProductUrl)
        .then((response) => {
          // console.log(response);
          this.return.title = '刪除成功';
          this.return.content = response.data.message;
          this.$emit('emit-delete');
          this.$emit('emit-open-success', this.return);
        })
        .catch((error) => {
          console.dir(error);
          this.return.title = '刪除失敗';
          this.return.content = error.response.data.message;
          this.$emit('emit-delete');
          this.$emit('emit-open-success', this.return);
        });
    },
    clearTemp() {
      this.data = {};
    },
  },
  watch: {
    modal() {
      this.data = this.modal;
    },
  },
};
</script>
