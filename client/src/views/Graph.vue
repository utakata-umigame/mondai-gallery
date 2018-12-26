<template>
    <div>
        <button v-if="!editable" @click="editable=true" class="button">編集モード</button>
        <GraphField
            :width="2000"
            :height="1000"
            :nodes="nodes" 
            :links="links"
            linkColor="#ffeaa7"
            :editable="editable"
            @changed="changed">
        </GraphField>
    </div>
</template>
<script>
import GraphField from '@/components/GraphField'
export default {
    components: {
        GraphField
    },
    computed: {
        nodes() {
            return this.$store.state.graph.nodes
        },
        links() {
            return this.$store.state.graph.links
        }
    },
    data() {
        return {
            editable: false
        }
    },
    methods: {
        changed(obj) {
          this.$store.commit('graph/update', obj)
          this.$nextTick(() => {
            this.editable = false
          })
        }
    }
}
</script>
<style scoped>

</style>