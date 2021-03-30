<template>
  <div class="songList">
    <div v-for="(item, index) in songs" :key="item.id" class="item"  @click.stop="$emit('play',item)">
      <div class="num" v-if="showNum" :class="{active:index<3}">
        {{ 9 > index ? "0" + (index+1) : index+1 }}
      </div>
      <div class="wrap">
        <div class="left">
          <h5>
            {{ item.name }}<span class="alias" v-if="item.song.alias.length"
              >({{ item.song.alias[0] }})</span
            >
          </h5>
          <p>
            <i v-show="item.song.privilege.playMaxbr == 999000" class="sq"></i
            >{{ item.song.artists | getArtists }} - {{ item.song.album.name }}
          </p>
        </div>
        <div class="right"><span class="playBtn" @click.stop="$emit('play',item)"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongList",
  props: {
    songs: Array,
    showNum: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    getArtists(val) {
      return val.map((item) => item.name).join(" / ");
    },
  },
};
</script>

<style lang="less" scoped>
.songList{
  margin: 0px auto 80px auto;
}
.item {
  color: #333;
  padding-left: 10px;
  display: flex;
  .num{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    font-size: 17px;
    margin-left: -10px;
    color: #999;
    &.active{
      color: #31C27C;
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