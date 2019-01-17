<template>
  <div>
    <diagram-editor v-model="graph" />
  </div>
</template>

<script>
import { DiagramEditor } from "diagram-vue";
import "diagram-vue/dist/diagram.css"
export default {
  name: "app",
  components: {
    DiagramEditor
  },
  data() {
    return {
      graph: {
        width: 1000,
        height: 1000,
        background: "#ffffff",
        nodes: [],
        links: []
      }
    };
  }
};
</script>

<style scoped>
</style>
