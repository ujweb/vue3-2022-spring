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
              <h5 class="mb-1">訂購者資訊</h5>
              <table class="table">
                <tbody v-if="user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ user.address }}</td>
                  </tr>
                  <tr>
                    <th>留言</th>
                    <td>{{ data.message }}</td>
                  </tr>
                </tbody>
              </table>
              <h5 class="mt-5 mb-1">訂單細節</h5>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">下單時間</th>
                    <td>{{ toDate(data.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="data.paid_at" class="text-success">
                        {{ toDate(data.paid_at) }}
                      </span>
                      <span v-else class="text-muted">-</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="data.is_paid" class="text-success">已付款</span>
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-6">
              <h5 class="mb-1">訂單內容</h5>
              <table class="table">
                <tbody v-if="user">
                  <tr v-for="detail in details" :key="detail.id">
                    <td style="width: 150px;">
                      <img
                        class="img-fluid"
                        :src="detail.product.imageUrl"
                        :alt="detail.product.title"
                      >
                    </td>
                    <td>
                      <h5 class="card-title">{{ detail.product.title }}</h5>
                      <p class="card-text">
                        <small class="text-secondary">
                          NT$ {{ toNumber(detail.product.price) }}
                        </small>
                      </p>
                    </td>
                    <td>
                      <div class="d-flex align-items-center justify-content-end">
                        <span class="pe-1">數量</span>
                        <span>
                          {{ detail.qty }}
                          <small>/{{ detail.product.unit }}</small>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  共 <span class="text-primary">{{ getTotalQty(details) }}</span> 項
                </div>
                <div>
                  總金額：<span class="fs-3 text-primary">{{ toNumber(data.total) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-end mt-2">
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="data.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="data.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
          </div>
          <div class="d-flex align-items-center justify-content-end mt-2">
            <button
              type="button"
              class="btn btn-outline-secondary me-1"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="$emit('emit-order-data', data)"
            >
              更新付款狀態
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
      details: [],
      title: null,
    };
  },
  props: ['modal', 'type'],
  emits: ['emit-order-data'],
  methods: {
    toNumber(val) {
      return Number.parseInt(val, 10).toLocaleString();
    },
    toDate(timestamp) {
      const newDate = new Date(timestamp * 1000);
      return newDate.toLocaleDateString();
    },
    getTotalQty(details) {
      let totalQty = 0;
      if (typeof details !== 'undefined') {
        Object.values(details).forEach((item) => {
          // console.log(item);
          totalQty += item.qty;
        });
      }
      return totalQty;
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
  table {
    vertical-align: middle;
  }
</style>
