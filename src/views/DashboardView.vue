<template>
  <router-view v-if="checkAccount" />
</template>

<script>
export default {
  data() {
    return {
      checkAccount: false,
    };
  },
};
</script>
