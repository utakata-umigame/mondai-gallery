<template>
  <router-link class="panel-block" :to="url(item.id)">
    <b-tooltip
      class="fill"
      type="is-info"
      :label="item.description | truncate"
      position="is-top"
      size="is-large"
      multilined
      square>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <b-icon type="is-info" icon="format-list-bulleted"></b-icon>
            <strong>{{ item.name }}</strong>
            <b-icon icon="lock" v-if="item.private"></b-icon>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span>{{item.editor.nickname}}</span>
          </div>
        </div>
      </div>
    </b-tooltip>
  </router-link>
</template>
<script>
export default {
  props: {
    item: {
      id: Number,
      name: String,
      fromMyMondais: Boolean,
      private: Boolean,
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
