<template>
  <ul class="topNav">
    <li>
      <router-link to="/recommend">
        <van-icon name="music-o" color="#31C27C"/>推荐音乐
      </router-link>
    </li>
    <li>
      <router-link to="/hot">
        <van-icon name="fire-o" color="#ee0a24" />热歌榜
      </router-link>
    </li>
    <li>
      <router-link to="/search">
        <van-icon name="search" color="#31C27C"/>搜索
      </router-link>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'vant';
import 'vant/lib/icon/local.css';

Vue.use(Icon);
export default {
  
}
</script>

<style lang="less" scoped>
.topNav {
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,.1);
  background: #fff;
  z-index: 9;
  li {
    flex: 1;
    height: 40px;
    text-align: center;
    a {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding: 0 5px;
      font-size: 15px;
      color: #333;
      &.router-link-exact-active {
        color: #31C27C;
        box-sizing: border-box;
        border-bottom: 2px solid #31C27C;
      }
    }
  }
}
</style>