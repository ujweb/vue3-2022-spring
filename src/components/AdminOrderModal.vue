<template>
  <form
    class="modal fade needs-validation"
    id="orderModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    novalidate
    @submit.prevent
  >
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body p-3">
          <h2 class="mb-2"><slot name="title"></slot></h2>
          <div class="row">
            <div class="col-md-6">
              <h5>訂購者資訊</h5>
              <div class="form-floating mb-2">
                <input
                  type="text"
                  class="form-control border-0 border-bottom border-secondary"
                  id="floatingName"
                  placeholder="姓名"
                  v-model="user.name"
                />
                <label for="floatingName">姓名</label>
              </div>
              <div class="form-floating mb-2">
                <input
                  type="mail"
                  class="form-control border-0 border-bottom border-secondary"
                  id="floatingEmail"
                  placeholder="Email"
                  v-model="user.email"
                />
                <label for="floatingEmail">Email</label>
              </div>
              <div class="form-floating mb-2">
                <input
                  type="tel"
                  class="form-control border-0 border-bottom border-secondary"
                  id="floatingTel"
                  placeholder="電話"
                  v-model="user.tel"
                />
                <label for="floatingTel">電話</label>
              </div>
              <div class="form-floating mb-2">
                <input
                  type="text"
                  class="form-control border-0 border-bottom border-secondary"
                  id="floatingAddr"
                  placeholder="地址"
                  v-model="user.address"
                />
                <label for="floatingAddr">地址</label>
              </div>
              <div class="form-floating mb-2">
                <input
                  type="text"
                  class="form-control border-0 border-bottom border-secondary"
                  id="floatingText"
                  placeholder="留言"
                  v-model="data.message"
                />
                <label for="floatingText">留言</label>
              </div>
            </div>
            <div class="col-md-6">
              <h5>訂單內容</h5>
              <div class="card mb-3" v-for="detail in details" :key="detail.id">
                <div class="row g-0 align-items-center">
                  <div class="col-md-4">
                    <img
                      class="img-fluid"
                      :src="detail.product.imageUrl"
                      :alt="detail.product.title"
                    >
                  </div>
                  <div class="col-md-4">
                    <div class="card-body">
                      <h5 class="card-title">{{ detail.product.title }}</h5>
                      <p class="card-text">
                        <small class="text-secondary">
                          NT$ {{ toNumber(detail.product.price) }}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-4 d-flex align-items-center">
                    <label for="editAmount">數量</label>
                    <input
                      type="number"
                      min="1" max="10"
                      id="editAmount"
                      class="form-control form-control-sm w-auto mx-1"
                      v-model="detail.qty"
                      disabled
                    >
                    <!-- <button type="button" class="btn btn-sm btn-outline-danger px-1">
                      <span class="d-block material-icons-outlined fs-4">delete</span>
                    </button> -->
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-end">
                總金額：<span class="fs-3 text-primary">{{ toNumber(data.total) }}</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-end mt-2">
            <button
              type="button"
              class="btn btn-outline-primary me-1"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="updateProduct(title);"
            >
              更新訂單
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      user: {},
      details: {},
      title: null,
      return: {
        title: null,
        content: null,
      },
    };
  },
  props: ['modal', 'type'],
  emits: ['emit-update-data', 'emit-open-success'],
  methods: {
    toNumber(val) {
      return Number.parseInt(val, 10).toLocaleString();
    },
  },
  watch: {
    modal() {
      this.data = this.modal;
      this.user = this.modal.user;
      this.details = this.modal.products;
      this.title = this.type;
    },
  },
};
</script>

<style lang="scss" scoped>
  #editAmount {
    min-width: 0;
    + .btn-sm {
      min-width: 0;
    }
  }
</style>
