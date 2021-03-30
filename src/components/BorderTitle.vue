<template>
  <h2 class="borderTitle"><slot></slot></h2>
</template>
<script>
export default {
  
};
</script>
<style lang="less" scoped>
.borderTitle {
  position: relative;
  padding-left: 20px;
  margin: 14px 0;
  font-size: 17px;
  height: 20px;
  line-height: 20px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -9px;
    margin-left: 9px;
    width: 2px;
    height: 16px;
    background: #31C27C;
  }
}
</style>
