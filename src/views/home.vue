<template>
  <div class="home">
    <siderbar />
    <taskContent />
  </div>
</template>
<script>
import siderbar from './sidebar.vue'
import taskContent from './taskList.vue'
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    siderbar,
    taskContent
  },
};
</script>
<style scoped lang="less">
.home{
  width: 100%;
  height: 100vh;
  display: flex;

}
</style>./taskList.vue