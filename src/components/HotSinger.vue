<template>
    <div class="hotSinger">
        <div v-for="item in hotSingers" :key="item.id" class="artist">
            <img :src="item.picUrl" alt="">
            <div class="message">
                <p class="artistName">
                    {{item.name}}
                </p>
                <p class="artistSong">
                    歌曲数：{{item.musicSize}}
                </p>
                <p class="artistAlbum">
                    专辑数：{{item.albumSize}}
                </p>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotSinger',
    data(){
        return{
            hotSingers: [],
        }
    },
    created(){
        this.$http.get("/top/artists?offset=0&limit=9").then((d) => {
            // console.log(d);
            let artistName = [];
            console.log(d.data);
            for(let i =0; i<d.data.artists.length; i++){
                artistName.push(d.data.artists[i]);
                // console.log(artistName);
            }
            this.hotSingers = artistName;
            // console.log(this.hotSingers);
        });
    }
}
</script>

<style lang="less" scoped>
    ul,li{
        list-style: none;
        text-decoration: none;
    }
    .hotSinger{
        width: 95%;
        // height: 1000px;
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        .artist{
            width: 100%;
            // border: 1px solid black;
            flex: 1;
            display: flex;
            flex-direction: row;
            margin: 5px auto;
            img{
                width: 50%;
                height: 100%;
                flex: 1;
            }
            .message{
                flex: 1;
                display: flex;
                flex-direction: column;
                .artistName,.artistSong,.artistAlbum{
                    flex: 1;
                    text-decoration: none;
                    text-align: center;
                    font-size: 1rem;
                }
            }
        }
    }
</style>