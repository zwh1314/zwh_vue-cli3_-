<template>
  <div id="app">
    <!--  
    <div id="nav">
    <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/my_classtable_already">My_Classtable_Already</router-link> |
      <router-link to="/my_classtable_ready">My_Classtable_Ready</router-link> |
      <router-link to="/select_sourse">Select_Sourse</router-link> |
      <router-link to="/student_inf">Student_inf</router-link> |
      <router-link to="/grade_table">Grade_table</router-link>
    </div>
    -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
*{
  margin:0;
  padding:0;
  border:0;
}
</style>
