<template>
  <div class="songList">
    <p style="padding-left: 10px; font-size: 16px;">搜索结果：</p>
    <template v-if="songs.length!=0">
      <div v-for="(item) in songs" :key="item.id" class="item">
        <div class="wrap">
          <div class="left">
            <h5 v-html="$options.filters.highlight(item.name,keywords)"></h5>
            <p>
              <i v-show="item.song&&item.song.privilege&&item.privilege.playMaxbr == 999000" class="sq"></i>
              <span v-if="item.artists">{{ item.artists[0].name}}</span>
            </p>
          </div>
          <div class="right"><span @click="$emit('play',item)" class="playBtn"></span></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  props: ['keywords'],
  data() {
    return {
      songs: [],
    };
  },
  filters: {
    addZero(val) {
      return val < 10 ? +val : val;
    },
    highlight(value,keywords){
      let str = String(value).replace(keywords,'<span style="color:red">' + keywords + '</span>');
      return str;
    }
  },
  created() {
    this.$http.get('/search',{
      params:{
        keywords: this.keywords,
      }
    }).then(d=>{
      this.songs = d.data.result.songs;
      console.log(this.songs);
    });
  },
};
</script>

<style lang="less" scoped>
.item {
  width: 90%;
  color: #333;
  margin: 0px auto;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  .num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    font-size: 17px;
    margin-left: -10px;
    color: #999;
    &.active {
      color: #31c27c;
    }
  }
  .wrap {
    display: flex;
    flex: 1;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .left {
      padding: 6px 0;
      flex: 1;
      h5 {
        font-size: 17px;
        .alias {
          color: #888;
          margin-left: 4px;
        }
      }
      p {
        font-size: 12px;
        color: #888;
        .sq {
          display: inline-block;
          width: 12px;
          height: 8px;
          margin-right: 4px;
          background: url(../assets/index_icon_2x.png) no-repeat;
          background-size: 166px 97px;
        }
      }
    }
    .right {
      display: flex;
      padding: 0 10px;
      align-items: center;
      span {
        display: block;
        background: url(../assets/index_icon_2x.png) no-repeat;
        background-size: 166px 97px;
        display: inline-block;
        width: 22px;
        height: 22px;
        background-position: -24px 0;
      }
    }
  }
}
</style>
