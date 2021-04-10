<template>
  <node-box :nodeObj="this.dataObj"></node-box>
</template>

<script>
import NodeBox from './components/NodeBox'
export default {
  name: 'OrgTree',
  components: { NodeBox },
  data () {
    return {
      dataObj: {
        name: '守护遗迹',
        children: [{
          name: '天辉',
          children: [{
            name: '毛毛熊',
            children: []
          },
          {
            name: '戳戳龙',
            children: []
          },
          {
            name: '王炸',
            children: []
          }]
        },
        {
          name: '夜魇',
          children: [{
            name: '拎壶冲',
            children: [
              {
                name: '王炸',
                children: []
              }
            ]
          },
          {
            name: '蒙哥·别摸我',
            children: [{
              name: '圣剑',
              children: [{
                name: '恶魔刀锋',
                children: []
              }]
            }]
          }]
        },
        {
          name: '肉山',
          children: []
        }
        ]
      }
    }
  }
}
</script>

<style></style>
