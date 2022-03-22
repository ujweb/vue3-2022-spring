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
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="$emit('emit-delete', data)"
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
  emits: ['emit-delete'],
  data() {
    return {
      data: {},
    };
  },
  watch: {
    modal() {
      this.data = this.modal;
    },
  },
};
</script>
