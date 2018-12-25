<template>
    <svg>
        <g v-if="selected">
            <text :x="x+5" :y="y+82" font-size="20" class="button" fill="#00b894">編集</text>
        </g>
        <g v-if="selected">
            <text :x="x+5" :y="y-13" font-size="20" class="button" fill="#00b894" stroke="none" @click="toggleSelect">リンク</text>
            <text :x="x+65" :y="y+82" font-size="20" class="button" fill="red" @click="remove">削除</text>
        </g>
        <g v-if="createLinkMode && !selected">
            <text :x="x+5" :y="y-13" font-size="20" class="button" fill="red" @click="commitDest">選択</text>
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
            y: this.point.y
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
            this.$emit("select", this.id)

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
                this.$emit('updateLocation', {
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
            this.$emit('toggleSelect')
        },
        commitDest(e) {
            this.$emit('commitDest', this.id)
        },
        remove(e) {
            this.$emit('remove', this.id)
        }
    }
}
</script>