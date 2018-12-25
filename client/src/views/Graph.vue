<template>
    <div>
        <div class="scrollX">
            <GraphField
                :nodes="nodes" 
                :links="links"
                @addNode="add"
                @resetSelection="reset"
                @updateLinkLocation="updateLinkLocation"
                @removeLink="removeLink"
                @selectNode="selectNode"
                @updateNodeLocation="updateNodeLocation"
                @toggleNodeSelect="toggleNodeSelect"
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
        reset(item) {
            this.$store.commit('graph/resetSelection', item)
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
        selectNode(id) {
            this.$store.commit('graph/select', id)
        },
        toggleNodeSelect() {
            this.$store.commit('graph/toggleSelect')
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