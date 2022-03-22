<template>
  <div
    class="modal fade"
    id="articleModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-body p-3">
          <h2 class="mb-2"><slot name="title"></slot></h2>
          <div class="row">
            <div class="col-md-8 mb-2">
              <label for="title" class="form-label">文章標題</label>
              <input
                type="text"
                id="title"
                class="form-control"
                placeholder="輸入標題"
                v-model="data.title"
              />
            </div>
            <div class="col-md-4 mb-2">
              <label for="author" class="form-label">作者名稱</label>
              <input
                type="text"
                id="author"
                class="form-control"
                v-model="data.author"
              />
            </div>
            <div class="col-md-6 mb-2">
              <label for="tags" class="form-label">文章標籤</label>
              <div
                class="d-flex flex-wrap form-control input-tags"
                :class="data.tag > 0 ? 'p-1' : ''"
              >
                <div
                  class="btn btn-sm alert-secondary btn-tags me-1 lh-1"
                  v-for="(item, key) in data.tag"
                  :key="key"
                >
                  <span>{{ item }}</span>
                  <button
                    class="btn btn-xs material-icons fs-7 lh-1 p-0 ms-1"
                    type="button"
                    @click="removeTag(item, key)"
                  >
                    clear
                  </button>
                </div>
                <input
                  type="text"
                  id="tags"
                  class="col border-0"
                  :placeholder="
                    data.tag.length > 0 ? '' : '輸入完標籤後，使用 ENTER 新增'
                  "
                  v-model.trim="insertTag"
                  @keydown.enter="addTag"
                />
              </div>
            </div>
            <div class="col-md-6 mb-2">
              <label for="date" class="form-label">發佈日期</label>
              <v-date-picker
                color="indigo"
                v-model="data.create_at"
                :model-config="modelConfig"
              >
                <template v-slot="{ inputValue, togglePopover }">
                  <div class="input-group">
                    <input class="form-control" id="date" :value="inputValue" />
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="togglePopover()"
                    >
                      <span class="material-icons-outlined d-block fs-6">calendar_today</span>
                    </button>
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="col-12 mt-3">
              <h4 class="fs-5">編輯文章</h4>
              <ckeditor
                :editor="editor"
                :config="editorConfig"
                v-model="data.content"
                class="w-100"
              ></ckeditor>
            </div>
          </div>
          <div class="form-check mt-3">
            <input
              class="form-check-input"
              type="checkbox"
              value="isPublic"
              id="checkPublic"
              v-model.number="data.isPublic"
            />
            <label class="form-check-label" for="checkPublic">
              是否公開
            </label>
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
              @click="$emit('emit-article-data', data)"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: ['modal'],
  emits: ['page-loading', 'push-message', 'update-data'],
  data() {
    return {
      data: {
        tag: [],
        id: '',
      },
      insertTag: '',
      scrollspy: {},
      modelConfig: {
        type: 'number',
      },
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'numberedList', 'bulletedList', '|', 'blockQuote', 'undo', 'redo'],
      },
    };
  },
  methods: {
    getContent() {
      if (!this.data.id) { return; }
      const adminArticleApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.data.id}`;
      this.$http.get(adminArticleApi)
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.data.content = res.data.article.content;
          this.$emitter.emit('page-loading', false);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    addTag() {
      if (this.insertTag.trim()) {
        this.data.tag.push(this.insertTag.trim());
        this.insertTag = '';
      }
    },
    removeTag(tag, key) {
      const newArray = this.data.tag.filter((item, index) => item !== tag && key !== index);
      this.data.tag = newArray;
    },
  },
  watch: {
    modal() {
      this.data = { ...this.modal };
      if (!this.data.tag) {
        this.data.tag = [];
      }
      if (!this.data.id) {
        this.data.id = '';
      }
      this.insertTag = '';
      this.getContent();
    },
  },
};
</script>

<style lang="scss">
.btn.btn-sm {
  min-width: auto;
}
.ck.ck-editor {
  width: 100%;
}
.ck.ck-content {
  height: 300px;
}
</style>
