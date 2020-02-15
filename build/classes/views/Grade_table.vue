<template>
  <div class="about">
    <h1>成绩单</h1>
    <p>欢迎您，{{this.$store.state.user_name}}</p>
    <table border="1" class="Table">
    <tr>
    <th>已获得总学分</th>
    <th><router-link to="/must_point_table">已获得必修学分</router-link></th>
    <th><router-link to="/select_point_table">已获得选修学分</router-link></th>
    <th><router-link to="/lose_trust">失信记录</router-link></th>
    </tr>
    <tr>
    <td>{{total_point}}</td>
    <td>{{must_point}}</td>
    <td>{{select_point}}</td>
    <td>{{if_lose_trust}}</td>
    </tr>
    </table>
  </div>
</template>

<script>
import {mapState} from 'vuex' //获取./store中state中的变量和mutations中的函数

export default {
  name: 'student_inf',
  data () 
  {	
  return{
  total_point: 88,
  must_point: 56,
  }
  },
  computed:{
  select_point(){return this.total_point-this.must_point},
  ...mapState(["if_lose_trust"]),
  },
}
</script>
<style>
a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  
a:hover {color: blue; text-decoration:underline;} /*访问过后的样式*/ 
  
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
</style>