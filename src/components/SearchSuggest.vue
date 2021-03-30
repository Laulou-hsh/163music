<template>
    <div class="searchSuggest">
        <ul>
            <p>猜你想搜索：</p>
            <li v-for="item in suggestList" :key="item.id" @click="$emit('search',item.name)">
                <!-- <i class="icon"></i> -->
                <span>{{item.name}}</span>
                <span v-if="item.artists">作者：{{ item.artists[0].name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['keywords'],
    created(){
        console.log('created==>',this.keywords);
        this.getSuggest(this.keywords);
    },
    data(){
        return{
            suggestList: [],
            isSuccess: true,
            t:null
        }
    },
    watch:{
        keywords(Newvalue){
            // console.log("keywords",Newvalue);
            this.getSuggest(Newvalue);
        }
    },
    methods:{
        getSuggest(keyword){
            // if(!this.isSuccess||keyword=='') return;
            clearTimeout(this.t)
            this.t = setTimeout(()=>{
                this.isSuccess = false;
                this.$http.get('/search/suggest',{
                    params: {
                        keywords: keyword,
                    }
                }).then(d=>{
                    var orders = d.data.result.order;
                    let result = [];
                    for(let i = 0; i<orders.length; i++){
                        result = result.concat(d.data.result[orders[i]]);
                    }
                    // console.log(d);
                    // console.log(d.data);
                    // console.log(d.data.result);
                    // console.log(d.data.result.order);
                    // console.log(orders);
                    this.suggestList = result;
                    this.isSuccess = true;
                }).catch(()=>{
                    this.suggestList = [];
                });
            },100)
            
        }
    }
}
</script>

<style lang="less" scoped>
    .searchSuggest{
        ul{
            display: flex;
            flex-direction: column;
            align-items: center;
            p{
                padding-left: 10px;
            }
            li{
                display: flex;
                list-style: none;
                text-decoration: none;
                border-bottom: 1px solid rgba(0,0,0,0.1);
                padding-left: 10px;
                width: 90%;
                height: 60px;
                align-items: center;
                .icon{
                    width: 13px;
                    height: 13px;
                    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
                    
                }
                span:first-child{
                    margin: 0px 5px;
                    padding-left: 10px;
                    flex: 7;
                }
                span:nth-child(2){
                    flex: 5;
                }
            }
        }
    }
</style>