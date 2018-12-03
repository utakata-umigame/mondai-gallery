<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/home">
            <span class="icon is-small is-primary">
              <b-icon icon="home"/>
            </span>
            <span>ホーム</span>
          </router-link>
        </li>
        <li class="is-active">
          <a href="#">
            <span class="icon is-small is-primary">
              <b-icon icon="format-list-bulleted"/>
            </span>
            <span>リストを追加</span>
          </a>
        </li>
      </ul>
    </nav>
    <b-tabs class="card" v-model="activeTab" position="is-centered" expanded>
      <b-tab-item label="リスト情報">
        <div>
          <b-field label="リスト名">
            <b-input v-model="mondaiList.name" type="text" placeholder="リスト名" maxlength="30"></b-input>
          </b-field>
          <img width="320" :src="picture[mondaiList.picture]">
          <b-field label="画像">
            <b-select v-model="mondaiList.picture">
              <option value="puzzle">パズル(デフォルト)</option>
              <option value="umigame">ウミガメ</option>
              <option value="yesno">Yes/No</option>
              <option value="question">>謎</option>
            </b-select>
          </b-field>
          <b-field label="リストの説明">
            <b-input
              v-model="mondaiList.description"
              placeholder="説明"
              type="textarea"
              maxlength="200"
            ></b-input>
          </b-field>
          <b-field label="タグをつける(10個まで)">
            <b-taginput
              v-model="mondaiList.tags"
              ellipsis
              maxtags="10"
              icon="label"
              placeholder="タグを追加"
            ></b-taginput>
          </b-field>
          <div class="field">
            <b-checkbox v-model="mondaiList.fromMyMondais">自作問題のみのリストの場合はチェック</b-checkbox>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="問題の追加/編集/削除">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <div class="buttons has-addons">
                <span
                  class="button is-primary is-outlined"
                  @click="isAddMondaiModalActive = true"
                  v-if="isSwitched === '個別編集'"
                >
                  <b-icon icon="plus-circle"></b-icon>&ensp;問題を追加
                </span>
                <span class="button is-primary is-outlined" @click="addEmpty()" v-else>
                  <b-icon icon="plus-circle"></b-icon>&ensp;空の問題を追加
                </span>
                <span class="button is-outlined is-primary" @click="activateJSONModal">
                  <b-icon icon="json"></b-icon>&ensp;JSONモード
                </span>
              </div>
            </div>
            <div class="level-item">
              <b-select v-model="isSwitched">
                <option value="個別編集">個別編集</option>
                <option value="一括編集">一括編集</option>
                <option value="テーブル">テーブル</option>
              </b-select>
            </div>
          </div>
        </div>
        <!-- 問題リスト -->
        <table class="table is-striped is-fullwidth" v-if="isSwitched === 'テーブル'">
          <thead>
            <tr>
              <th>サイト</th>
              <th>ジャンル</th>
              <th>ID</th>
              <th>タイトル</th>
              <th>作者</th>
              <th>コメント</th>
              <th>移動/削除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mondai in mondaiList.mondai">
              <th>
                <b-select v-model="mondai.site">
                  <option v-for="item in site" :value="item.key" :key="item.key">{{item.value.name}}</option>
                </b-select>
              </th>
              <td>
                <b-select v-model="mondai.genre">
                  <option v-for="item in genre" :value="item.key" :key="item.key">{{item.value}}</option>
                </b-select>
              </td>
              <td>
                <b-input class="mb" v-model="mondai.id" type="number" placeholder="ID"/>
              </td>
              <td>
                <b-input v-model="mondai.title" type="text" placeholder="タイトル" maxlength="100"/>
              </td>
              <td>
                <b-input v-model="mondai.author" type="text" placeholder="作者" maxlength="20"/>
              </td>
              <td>
                <b-input
                  v-model="mondai.description"
                  type="text"
                  maxlength="200"
                  placeholder="コメント"
                />
              </td>
              <td>
                <div class="column buttons has-addons">
                  <button class="button is-small is-outlined is-primary" @click="moveTop(mondai)">
                    <b-icon icon="arrow-collapse-up">一番上へ</b-icon>
                  </button>
                  <button class="button is-small is-outlined is-primary" @click="moveUp(mondai)">
                    <b-icon icon="arrow-up">上へ</b-icon>
                  </button>
                  <button class="button is-small is-outlined is-primary" @click="moveDown(mondai)">
                    <b-icon icon="arrow-down">下へ</b-icon>
                  </button>
                  <button
                    class="button is-small is-outlined is-primary"
                    @click="moveBottom(mondai)"
                  >
                    <b-icon icon="arrow-collapse-down">一番下へ</b-icon>
                  </button>
                  <button class="button is-small is-outlined is-danger" v-on:click="remove(mondai)">
                    <b-icon icon="minus-circle">削除</b-icon>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="panel" v-else>
          <div v-for="item in mondaiList.mondai" v-bind:key="item._id" class="panel-block">
            <div class="fill" v-if="isSwitched === '一括編集'">
              <div class="columns">
                <mondai-editor :mondai="item"></mondai-editor>
                <div class="column buttons has-addons">
                  <button class="button is-outlined is-primary" @click="moveTop(item)">
                    <b-icon icon="arrow-collapse-up">一番上へ</b-icon>
                  </button>
                  <button class="button is-outlined is-primary" @click="moveUp(item)">
                    <b-icon icon="arrow-up">上へ</b-icon>
                  </button>
                  <button class="button is-outlined is-primary" @click="moveDown(item)">
                    <b-icon icon="arrow-down">下へ</b-icon>
                  </button>
                  <button class="button is-outlined is-primary" @click="moveBottom(item)">
                    <b-icon icon="arrow-collapse-down">一番下へ</b-icon>
                  </button>
                  <button class="button is-outlined is-danger" v-on:click="remove(item)">
                    <b-icon icon="minus-circle">削除</b-icon>
                  </button>
                </div>
              </div>
            </div>
            <div :title="item.title" :sub-title="item.author" v-else>
              <mondai-view class="block" v-bind:item="item"></mondai-view>
              <div class="buttons has-addons">
                <button class="button is-outlined is-primary" @click="set(item)">
                  <b-icon icon="pencil">編集</b-icon>
                </button>
                <button class="button is-outlined is-primary" @click="moveTop(item)">
                  <b-icon icon="arrow-collapse-up">一番上へ</b-icon>
                </button>
                <button class="button is-outlined is-primary" @click="moveUp(item)">
                  <b-icon icon="arrow-up">上へ</b-icon>
                </button>
                <button class="button is-outlined is-primary" @click="moveDown(item)">
                  <b-icon icon="arrow-down">下へ</b-icon>
                </button>
                <button class="button is-outlined is-primary" @click="moveBottom(item)">
                  <b-icon icon="arrow-collapse-down">一番下へ</b-icon>
                </button>
                <button class="button is-outlined is-danger" v-on:click="remove(item)">
                  <b-icon icon="minus-circle">削除</b-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mb">
          <span
            class="button is-primary is-outlined"
            @click="isAddMondaiModalActive = true"
            v-if="isSwitched === '個別編集'"
          >
            <b-icon icon="plus-circle"></b-icon>&ensp;問題を追加
          </span>
          <span class="button is-primary is-outlined" @click="addEmpty()" v-else>
            <b-icon icon="plus-circle"></b-icon>&ensp;空の問題を追加
          </span>
        </div>
      </b-tab-item>
      <b-tab-item label="公開設定">
        <div class="field">
          <b-checkbox v-model="mondaiList.private">非公開にする場合はチェック</b-checkbox>
        </div>
        <div v-if="mondaiList.private">
          <p>閲覧を許可するユーザーを個別選択</p>
          <ul class="mb">
            <li
              class="panel-block"
              v-for="user in allUser"
              :key="user.id"
              v-if="user.id !== userInfo.id"
            >
              <b-checkbox v-model="mondaiList.accept" :native-value="user.id">{{user.nickname}}</b-checkbox>
            </li>
          </ul>
          <button class="button is-primary is-outlined" @click="mondaiList.accept=[]">すべてクリア</button>
        </div>
      </b-tab-item>
    </b-tabs>
    <div class>
      <div class="buttons has-addons">
        <span @click="confirm()" class="button is-success is-outlined">
          <b-icon icon="content-save"></b-icon>&ensp;リストを作成
        </span>
        <span @click="confirmCancel()" class="button is-danger is-outlined">
          <b-icon icon="close-circle"></b-icon>&ensp;キャンセル
        </span>
      </div>
    </div>
    <!--モーダルダイアログ-->
    <b-modal id="myModal" :active.sync="isAddMondaiModalActive" has-modal-card>
      <div class="modal-card">
        <div class="modal-card-body">
          <mondai-dialog :mondai="newMondai"></mondai-dialog>
          <button class="button" type="button" @click="isAddMondaiModalActive = false">キャンセル</button>
          <button class="button is-primary" @click="handleOk">追加</button>
        </div>
      </div>
    </b-modal>
    <b-modal id="editModal" :active.sync="isEditMondaiModalActive" has-modal-card>
      <div class="modal-card">
        <div class="modal-card-body">
          <mondai-dialog :mondai="newMondai"></mondai-dialog>
          <button class="button" type="button" @click="isEditMondaiModalActive = false">キャンセル</button>
          <button class="button is-primary" @click="handleEditOk">編集</button>
        </div>
      </div>
    </b-modal>
    <!-- JSONを読み込み -->
    <b-modal id="stringEditModal" :active.sync="isJSONModalActive">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">JSONを読み込み</p>
        </header>
        <section class="modal-card-body">
          <b-field label="コピーしたJSON文字列からリストを生成できます">
            <b-input
              type="textarea"
              v-model="mondaiJSON"
              class="form-control"
              placeholder="JSON"
              :rows="6"
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isJSONModalActive = false">キャンセル</button>
          <button class="button is-primary" @click="handleStringEditOk">読み込み</button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTab: 0,
      newMondai: {
        id: 0,
        title: "",
        author: "",
        site: "latethink",
        description: "",
        genre: "umigame"
      },
      tmpMondai: {},
      mondaiList: {
        name: "",
        fromMyMondais: false,
        editor: {
          id: 0,
          nickname: "",
          username: ""
        },
        tags: [],
        description: "",
        picture: "puzzle",
        private: false,
        mondai: [],
        accept: []
      },
      mondaiJSON: "[]",
      isAddMondaiModalActive: false,
      isEditMondaiModalActive: false,
      isJSONModalActive: false,
      isSwitched: "個別編集"
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
    picture() {
      return this.$store.state.picture;
    },
    site: function() {
      let list = [];
      for (let key in this.$store.state.site) {
        list.push({ key: key, value: this.$store.state.site[key] });
      }
      return list;
    },
    genre: function() {
      let list = [];
      for (let key in this.$store.state.genre) {
        list.push({ key: key, value: this.$store.state.genre[key] });
      }
      return list;
    },
    allUser() {
      let sorted = this.$store.state.allUser.sort((x, y) => y.id - x.id);
      return sorted;
    }
  },
  mounted: function() {
    this.$store.dispatch("fetchAllUser");
  },
  methods: {
    url: function(siteName, id) {
      let res = this.site[siteName].showUrl + id;
      return res;
    },
    isValidUrl: function(siteName) {
      if (this.$store.state.site[siteName]) return true;
      else return false;
    },
    remove: function(item) {
      this.mondaiList.mondai = this.mondaiList.mondai.filter(x => x !== item);
    },
    sort: function() {
      this.mondaiList.mondai.sort((x, y) => x._id - y._id);
    },
    moveTop: function(item) {
      item._id = -1;
      this.sort();
      for (let i = 0; i < this.mondaiList.mondai.length; i++) {
        this.mondaiList.mondai[i]._id = i + 1;
      }
    },
    moveBottom: function(item) {
      item._id = 9999;
      this.sort();
      for (let i = 0; i < this.mondaiList.mondai.length; i++) {
        this.mondaiList.mondai[i]._id = i + 1;
      }
    },
    moveUp: function(item) {
      for (let i = 0; i < this.mondaiList.mondai.length - 1; i++) {
        if (this.mondaiList.mondai[i + 1] === item) {
          let tmp = this.mondaiList.mondai[i]._id;
          this.mondaiList.mondai[i]._id = item._id;
          item._id = tmp;
        }
      }
      this.sort();
    },
    moveDown: function(item) {
      for (let i = 1; i <= this.mondaiList.mondai.length; i++) {
        if (this.mondaiList.mondai[i - 1] === item) {
          let tmp = this.mondaiList.mondai[i]._id;
          this.mondaiList.mondai[i]._id = item._id;
          item._id = tmp;
        }
      }
      this.sort();
    },
    addEmpty: function() {
      let id = 0;
      let end = false;
      while (!end) {
        end = true;
        id++;
        for (var key in this.mondaiList.mondai) {
          var item = this.mondaiList.mondai[key];
          if (item._id) {
            if (item._id === id) {
              end = false;
            }
          }
        }
      }
      this.mondaiList.mondai.push({
        id: 0,
        title: "",
        author: "",
        site: "latethink",
        description: "",
        genre: "umigame",
        _id: id
      });
      this.sort();
    },
    addMondai: function() {
      let id = 0;
      let end = false;
      while (!end) {
        end = true;
        id++;
        for (var key in this.mondaiList.mondai) {
          var item = this.mondaiList.mondai[key];
          if (item._id) {
            if (item._id === id) {
              end = false;
            }
          }
        }
      }
      this.newMondai._id = id;
      let obj = Object.assign({}, this.newMondai);
      this.mondaiList.mondai.push(obj);
      this.sort();
    },
    confirm: function() {
      this.$dialog.confirm({
        message: "リストを追加します。続行しますか?",
        onConfirm: this.submit
      });
    },
    submit: function() {
      let vm = this;
      let obj = Object.assign({}, this.mondaiList);
      this.$http
        .post(this.$endPoint("/api/add"), obj)
        .then(function(response) {
          let data = response.data;
          if (data.error) {
            vm.$toast.open({
              message: "ログインしてください",
              type: "is-danger"
            });
            vm.$router.push("/login");
          } else if (data.message) {
            vm.$router.push("/home");
          }
        })
        .catch(function(err) {
          if (!err) return;
          vm.$toast.open({
            message: "エラー",
            type: "is-danger"
          });
        });
    },
    confirmCancel: function() {
      this.$dialog.confirm({
        message: "未保存の編集は失われます。続行しますか?",
        onConfirm: this.cancel
      });
    },
    cancel: function() {
      this.$router.go(-1);
    },
    // eslint-disable-next-line
    handleOk: function(evt) {
      this.addMondai();
      this.newMondai = {
        id: 0,
        title: "",
        author: "",
        site: "latethink",
        description: "",
        genre: "umigame"
      };
      this.isAddMondaiModalActive = false;
    },
    // eslint-disable-next-line
    handleEditOk: function(evt) {
      this.mondaiList.mondai = this.mondaiList.mondai.filter(
        x => x !== this.tmpMondai
      );
      this.mondaiList.mondai.push(this.newMondai);
      this.sort();
      this.isEditMondaiModalActive = false;
    },
    activateJSONModal: function() {
      try {
        let res = JSON.stringify(this.mondaiList.mondai);
        this.mondaiJSON = res;
      } catch (err) {
        this.$toast.open({
          message: "エラー",
          type: "is-danger"
        });
      }
      this.isJSONModalActive = true;
    },
    // eslint-disable-next-line
    handleStringEditOk: function(evt) {
      try {
        let obj = JSON.parse(this.mondaiJSON);
        this.mondaiList.mondai = obj
          .filter(x => this.isValidUrl(x.site))
          .map(x => {
            return {
              id: x.id,
              title: x.title,
              author: x.author,
              site: x.site,
              description: x.description,
              genre: x.genre,
              _id: x._id
            };
          });
      } catch (err) {
        this.$toast.open({
          message: "エラー",
          type: "is-danger"
        });
      }
      this.isJSONModalActive = false;
    },
    set: function(item) {
      this.newMondai = Object.assign({}, item);
      this.tmpMondai = item;
      this.isEditMondaiModalActive = true;
    }
  }
};
</script>
