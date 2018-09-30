<template>
  <router-link class="panel-block" :to="url(item.id)">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <strong>{{ item.name }}</strong>
          <small class="is-6">リスト作成者：&ensp;{{item.editor.nickname}}</small>
        </div>
      </div>
      <div class="level-right">
        <b-tag class='is-primary level-item' v-if='item.fromMyMondais'>自作問題のみ</b-tag>
        <span class="level-item">{{item.updateDate}}</span>
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
strong {
  margin-right: 5px;
}
</style>
