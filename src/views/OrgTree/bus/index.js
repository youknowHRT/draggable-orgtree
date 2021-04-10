import Vue from 'vue'
const busEvent = new Vue({
  data() {
    return {
      dragNodeIndex: -1, //拖曳节点在父节点children数组中的index
      fatherToSonState: false,
      moveToSelfState:false,
      dragNode:{}//拖曳点位
    }
  },
  created() {
    this.$on('trans-drag-node-index', (res) => {
      this.dragNodeIndex = res
    })
    this.$on('state-father-drag-to-son', (res) => {
      this.fatherToSonState = res
    })
    this.$on("state-move-to-self", res=>{
      this.moveToSelfState= res
    })
    this.$on("get-drag-node",res=>{
      this.dragNode=res
    })
  }
})

export default busEvent
