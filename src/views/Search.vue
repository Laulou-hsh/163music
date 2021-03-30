<template>
    <div class="search">
        <form @submit.prevent="searching">
          <div>
            <i class="iconsearch"></i>
            <input type="text" placeholder="搜索歌手，歌曲，专辑" v-model="keywords" @input="inputing">
          </div>
        </form>
        <component :is="componentName" :keywords="keywords" @search="searchChange" @play="$emit('play',$event)"></component>
    </div>
</template>

<script>
import HotSearch from '@/components/HotSearch';
import SearchSuggest from '@/components/SearchSuggest';
import SearchResult from '@/components/SearchResult';
export default {
  name: "Search",
  data(){
    return {
      componentName: 'HotSearch',
      keywords: '',
    }
  },
  components: {
    HotSearch,
    SearchSuggest,
    SearchResult,
  },
  methods: {
    inputing(e){
      if(e.target.value == ''){
        this.componentName = "HotSearch";
      }else{
        this.componentName = "SearchSuggest";
      }
    },
    searching(){
      this.componentName="SearchResult";
    },
    searchChange(e){
      console.log("search事件",e);
      this.keywords = e;
      this.componentName = "SearchResult";
    }
    
  }
};
</script>

<style lang="less" scoped>
  .search{
    form{
      padding: 10px;
      border-bottom: 2px solid rgba(0,0,0,0.1);
      margin-top: 10px;
      div{
        display: flex;
        height: 30px;
        border-radius: 30px;
        background-color: #ebecec;
        align-items: center;
        padding-left: 10px;
        border: 1px solid #42b983;
        background-color: transparent;
        i{
          &.iconsearch{
            width: 13px;
            height: 13px;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
          }
        }
        input{
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          padding-left: 10px;
        }
      }
    }
  }
</style>