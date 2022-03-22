<template>
  <div class="d-flex align-items-center justify-content-between">
    <h1 class="mb-0">後台優惠券列表</h1>
    <button
      class="btn btn-sm btn-primary"
      type="button"
      @click="modal.title = '建立新優惠券'; openCouponModal(modal.title, coupon);"
    >
      建立新優惠券
    </button>
  </div>
  <div class="row">
    <div class="col">
      <div class="table-responsive py-2">
        <table class="table text-center align-middle">
          <thead class="table-light">
            <tr>
              <th width="6%" scope="col">#</th>
              <th width="12%" scope="col">優惠券標題</th>
              <th width="12%" scope="col">優惠碼</th>
              <th width="12%" scope="col">折扣</th>
              <th width="12%" scope="col">起始日</th>
              <th width="12%" scope="col">截止日</th>
              <th width="12%" scope="col">啟用</th>
              <th width="22%" scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(coupon, index) in coupons" :key="coupon.id">
              <td>{{ index+1 }}</td>
              <td>{{ coupon.title }}</td>
              <td>{{ coupon.code }}</td>
              <td>{{ coupon.percent }}</td>
              <td>{{ toDate(coupon.start_date/1000) }}</td>
              <td>{{ toDate(coupon.due_date/1000) }}</td>
              <td>
                <div class="form-check form-switch float-none d-inline-block mb-0">
                  <button
                    class="form-check-input"
                    :class="{'checked': coupon.is_enabled == 1}"
                    @click="toggleEnabled(coupon);"
                  ></button>
                </div>
              </td>
              <td>
                <button
                  class="btn btn-sm btn-primary me-1"
                  type="button"
                  @click="modal.title = '編輯優惠券'; openCouponModal(modal.title, coupon);"
                >
                  編輯
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  type="button"
                  @click="modal.title = '刪除優惠券'; openCouponModal(modal.title, coupon);"
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
  <pagination-nav :pages="paginations" @get-datas="getProduct"></pagination-nav>
  <CouponModal
    :modal="modal.temp"
    :type="modal.title"
    @emit-coupon-data="updateCoupon"
  >
    <template #title>{{ modal.title }}</template>
  </CouponModal>
  <SuccessModal>
    <template #title>{{ modal.title }}</template>
    <template #default>
      {{ modal.content }}
    </template>
  </SuccessModal>
  <DeleteModal
    :modal="modal.temp"
    @emit-delete="deleteCoupon"
  >
    <template #title>{{ modal.title }}</template>
    <template #default>
      是否刪除 <b class="text-danger">{{ modal.temp.title }}</b>優惠券<br />
      提醒您，刪除後將無法恢復
    </template>
  </DeleteModal>
</template>

<script>
import { bsModal } from '@/script/bootstrap';
import CouponModal from '@/components/AdminCouponModal.vue';
import SuccessModal from '@/components/AdminSuccessModal.vue';
import DeleteModal from '@/components/AdminDeleteModal.vue';

export default {
  data() {
    return {
      coupons: [],
      bsModal: null,
      paginations: {},
      modal: {
        title: '',
        temp: {},
        content: '',
      },
    };
  },
  components: {
    CouponModal,
    SuccessModal,
    DeleteModal,
  },
  mounted() {
    this.getCoupons();
  },
  methods: {
    getCoupons() {
      const adminCouponsApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.$http.get(adminCouponsApi)
        .then((response) => {
          this.$emitter.emit('page-loading', false);
          this.coupons = response.data.coupons;
          this.paginations = response.data.pagination;
        }).catch((error) => {
          this.$emitter.emit('page-loading', false);
          console.log(error);
        });
    },
    updateCoupon(coupon) {
      const type = this.modal.title;
      let adminCouponApi = '';
      let method = '';
      if (type === '建立新優惠券') {
        adminCouponApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
        method = 'post';
      } else if (type === '編輯優惠券') {
        adminCouponApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
        method = 'put';
      }
      const dataCoupon = {
        data: coupon,
      };
      if (dataCoupon.data.is_enabled === '' || dataCoupon.data.is_enabled === undefined) {
        dataCoupon.data.is_enabled = 0;
      }
      this.$http[method](adminCouponApi, dataCoupon)
        .then((response) => {
          // console.log(response);
          if (type === '建立新優惠券') {
            this.modal.title = '新增成功';
          } else if (type === '編輯優惠券') {
            this.modal.title = '修改成功';
          }
          this.modal.content = response.data.message;
          this.modal.temp = {};
        })
        .catch((error) => {
          console.dir(error);
          if (type === '建立新優惠券') {
            this.modal.title = '新增失敗';
          } else if (type === '編輯優惠券') {
            this.modal.title = '修改失敗';
          }
          this.modal.content = error.response.data.message;
        })
        .finally(() => {
          this.getCoupons();
          this.openSuccessModal();
        });
    },
    deleteCoupon(coupon) {
      this.$emitter.emit('page-loading', true);
      const adminCouponApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
      this.$http.delete(adminCouponApi)
        .then((response) => {
          this.modal.title = '刪除成功';
          this.modal.content = response.data.message;
        })
        .catch((error) => {
          this.modal.title = '刪除失敗';
          this.modal.content = error.response.data.message;
        })
        .finally(() => {
          this.$emitter.emit('page-loading', false);
          this.getCoupons();
          this.clearTemp();
          this.openSuccessModal();
        });
    },
    toggleEnabled(coupon) {
      const adminCouponApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
      this.$emitter.emit('page-loading', true);

      this.modal.temp = coupon;

      const dataCoupon = {
        data: this.modal.temp,
      };

      if (this.modal.temp.is_enabled === 0 || this.modal.temp.is_enabled === undefined) {
        this.modal.temp.is_enabled = 1;
      } else if (this.modal.temp.is_enabled === 1) {
        this.modal.temp.is_enabled = 0;
      }

      this.$http.put(adminCouponApi, dataCoupon)
        .then((response) => {
          // console.log(response);
          this.modal.title = '修改成功';
          this.modal.content = response.data.message;
          this.getCoupons();
        })
        .catch((error) => {
          console.dir(error);
          this.modal.title = '修改失敗';
          this.modal.content = error.response.data.message;
        })
        .finally(() => {
          this.openSuccessModal(this.modal.title, this.modal.content);
        });
    },
    openCouponModal(type, data) {
      this.$emitter.emit('page-loading', false);
      if (type === '編輯優惠券') {
        this.bsModal = bsModal('couponModal');
        this.modal.temp = JSON.parse(JSON.stringify(data));
      } else if (type === '刪除優惠券') {
        this.bsModal = bsModal('deleteModal');
        this.modal.temp = data;
      } else if (type === '建立新優惠券') {
        this.bsModal = bsModal('couponModal');
        this.modal.temp = {};
      }
      this.bsModal.show();
    },
    openSuccessModal() {
      this.$emitter.emit('page-loading', false);
      this.bsModal = bsModal('SuccessModal');
      this.bsModal.show();
    },
    clearTemp() {
      this.modal.temp = {};
    },
    toDate(timestamp) {
      const newDate = new Date(timestamp * 1000);
      return newDate.toLocaleDateString();
    },
  },
};
</script>
