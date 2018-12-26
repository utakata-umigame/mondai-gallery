<template>
    <div>
        <div class="scrollX">
        <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="2000" height="1000" fill="white" @click="reset"/>
            <text v-if="editable" :x="10" :y="65" font-size="20" class="button" fill="#00b894" @click="confirmChange">変更を確定</text>
            <Link
                :link="item"
                v-for="item in linkList"
                :selected="item.id === selectedLink"
                :key="item.id"
                :color="linkColor"
                :source="findNode(item.source)"
                :destination="findNode(item.destination)"
                :editable="editable"
                @select="selectLink"
                @updateLocation="updateLinkLocation"
                @remove="removeLink"/>
            <Node
                class="grab"
                :node="item"
                :selected = "item.id === selectedNode"
                v-for="item in nodeList"
                :key="item.id"
                :createLinkMode="createLinkMode"
                :editable="editable"
                @select="selectNode"
                @updateLocation="updateNodeLocation"
                @toggleSelect="toggleSrcSelect"
                @commitDest="commitDest"
                @remove="removeNode"/>
            <foreignObject v-if="editable" x=5 y=10 width=500 height=40>
                <div>
                    <input v-model="name" placeholder="name"/>
                    <input v-model="url" placeholder="url"/>
                    <input v-model="color" placeholder="color"/>
                    <button @click="addNode" class="button">追加</button>
                </div>
            </foreignObject>
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
        links: Array,
        editable: Boolean,
        linkColor: String
    },
    components: {
        Node,
        Link
    },
    data() {
        return {
            name: '',
            url: '',
            color: '',
            nodeList: this.nodes,
            linkList: this.links,
            selectedNode: -1,
            selectedLink: -1,
            createLinkMode: false
        }
    },
    methods: {
        generateID() {
            return new Date().getTime().toString(16)
                + Math.floor(Math.random() * 1000000).toString(16)
        },
        confirmChange() {
            this.$emit('changed', {
                nodes: this.nodeList,
                links: this.linkList
            })
        },
        addNode() {
            if(!this.editable) return
            this.nodeList.push({
                id: this.generateID(),
                content: {
                    text: this.name,
                    color: this.color,
                    url: this.url
                },
                width: 200,
                height: 60,
                point: {
                    x: 10,
                    y: 100 + Math.random() * 100
                }
            })
        },
        reset(item) {
            if(!this.createLinkMode) {
                this.selectedNode = -1
                this.selectedLink = -1
            }
        },
        updateLinkLocation(obj) {
            let item = this.linkList.find(x => x.id === obj.id)
            item.point.x = obj.x
            item.point.y = obj.y
        },
        findNode(id) {
            return this.nodes.find(x => x.id === id)
        },
        removeLink(id) {
            this.linkList = this.linkList.filter(x => x.id !== id)
        },
        updateNodeLocation(obj) {
            let item = this.nodeList.find(x => x.id === obj.id)
            item.point.x = obj.x
            item.point.y = obj.y
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
        let src = this.nodeList.find(x => x.id === this.selectedNode)
        let dest = this.nodeList.find(x => x.id === id)
        this.linkList.push({
          id: this.generateID(),
          source: this.selectedNode,
          destination: id,
          point: {
            x: (src.point.x + dest.point.x) * 0.5,
            y: (src.point.y + dest.point.y) * 0.5
          }
        })
        this.createLinkMode = false
        this.selectedNode = -1
        },
        removeNode(id) {
            this.nodeList = this.nodeList.filter(x => x.id !== id)
            this.linkList = this.linkList.filter(x => {
            return x.source !== id && x.destination !== id
            })
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