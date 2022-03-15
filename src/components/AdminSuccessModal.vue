<template>
  <div class="modal fade" id="SuccessModal" data-bs-keyboard="false">
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
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              我知道了
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
