<template>
  <div class="d-flex align-items-center justify-content-between">
    <h1 class="mb-0">訂單列表</h1>
    <button
      class="btn btn-sm btn-danger"
      type="button"
      @click="modal.title = '清除訂單'; openOrderModal(modal.title, {});"
    >
      清除所有訂單
    </button>
  </div>
  <div class="row">
    <div class="col">
      <div class="table-responsive py-2">
        <table class="table text-center align-middle">
          <thead class="table-light">
            <tr>
              <th width="8%" scope="col">#</th>
              <th width="14%" scope="col">收單時間</th>
              <th width="14%" scope="col">訂單編號</th>
              <th width="14%" scope="col">訂單金額</th>
              <th width="14%" scope="col">訂單狀態</th>
              <th width="14%" scope="col">付款時間</th>
              <th width="22%" scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
              <td>{{ index+1 }}</td>
              <td>
                {{ toDate(order.create_at) }}
                <small class="d-block text-secondary">{{ toTime(order.create_at) }}</small>
              </td>
              <td>{{ order.id }}</td>
              <td>{{ toNumber(order.total) }}</td>
              <td>
                <span class="text-success" v-if="order.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span>
              </td>
              <td>
                <p class="m-0" v-if="order.is_paid">
                  <small class="d-block text-secondary">{{ order.paid_date }}</small>
                  <small class="d-block text-secondary">{{ order.paid_time }}</small>
                </p>
                <p v-else>-</p>
              </td>
              <td>
                <button
                  class="btn btn-sm btn-primary me-1"
                  type="button"
                  @click="modal.title = '訂單詳情'; openOrderModal(modal.title, order);"
                >
                  訂單詳情
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  type="button"
                  @click="modal.title = '刪除訂單'; openOrderModal(modal.title, order);"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <pagination-nav :pages="paginations" @get-datas="getOrder"></pagination-nav>
  <OrderModal
    :modal="modal.temp"
    :type="modal.title"
    @emit-order-data="updatePaid"
  >
    <template #title>{{ modal.temp.id }} {{ modal.title }}</template>
  </OrderModal>
  <SuccessModal>
    <template #title>{{ modal.title }}</template>
    <template #default>
      {{ modal.content }}
    </template>
  </SuccessModal>
  <DangerModal>
    <template #title>{{ modal.title }}</template>
    <template #default>
      {{ modal.content }}
    </template>
  </DangerModal>
  <DeleteModal
    :modal="modal.temp"
    @emit-delete="deleteOrder"
  >
    <template #title>{{ modal.title }}</template>
    <template #default>
      <span class="d-block" v-if="modal.title === '刪除訂單'">
        是否刪除編號為 <b class="text-danger">{{ modal.temp.id }}</b> 的訂單？<br />
      </span>
      <span class="d-block" v-else>
        是否刪除<b class="text-danger">全部</b>訂單？<br />
      </span>
      提醒您，刪除後將無法恢復
    </template>
  </DeleteModal>
</template>

<script>
import { bsModal } from '@/script/bootstrap';
import OrderModal from '@/components/AdminOrderModal.vue';
import SuccessModal from '@/components/AdminSuccessModal.vue';
import DangerModal from '@/components/AdminDangerModal.vue';
import DeleteModal from '@/components/AdminDeleteModal.vue';

export default {
  data() {
    return {
      page: 1,
      orders: [],
      paginations: {},
      bsModal: null,
      modal: {
        title: '',
        content: '',
        temp: {},
      },
    };
  },
  emits: ['page-loading'],
  components: {
    OrderModal,
    SuccessModal,
    DangerModal,
    DeleteModal,
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    getOrder(page = 1) {
      const adminOrdersUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$emitter.emit('page-loading', true);
      this.$http.get(adminOrdersUrl)
        .then((response) => {
          // console.log(response);
          this.paginations = response.data.pagination;
          this.orders = response.data.orders;
          this.$emitter.emit('page-loading', false);
        })
        .catch((error) => {
          console.dir(error);
          alert(error.response.data.message);
        });
    },
    updatePaid(data) {
      this.$emitter.emit('page-loading', true);
      const adminOrderApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${data.id}`;
      const newDate = new Date();
      const dateNow = Math.floor(Date.now() / 1000);
      const paid = {
        is_paid: data.is_paid,
        paid_at: dateNow,
        paid_date: this.toDate(dateNow),
        paid_time: `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`,
      };
      // console.log(paid);
      let res = {};
      this.$http.put(adminOrderApi, { data: paid })
        .then((response) => {
          res = {
            title: '更新成功',
            content: response.data.message,
          };
        }).catch((error) => {
          res = {
            title: '更新失敗',
            content: error.response.data.message,
          };
        })
        .finally(() => {
          this.$emitter.emit('page-loading', false);
          this.getOrder();
          this.clearTemp();
          this.openSuccessModal(res);
        });
    },
    deleteOrder(data) {
      this.$emitter.emit('page-loading', true);
      let res = {};
      let adminDeleteOrdersUrl = '';
      if (this.modal.title === '刪除訂單') {
        adminDeleteOrdersUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${data.id}`;
      } else if (this.modal.title === '清除訂單') {
        adminDeleteOrdersUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      }
      this.$http.delete(adminDeleteOrdersUrl)
        .then((response) => {
          res = {
            title: '刪除成功',
            content: response.data.message,
          };
        })
        .catch((error) => {
          res = {
            title: '刪除失敗',
            content: error.response.data.message,
          };
        })
        .finally(() => {
          this.$emitter.emit('page-loading', false);
          this.getOrder();
          this.clearTemp();
          this.openSuccessModal(res);
        });
    },
    openOrderModal(type, data) {
      if (type === '訂單詳情') {
        this.bsModal = bsModal('orderModal');
        this.modal.temp = JSON.parse(JSON.stringify(data));
      } else if (type === '刪除訂單') {
        this.bsModal = bsModal('deleteModal');
        this.modal.temp = data;
      } else if (type === '清除訂單') {
        this.bsModal = bsModal('deleteModal');
        this.modal.temp = data;
      }
      this.bsModal.show();
    },
    openSuccessModal(obj) {
      this.modal.title = obj.title;
      this.modal.content = obj.content;
      this.bsModal = bsModal('SuccessModal');
      this.bsModal.show();
    },
    openDangerModal(obj) {
      this.modal.title = obj.title;
      this.modal.content = obj.content;
      this.bsModal = bsModal('DangerModal');
      this.bsModal.show();
    },
    clearTemp() {
      this.modal.temp = {};
    },
    toNumber(val) {
      return Number.parseInt(val, 10).toLocaleString();
    },
    toDate(timestamp) {
      const newDate = new Date(timestamp * 1000);
      return newDate.toLocaleDateString();
    },
    toTime(timestamp) {
      const newDate = new Date(timestamp * 1000);
      return newDate.toLocaleTimeString('it-IT');
    },
  },
};
</script>
