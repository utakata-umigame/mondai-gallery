<template>
    <svg>
        <g v-if="selected">
            <rect
                :x="x + 100"
                :y="y"
                width="60"
                height="30"
                rx="5"
                ry="3"
                fill="#00b894">
            </rect>
            <text :x="x+105" :y="y+20" font-size="20" class="button" fill="white">編集</text>
        </g>
        <g v-if="selected">
            <rect
                :x="x + 100"
                :y="y + 32"
                width="60"
                height="30"
                rx="5"
                ry="3"
                fill="#00b894">
            </rect>
            <text :x="x+105" :y="y+52" font-size="20" class="button" fill="white" stroke="none" @click="toggleSelect">リンク</text>
        </g>
        <g v-if="createLinkMode">
            <rect
                :x="x + 100"
                :y="y + 32"
                width="60"
                height="30"
                rx="5"
                ry="3"
                fill="red">
            </rect>
            <text :x="x+105" :y="y+52" font-size="20" class="button" fill="white" stroke="none" @click="commitDest">選択</text>
        </g>
        <rect
            :x="x"
            :y="y"
            width ="100"
            height="60"
            rx="10"
            ry="6"
            fill="#dfe6e9"
            @mousedown="mousedown"
            @mousemove="mousemove"
            @mouseup="mouseup"/>
    </svg>
</template>
<script>
export default {
    props: {
        id: Number,
        point: {
            type: Object,
            default: {
                x: 0,
                y: 0
            }
        }
    },
    data() {
        return {
            startPosition: null,
            cursorOffset: {
                x: 0,
                y: 0
            },
            x: this.point.x,
            y: this.point.y,
            hover: false 
        }
    },
    computed: {
        selected() {
            return this.id === this.$store.state.graph.selected
        },
        createLinkMode() {
            return this.$store.state.graph.createLinkMode
        }
    },
    methods: {
        mousedown(e) {
            this.$store.commit('graph/select', {id: this.id})
            this.cursorOffset.x = e.pageX;
            this.cursorOffset.y = e.pageY;
            this.startPosition = {x: this.x, y: this.y}
            //イベントを登録
            document.addEventListener("mousemove", this.mousemove)
            document.addEventListener("mouseup", this.mouseup)
        },
        mousemove(e) {
            if(this.startPosition){
                this.x = this.startPosition.x + (e.pageX - this.cursorOffset.x);
                this.y = this.startPosition.y + (e.pageY - this.cursorOffset.y);
                this.$store.commit('graph/updateLocation', {
                    id: this.id, 
                    x: this.x,
                    y: this.y
                })
            }
        },
        mouseup(e) {
            this.startPosition = null
            //イベントの後始末
            document.removeEventListener("mousemove", this.mousemove)
            document.removeEventListener("mouseup", this.mouseup)
        },
        toggleSelect(e) {
            this.$store.commit('graph/toggleSelect')
        },
        commitDest(e) {
            this.$store.commit('graph/commitDest', {id: this.id})
        }
    }
}
</script>