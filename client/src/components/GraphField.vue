<template>
    <div>
        <button class="button" @click="add">追加</button>
        <button class="button" @click="reset">選択解除</button>
        <div class="scrollX">
        <svg width="2000" height="1000" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="2000" height="1000" fill="white"/>
            <Link
                :link="item"
                v-for="item in links"
                :key="item.id"
                @updateLocation="updateLinkLocation"
                @remove="removeLink"/>
            <Node
                :id ="item.id"
                :point = "item.point"
                :selected = "item.selected"
                v-for="item in nodes"
                :key="item.id"
                @select="selectNode"
                @updateLocation="updateNodeLocation"
                @toggleSelect="toggleNodeSelect"
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
        nodes: Array,
        links: Array
    },
    components: {
        Node,
        Link
    },
    methods: {
        add(item) {
            this.$emit('addNode')
        },
        reset(item) {
            this.$emit('resetSelection', item)
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
            this.$emit('selectNode', id)
        },
        toggleNodeSelect() {
            this.$emit('toggleNodeSelect')
        },
        commitDest(id) {
            this.$emit('commitDest', id)
        },
        removeNode(id) {
            this.$emit('removeNode', id)
        }
    }
}
</script>
<style scoped>

</style>