<template>
  <div class="hot">
    <div class="top" v-if="playList">
      <div class="wrap">
        <div class="title"></div>
        <p>更新日期:{{ playList.updateTime | formateTime }}</p>
        <p class="desc">简介:{{ playList.description }}</p>
      </div>
    </div>
    <SongList @play="$emit('play',$event)" :songs="showList" :showNum="true"></SongList>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>


<script>
import SongList from "@/components/SongList";
import Loading from "@/components/Loading";
export default {
  name: "Hot",
  data() {
    return {
      playList: null,
      hotList: [],
      showList: [],
      showNumber: true,
      limit: 20,
      showLoading: true,
    };
  },
  components: {
    SongList,
    Loading,
  },
  created() {
    this.axios
      .get("/playlist/detail", {
        params: {
          id: 3778678,
        },
      })
      .then((d) => {
        this.playList = d.data.playlist;
        this.hotList = d.data.playlist.tracks.map((item, index) => {
          item.song = {
            artists: item.ar,
            privilege: {
              playMaxbr: d.data.privileges[index].playMaxbr,
            },
            album: item.al,
            alias: item.alia,
          };
          return item;
        });
        this.showList = this.hotList.slice(0, this.limit);
        this.showLoading = false;
        console.log(this.showList);
      });
  },
  methods: {
    loadMore(){
      this.showLoading = true;
      let num = this.showList.length + this.limit;
      this.showList = this.hotList.slice(0, num);
      this.showLoading = false;
    }
  },
  filters: {
    formateTime(val) {
      let d = new Date(val);
      return d.getMonth() + 1 + "月" + d.getDate() + "日";
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background: url(../assets/hot_music_bg_2x.jpg) no-repeat;
  background-size: contain;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    padding-left: 20px;
    box-sizing: border-box;
    .title {
      width: 142px;
      height: 67px;
      background: url(../assets/index_icon_2x.png) no-repeat;
      background-position: -24px -30px;
      background-size: 166px 97px;
    }
    p {
      margin-top: 10px;
      color: hsla(0, 0%, 100%, 0.8);
      font-size: 12px;
      transform: scale(0.91);
      transform-origin: left top;
    }
    .desc {
      position: absolute;
      left: 50%;
      line-height: 2;
    }
  }
}
</style>