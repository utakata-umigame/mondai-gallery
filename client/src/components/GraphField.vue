<template>
    <div>
        <div class="scrollX">
        <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="2000" height="1000" fill="white" @click="reset"/>
            <text :x="10" :y="25" font-size="20" class="button" fill="#00b894" @click="add">追加</text>
            <Link
                :link="item"
                v-for="item in links"
                :selected="item.id === selectedLink"
                :key="item.id"
                :source="findNode(item.source)"
                :destination="findNode(item.destination)"
                @select="selectLink"
                @updateLocation="updateLinkLocation"
                @remove="removeLink"/>
            <Node
                class="grab"
                :node="item"
                :selected = "item.id === selectedNode"
                v-for="item in nodes"
                :key="item.id"
                :createLinkMode="createLinkMode"
                @select="selectNode"
                @updateLocation="updateNodeLocation"
                @toggleSelect="toggleSrcSelect"
                @commitDest="commitDest"
                @remove="removeNode"/>
        </svg>
        </div>
    </div>
</template>
<script>
import Node from '@/components/Node'
import Link from '@/components/Link'
export default {
    props: {
        width: Number,
        height: Number,
        nodes: Array,
        links: Array
    },
    components: {
        Node,
        Link
    },
    data() {
        return {
            selectedNode: -1,
            selectedLink: -1,
            createLinkMode: false
        }
    },
    methods: {
        add(item) {
            this.$emit('addNode')
        },
        reset(item) {
            if(!this.createLinkMode) {
                this.selectedNode = -1
                this.selectedLink = -1
            }
        },
        updateLinkLocation(obj) {
            this.$emit('updateLinkLocation', obj)
        },
        findNode(id) {
            return this.nodes.find(x => x.id === id)
        },
        removeLink(id) {
            this.$emit('removeLink', id)
        },
        updateNodeLocation(obj) {
            this.$emit('updateNodeLocation', obj)
        },
        selectNode(id) {
            this.selectedNode = id
        },
        selectLink(id) {
            this.selectedLink = id
        },
        toggleSrcSelect() {
            this.createLinkMode = !this.createLinkMode
        },
        commitDest(id) {
            this.$emit('commitDest', {
                src: this.selectedNode,
                dest: id
            })
            this.createLinkMode = false
            this.selectedNode = -1
        },
        removeNode(id) {
            this.$emit('removeNode', id)
        }
    }
}
</script>
<style scoped>
.button {
    cursor: pointer;
}
.grab {
    cursor: grab;
}
</style>