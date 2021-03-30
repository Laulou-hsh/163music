<template>
    <div class="hotSearch">
        <p>热门搜索</p>
        <ul class="m-hotlist">
            <li v-for="(item,index) in hotSearchList" :key="index" class="item" @click="$emit('search',item.searchWord)">{{item.searchWord}}</li>
            <!-- <li v-for="(item,index) in hotSearchList" :key="index" class="item" @click="$emit('search',item.hots)">{{item.hots}}</li> -->
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            hotSearchList: [],
        }
    },
    created(){
        this.$http.get('/search/hot/detail').then(d=>{
            this.hotSearchList = d.data.data;
            // this.hotSearchList = d.data.result.hots;
            console.log(this.hotSearchList);
        });
    }
}
</script>

<style lang="less" scoped>
    .hotSearch{
        .m-hotlist{
            padding: 10px;
            list-style: none;
            .item{
                text-decoration: none;
                line-height: 45px;
                display: inline-block;
                height: 32px;
                margin-right: 8px;
                margin-bottom: 8px;
                padding: 0 14px;
                font-size: 14px;
                line-height: 32px;
                color: #333;
                border: 1px solid #d3d4da;
                border-radius: 32px;
                span{
                    display: inline-block;
                    padding-left: 7px;
                }
            }
        }
        p{
            padding: 10px;
        }
    }
</style>