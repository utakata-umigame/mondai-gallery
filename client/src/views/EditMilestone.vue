<template>
  <div class="section">
    <h2 class="title"><span>マイルストーン</span><b-tag type="is-danger" size="is-medium">DEV</b-tag></h2>
    <p>この機能は開発段階です。</p>
    <button @click="add" class="button is-outlined is-primary mb"><b-icon icon="plus-circle"/><span>追加</span></button>
    <div class="tile is-ancestor">
      <div class="tile is-parent flex">
        <div class="tile is-4 is-child box notification" v-for="item in timeline">
          <b>イベント</b>
          <b-field>
            <b-input
              v-model="item.title"
              placeholder="タイトル"
              maxlength="50"
              required>
            </b-input>
          </b-field>
          <b>サイト</b>
          <b-field>
            <b-select placeholder="Select a site" v-model="item.site">
              <option v-for="item in site" :value="item.key" :key="item.key">{{item.value.name}}</option>
            </b-select>
          </b-field>
          <b>日付</b>
          <b-field>
            <b-datepicker
              v-model="item.date"
              placeholder="Type or select a date..."
              icon="calendar-today"
              required>
            </b-datepicker>
          </b-field>
          <b>内容</b>
          <b-field>
            <b-input
              v-model="item.description"
              type="textarea"
              rows="3"
              maxlength="200"
              placeholder="内容">
            </b-input>
          </b-field>
          <button class="delete is-danger" @click="remove(item)"></button>
        </div>
      </div>
    </div>
    <div class="buttons has-addons">
      <span @click="confirm" class="button is-success is-outlined"><b-icon icon="content-save"></b-icon>&ensp;保存して戻る</span>
      <span @click="confirmCancel" class="button is-danger is-outlined"><b-icon icon="close-circle"></b-icon>&ensp;キャンセル</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timeline: []
    }
  },
  computed: {
    siteName: function () {
      return this.$store.state.site
    },
    site: function () {
      let list = []
      for(let key in this.$store.state.site) {
        list.push({key: key, value: this.$store.state.site[key]})
      }
      list.push({key: 'other', value: {name: 'その他'}})
      return list
    }
  },
  mounted () {
    this.$http.get(this.$endPoint('/api/milestone/' + this.$route.params.id))
      .then(doc => {
        if (doc.data) {
          this.timeline = doc.data.timeline.map(x => {
            x.date = new Date(x.date)
            return x
          })
          this.sort()
        }
      })
  },
  methods: {
    sort () {
      this.timeline.sort((x, y) => {
        return y.date - x.date
      })
    },
    add () {
      this.timeline.push({
        title: 'マイルストーン',
        date: new Date(),
        site: '',
        description: ''
      })
    },
    remove (item) {
      this.timeline = this.timeline.filter(x => x !== item)
    },
    confirm () {
      this.$dialog.confirm({
        message: '元のバージョンは失われます。続行しますか?',
        onConfirm: this.submit
      })
    },
    submit () {
      this.$http.put(this.$endPoint('/api/milestone/' + this.$route.params.id), this.timeline)
        .then(res => {
          if (!res.data.error) {
            this.$toast.open({
              'type': 'is-success',
              'message': '保存しました。'
            })
            this.$router.go(-1)
          } else {
            this.$toast.open({
              'type': 'is-danger',
              'message':'編集権限がありません。'
            })
          }
        })
        .catch(err => {
          this.$toast.open({
            'type': 'is-danger',
            'message':'編集権限がありません。'
          })
        })
    },
    confirmCancel () {
      this.$dialog.confirm({
        message: '編集内容は失われます。続行しますか?',
        onConfirm: this.cancel
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.notification {
  background-color: white;
}
</style>
