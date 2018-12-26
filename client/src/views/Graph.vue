<template>
    <div>
        <div class="scrollX">
            <GraphField
                :width="2000"
                :height="1000"
                :nodes="nodes" 
                :links="links"
                @addNode="addNode"
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