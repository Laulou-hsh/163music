<template>
  <div class="recommend">
    <Swipe></Swipe>
    <BorderTitle>推荐歌单</BorderTitle>
    <ul class="recommendList">
      <ImgListItem
        v-for="item in recommendList"
        :key="item.id"
        :item="item"
      ></ImgListItem>
    </ul>
    <Loading v-if="recommendList.length==0"></Loading>
    <BorderTitle>最新音乐</BorderTitle>
    <SongList :songs="newSongList" @play="$emit('play',$event)"></SongList>
    <BorderTitle>热门歌手TOP 10</BorderTitle>
    <HotSinger></HotSinger>
    <Loading v-if="newSongList.length==0"></Loading>
  </div>
</template>

<script>

import Swipe from '@/components/Swipe';
import BorderTitle from "@/components/BorderTitle";
import ImgListItem from "@/components/ImgListItem";
import SongList from "@/components/SongList";
import Loading from "@/components/Loading";
import HotSinger from "@/components/HotSinger";
export default {
  name: "Recommend",
  data() {
    return {
      recommendList: [],
      newSongList: [],
    };
  },
  created() {
    this.$http.get("/personalized").then((d) => {
      console.log(d);
      this.recommendList = d.data.result.slice(0, 6);
    });
    this.$http
      .get("/personalized/newsong", {
        params: {
          limit: 20,
        },
      })
      .then((d) => {
        console.log(d);
        this.newSongList = d.data.result;
      });
  },
  components: {
    Swipe,
    BorderTitle,
    ImgListItem,
    SongList,
    Loading,
    HotSinger,
  },
};
</script>
<style lang="less" scoped>
.recommend{
  padding: 0px 5px 100px 5px;
}
.recommendList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
