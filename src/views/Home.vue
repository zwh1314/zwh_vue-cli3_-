<template>
  <div class="home">
			<div class="header_left">
			<img src="../assets/ECNU.png">
            </div>
            <!--轮播图-->
            <div class="header_right">
            <span>青马班选课系统</span>
			<div id="dataCenter">
                 <div class="window" @mouseover="stop" @mouseleave="play">
                      <ul class="container" :style="containerStyle">
                            <li>
                            <!-- 把最后一张图放在最开始 -->
                            <img :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 1].img" alt="">
                            </li>
                            <li  v-for="(item, index) in sliders" :key="index">
                            <img :style="{width:imgWidth+'px'}" :src="item.img" alt="" @click="amplification(index)">
                            </li>
                            <li>
                            <!-- 把第一张图放在最后 -->
                            <img :style="{width:imgWidth+'px'}" :src="sliders[0].img" alt="">
                            </li>
                     </ul>
               <!--左右切换按钮-->
                     <ul class="direction" v-show=hide_expose>
                           <li class="left" @click="move(imgWidth, 1, speed)">
                              <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"  /></svg>
                           </li>
                           <li class="right" @click="move(imgWidth, -1, speed)">
                              <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"  /></svg>
                           </li>
                     </ul>
                <!--小圆点-->
                <h2>{{this.sliders[current_img].title}}</h2>
                   <ul class="dots">
                      <li v-for="(dot, i) in sliders" :key="i"
                      :class="{dotted: i === (currentIndex-1)}"
                      @click = jump(i+1)
                      >
                      </li>
                   </ul>
               </div>
               <div class="mask-div" @click="maskFun()" v-if="maskBol">
                  <img :style="{width:imgWidth+'px',height:'659px'}" :src="sliders[imgNumber].img" alt="" class="mask-img">
               </div>
            </div>
               <nav>
                   <ul>
                       <li><a href="/">首页</a></li>
                       <li v-for="(item1,index1) in navData" :key="index1">
                      {{item1.name}}
                      <ul v-if="item1.evens.length>0" style="margin-top:1px;">
                        <li v-for="(item2,index2) in item1.evens" :key="index2">
                        <a :href="item2.path">
                        {{item2.name}}
                        </a>
                        </li>
                      </ul>
                      </li>
                   </ul>
                </nav>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
 export default {
    name: 'home',
    props: {
    initialSpeed: {
      type: Number,
      default: 6
    }, // 图片移动速度
    initialInterval: {//必须小于等于initialSpeed
      type: Number,
      default: 6
    } // 如果是一个组件 接受外部传入的切换周期
  },
	components: {
//	HelloWorld
	},
    data() {
      return {
        hide_expose:true,
		sliders: [
        {
          img: 'http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658',
          title:"亭子"
        },
        {
          img: 'http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658',
          title:"桥"
        },
        {
          img: 'http://img.hb.aicdn.com/ab7f48509b3c0353017d9a85ef1d12400c9b2724540d4-p3zouo_fw658',
          title:"大海"
        },
        {
          img: 'http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658',
          title:"夕阳"
        },
        {
          img: 'http://img.hb.aicdn.com/22ded455284aab361b8d2056e82f74a891a019704296a-PSraEB_fw658',
          title:"冰山"
        },
      ], // 放图片的数组
      current_img: 0,//当前图片序号
      slide_direction:-1,//自行轮播移动方向（左）
      imgWidth: 375, // 图片宽度根据div宽度大小定*
      currentIndex: 1, // 原点起始位置
      distance: -375, // 外层嵌套的初始移动距离根据图片宽度定*
      transitionEnd: true, // 防止多次快速点击切换出现问题的闸门
      speed: this.initialSpeed,
      timer: null, // 定时器
      imgNumber: 0, // 点击放大的图片
      maskBol: false,
        navData: [ 
          { num: 2 , name: "用户管理", icon: 'el-icon-s-custom' , evens: [ { name:'用户信息', path: '/student_inf' },] 
          },
          { num: 3 , name: "成绩信息", icon: 'el-icon-s-data' , evens: [ { name:'总成绩', path: '/grade_table' },
          { name:'必修课成绩', path: '/must_point_table' }, { name: '选修课成绩', path: '/select_point_table' },
          { name: '失信记录', path: '/lose_trust' } ] 
          },
          { num: 4 , name: "课程管理", icon: 'el-icon-folder-checked' , evens: [ { name:'课程表', path: '/my_classtable_ready' }, 
            { name: '已修课程', path: '/my_classtable_already' }, { name: '选课', path: '/select_course' } ] 
            },
          { num: 5 , name: "活动管理", icon: 'el-icon-present' , evens: [ { name:'课程签到', path: '/sign_arrival' },] 
            },
          { num: 6 , name: "系统设置", icon: 'el-icon-folder-checked' , evens: [ { name:'修改密码', path: '/ModificationPassword' } ] },
           ],
        bread : [
          { name: '首页', path: '/' }
        ],

      }
    },
    methods: {
	init () {
      this.play()
    },
    move (offset, direction, speed) { // 移动一次的距离， 向左还是向右移动， 图片移动速度
      if (!this.transitionEnd) return
      this.transitionEnd = false
      direction === -1 ? this.currentIndex += offset / this.imgWidth : this.currentIndex -= offset / this.imgWidth
      if (this.currentIndex > this.sliders.length) this.currentIndex = 1
      if (this.currentIndex < 1) this.currentIndex = this.sliders.length

      const destination = this.distance + offset * direction
      this.animate(destination, direction, speed)
      if(direction === -1){//左移
        if(this.current_img<this.sliders.length-1)
          this.current_img++;
          else
          this.current_img=0;
      }
      else if(direction === 1){//右移
        if(this.current_img>0)
          this.current_img--;
          else
          this.current_img=this.sliders.length-1;
      }
    },
    animate (des, direc, speed) { // 实际移动距离 向左还是向右 移动速度 负右正左
      if (this.temp) {
        window.clearInterval(this.temp)
        this.temp = null
      }
      this.temp = window.setInterval(() => {
        if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
          this.distance += speed * direc
        } else {
          this.transitionEnd = true
          window.clearInterval(this.temp)
          this.distance = des
          let allWidth = this.sliders.length * this.imgWidth
          if (des < -allWidth) this.distance = -this.imgWidth
          if (des > -this.imgWidth) this.distance = -allWidth
        }
      }, 10)
    },
    jump (index) {
      const direction = index - this.currentIndex >= 0 ? -1 : 1
      const offset = Math.abs(index - this.currentIndex) * this.imgWidth
      const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed
      this.move(offset, direction, jumpSpeed)
    },
    // 自动播放函数
    play () {
      //this.hide_expose=false;
      if (!this.maskBol) {
        if (this.timer ) {
          window.clearInterval(this.timer)
          this.timer = null
        }
        this.timer = window.setInterval(() => {
          this.move(this.imgWidth, this.slide_direction, this.speed);
        }, this.interval)
      }
    },
    stop () {
      //this.hide_expose=true;
      window.clearInterval(this.timer)
      this.timer = null
    },
    amplification (index) {
      this.imgNumber = index
      this.maskBol = true
      this.stop()
    },
    maskFun () {
      this.maskBol = false
      this.play()
    },
    
      handleOpen(key) {
        this.bread = [];
        this.bread.push(this.navData[key])
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
        this.bread = []
      },
      handleSelect(key, keyPath) {
        this.bread.length = 1;
        let date = this.navData[keyPath[0]].evens
        for (let key in date) {
          if(date[key].path == keyPath[1]){
            this.bread.push(date[key])
          }
        }
      }
    },
    computed: {
    containerStyle () {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      }
    },
    interval () {
      return this.initialInterval * 1000
    }
  },
  created () {
    this.init()
  },
}
</script>

<style scoped lang="scss">
nav ul li a {
    display:block;
    color:#000;
    text-decoration:none;
    font-family:"微软雅黑";
}
.header_left{
    float: left;
    line-height: 120px;

}
.header_left img{
	margin-left:250px;
    width: 300px;
    height: 80px;
}
.header_right{
    float: right;
    height: 120px;
    width:750px;
    position: relative;
}
.header_right>div{
    position: absolute;
    top: 200px;
    right: 0;

}
.header_right ul{
    margin-top: 88px;

}
nav {
    width:750px;
    text-align:center;
}
nav ul {
	width:750px;
    border-radius:10px;
    background:linear-gradient(to bottom,#efefef,#bbbbbb);
    padding:0 30px;
    display:inline-table;
    position:relative;  
    box-shadow:1px 1px 3px #666;
}
nav ul ul {
    display:none;
}
nav ul li:last-child{
border-right: 1px solid #666;
}
nav ul li {
	width:112px;
	border-left: 1px solid #666;
    list-style-type:none;
    float:left; 
}
nav ul::after {
    content:"";
    display:block;
    clear:both;
}
nav ul li:hover > ul {
    display:block;
}
nav ul li:hover {
    background:linear-gradient(to bottom,#4f5964,#5f6975);
}
nav ul li:hover a {
    color:#FFF;
}
nav ul ul {
    background:#5f6975;
    border-radius:0;
    width:112px;
    position:absolute;
    padding:0;
}
nav ul ul li {
	top:100%;
	width:112px;
    float:none;
    border-bottom:1px solid #ffffff;
}
nav ul ul li a {
    color:#FFF;
}   
nav ul ul li a:hover {
    background:#4b545f;
}

  .el-breadcrumb {
    height: 57px;
    line-height: 57px;
    margin-left: 12px;
  }
  .title-user {
    position: absolute;
    right: 15px;
    top: 0;
  }
  .title-user span {
    margin-left: 15px;
  }
  
   *{
    box-sizing: border-box;
    margin:0;
    padding:0;
  }
  ol,ul{
    list-style: none;
  }
  #dataCenter{
    text-align: center;
    .window{
      position:relative;
      width:750px;
      height:689px;
      margin-top:0;
      overflow:hidden;
      .container{
        display:flex;
        position:absolute;
        
      }
      .left, .right{
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        width:80px;
        height:80px;
        background-color:rgba(0,0,0,.3);
        border-radius:100%;
        cursor:pointer;
      }
      .left{
        left:3%;
        padding-left:12px;
        padding-top:10px;
      }
      .right{
        right:3%;
        padding-right:12px;
        padding-top:10px;
      }
      img{
        user-select: none;
      }
    }
    .dots{
        position:absolute;
        bottom:120px;
        left:50%;
        transform:translateX(-50%);
      }
    .dots li{
      display:inline-block;
      width:15px;
      height:15px;
      margin:0 3px;
      border:1px solid white;
      border-radius:50%;
      background-color:#333;
      cursor:pointer;
    }
    .dots .dotted{
      background-color:orange;
    }
    .mask-div{
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,.7);
      position: fixed;
      top: 0;
      left: 0;
      .mask-img{
        margin-top: calc(50vh - 200px);
      }
    }
  }
  .window h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 140px;
    height: 50px;
    text-align: left;
    padding-left: 15px;
  }
</style>