<template>
  <div class="about">
    <h1>已修完课程</h1>
    <p>欢迎您，{{this.$store.state.user_name}}</p>
    <br>
    <button @click="add_course()">添加课程</button>
    <br>
    <table border="1" class="Table">
    <tr>
    <th>课程名称</th>
    <th>授课教师</th>
    <th>学分</th>
    <th>是否完成评教</th>
    <th>
	点击进行评教
    </th>
    </tr>
    <tr v-for="(course_for,index) of course_list" :key="index">
    <td><router-link  @click.native="check_course_inf(course_for)" to="/course_inf">{{course_for.course_name}}</router-link></td>
    <td>{{course_for.course_teacher}}</td>
    <td>{{course_for.course_point}}</td>
    <td>{{course_for.course_iscomment}}</td>
    <td>
    <button @click="comment_course(course_for,index)">评教</button>
    </td>
    </tr>
    </table>
    
    <!-- 弹出窗口 -->
	<div id="myModal" class="modal">
	<!-- 弹窗内容 -->
		<div class="modal-content">
			<div class="modal-header">
			<span class="close">&times;</span>
			<h2>课程评教</h2>
		</div>
		<div class="modal-body">
			<p>课程内容</p>
			<textarea v-model="comment_text1" placeholder="请对该课程就课程内容进行评教！" id="txtLy" rows="6" cols="80"></textarea>
			<p>组织形式</p>
			<textarea v-model="comment_text2" placeholder="请对该课程就组织形式进行评教！" id="txtLy" rows="6" cols="80"></textarea>
			<p>学习收获</p>
			<textarea v-model="comment_text3" placeholder="请对该课程就学习收获进行评教！" id="txtLy" rows="6" cols="80"></textarea>
		</div>
		<div class="modal-footer">
			<button class="ok" @click="submit()">确认</button>&nbsp;<button class="no">取消</button>
		</div>
	</div>
	</div>
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
<script type="text/javascript">
import {mapMutations} from 'vuex' //获取./store中state中的变量和mutations中的函数

// 弹窗js
function open_window(){
		//获取弹窗所在div
		var modal = document.getElementById('myModal');
		//获取x按钮
		var span = document.getElementsByClassName("close")[0];
		//获取确认按钮
		var ok=document.getElementsByClassName("ok")[0];
		//获取取消按钮
		var no=document.getElementsByClassName("no")[0];
		modal.style.display = "block";
		ok.onclick=function(){
			//关闭弹窗
			modal.style.display = "none";
		}
		no.onclick=function(){
			//关闭弹窗
			modal.style.display = "none";
		}
		span.onclick = function() {
			//关闭弹窗
			modal.style.display = "none";
		}
		window.onclick = function(event) {
			//关闭弹窗
			if (event.target == modal) modal.style.display = "none";
		}
}

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
  comment_text1: "",
  comment_text2: "",
  comment_text3: "",
  course_index: -1,
  course_data:
  {
  course_name: "语文",
  course_teacher: "缪老师",
  course_point: 3,
  course_iscomment: "未评教",
  },
  course_list:
  [
  {
  course_name: "数学",
  course_teacher: "孔老师",
  course_point: 2,
  course_iscomment: "未评教",
  },
  {
  course_name: "英语",
  course_teacher: "程老师",
  course_point: 2,
  course_iscomment: "未评教",
  },
  {
  course_name: "物理",
  course_teacher: "李老师",
  course_point: 2,
  course_iscomment: "未评教",
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
		//获取返回的课程信息
		if(res.data.message == "success")
		{
		this.course_list=[];
		for(let i=0;i<res.data.data.length;i++)
		this.course_list.push(res.data.data[i])
		}
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
  
  comment_course(course_for,index)
  {
  if(course_for.course_iscomment === true){
  alert("您以对该课程进行评教，请完成其他剩余课程的评教！");
  return;
  }
  else{
  open_window();
  this.course_index=index;
  this.course_data={...course_for,course_iscomment: "已评教",};
  }
  },
  
  submit(){
  if(this.comment_text1 === ""||this.comment_text2 === ""||this.comment_text3 === ""){
  alert("请重新进行该课程评教！");
  return;
  }
  //上传评教内容到后台数据库
  alert("评教成功");
  this.course_list.splice(this.course_index,1,this.course_data);
  this.cancel();
  },
  
  cancel(){
  this.course_data={};
  this.comment_text1="";
  this.comment_text2="";
  this.comment_text3="";
  this.course_index=-1;
  },
  
  course_inf(index)
  {
  console.log(this.course_list.slice(index,index+1));
  },
  
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
};

</script>
<style type="text/css">
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
  
/* 弹窗 (background) */
.modal {
    display: none; /* 是否弹出 */
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    padding-top: 200px;
    padding-bottom: 300px;
    width: 100%; 
    height:  100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);
    text-align: center;
}

.modal-content {
    /*position: relative;*/
    background-color: #fefefe;
    margin: auto;
    padding: 200px auto;
    width: 400px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

@-webkit-keyframes animatetop {
    from {top:-200px; opacity:0} 
    to {top:0; opacity:1}
}

@keyframes animatetop {
    from {top:-200px; opacity:0}
    to {top:0; opacity:1}
}

.close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover, .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-header {
	display: block;
	line-height: 30px;
    padding: 2px 10px;
    background-color: blue;
    color: white;
    text-align: left;
}

.modal-body {
	padding: 2px 16px;
	font-size: 18px;
	height: 350px;
}
.modal-footer {
	display: block;
	line-height: 30px;
    padding: 2px 10px;
    background-color: blue;
    color: white;
}

#txtLy{
        width:100%; 
        height:80px;
	}
a:link {color: black;  font-weight: bold;} /*平时链接的样式*/ 
a:hover {color: blue;  font-weight: bold;} /*鼠标放置在链接上方的样式*/ 
a:visited {color: black;  font-weight: bold;} /*访问过后的样式*/ 

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
</style>