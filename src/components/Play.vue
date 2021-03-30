<template>
    <div class="playPage" :class="['playPage',{paused:paused}]" >
        <audio v-if="playMusice" autoplay controls :src="`https://music.163.com/song/media/outer/url?id=${playMusice.id}.mp3`" @timeupdate="timeupdate"
        @play="play"
        @pause="pause"
        @ended="playEnd"
        ref="player"
        ></audio>
        <div class="miniBar" v-if="playMusice" v-show="miniBarShow">
            <img :src="playMusice.picUrl" alt="" class="picUrl">
            <div class="songNameBox" @click="isFull=true,miniBarShow=false" >
                <p class="songName">{{playMusice.name}}-{{playMusice.artists[0].name}}</p>
            </div>
            <!-- 底部按钮 -->
            <!-- <van-row type="flex" justify="space-around" class="control_button"> -->
            <div class="control_button">
                <!-- 上一首 -->
                <div style="padding-top: 15px;"><div class="lastSong" @click="prevMusic"></div></div>
                <!-- 播放 -->
                <div class="play_pause">
                    <canvas width="50" height="50" ref="miniPlay"></canvas>
                    <div class="vantIcon" @click="togglePlay">
                        <van-icon name="play-circle-o" color="rgba(255,255,255,0.5)" v-if="!vantPause" size="40"/>
                        <van-icon name="pause-circle-o" color="rgba(255,255,255,0.5)" v-else size="40"/>
                    </div>
                </div>
                <!-- 下一首 -->
                <div style="padding-top: 15px;"><div class="nextSong" @click="nextMusic"></div></div>
            </div>
            <!-- <div class="lastSong vantIcon" @click="prevMusic"></div> -->
            <!-- <div>
                <canvas width="50" height="50" ref="miniPlay"></canvas>
                <div class="vantIcon" @click="togglePlay">
                    <van-icon name="play-circle-o" color="rgba(255,255,255,0.5)" v-if="!vantPause" size="40"/>
                    <van-icon name="pause-circle-o" color="rgba(255,255,255,0.5)" v-else size="40"/>
                </div>
            </div> -->
            <!-- <div class="nextSong vantIcon" @click="nextMusic"></div> -->
        </div>
        <transition 
            enter-active-class="animate__animated animate__slideInUp"
            leave-active-class="animate__animated animate__slideOutDown"
        >
            <!-- <v-touch v-on:swipedown="swiperdown" class="fullScreen" v-if="isFull" v-on:tap="showList=false" @touchmove.prevent> -->
            <v-touch v-on:swipedown="swiperdown" class="fullScreen" v-if="isFull" v-on:tap="swiperdown,showList=false" @touchmove.prevent>
                <div class="fullScreen_toBar">
                    <div class="back"  @click="isFull=false,miniBarShow=true"></div>
                    <p class="songName">{{playMusice.name}}</p>
                </div>
                
                <v-touch v-on:swipeleft="swiperleft" class="image">
                <!-- <v-touch  class="image"> -->
                    <img :src="playMusice.picUrl" @click="togglePlay" />
                </v-touch>
                <div class="control">
                    <!-- 进度条 -->
                    <div class="ranges_time">
                        <div class="current">{{cmin}} : {{csec}}</div>
                        <input type="range" max="100" v-model="timeRange" @change.stop="changeTime">
                        <div class="duration">{{endMin}} : {{endSec}}</div>
                    </div>
                    
                    <br>
                    <div class="control_box">
                        <!-- <button @click="prevMusic">上一曲</button> -->
                        <van-row type="flex" justify="space-between" class="boxTop">
                            <van-col span="4"><div class="circle vantIcon" @click="playMode='circle'"></div></van-col>
                            <van-col span="4"><div class="list vantIcon" @click="playMode='list'"></div></van-col>
                            <van-col span="4"><div class="random vantIcon" @click="playMode='rand'"></div></van-col>
                            <van-col span="4"><div class="showsList vantIcon" @click.stop="showList=true"></div></van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between" class="boxButtom">
                            <!-- 上一首 -->
                            <van-col span="6"><div class="lastSong vantIcon" @click="prevMusic"></div></van-col>
                            <!-- 播放 -->
                            <van-col span="6">
                                <div class="vantIcon" @click="togglePlay">
                                    <van-icon name="play-circle-o" color="rgba(255,255,255,1)" v-if="!vantPause" size="40"/>
                                    <van-icon name="pause-circle-o" color="rgba(255,255,255,1)" v-else size="40"/>
                                </div>
                            </van-col>
                            <van-col span="6"><div class="nextSong vantIcon" @click="nextMusic"></div></van-col>
                        </van-row>
                    </div>
                </div>
            </v-touch>
        </transition>
        
        <!---------------------- 歌词 -------------------------->
        <transition 
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__fadeOutRight"
        >
            <v-touch v-on:swiperight="swiperright" class="lyric" v-show="lyricShow" @touchmove.prevent >
                <transition 
                    enter-active-class="animate__animated animate__fadeInRight"
                    leave-active-class="animate__animated animate__fadeOutRight"
                >
                    
                    <div class="lrc_box"  >
                        <div class="lrc" v-for="(ly,index) in lyric" :key="index" >{{ly.lyric}}</div>
                    </div>
                </transition>
            </v-touch>
            <!-- <p v-for="item in musicList" :key="item.id">{{item.name}}</p> -->
        </transition>
        
        <!-- 播放列表 -->
        <transition 
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__fadeOutRight"
        >
            <v-touch v-on:swiperight="swiperright" class="showList" v-show="showList" @touchmove.prevent>
                <p v-for="item in musicList" :key="item.id" :style="{color:item.id==playMusice.id?'#42b983':''}" 
                @dblclick="$emit('play',item)" class="musicLists">
                    {{item.name}} - {{item.artists[0].name}}
                </p>
            </v-touch>
        </transition>
        
    </div>
</template>

<script>
import Vue from 'vue';
import { Col, Row } from 'vant';

Vue.use(Col);
Vue.use(Row);
export default {
    name: "Play",
    props: {
        playMusice:{
            type: Object,
            default: function(){
                return null;
            },
        },
        musicList: Array,
    },
    data(){
        return{
            // musicID: 0,
            paused: false,
            vantPause: true,
            isFull: false,
            lyric: [],
            timeRange: 0,
            duration: 0,
            playMode: 'ciecle',
            showList: false,
            miniBarShow: true,
            lyricShow: false,
            current: 0,
            cmin: 0,
            csec: 0,
            endMin: 0,
            endSec: 0, 
        }
    },
    created(){
        this.getLyric(this.playMusice.id);
    },
    watch: {
        playMusice(value){
            this.getLyric(value.id);
        },
        isFull(value){
            if(value){
                document.body.classList.add("dialog");
            }else{
                document.body.classList.remove("dialog");
            }
        }
    },
    methods:{
        getLyric(id){
            // 获取歌词
            this.$http.get('http://music.kele8.cn/lyric',{
                params: {id:id}
            })
            .then(d=>{
                let lyric = d.data.lrc.lyric;
                let lyricArray = lyric.split('\n');
                lyricArray.pop();
                let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
                let arr = [];
                for(let i = 0; i<lyricArray.length; i++){
                    let regex = new RegExp(reg);
                    if(regex.test(lyricArray[i])){
                        let item = {
                            time: parseInt(RegExp.$1)*60 + parseFloat(RegExp.$2),
                            lyric: RegExp.$3,
                        };
                        arr.push(item);
                    }
                }
                this.lyric = arr;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        pause(){
            //暂停
            this.paused = true;
        },
        play(){
            this.paused = false;
        },
        togglePlay(){
            let player = this.$refs.player;
            if(this.paused){
                // 播放
                player.play();
                this.vantPause = true;
            }else{
                // 暂停
                player.pause();
                this.vantPause = false;
            }
        },
        changeTime(e){
            let val = e.target.value;
            let player = this.$refs.player;
            // let ctime = ((val / 100)*this.$refs.player.duration);
            let ctime = ((val / 100)*this.duration);
            // console.log(e);
            // console.log(val);
            // console.log(ctime);
            // console.log(this.duration);
            player.currentTime =  ctime;
            let parseInt_ctime = parseInt(player.currentTime);
            console.log(parseInt_ctime);
        },
        timeupdate(e){
            let audio = e.target;
            // 获取当前播放事件
            let currentTime = audio.currentTime;
            // console.log(e);
            // console.log(audio);
            // console.log(currentTime);
            // 获取总播放时长
            let duration = audio.duration;
            // console.log(duration);
            let audioPaused = audio.paused;
            // console.log(audioPaused);
            // this.currentTime = currentTime;
            this.current = currentTime;
            this.duration = duration;

            let cTime = this.current;
            this.cmin = parseInt(cTime/60);
            this.csec = parseInt(cTime%60);
            // console.log(this.cmin);
            // console.log(this.csec);
            let endTime = this.duration;
            this.endMin = parseInt(endTime/60);
            this.endSec = parseInt(endTime%60);
            // console.log(currentTime);
            // console.log(this.endMin);
            console.log(this.endSec);

            this.drawCircle(currentTime,duration);
            if(currentTime == duration){
                this.vantPause = false;
            }else{
                if(audioPaused == true){
                    this.vantPause = false;
                }else{
                    this.vantPause = true;
                }
            }
            this.timeRange = (currentTime/duration)*100;
        },
        // 播放按钮进度
        drawCircle(currentTime,duration){
            let canvas = this.$refs.miniPlay;
            let context  = canvas.getContext('2d');
            context.clearRect(0,0,50,50);
            context.beginPath();
            context.strokeStyle = "rgba(0,0,0,0.5)";
            context.lineWidth = 4;
            context.arc(25,25,20,0,2*Math.PI);
            context.stroke();
            context.closePath();

            let arcP = (currentTime/duration)*2*Math.PI;
            context.beginPath();
            context.strokeStyle = "rgba(255,255,255,1)";
            context.lineWidth = 4;
            context.arc(25,25,20,-0.5*Math.PI,arcP-0.5*Math.PI);
            context.stroke();
            context.closePath();
        },
        prevMusic(){
            let playID = this.playMusice.id;
            let prevMusic = null;
            this.musicList.filter((d,index)=>{
                if(d.id == playID){
                    let i = --index;
                    if(i<0){
                        // 取到最后一曲
                        i = this.musicList.length-1;
                    }
                    prevMusic = this.musicList[i];
                }
            });
            this.$emit('play',prevMusic);
        },
        nextMusic(){
            let playID = this.playMusice.id;
            let nextMusic = null;
            this.musicList.filter((d,index)=>{
                if(d.id == playID){
                    let i = ++index;
                    if(i > this.musicList.length-1){
                        // 取到第一曲
                        i = 0;
                    }
                    nextMusic = this.musicList[i];
                }
            });
            this.$emit('play',nextMusic);
        },
        // 单曲循环
        playEnd(){
            if(this.playMode == 'circle'){
                this.$refs.player.play();
            }else if(this.playMode == 'rand'){
                let randIndex = Math.floor(Math.random()*this.musicList.length);
                let randMusic = this.musicList[randIndex];
                this.$emit('play', randMusic);
            }else{
                this.nextMusic();
            }
        },
        // 向下滑
        swiperdown: function () {
            this.isFull = false;
            this.showList = false;
            this.miniBarShow = true;
        },
        // 向右滑动
        swiperright: function(){
            this.showList = false;
            this.lyricShow = false;
            // console.log(this.lyricShow);
        },
        swiperleft: function(){
            this.lyricShow = true;
            // console.log(this.lyricShow);
        },
    }
}
</script>

<style lang="less" scoped>
    
    audio{
        width: 100%;
        margin: 0px auto;
        // position: relative;
        // bottom: -5px;
        outline: none;
        display: none;
    }
    // audio::-webkit-media-controls-enclosure {
    //     color: white;
    //     background: #31C27C;
    //     border-radius: 0px;
    // }
    // .media-controls-container,
    // .media-controls-container * {
    //     background: #FFF;
    //     border-radius: 0px;
    // }
    // audio::-webkit-media-controls-play-button {
    //     height: 22px;
    //     width: 22px;
    //     min-width: 22px;
    //     border-radius: 50%;
    //     flex-basis: 22px;
    //     color: #FFF;
    // }

    // 音量隐藏
    audio::-webkit-media-controls-volume-control-container {
        display: none;
    }

    // audio::-webkit-media-controls-current-time-display {
    //     order: 1; //设置弹性盒对象元素的顺序
    //     color: #FFF;
    //     text-shadow: unset;
    // }

    // audio::-webkit-media-controls-time-remaining-display {
    //     order: 2;
    //     color: #FFF;
    //     text-shadow: unset;
    // }
    .playPage{
        position: fixed;
        bottom: 0px;
        width: 100%;
        z-index: 9;
        padding: 0px;
        background-color: #31C27C;
        .miniBar{
            display: flex;
            align-items: center;
            height: 60px;
            animation-duration: 0.4s;
            animation-delay: 0.2s;
            .picUrl{
                width: 60px;
                height: 100%;
            }
            .songNameBox{
                width: 30vw;
                height: 100%;
                // border: 1px solid black;
                overflow: hidden;
                text-overflow: ellipsis;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0px 5px;
                .songName{
                    display: inline-block; 
                    white-space: nowrap;
                    animation: horizontal-move 2s linear infinite alternate;
                    transform: translate(-300px);
                }
                @keyframes horizontal-move {
                    0% {
                        transform: translate(100px);
                    }
                    100% {
                        transform: translate(calc(30px - 100%));
                    }
                }
            }
            .control_button{
                width: 160px;
                height: 100%;
                position: absolute;
                bottom: 0px;
                right: 0px;
                display: flex;
                .lastSong{
                    // border: 1px solid black;
                    width: 30px;
                    height: 30px;
                    margin-left: 15px;
                    background: url(../assets/before.svg) no-repeat;
                    background-size: contain;
                    flex: 1;
                }
                .play_pause{
                    width: 50px;
                    height: 50px;
                    position: relative;
                    flex: 1;
                    margin-left: 10px;
                    padding: 5px 0px 0px 0px;
                    // .btn::after{
                    //     width: 50px;
                    //     height: 50px;
                    //     left: 0;
                    //     line-height: 50px;
                    //     text-align: center;
                    //     top: 0px;
                    //     content: "暂停";
                    //     position: absolute;
                    // }
                    .vantIcon{
                        position: absolute;
                        left: 4px;
                        top: 10px;
                        line-height: 50px;
                        text-align: center;
                    }
                }
                .nextSong{
                    width: 30px;
                    height: 30px;
                    margin-left: 15px;
                    background: url(../assets/next.svg) no-repeat;
                    background-size: contain;
                    flex: 1;
                }
            }
            img{
                width: 40px;
                height: 40px;
                // border-radius: 50%;
                // animation: randImg 2s 0s linear infinite;
            }
            p{
                flex: 1;
                text-align: center;
            }
        }
        .fullScreen{
            position: fixed;
            height: 100vh;
            width: 100%;
            bottom: 0px;
            background-color: rgba(49,194,124,0.6);
            z-index: 10;
            text-align: center;
            animation-duration: 0.618s;
            .fullScreen_toBar{
                display: flex;
                width: 100vw;
                height: 5vh;
                border: 1px solid balck;
                padding: 10px 0px 0px 0px;
                .back{
                    width: 10%;
                    height: 100%;
                    background: url(../assets/返回.svg) no-repeat;
                    background-size: contain;
                    flex: 2;
                }
                .songName{
                    color: white;
                    font-size: 20px;
                    flex: 10;
                    margin-right: 15vw;
                }
            }
            .image{
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 20px auto;
                height: 50vh;
                img{
                    width: 90vw;
                    height: 100%;
                    // border-radius: 50%;
                    // animation:randImg 2s linear 0s infinite;
                    // filter: blur(8px);
                    // -webkit-filter: blur(0px);
                }
                
            }
            
            .control{
                display: flex;
                flex-direction: column;
                padding-top: 20px;
                .ranges_time{
                    display: flex;
                    align-items: center;
                    height: 10px;
                    .current{
                        flex: 2;
                        color: white;
                    }
                    // 进度条
                    input[type="range"]{
                        // width: 80vw;
                        height: 5px;
                        margin: 0px auto;
                        -webkit-appearance: none;
                        margin: 10px auto;
                        flex: 8;
                    }
                    input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        width: 15px;
                        height: 15px;
                        background-color: #42b983; 
                        border-radius: 50%;
                    } 
                    .duration{
                        flex: 2;
                        color: white;
                    }
                }
                .control_box{
                    padding: 10px 0px 0px 0px;
                    height: 30vh;
                    .boxTop{
                        height: 10vh;
                    }
                    .boxButtom{
                        padding-left: 20px;
                        height: 10vh;
                    }
                    .lastSong{
                        // border: 1px solid black;
                        background: url(../assets/before.svg) no-repeat;
                        background-size: contain;
                    }
                    .nextSong{
                        background: url(../assets/next.svg) no-repeat;
                        background-size: contain;
                    }
                    .circle{
                        background: url(../assets/单曲循环.svg) no-repeat;
                        background-size: contain;
                    }
                    .list{
                        background: url(../assets/listing.svg) no-repeat;
                        background-size: contain;
                    }
                    .random{
                        background: url(../assets/随机.svg) no-repeat;
                        background-size: contain;
                    }
                    .showsList{
                        background: url(../assets/list.svg) no-repeat;
                        background-size: contain;
                    }
                    .vantIcon{
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        margin: 0px auto;
                    }
                    
                }
            }
        }
        // 列表
        .showList{
            position: fixed;
            // 100vw =设备 100%宽度  100vh=设备 100%高度 
            height: 100vh;
            width: 80vw;
            overflow-y: auto;
            bottom: 0px;
            right: 0px;
            color: white;
            background-color: rgba(25, 25, 25, 0.6);
            backdrop-filter: blur( 10.0px );
            -webkit-backdrop-filter: blur( 10.0px );
            z-index: 10;
            text-align: center;
            animation-duration: 0.4s;
            display: flex;
            flex-direction: column;
            align-items: center;
            .musicLists{
                width: 70%;
                height: 5%;
                border-bottom: 1px solid gray;
                text-align: center;
                line-height: 30px;
                margin: 10px auto;
            }
        }
        // 歌词
        .lyric{
            height: 100vh;
            width: 100vw;
            position: fixed;
            // overflow: hidden;
            right: 0px;
            bottom: 0px;
            z-index: 11;
            color: white;
            text-align: center;
            background-color: rgba(25, 25, 25, 0.6);
            // box-shadow: 0 8px 32px 0 rgb(31 38 135 / 50%);
            backdrop-filter: blur( 10.0px );
            -webkit-backdrop-filter: blur( 10.0px );
            animation-duration: 0.4s;
            // overflow-y: auto;
            display: flex;
            align-items: center;
            // 歌词
            .lrc_box{
                width: 100vw;
                min-height: 50%;
                max-height: 60%;
                height: 100%;
                overflow: hidden;
                position: fixed; 
                overflow-y: auto;
                animation-delay: 0.1s;
                animation-duration: 0.4s;
            }
        }
    }
    // 全屏伪元素
    .fullScreen::after{
        content: "";
        width: 100vw;
        height: 100vh;
        background: rgba( 25, 25, 25, 0.6 );
        // box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.50 );
        backdrop-filter: blur( 10.0px );
        -webkit-backdrop-filter: blur( 10.0px );
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: -1;
    }
    .paused{
        .miniBar{
            img{
                animation-play-state: paused;
            }
        }
    }
    @keyframes randImg {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>