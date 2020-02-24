<template>
  <div>
    <h1>待修读课程</h1>
    <p>欢迎您，{{this.$store.state.user_name}}</p>
    <br>
    <button @click="add_course()">添加课程</button>
    <br>
    <table border="1" class="Table">
    <tr>
    <th>课程名称</th>
    <th>授课教师</th>
    <th>学分</th>
    <th>上课时间</th>
    <th>
	点击退课
    </th>
    </tr>
    <tr v-for="(course_for,index) of course_list" :key="index">
    <td><router-link to="/course_inf"  @click.native="check_course_inf(course_for)">{{course_for.course_name}}</router-link></td>
    <td>{{course_for.course_teacher}}</td>
    <td>{{course_for.course_point}}</td>
    <td>{{course_for.course_time}}</td>
    <td>
    <button @click="delete_course()">退课</button>
    </td>
    </tr>
    </table>
    <!--分页-->
	<div class="page-bar" style="margin-left:25px">
	<ul>
	<li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
	<li v-if="cur==1"><a class="banclick">上一页</a></li>
	<li v-for="index in indexs" :key="index" v-bind:class="{ 'active': cur == index}">
	<a v-on:click="btnClick(index)">{{ index }}</a>
	</li>
	<li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
	<li v-if="cur == all"><a class="banclick">下一页</a></li>
	<li><a>共<i>{{all}}</i>页</a></li>
	</ul>
	</div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex' //获取./store中state中的变量和mutations中的函数

export default {
  name: 'my_classtable_ready',
  data () 
  {	
  return{
  all: 10, //总页数
  cur: 1,//当前页码
  page_every: 5,//每页课程数
  total_course:50,//总的课程数
  start:0,//起始记录
  end:-1,//结束记录
  course_data:
  {
  course_name: "语文",
  course_teacher: "缪老师",
  course_point: 3,
  course_time: "1-18 星期二1，2节",
  },
  course_list:
  [
  {
  course_name: "数学",
  course_teacher: "孔老师",
  course_point: 2,
  course_time: "1-18 星期三1，2节",
  },
  {
  course_name: "英语",
  course_teacher: "程老师",
  course_point: 2,
  course_time: "1-18 星期四1，2节",
  },
  {
  course_name: "物理",
  course_teacher: "李老师",
  course_point: 2,
  course_time: "1-18 星期五1，2节",
  }
  ]
  }
  },
  
  methods: 
  {
  ...mapMutations(["check_course_inf"]),
  
  //请求数据
	dataListFn: function(){
	this.$axios.get("/getAllLessons", 
	{
		params:{
			start:this.start,
			end:this.end,
		}
	})
	.then((res) => {
		//获取返回的课程链表List<Lesson>信息
		if(res.data.message == "success")
		this.course_list=res.data;
	});
	},
//分页
	btnClick: function(data){//页码点击事件
		if(data != this.cur){
			this.cur = data 
		}
//根据点击页数请求数据
		this.start=(this.cur-1)*this.page_every;
		if(this.cur==this.all)
		this.end=this.total_course;
		else
		this.end=this.cur*this.page_every-1;
		this.dataListFn();
	},
	pageClick: function(){
//根据点击页数请求数据
		this.start=(this.cur-1)*this.page_every;
		if(this.cur==this.all)
		this.end=this.total_course;
		else
		this.end=this.cur*this.page_every-1;
		this.dataListFn();
	},
  
  add_course()
  {
  this.course_list.unshift(this.course_data);
  },
  
  delete_course(index)
  {
  if(window.confirm("您确定退掉该门课程吗？"))
  this.course_list.splice(index,1);
  }
  
  },
  
  computed: {
//按五页分页
	indexs: function(){
		var left = 1;
		var right = this.all;
		var ar = [];
		if(this.all>= 5){
			if(this.cur > 3 && this.cur < this.all-2){
			left = this.cur - 2
			right = this.cur + 2
			}
			else{
				if(this.cur<=3){
				left = 1
				right = 5
				}
				else{
				right = this.all
				left = this.all -4
				}
			}
		}
		while (left <= right){
			ar.push(left)
			left ++
		}
		return ar
	}
  },
  
  created(){
	this.$axios.get("/getNumberOfLessons")
	.then((res) => {
		//获取返回的课程数量
		this.total_course=res;
		this.all = res/this.page_every+1;//总页数
	});
	this.$axios.get("/getAllLessons", 
	{
		params:{
			start:this.start,
			end:this.end,
		}
	})
	.then((res) => {
		//获取返回的课程信息
		if(res.data.message == "success")
		{
		this.course_list=[];
		for(let i=0;i<res.data.data.length;i++)
		this.course_list.push(res.data.data[i])
		}
	});
  },
}
</script>
<style>
a:link {color: black;  font-weight: bold;} /*平时链接的样式*/ 
a:hover {color: blue;  font-weight: bold;} /*鼠标放置在链接上方的样式*/ 
a:visited {color: black;  font-weight: bold;} /*访问过后的样式*/ 

.div_back
{
background:url(../assets/course_table_background.jpg) no-repeat 150px
}
.Table
{
height:100%;
margin: 0 auto;
width:100%;
}
table, td, th
  {
  border:1px solid green;
  }
th
  {
  background-color:green;
  color:white;
  }
  
/*分页*/
.page-bar{
margin-left: 500px;
margin-top: 350px;
}
ul,li{
margin: 0px;
padding: 0px;
}
li{
list-style: none
}
.page-bar li:first-child>a {
margin-left: 0px
}
.page-bar a{
border: 1px solid #ddd;
text-decoration: none;
position: relative;
float: left;
padding: 6px 12px;
margin-left: -1px;
line-height: 1.42857143;
color: #5D6062;
cursor: pointer;
margin-right: 20px;
}
.page-bar a:hover{
background-color: #eee;
}
.page-bar a.banclick{
cursor:not-allowed;
}
.page-bar .active a{
color: #fff;
cursor: default;
background-color: #E96463;
border-color: #E96463;
}
.page-bar i{
font-style:normal;
color: #d44950;
margin: 0px 4px;
font-size: 12px;
}
.back1{
margin-top: 0px;
postition:absolute;
      background: url('../assets/background_pic1.jpg') center center no-repeat;
      height: 100%;
      position: fixed;
      width: 100%
}
</style>