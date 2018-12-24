<template>
    <div>
        <button class="button" @click="add">追加</button>
        <div class="scrollX">
        <svg width="2000" height="1000" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="2000" height="1000" fill="white"/>
            <path
                :d="`M${item.point1.x} ${item.point1.y} Q ${(item.point1.x + item.point2.x) * 0.5 + (item.point1.x - item.point2.x < 0 ? 1 : -1) * 50} ${(item.point1.y + item.point2.y) * 0.5 + (item.point1.y - item.point2.y < 0 ? 1 : -1) * 50} ${item.point2.x} ${item.point2.y}`"
                stroke="#ffeaa7"
                stroke-width="3"
                fill="none"
                v-for="item in links" 
                :key="item.id"/>
            <Node
                :id ="item.id"
                :point = "item.point"
                :selected = "item.selected"
                v-for="item in nodes"
                :key="item.id"/>
        </svg>
        </div>
    </div>
</template>
<script>
import Node from '@/components/Node'
export default {
    components: {
        Node
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
        }
    }
}
</script>
<style scoped>

</style>