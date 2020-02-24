<template>
  <div class="about" style="text-align: center;">
    <h1>个人信息</h1>
    <table style="margin:auto;table-layout: fixed;" border="1 solid #F00" width="100%" cellspacing="0" cellpadding="2">
		<tbody>
			<tr>
				<th colspan="4">个人信息</th>
			</tr>
			<tr>
				<td>姓名</td>
				<td colspan="2">{{this.$store.state.user_name}}</td>
				<td rowspan="4">
				<input type="file" >
				</td>
			</tr>
			<tr>
				<td>联系方式</td>
				<td colspan="2">{{Student.telephone}}</td>
				
			</tr>
			<tr>
				<td>一级学院</td>
				<td colspan="2">{{Student.department}}</td>

			</tr>
			<tr>
				<td>学号</td>
				<td colspan="2">{{this.$store.state.student_id}}</td>
			</tr>
			<tr>
				<td>性别</td>
				<td width="100">{{Student.sex}}</td>
				<td>结班时间</td>
				<td width="100">{{Student.end_time}}</td>
			</tr>
			<tr>
				<td>班级</td>
				<td width="100">{{Student.class_number}}</td>
				<td>入党状态</td>
				<td width="100">{{Student.party_status}}</td>
			</tr>
		</tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'student_inf',
  data () 
  {	
  return{
  Student:{
  telephone: "",
  department: "",
  sex: "",
  class_number: "",
  end_time: "",
  party_status: "",
  },
  }
  },
  created(){
  this.$axios.get("/getStudentUInfo", 
	{
		params:{
			id:this.$store.state.student_id,
		}
	})
	.then((res) => {
		//获取返回的课程链表List<Lesson>信息
		if(res.data.message == "success")
		this.Student=res.data;
	});
  },
}
</script>

<style>

</style>