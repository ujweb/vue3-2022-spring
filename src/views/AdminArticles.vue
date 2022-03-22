<template>
  <div class="d-flex align-items-center justify-content-between">
    <h1 class="mb-0">後台文章列表</h1>
    <button
      class="btn btn-sm btn-primary"
      type="button"
      @click="modal.title = '新增文章'; openArticleModal(modal.title, {});"
    >
      新增文章
    </button>
  </div>
  <div class="row">
    <div class="col">
      <div class="table-responsive py-2">
        <table class="table text-center align-middle">
          <thead>
            <tr>
              <th width="6%" scope="col">#</th>
              <th width="11%" scope="col">日期</th>
              <th width="28%" scope="col">文章名稱</th>
              <th width="22%" scope="col">標籤</th>
              <th width="12%" scope="col">啟用</th>
              <th width="22%" scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in articles" :key="article.id">
              <td>{{ index+1 }}</td>
              <td>{{ toDate(article.create_at/1000) }}</td>
              <td>{{ article.title }}</td>
              <td>{{ toTags(article.tag) }}</td>
              <td>
                <div class="form-check form-switch float-none d-inline-block mb-0">
                  <button
                    class="form-check-input"
                    :class="{'checked': article.isPublic}"
                    @click="togglePublic(article);"
                  ></button>
                </div>
              </td>
              <td>
                <button
                  class="btn btn-sm btn-primary me-1"
                  type="button"
                  @click="modal.title = '編輯文章'; openArticleModal(modal.title, article);"
                >
                  編輯
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  type="button"
                  @click="modal.title = '刪除文章'; openArticleModal(modal.title, article);"
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
  <ArticleModal
    :modal="modal.temp"
    :type="modal.title"
    @emit-article-data="updateArticle"
  >
    <template #title>{{ modal.title }}</template>
  </ArticleModal>
  <SuccessModal>
    <template #title>{{ modal.title }}</template>
    <template #default>
      {{ modal.content }}
    </template>
  </SuccessModal>
  <DeleteModal
    :modal="modal.temp"
    @emit-delete="deleteArticle"
  >
    <template #title>{{ modal.title }}</template>
    <template #default>
      是否刪除 <b class="text-danger">{{ modal.temp.title }}</b><br />
      提醒您，刪除後將無法恢復
    </template>
  </DeleteModal>
</template>

<script>
import { bsModal } from '@/script/bootstrap';
import ArticleModal from '@/components/AdminArticleModal.vue';
import SuccessModal from '@/components/AdminSuccessModal.vue';
import DeleteModal from '@/components/AdminDeleteModal.vue';

export default {
  data() {
    return {
      bsModal: null,
      articles: [],
      tags: '',
      paginations: {},
      modal: {
        title: '',
        temp: {},
        content: '',
      },
    };
  },
  emits: ['page-loading'],
  components: {
    ArticleModal,
    SuccessModal,
    DeleteModal,
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      const adminArticlesApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles`;
      this.$http.get(adminArticlesApi)
        .then((response) => {
          this.$emitter.emit('page-loading', false);
          this.articles = response.data.articles;
          this.paginations = response.data.pagination;
        }).catch((error) => {
          this.$emitter.emit('page-loading', false);
          console.log(error);
        });
    },
    updateArticle(article) {
      const type = this.modal.title;
      let adminArticleApi = '';
      let method = '';
      if (type === '新增文章') {
        adminArticleApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
        method = 'post';
      } else if (type === '編輯文章') {
        adminArticleApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${article.id}`;
        method = 'put';
      }
      const dataArticle = {
        data: article,
      };
      if (dataArticle.data.isPublic === '' || dataArticle.data.isPublic === undefined) {
        dataArticle.data.isPublic = false;
      }
      this.$http[method](adminArticleApi, dataArticle)
        .then((response) => {
          // console.log(response);
          if (type === '新增文章') {
            this.modal.title = '新增成功';
          } else if (type === '編輯文章') {
            this.modal.title = '修改成功';
          }
          this.modal.content = response.data.message;
          this.modal.temp = {};
        })
        .catch((error) => {
          console.dir(error);
          if (type === '新增文章') {
            this.modal.title = '新增失敗';
          } else if (type === '編輯文章') {
            this.modal.title = '修改失敗';
          }
          this.modal.content = error.response.data.message;
        })
        .finally(() => {
          this.getArticles();
          this.openSuccessModal();
        });
    },
    togglePublic(article) {
      const adminArticleApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${article.id}`;
      this.$emitter.emit('page-loading', true);

      const dataArticle = {
        data: {},
      };

      this.$http.get(adminArticleApi)
        .then((response) => {
          dataArticle.data = response.data.article;
        })
        .then(() => {
          if (dataArticle.data.isPublic === true) {
            dataArticle.data.isPublic = false;
          } else if (dataArticle.data.isPublic === false) {
            dataArticle.data.isPublic = true;
          }

          this.$http.put(adminArticleApi, dataArticle)
            .then((response) => {
              this.modal.title = '修改成功';
              this.modal.content = response.data.message;
            })
            .catch((error) => {
              console.dir(error);
              this.modal.title = '修改失敗';
              this.modal.content = error.response.data.message;
            })
            .finally(() => {
              this.getArticles();
              this.openSuccessModal(this.modal.title, this.modal.content);
            });
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    deleteArticle(article) {
      this.$emitter.emit('page-loading', true);
      const adminCouponApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${article.id}`;
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
          this.getArticles();
          this.clearTemp();
          this.openSuccessModal();
        });
    },
    openArticleModal(type, data) {
      if (type === '新增文章') {
        this.bsModal = bsModal('articleModal');
        this.modal.temp = {};
      } else if (type === '編輯文章') {
        this.bsModal = bsModal('articleModal');
        this.modal.temp = JSON.parse(JSON.stringify(data));
      } else if (type === '刪除文章') {
        this.bsModal = bsModal('deleteModal');
        this.modal.temp = data;
      }
      this.bsModal.show();
    },
    openSuccessModal() {
      this.$emitter.emit('page-loading', false);
      this.bsModal = bsModal('SuccessModal');
      this.bsModal.show();
    },
    toTags(array) {
      return array.join('、');
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
