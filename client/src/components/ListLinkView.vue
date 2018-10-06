<template>
  <router-link class="panel-block" :to="url(item.id)">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <b-icon type="is-info" icon="format-list-bulleted"></b-icon>
          <strong>{{ item.name }}</strong>
        </div>
        <div class="level-item">
          <small>リスト作成者：&ensp;{{item.editor.nickname}}</small>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <b-tag class='is-primary mr' v-if='item.fromMyMondais'>自作問題のみ</b-tag>
          <span>{{item.updateDate}}</span>
        </div>
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
  margin:auto 5px;
}
.mr {
  margin-right: 5px;
}
</style>
