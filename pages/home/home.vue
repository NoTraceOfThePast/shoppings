<template>
  <view>
    Home

    <!-- //轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">

        <navigator class="swiper-item" :url="'/subpkg/googs_detail/googs_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>

      <!-- <swiper-item>
          <view class="swiper-item"></view>
        </swiper-item> -->

    </swiper>

    <!-- <swiper-item>
        <view class="swiper-item">hi好</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">威威，在吗小笨蛋</view>
      </swiper-item>
    
    
    <!-- //导航栏区域 -->
    <!-- 1.点击分类跳转到分类页面 -->
    <!-- 添加事件绑定函数 navClickHandler(item) -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 首先渲染楼层区域的三个标题 -->
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <!-- 标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>

        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
          
          <!-- 左侧图片区域 -->
          <navigator :url="item.product_list[0].url" class="floor-img-left">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix">
            </image>
          </navigator>
          <!-- 右侧四张图片区域 -->
          <view class="floor-img-right">
            <navigator  class="floor-img-right" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0":url="item2.url">
              <image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix" ></image>
            </navigator>
          </view>
         

        </view>
      </view>

    </view>
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //轮播图数据
        swiperList: [],

        // 导航栏数据存储
        navList: [],
        //楼层数据存储
        floorList: []

      };
    },
    onLoad() {
      //调用请求轮播图的方法
      this.getSwiperList()
      //调用请求导航栏数据
      this.getNavList()
      //请求楼层函数调用
      this.getFloorData()

    },
    methods: {
      //请求轮播图数据的方法
      async getSwiperList() {
        // const data= await uni.$http.get('/api/public/v1/home/swiperdata')
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // console.log(res)
        if (res.meta.status != 200) {
          // return uni.showToast({
          //   title: '请求数据失败',
          //   duration: 1200,
          //   icon: 'none'
          // })
          return uni.$showMsg()
        }
        // console.log(data)
        // uni.$showMsg('数据请求成功')
        this.swiperList = res.message
        // console.log(this.swiperList)
      },
      //请求navList数据函数
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        // console.log(res)
        if (res.meta.status != 200) {
          return uni.$showMsg()
        }
        // uni.$showMsg("navList数据")
        this.navList = res.message
      },
      // 导航栏点击第一个跳转到分类页面
      navClickHandler(e) {
        if (e.name === "分类") {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      //定义楼层数据请求函数
      async getFloorData() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        // console.log(res)
        if (res.meta.status != 200) {
          return uni.$showMsg()
        }
        
        //对请求回来的楼层数据url进行处理
        res.message.forEach(floor=>{
          floor.product_list.forEach(provide=>{
            provide.url='/subpkg/goods_list/goods_list?'+provide.navigator_url.split('?')[1]
          })
        })
        // uni.$showMsg('你好啊，未来的我')
        this.floorList = res.message
        console.log(this.floorList)
      }


    }

  }
</script>

<style lang="scss">
  //轮播图样式
  swiper {
    height: 350rpx;

    .swiper-item,
    image {
      height: 100%;
      width: 100%;
    }

  }

  //导航栏样式
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  //楼层标题的美化
    .floor-title {
      width: 100%;
      height: 60rpx;
    }
  //楼层右侧四张图片的美化
 .floor-img-box{
  display: flex;
  padding-left: 10rpx;
  .floor-img-right{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
 }
 
 
</style>