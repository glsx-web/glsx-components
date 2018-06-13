<template>
    <h1>
        <a :href="linkTo" :class="logoClass" :style="{ height: height +'px', width: width + 'px',background :background }">
        </a>
    </h1>
</template>

<script>
    export default {
      name: 'logo',
      props: {
        className: {
          type: String
        },
        linkTo: {
          type: String,
          default: '/'
        },
        width: {
          type: Number,
          default: 180
        },
        height: {
          type: Number,
          default: 50
        },
        background: {
          type: String,
          default: ''
        }
      },
      computed: {
        logoClass() {
          return this.className || 'logo'
        }
      }
    }
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  h1{
    margin: 0;
    position: fixed;
    border-bottom: 1px solid #414550;
    border-right: 1px solid #414550;
  }
  .logo{
    //background: $menuBg url('../../assets/logo.png') center center no-repeat ;
    background-size: 70% 70%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-indent: -9999px;
    display: block;
  }
  .logo:after{
    content: '';
    position: absolute;
    width: 80px;
    height: 100%;
    top: 0;
    overflow: hidden;
    z-index:9;
    /*背景渐变*/
    background: -moz-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.3) 50%,rgba(255,255,255,0) 100%);
    background: -webkit-gradient(linear,left top,right top,color-stop(0%,rgba(255,255,255,0)),color-stop(50%,rgba(255,255,255,.3)),color-stop(100%,rgba(255,255,255,0)));
    background: -webkit-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.3) 50%,rgba(255,255,255,0) 100%);
    background: -o-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.3)50%,rgba(255,255,255,0) 100%);
    background: linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.3) 50%,rgba(255,255,255,0) 100%);
    -webkit-transform: skewX(-25deg);/*倾斜*/
    -moz-transform: skewX(-25deg);
    transform: skewX(-25deg);
    animation: lightflow 15s linear infinite;
  }

  @keyframes lightflow {
    90%{
      left: -200px;  /*起始位置*/
    }
    100%{
      left: 200px; /*结束位置*/
    }
  }
</style>