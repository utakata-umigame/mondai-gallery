<template>
  <div class="has-background-white">
    <b-modal id="myModal" :active.sync="isModalActive" has-modal-card>
      <div class="modal-card">
        <div class="modal-card-body">
          <div>
            <b-field label="ラベル">
              <b-input  v-model="tmpNode.text" placeholder="ラベル"></b-input>
            </b-field>
            <b-field label="URL">
              <b-input v-model="tmpNode.url" placeholder="URL"></b-input>
            </b-field>
            <b-field label="色">
              <b-input v-model="tmpNode.color" placeholder="色"></b-input>
            </b-field>
          </div>
          <button class="button" type="button" @click="isModalActive = false">キャンセル</button>
          <button class="button is-primary" @click="confirm">追加</button>
        </div>
      </div>
    </b-modal>
    <b-modal id="editModal" :active.sync="isEditNodeModalActive" has-modal-card>
      <div class="modal-card">
        <div class="modal-card-body">
          <div>
            <b-field label="ラベル">
              <b-input  v-model="nextNode.text" placeholder="ラベル"></b-input>
            </b-field>
            <b-field label="URL">
              <b-input v-model="nextNode.url" placeholder="URL"></b-input>
            </b-field>
            <b-field label="色">
              <b-input v-model="nextNode.color" placeholder="色"></b-input>
            </b-field>
          </div>
          <button class="button" type="button" @click="isEditNodeModalActive = false">キャンセル</button>
          <button class="button is-primary" @click="confirmEditNode">編集</button>
        </div>
      </div>
    </b-modal>
    <b-modal id="linkModal" :active.sync="isEditLinkModalActive" has-modal-card>
      <div class="modal-card">
        <div class="modal-card-body">
          <div>
            <b-field label="色">
              <b-input v-model="nextLink.color" placeholder="例: #ffffff"></b-input>
            </b-field>
          </div>
          <button class="button" type="button" @click="isEditLinkModalActive = false">キャンセル</button>
          <button class="button is-primary" @click="confirmEditLink">編集</button>
        </div>
      </div>
    </b-modal>
    <div class="">
        <b-tabs v-model="activeTab" position="is-centered" @change="changed" expanded>
          <b-tab-item icon="account">
            <section class="section">
              <p class="subtitle">
                <img
                  :src="profile.picUrl"
                  v-if="profile.picUrl"
                  width="48"
                  height="48"
                  alt="No Image"
                >
                <b-icon size="is-medium" icon="account-box" :style="{'color': profile.color}" v-else/>
                {{profile.nickname}}
              </p>
              <b-field label="プロフィール画像">
                <b-input type="text" v-model="profile.picUrl" placeholder="画像のURL"></b-input>
              </b-field>
              <b-field label="テーマカラー(カラーコード)">
                <b-input type="text" v-model="profile.color" placeholder="例)#000"></b-input>
              </b-field>
              <b-input type="color" class="mb" v-model="profile.color"></b-input>
              <b-field label="自己紹介">
                <b-input type="textarea" v-model.trim="profile.bio" placeholder="自己紹介" :rows="6" :maxlength="2000"></b-input>
              </b-field>
            </section>
            <section class="section">
              <b-field label="ラテシンのID">
                <b-input
                  type="number"
                  v-model="profile.latethink"
                  placeholder=".../mondai/profile/[ID]"
                ></b-input>
              </b-field>
              <b-field label="CindyのID">
                <b-input type="number" v-model="profile.cindy" placeholder=".../profile/show/[ID]"></b-input>
              </b-field>
              <b-field label="R鯖のID">
                <b-input type="number" v-model="profile.R" placeholder=".../Mmail/userpage/[ID]"></b-input>
              </b-field>
              <b-field label="らてらて鯖のID">
                <b-input
                  type="number"
                  v-model="profile.latelate"
                  placeholder=".../mondai/profile/[ID]"
                ></b-input>
              </b-field>
              <b-field label="らてしんPROのID">
                <b-input type="number" v-model="profile.latePro" placeholder=".../users/profile/[ID]"></b-input>
              </b-field>
              <b-field label="TwitterのID">
                <b-input type="text" v-model="profile.twitter" placeholder=".../twitter.com/[ID]"></b-input>
              </b-field>
              <b-field label="GitHubのID">
                <b-input type="text" v-model="profile.github" placeholder=".../github.com/[ID]"></b-input>
              </b-field>
            </section>
          </b-tab-item>
          <b-tab-item icon="network">
            <b-field label="サイズ">
              <b-input type="number" placeholder="幅" v-model="profile.graph.width"></b-input>
              <b-input type="number" placeholder="高さ" v-model="profile.graph.height"></b-input>
            </b-field>
            <button @click="addNode" class="button">追加</button>
            <Diagram 
              :width="profile.graph.width || 1000"
              :height="profile.graph.height || 800"
              scale="1"
              background="#fafafa"
              :nodes="profile.graph.nodes"
              :links="profile.graph.links"
              :editable="true"
              :labels="{
                  edit: '編集',
                  remove: '削除',
                  link: 'リンク',
                  select: '選択'
              }"
              @editNode="editNode"
              @editLink="editLink"
              @nodeChanged="nodeChanged"
              @linkChanged="linkChanged" />
          </b-tab-item>
        </b-tabs>
      <div class="">
        <div class="buttons has-addons">
          <span class="button is-primary is-outlined" @click="submit">保存</span>
          <span class="button is-danger is-outlined" @click="$router.push('/mypage')">キャンセル</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Diagram, DiagramEditor } from "diagram-vue";
export default {
  components: {
    Diagram
  },
  mounted: function() {
    var vm = this;
    this.$http
      .get(this.$endPoint("/api/mypage"))
      .then(function(res) {
        if(res.data.error) return
        if(!res.data.graph) {
          res.data.graph = {
            nodes: [],
            links: []
          }
        }
        vm.profile = res.data;
      })
      .catch(function(error) {
        if (error) {
          vm.$toast.open({
            message: "エラー",
            type: "is-danger"
          });
        }
      });
  },
  data() {
    return {
      isModalActive: false,
      isEditNodeModalActive: false,
      isEditLinkModalActive: false,
      activeTab: 0,
      tmpNode: {
        text: "",
        url: "",
        color: ""
      },
      nextNode: {
        id: "",
        text: "",
        url: "",
        color: ""
      },
      nextLink: {
        id: "",
        color: ""
      },
      profile: {
        nickname: "",
        username: "",
        signup_date: "",
        bio: "",
        latethink: 0,
        cindy: 0,
        R: 0,
        latelate: 0,
        latePro: 0,
        twitter: "-",
        github: "",
        color: "#000000",
        picUrl: "",
        graph: {
          width: 1000,
          height: 800,
          nodes: [],
          links: []
        }
      }
    };
  },
  methods: {
    submit: function() {
      let vm = this;
      this.$http
        .post(this.$endPoint("/api/profile/edit"), this.profile)
        .catch(function(err) {
          if (err) {
            vm.$toast.open({
              message: "エラー",
              type: "is-danger"
            });
          }
        })
        .then(function() {
          vm.$router.push("/mypage");
        });
    },
    setTab(num) {
      this.$set(this, "activeTab", num);
    },
    generateID() {
      return (
        new Date().getTime().toString(16) +
        Math.floor(Math.random() * 1000000).toString(16)
      );
    },
    changed() {

    },
    addNode() {
      this.isModalActive = true;
    },
    confirm() {
      this.profile.graph.nodes.push({
        id: this.generateID(),
        content: {
          text: this.tmpNode.text,
          url: this.tmpNode.url,
          color: this.tmpNode.color
        },
        width: 150,
        height: 60,
        shape: "rectangle",
        point: {
          x: 10,
          y: 100 + Math.random() * 100
        }
      });
      this.isModalActive = false
      this.tmpNode = {
        text: "",
        url: "",
        color: ""
      }
    },
    confirmEditNode() {
      let node = this.profile.graph.nodes.find(x => x.id === this.nextNode.id);
      node.content.text = this.nextNode.text;
      node.content.url = this.nextNode.url;
      node.content.color = this.nextNode.color;
      this.isEditNodeModalActive = false;
    },
    confirmEditLink() {
      let link = this.profile.graph.links.find(x => x.id === this.nextLink.id);
      link.color = this.nextLink.color;
      this.isEditLinkModalActive = false;
    },
    editNode(item) {
      this.nextNode.id = item.id
      this.nextNode.text = item.content.text;
      this.nextNode.url = item.content.url;
      this.nextNode.color = item.content.color;
      this.isEditNodeModalActive = true;
    },
    editLink(item) {
      this.nextLink.id = item.id;
      this.nextLink.color = item.content.color;
      this.isEditLinkModalActive = true;
    },
    nodeChanged(obj) {
      this.profile.graph.nodes = obj.nodes;
    },
    linkChanged(obj) {
      this.profile.graph.links = obj.links;
    },
  }
};
</script>
<style scoped>
</style>
