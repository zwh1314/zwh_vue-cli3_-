<template>
  <div>
		<div class="header_left">
			<img src="../assets/ECNU.png">
        </div>
        <div class="header_right">
        <span>青马班选课系统</span>
                <div class="number_right">
                <img src="../assets/background_pic1.jpg">
                </div>
                <nav>
                   <ul>
                       <li v-for="(item1,index1) in navData" :key="index1">
                      {{item1.name}}
                      <ul v-if="item1.evens.length>0" style="margin-top:1px;">
                        <li v-for="(item2,index2) in item1.evens" :key="index2">
                        <a href="item2.path">
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
	components: {
//	HelloWorld
	},
    data() {
      return {
        navData: [ 
          { num: 1 , name: "首页", icon: 'el-icon-s-custom' , evens: [ { name:'用户信息', path: 'student_inf' },] 
          },
          { num: 2 , name: "用户管理", icon: 'el-icon-s-custom' , evens: [ { name:'用户信息', path: 'student_inf' },] 
          },
          { num: 3 , name: "成绩信息", icon: 'el-icon-s-data' , evens: [ { name:'总成绩', path: 'grade_table' },
          { name:'必修课成绩', path: 'must_point_table' }, { name: '选修课成绩', path: 'select_point_table' },
          { name: '失信记录', path: 'lose_trust' } ] 
          },
          { num: 4 , name: "课程管理", icon: 'el-icon-folder-checked' , evens: [ { name:'课程表', path: 'my_classtable_ready' }, 
            { name: '已修课程', path: 'my_classtable_already' }, { name: '选课', path: 'select_course' } ] 
            },
          { num: 5 , name: "活动管理", icon: 'el-icon-present' , evens: [ { name:'课程签到', path: 'Signset' },] 
            },
          { num: 6 , name: "系统设置", icon: 'el-icon-folder-checked' , evens: [ { name:'修改密码', path: 'ModificationPassword' } ] },
           ],//菜单栏
      
      }
    },
    methods: {
	
      
    },
    computed: {
    
  },
  created () {
  },
}
</script>

<style type="text/css"> 
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
	width:694px;
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
</style> 