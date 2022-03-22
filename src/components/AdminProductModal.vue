<template>
  <form
    class="modal fade needs-validation"
    id="productModal"
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
            <div class="col-md-8">
              <div class="row">
              <div class="col-md-5">
                <div class="form-floating mb-2">
                  <input
                    type="text"
                    class="form-control border-0 border-bottom border-secondary"
                    id="floatingTitle"
                    placeholder="請輸入標題"
                    v-model="data.title"
                  />
                  <label for="floatingTitle">請輸入標題</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="text"
                    class="form-control border-0 border-bottom border-secondary"
                    id="floatingCategory"
                    placeholder="請輸入分類"
                    v-model="data.category"
                  />
                  <label for="floatingCategory">請輸入分類</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="text"
                    class="form-control border-0 border-bottom border-secondary"
                    id="floatingUnit"
                    placeholder="請輸入單位"
                    v-model="data.unit"
                  />
                  <label for="floatingUnit">請輸入單位</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="number"
                    class="form-control border-0 border-bottom border-secondary"
                    id="floatingOrigin"
                    placeholder="請輸入原價"
                    v-model="data.origin_price"
                  />
                  <label for="floatingOrigin">請輸入原價</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="number"
                    class="form-control border-0 border-bottom border-secondary"
                    id="floatingSelling"
                    placeholder="請輸入售價"
                    v-model="data.price"
                  />
                  <label for="floatingSelling">請輸入售價</label>
                </div>
              </div>
              <div class="col-md-7">
                <div class="row mx-auto">
                  <div
                    class="col-md-8 px-0 form-floating mb-2"
                    :class="{ 'col-md-12': data.imageUrl }"
                  >
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-secondary"
                      id="floatingMainPic"
                      v-model="data.imageUrl"
                      placeholder="請輸入主圖網址或上傳圖片"
                    />
                    <label for="floatingMainPic">請輸入主圖網址或上傳圖片</label>
                  </div>
                  <div class="col-md-4 py-1 pe-0 mb-2 position-relative" v-show="!data.imageUrl">
                    <button
                      class="d-block w-100 h-100 btn btn-sm btn-light"
                      type="button"
                    >
                      上傳圖片
                    </button>
                    <label for="mainFile" class="position-absolute"></label>
                    <input
                      type="file"
                      class="d-block w-100 h-100 position-absolute top-0 start-0 opacity-0"
                      id="mainFile"
                      placeholder="上傳圖片"
                      data-type="main"
                      @change="uploadImage"
                    />
                  </div>
                </div>
                <img
                  v-if="data.imageUrl"
                  class="img-fluid"
                  :src="data.imageUrl"
                  alt=""
                />
              </div>
              <div class="col-md-12">
                <div class="form-floating mb-2">
                  <textarea
                    class="form-control border-0 border-bottom border-secondary"
                    placeholder="Leave a comment here"
                    id="floatingDescription"
                    style="height: 100px"
                    v-model="data.description"
                  ></textarea>
                  <label for="floatingDescription">請輸入產品描述</label>
                </div>
                <div class="form-floating mb-2">
                  <textarea
                    class="form-control border-0 border-bottom border-secondary"
                    placeholder="Leave a comment here"
                    id="floatingContent"
                    style="height: 100px"
                    v-model="data.content"
                  ></textarea>
                  <label for="floatingContent">請輸入說明內容</label>
                </div>
                <div class="form-check mb-2">
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
            </div>
            <div class="col-md-4">
              <h3 class="mb-2">多圖新增</h3>
              <div class="row">
                <div
                  class="col-12 mb-2"
                  v-for="(image, index) in data.imagesUrl"
                  :key="index"
                >
                  <div class="row mx-auto">
                    <div class="col-md-8 px-0 form-floating mb-2" :class="{ 'col-md-12': image }">
                      <input
                        type="text"
                        class="form-control border-0 border-bottom border-secondary"
                        :id="'floatingPic' + index"
                        v-model="data.imagesUrl[index]"
                        placeholder="請輸入網址或上傳圖片"
                      />
                      <label :for="'floatingPic' + index">請輸入網址或上傳圖片</label>
                    </div>
                    <div class="col-md-4 py-1 pe-0 mb-2 position-relative" v-show="!image">
                      <button
                        class="d-block w-100 h-100 btn btn-sm btn-light"
                        type="button"
                      >
                        上傳圖片
                      </button>
                      <label for="subFile" class="position-absolute"></label>
                      <input
                        type="file"
                        class="d-block w-100 h-100 position-absolute top-0 start-0 opacity-0"
                        id="subFile"
                        placeholder="上傳圖片"
                        :data-index="index"
                        data-type="sub"
                        @change="uploadImage"
                      />
                    </div>
                  </div>
                  <img
                    class="img-fluid"
                    v-show="image"
                    :src="image"
                    alt=""
                  />
                </div>
              </div>
              <button
                class="d-block w-100 btn btn-sm btn-primary mb-2"
                type="button"
                v-if="!data.imagesUrl?.length || data.imagesUrl[data.imagesUrl.length - 1]"
                @click="addImage"
              >
                新增圖片
              </button>
              <button
                class="d-block w-100 btn btn-sm btn-outline-danger mb-2"
                type="button"
                v-else
                @click="removeImage"
              >
                刪除圖片
              </button>
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
              @click="$emit('emit-update-data', title, data)"
            >
              確認
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
      title: null,
      return: {
        title: null,
        content: null,
      },
    };
  },
  props: ['modal', 'type'],
  emits: ['emit-update-data'],
  methods: {
    uploadImage(e) {
      const formData = new FormData();
      formData.append('file-to-upload', e.target.files[0]);
      // 使用 file-to-upload 是因為 Api 所需

      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData)
        .then((response) => {
          // console.log(response.data.imageUrl);
          if (e.target.dataset.type === 'main') {
            this.data.imageUrl = response.data.imageUrl;
          } else if (e.target.dataset.type === 'sub') {
            this.data.imagesUrl[e.target.dataset.index] = response.data.imageUrl;
          }
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    addImage() {
      if (this.data.imagesUrl === undefined) {
        // 沒有 imagesUrl，先給空陣列
        this.data.imagesUrl = [];
      }
      // 新增一筆空白資料，讓欄位先出來
      this.data.imagesUrl.push('');
    },
    removeImage() {
      this.data.imagesUrl.pop();
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
