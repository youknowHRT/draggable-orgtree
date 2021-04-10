<template>
  <div id="app">
    <org-tree></org-tree>
  </div>
</template>

<script>
import OrgTree from "@/views/OrgTree"
export default {
  name: 'App',
  components: {
    OrgTree
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  color: #fff;
  box-sizing: border-box;
}
</style>
