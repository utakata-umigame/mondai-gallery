<template>
    <div>
        <div class="scrollX">
            <GraphField
                :width="2000"
                :height="1000"
                :nodes="nodes" 
                :links="links"
                @addNode="add"
                @updateLinkLocation="updateLinkLocation"
                @removeLink="removeLink"
                @updateNodeLocation="updateNodeLocation"
                @commitDest="commitDest"
                @removeNode="removeNode"/>
        </div>
    </div>
</template>
<script>
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
        add(item) {
            this.$store.commit('graph/add')
        },
        updateLinkLocation(obj) {
            this.$store.commit('graph/updateLinkLocation', {
                id: obj.id, 
                x: obj.x,
                y: obj.y
            })
        },
        removeLink(id) {
            this.$store.commit('graph/removeLink', id)
        },
        updateNodeLocation(obj) {
            this.$store.commit('graph/updateLocation', {
                id: obj.id, 
                x: obj.x,
                y: obj.y
            })
        },
        commitDest(id) {
            this.$store.commit('graph/commitDest', id)
        },
        removeNode(id) {
            this.$store.commit('graph/removeNode', id)
        }
    }
}
</script>
<style scoped>

</style>