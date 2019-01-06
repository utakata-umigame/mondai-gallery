<template>
  <div>
    <VButton v-if="!editable" @click="editable = true" class="button">Edit</VButton>
    <span v-else>
      <VButton @click="openModal" class="button">New Node</VButton>
      <VButton @click="endEdit" class="button">End</VButton>
    </span>
    <VButton @click="openInputModal" class="button">import/export</VButton>
    <EditNodeModal
      :node="{ content: {} }"
      :isActive="isModalActive"
      @ok="addNode"
      @cancel="cancel"
    />
    <EditNodeModal
      :node="tmpNode"
      :isActive="isEditModalActive"
      @ok="editNode"
      @cancel="cancel"
    />
    <InputModal
      :text="json"
      :isActive="isInputModalActive"
      @ok="importData"
      @cancel="cancel"
    />
    <Diagram
      :width="2000"
      :height="1000"
      :nodes="nodes"
      :links="links"
      background="#fafafa"
      :editable="editable"
      :labels="{
        edit: 'Edit',
        remove: 'Remove',
        link: 'New Link',
        select: 'Select'
      }"
      @editNode="openEdit"
      @nodeChanged="nodeChanged"
      @linkChanged="linkChanged"
    >
    </Diagram>
  </div>
</template>

<script>
import Diagram from "diagram-vue";
import EditNodeModal from "@/components/EditNodeModal";
import InputModal from "@/components/InputModal";
import VButton from "@/components/VButton";
export default {
  name: "app",
  components: {
    Diagram,
    EditNodeModal,
    InputModal,
    VButton
  },
  data() {
    return {
      name: "",
      url: "",
      color: "",
      json: "",
      isModalActive: false,
      isEditModalActive: false,
      isInputModalActive: false,
      editable: false,
      tmpNode: {
        id: "",
        content: {
          text: "",
          url: "",
          color: ""
        }
      }
    };
  },
  computed: {
    nodes() {
        return this.$store.state.graph.nodes
    },
    links() {
        return this.$store.state.graph.links
    }
  },
  methods: {
    openModal() {
      this.isModalActive = true;
    },
    cancel() {
      this.isModalActive = false;
      this.isEditModalActive = false;
      this.isInputModalActive = false;
    },
    addNode(item) {
      this.$store.commit('graph/addNode', item);
      this.isModalActive = false;
    },
    openEdit(item) {
      this.tmpNode.id = item.id;
      this.tmpNode.content.text = item.content.text;
      this.tmpNode.content.url = item.content.url;
      this.tmpNode.content.color = item.content.color;
      this.isModalActive = false;
      this.isEditModalActive = true;
    },
    editNode(item) {
      this.$store.commit('graph/editNode', item)
      this.isEditModalActive = false;
    },
    endEdit() {
      this.editable = false;
    },
    nodeChanged(obj) {
      this.$store.commit('graph/nodeChanged', obj)
    },
    linkChanged(obj) {
      this.$store.commit('graph/linkChanged', obj)
    },
    openInputModal() {
      this.isInputModalActive = true;
      this.json = JSON.stringify({
        nodes: this.nodes,
        links: this.links
      });
    },
    importData(value) {
      const obj = JSON.parse(value.text);
      if (obj) {
        this.$store.commit('graph/nodeChanged', obj);
        this.$store.commit('graph/linkChanged', obj);
        this.isInputModalActive = false;
      }
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
