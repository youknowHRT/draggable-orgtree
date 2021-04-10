<template>
  <div class="nodeBox">
    <div class="labelName"
      :draggable="nodeObj.name=='守护遗迹'?false:true"
      @dragstart="dragstart($event,nodeObj,broNodeArr)"
      @dragover="dragover($event,nodeObj)"
      @drop="drop($event,nodeObj,broNodeArr)"
      @dragend="dragend($event,nodeObj,broNodeArr)"
    >
      {{ nodeObj.name }}
    </div>
    <div class="childBox" v-if="nodeObj.children.length !== 0">
      <node-box
        v-for="item in nodeObj.children"
        :key="item.index"
        :nodeObj="item"
        :broNodeArr="nodeObj.children"
      ></node-box>
    </div>
  </div>
</template>

<script>
import eventBus from "../bus"
export default {
  name: 'NodeBox',
  data() {
    return {
      dragNode:{}
    }
  },
  props: {
    nodeObj: Object,
    broNodeArr: Array
  },
  // computed:{

  // },
  methods:{
    dragstart(e,nodeObj,broNodeArr){
      // console.log('🐉drag移动的点位',nodeObj.name,);
      eventBus.$emit("get-drag-node",nodeObj)//保存拖曳点位信息
      let transData=JSON.stringify(nodeObj)
      e.dataTransfer.setData("node",transData)//要传的数据
      let index=broNodeArr.findIndex(item=>JSON.stringify(item)===transData)//寻找数组中的索引
      eventBus.$emit("trans-drag-node-index", index)//保存index
    },
    dragover(e){
      e.preventDefault()
    },
    drop(e,nodeObj){
      console.log('🐉drop到的点位',nodeObj.name);
      let getData=JSON.parse( e.dataTransfer.getData("node"))//获取drag的数据

      let fatherDragToSon =this.ifFatherDragToSon(eventBus.dragNode,nodeObj)//判断是否父到子
      eventBus.$emit("state-father-drag-to-son",fatherDragToSon)//保存父到子的判断信息，给dragend使用
      if(fatherDragToSon)return//如果是父到子则取消

      let dragToSelf=eventBus.dragNode===nodeObj//判断是否自移动
      eventBus.$emit("state-move-to-self", dragToSelf)//保存自移动状态信息，给dragend使用
      if(dragToSelf)return//自移动，取消

      nodeObj.children.push(getData)//正常操作，在数组添加信息，突然发现参数也可以用eventBus.dragNode
    },
    dragend(e,nodeObj,broNodeArr){
      // 通过eventBus获取拖曳数组的index'
      console.log(e.dataTransfer.dropEffect,'dragend拖放dropEffect操作效果');
      let dropEffect=e.dataTransfer.dropEffect
      if(dropEffect=="move"){
        if(eventBus.fatherToSonState){
        console.log('移动到子节点了,啥也不做');
        return
        }
        if(eventBus.moveToSelfState){
          console.log("移动到自身了，啥也不做");
          return
        }
        let index=eventBus.dragNodeIndex
        console.log(index,'🐉dragend拿到了index');
        broNodeArr.splice(index,1)
      }
      
    },
    ifFatherDragToSon(dragObj,dropObj){//判断是否父节点移动到了子节点
      if (dragObj.children.length === 0) return false;
      let newArr = [];
      function getAllName(dragObj) {
        newArr.push(...dragObj.children);
        if (dragObj.children.length === 0) {
          return;
        } else {
          for (let i = 0; i < dragObj.children.length; i++) {
            getAllName(dragObj.children[i]);
          }
        }
      }
      getAllName(dragObj);
      if (newArr.includes(dropObj)) {
        return true;
      }
      return false;
    }
  }
}
</script>

<style lang="scss">
.nodeBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  &::before,
  &::after {
    content: '';
    border-right: 1px solid #ddd;
    height: 10px;
    width: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:not(:first-child):before {
    border-top: 1px solid #ddd;
  }
  &:not(:last-child):after {
    left: 50%;
    border-right: none;
    border-top: 1px solid #ddd;
  }
  .labelName {
    width: 100px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: purple;
    margin: 10px 10px 0 10px;
    font-weight: 700;
    user-select: none;
    position: relative;
  }
  .childBox {
    display: flex;
    position: relative;
    padding: 10px;
    &::after {
      content: '';
      position: absolute;
      border-left: 1px solid #ddd;
      height: 10px;
      left: 50%;
      top: 0;
    }
  }
}
#app > .nodeBox:before,
#app > .nodeBox:after {
  content: none;
}
</style>
