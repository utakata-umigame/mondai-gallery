<template>
  <router-link class="panel-block" :to="url(item.id)">
    <div class="level">
      <div class="level-left">
        <span class="level-item">
          {{ item.name }}
          <small>リスト作成者：{{item.editor.nickname}}</small>
        </span>
      </div>
      <div class="level-right">
        <b-tag class='is-primary level-item' v-if='item.fromMyMondais'>自作問題のみ</b-tag>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    item: {
      id: Number,
      name: String,
      fromMyMondais: Boolean,
      editor: {
        nickname: String
      }
    }
  },
  methods: {
    url: function (id) {
      return '/mondaiList/show/' + id
    }
  }
}
</script>
<style scoped>
.level {
  width: 100%;
}
</style>
