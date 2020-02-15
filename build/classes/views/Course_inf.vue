<template>
  <div class="about">
    <h1>课程信息</h1>
    <p>欢迎您，{{this.$store.state.user_name}}</p>
    <table border="1" class="Table">
    <tr>
    <th>课程名称</th>
    <th>授课教师</th>
    <th>学分</th>
    </tr>
    <tr>
    <td>{{course_name}}</td>
    <td>{{course_teacher}}</td>
    <td>{{course_point}}</td>
    </tr>
    </table>
  </div>
</template>
<script>

export default {
  name: 'course_inf',
  data () 
  {	
  return{
  }
  },
  computed:{
  course_name(){return this.$store.state.Course_Inf.course_name;},
  course_teacher(){return this.$store.state.Course_Inf.course_teacher;},
  course_point(){return this.$store.state.Course_Inf.course_point;},
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