<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-md-2 py-2 d-flex flex-column flex-shrink-0 bg-light h-100">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-black text-decoration-none"
        >
          <span class="fs-4">Sidebar</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li>
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/about">關於</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
        </ul>
        <hr />
        <div class="dropdown">
          <router-link
            class="d-block mb-1 text-black text-decoration-none"
            to="/cart"
          >
            購物車
          </router-link>
          <router-link
            class="d-block mb-1 text-black text-decoration-none"
            to="/admin"
          >
            後台管理
          </router-link>
          <router-link
            class="d-block mb-1 text-black text-decoration-none"
            to="/login"
          >
            登入
          </router-link>
        </div>
      </div>
      <div class="col-md-10 py-2">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  html, body, #app {
    min-height: 100%;
    height: 100%;
  }
</style>
