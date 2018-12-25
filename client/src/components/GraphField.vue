<template>
    <div>
        <button class="button" @click="add">追加</button>
        <div class="scrollX">
        <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="2000" height="1000" fill="white" @click="reset"/>
            <Link
                :link="item"
                v-for="item in links"
                :key="item.id"
                @updateLocation="updateLinkLocation"
                @remove="removeLink"/>
            <Node
                :id ="item.id"
                :point = "item.point"
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
            createLinkMode: false,
        }
    },
    methods: {
        add(item) {
            this.$emit('addNode')
        },
        reset(item) {
            if(!this.createLinkMode)
                this.selectedNode = -1
        },
        updateLinkLocation(obj) {
            this.$emit('updateLinkLocation', obj)
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

</style>