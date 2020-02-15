import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	student_id:"10185101111",
	user_name:"张文瀚",
	if_lose_trust: "有失信记录",
	Course_Inf:{},
  },//全局变量值
  mutations: {
	change(state,value){
		if(value == 0)
		this.state.if_lose_trust="无失信记录";
	},
	check_course_inf(state,value){
		state.Course_Inf=value;
	}
  },//全局函数
  actions: {
  },
  modules: {
  }
})
