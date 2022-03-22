<template>
  <form
    class="modal fade needs-validation"
    id="couponModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    novalidate
    @submit.prevent
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body p-3">
          <h2 class="mb-2"><slot name="title"></slot></h2>
          <div class="row">
            <div class="col-md-4 mb-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control border-0 border-bottom border-secondary"
                  id="floatingTitle"
                  placeholder="請輸入優惠券標題"
                  v-model="data.title"
                />
                <label for="floatingTitle">請輸入優惠券標題</label>
              </div>
            </div>
            <div class="col-md-5 mb-2">
              <div class="row align-items-end">
                <div class="col-8 pe-1">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-secondary"
                      id="floatingCode"
                      placeholder="請輸入優惠碼"
                      v-model="data.code"
                    />
                    <label for="floatingCode">請輸入優惠碼</label>
                  </div>
                </div>
                <div class="col-4 ps-0">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="randomCoupon(6)"
                  >產生</button>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-2">
              <div class="form-floating">
                <input
                  type="number"
                  min="0"
                  max="100"
                  class="form-control border-0 border-bottom border-secondary"
                  id="floatingPercent"
                  placeholder="請輸入折扣 (%)"
                  v-model="data.percent"
                />
                <label for="floatingPercent">請輸入折扣 (%)</label>
              </div>
            </div>
            <div class="col-md-12 mb-2">
              <div class="row align-items-center">
                <div class="col">
                  <label for="startDate" class="visually-hidden">請選擇起始日</label>
                  <v-date-picker color="indigo" class="inline-block h-full"
                    v-model="data.start_date"
                    :model-config="modelConfig">
                    <template v-slot="{ inputValue, togglePopover }">
                      <div class="input-group">
                        <input class="form-control"
                          id="start-date"
                          :value="inputValue"
                          placeholder="請選擇起始日"
                        />
                        <button
                          class="btn btn-sm btn-outline-secondary"
                          @click="togglePopover()">
                          <span class="material-icons-outlined d-block fs-6">calendar_today</span>
                        </button>
                      </div>
                    </template>
                  </v-date-picker>
                </div>
                <div class="col-auto">～</div>
                <div class="col">
                  <label for="startDate" class="visually-hidden">請選擇截止日</label>
                  <v-date-picker color="indigo" class="inline-block h-full"
                    v-model="data.due_date"
                    :model-config="modelConfig">
                    <template v-slot="{ inputValue, togglePopover }">
                      <div class="input-group">
                        <input class="form-control"
                          id="end-date"
                          :value="inputValue"
                          placeholder="請選擇截止日"
                        />
                        <button class="btn btn-sm btn-outline-secondary"
                          @click="togglePopover()">
                          <span class="material-icons-outlined d-block fs-6">calendar_today</span>
                        </button>
                      </div>
                    </template>
                  </v-date-picker>
                </div>
              </div>
            </div>
            <div class="col-md-12 mb-2">
              <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="is_enabled"
                    id="checkEnable"
                    v-model.number="data.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="checkEnable">
                    是否啟用
                  </label>
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
              @click="$emit('emit-coupon-data', data)"
            >
              儲存
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
      title: '',
      modelConfig: {
        type: 'number',
      },
      today: new Date(),
    };
  },
  props: ['modal', 'type'],
  emits: ['emit-coupon-data'],
  methods: {
    randomCoupon(size) {
      const seed = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const seedLength = seed.length;
      let createCoupon = '';
      for (let i = 0; i < size; i += 1) {
        const j = Math.floor(Math.random() * seedLength);
        createCoupon += seed[j];
      }
      this.data.code = createCoupon;
    },
  },
  watch: {
    modal() {
      this.data = this.modal;
      this.title = this.type;
    },
  },
};
</script>

<style lang="scss">
.btn.btn-sm {
  min-width: auto;
}
</style>
