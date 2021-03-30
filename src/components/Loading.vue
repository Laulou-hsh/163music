<template>
    <div class="loading">
        <i></i>加载更多
    </div>
</template>
<style lang="less" scoped>
    .loading{
        display: flex;
        justify-content: center;
        i{
            width: 3px;
            height: 30px;
            // margin-left: 5px;
            transform-origin: left bottom;
            background-color: #31C27C;
            animation: loading 2s 0.5s linear infinite;
            // border-radius: 50%;
            // border: 5px solid #31C27C;
        }
    }
    @keyframes loading {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>