<template>
  <view>
    <view class="scroll-view-container">
      <!-- //左侧滑动区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" style="height: 100vh;">
        <block v-for="(item,index) in cateList" :key="index">
          <view :class="['left-scroll-view-item',index===active?'active':'']" @click="activeChange(index)">{{item.cat_name}}</view>
        </block>
        
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view scroll-y="true" style="height: 100vh;" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,i2) in cateList2" :key="i2" >
          <!-- //二级分类标题 -->
          <view class="cate-lv2-title">
            /{{item2.cat_name}}/
          </view>
          <!-- //三级分类列表 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item2)">
              <image :src="item3.cat_icon.replace('dev','web')" mode=""></image>
              <text>{{item3.cat_name}}</text>
            </view>
            
          </view>
          
        </view>

      </scroll-view>
    </view>


  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 储存分类列表数据
        cateList: [],
        //二级分类列表
        cateList2:[],
        active:0,
        scrollTop:0
      };
    },
    onLoad() {
      // 发起调用数据请求
      this.getCateList()
    },
    methods:{
      //获取分类列表函数
      async getCateList(){
        const {data:res} =await uni.$http.get('/api/public/v1/categories')
        // console.log(data)
        if(res.meta.status!=200){
          return uni.$showMsg()
        }
        this.cateList=res.message
        //默认是首项的二级分类列表
        this.cateList2=res.message[0].children
      },
      //改变列表激活项
      activeChange(i){
        this.active=i,
        this.cateList2=this.cateList[i].children
        this.scrollTop=this.scrollTop===0?1:0
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
        })
      }
    }
  
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    // 左下拉框美化
    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        
        line-height: 60px;
        background: #f7f7f7;
        text-align: center;
        font-size: 12px;

        &.active {
          background: #ffffff;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
    .cate-lv2-title{
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
  }
  .cate-lv3-list{
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item{
      width:33.33%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      image{
        height: 60px;
        width: 60px;
      }
      text{
        font-size: 12px;
      }
    }
  }
</style>