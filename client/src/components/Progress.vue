<template>
  <div>
    <img v-if="show" src="@/assets/ajax-loader.gif">
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean
  }
}
</script>
<style scoped>
* {
  margin: 0 auto;
}
</style>
