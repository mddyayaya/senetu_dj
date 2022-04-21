<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  *{
    margin: 0;
    padding: 0 ;
    box-sizing: border-box;
    letter-spacing: 0.1vh;
  }
  html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
      background: url(~@/assets/bg.png) no-repeat;
      background-size: 100% 100%;
  }
  #app{
    width: 100%;
    height: 100%;
  }
</style>
