import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import ('../views/Home.vue')
const About = () => import('../views/About.vue')
const My_Classtable_Already = () => import('../views/My_Classtable_Already.vue')
const My_Classtable_Ready = () => import('../views/My_Classtable_Ready.vue')
const Select_Course = () => import('../views/Select_Course.vue')
const Student_inf = () => import('../views/Student_inf.vue')
const Grade_table = () => import('../views/Grade_table.vue')
const Select_point_table = () => import('../views/Select_point_table.vue')
const Must_point_table = () => import('../views/Must_point_table.vue')
const Lose_trust = () => import('../views/Lose_trust.vue')
const Course_inf = () => import('../views/Course_inf.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
	path: '/my_classtable_already',
	name: 'my_classtable_already',
	component: My_Classtable_Already
  },
  {
	path: '/my_classtable_ready',
    name: 'my_classtable_ready',
    component: My_Classtable_Ready
  },
  {
	path: '/select_sourse',
	name: 'select_course',
	component: Select_Course
  },
  {
		path: '/student_inf',
		name: 'student_inf',
		component: Student_inf
  },
  {
		path: '/grade_table',
		name: 'grade_table',
		component: Grade_table
  },
  {
		path: '/select_point_table',
		name: 'select_point_table',
		component: Select_point_table
  },
  {
		path: '/must_point_table',
		name: 'must_point_table',
		component: Must_point_table
  },
  {
		path: '/lose_trust',
		name: 'lose_trust',
		component: Lose_trust
  },
  {
		path: '/course_inf',
		name: 'course_inf',
		component: Course_inf
  },
]

const router = new VueRouter({
  routes
})

export default router
