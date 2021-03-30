<template>
  <div id="app">
    <TopNav v-if="!$route.metahideHead"></TopNav>
    <Play :musicList="musicList" :playMusice="playMusice" @play="changeMusic" v-if="playMusice"></Play>
    <transition
      enter-active-class="animate_animated animate__backInDown"
      leave-active-class="animate_animated animate__backOutDown"
    >
      <router-view @play="playMusic"></router-view>
    </transition>
    
  </div>
</template>

<script>
import TopNav from '@/components/TopNav';
import Play from '@/components/Play';
export default {
  data(){
    return {
      musicID: null,
      playMusice: null,
      musicList: [],

    }
  },
  components:{
    TopNav,
    Play,
  },
  methods:{
    changeMusic(e){
      this.playMusice = e;
    },
    playMusic(musice){
      // this.musicID = e;
      console.log(musice);
      if(!musice.picUrl){
        if(musice.al&&musice.al.picUrl){
          musice.picUrl = musice.al.picUrl;
        }else{
          musice.picUrl = 'http://p1.music.126.net/0QYCXHgm_WUT6Qc5haI7EQ==/109951165813544165.jpg';
        }
      }
      if(musice.song&&musice.song.artists){
        musice.artists = musice.song.artists;
      }
      this.playMusice = musice;
      this.musicList.push(musice);
      let exit = false;
      for(let i = 0; i<this.musicList.length;i++){
        if(this.musicList[i].id == musice.id){
          exit = true;
          break;
        }
      }
      if(!exit){
        this.musicList.push(musice);
        console.log(this.musicList);
      }
    }
  }
}
</script>

<style>
body{
  /* position: fixed;
  height: auto;
  width: 100%; */
}
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#app{
  padding-top: 30px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
