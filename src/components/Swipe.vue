<template>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <!-- <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item> -->
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload, {
    lazyComponent: true,
});
export default {
    // name: Swipe,
    data() {
        return {
            images: [
                'https://6875-huangsihao-ax48l-1302513604.tcb.qcloud.la/banners/%E4%B8%8A%E6%B5%B702.jpg?sign=3a6c373695b91eef84c7f4d8e613ff38&t=1616583478',
                'https://6875-huangsihao-ax48l-1302513604.tcb.qcloud.la/banners/%E5%8C%97%E4%BA%AC.jpg?sign=7a0826ad27928f6e045d6948209b2454&t=1616583504',
                'https://6875-huangsihao-ax48l-1302513604.tcb.qcloud.la/banners/%E6%B7%B1%E5%9C%B3.jpg?sign=5f38970e668686637a4f74eec717943e&t=1616583513',
            ],
        };
    },
}
</script>

<style>
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        /* background-color: #31C27C; */
        background-color: transparent;
        height: 200px;
    }
    .van-swipe-item img{
        width: 100%;
        height: 100%;
    }
</style>