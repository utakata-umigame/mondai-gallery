<template>
    <div>
        <b-field>
            <b-checkbox v-model="editable">編集モード</b-checkbox>
        </b-field>
        <button @click="addNode" class="button" v-if="editable">追加</button>
        <div class="scrollX">
            <GraphField
                :width="2000"
                :height="1000"
                :nodes="nodes" 
                :links="links"
                :editable="editable"
                @commitDest="commitDest"
                @removeLink="removeLink"
                @updateNodeLocation="updateNodeLocation"
                @updateLinkLocation="updateLinkLocation"
                @removeNode="removeNode"/>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import GraphField from '@/components/GraphField'
import Node from '@/components/Node'
import Link from '@/components/Link'
export default {
    components: {
        Node,
        Link,
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
        ...mapMutations({
            addNode: 'graph/add',
            updateLinkLocation: 'graph/updateLinkLocation',
            removeLink: 'graph/removeLink',
            updateNodeLocation: 'graph/updateNodeLocation',
            commitDest: 'graph/commitDest',
            removeNode: 'graph/removeNode'
        })
    }
}
</script>
<style scoped>

</style>