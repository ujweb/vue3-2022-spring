<template>
  <VueLoading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="dots"
    color="white"
    background-color="black"
  ></VueLoading>
  <div class="d-flex align-items-center justify-content-between">
    <h1 class="mb-0">訂單列表</h1>
    <button
      class="btn btn-sm btn-danger"
      type="button"
      @click="modal.title = '清除訂單'; deleteAllOrder();"
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
              <td>{{ order.total }}</td>
              <td>
                <span class="text-success" v-if="order.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span>
              </td>
              <td>
                <p class="m-0" v-if="order.is_paid">
                  <small class="d-block text-secondary">{{ toDate(order.paid_date) }}</small>
                  <small class="d-block text-secondary">{{ toTime(order.paid_date) }}</small>
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
    @emit-update-data="getOrder"
    @emit-open-success="openSuccessModal"
  >
    <template #title>{{ modal.title }}</template>
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
    @emit-delete="getProduct"
    @emit-open-success="openDangerModal"
  >
    <template #title>{{ modal.title }}</template>
    <template #default>
      <span class="d-block" v-if="modal.temp.id">
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
      isLoading: true,
      bsModal: null,
      modal: {
        title: '',
        content: '',
        temp: {},
      },
    };
  },
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
      this.$http.get(adminOrdersUrl)
        .then((response) => {
          console.log(response);
          this.paginations = response.data.pagination;
          this.orders = response.data.orders;
          this.isLoading = false;
        })
        .catch((error) => {
          console.dir(error);
          alert(error.response.data.message);
        });
    },
    deleteAllOrder() {
      // const adminDeleteOrdersUrl =
      // `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      // this.$http.delete(adminDeleteOrdersUrl)
      //   .then((response) => {
      //     console.log(response);
      //     this.paginations = response.data.pagination;
      //     this.orders = response.data.message;
      //     this.isLoading = false;
      //   })
      //   .catch((error) => {
      //     console.dir(error);
      //     alert(error.response.data.message);
      //   });
    },
    openOrderModal(type, data) {
      if (type === '訂單詳情') {
        this.bsModal = bsModal('orderModal');
        this.modal.temp = JSON.parse(JSON.stringify(data));
      } else if (type === '刪除訂單') {
        this.bsModal = bsModal('deleteModal');
        this.modal.temp = JSON.parse(JSON.stringify(data));
      } else if (type === '清除訂單') {
        this.bsModal = bsModal('deleteModal');
        this.modal.temp = {};
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
