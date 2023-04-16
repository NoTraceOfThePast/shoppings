<script>
  export default {
    data() {
      return {
        swiperList: []
      }
    },
    onLoad() {
      this.getSwiperList()
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status!=200){
          uni.showToast({
            title:'请求数据失败',
            duration:1200,
            icon:'none'
          })        }
        this.swiperList=res.massage

      }
    },
    onLaunch: function() {
      console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import '@/uni_modules/uni-scss/index.scss';
  /* #ifndef APP-NVUE */
  @import '@/static/customicons.css';

  // 设置整个项目的背景色
  page {
    background-color: #f5f5f5;
  }

  /* #endif */
  .example-info {
    font-size: 14px;
    color: #333;
    padding: 10px;
  }
</style>