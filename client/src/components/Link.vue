<template>
    <svg>
        <g>
            <path
                :d="`M${point1.x} ${point1.y} Q ${point.x} ${point.y} ${point2.x} ${point2.y}`"
                stroke="#ffeaa7"
                stroke-width="5"
                fill="none"/>
            <line :x1="point1.x" :y1="point1.y" :x2="point.x" :y2="point.y" stroke="lightgray"/>
            <line :x1="point.x" :y1="point.y" :x2="point2.x" :y2="point2.y" stroke="lightgray"/>
            <ellipse
                :id ="id"
                :cx = "point.x"
                :cy = "point.y"
                rx = "10"
                ry = "10"
                fill="white"
                stroke="#ff7675"
                stroke-width="3"
                class="button"
                @click="selected ^= true"
                @mousedown="mousedown"
                @mousemove="mousemove"
                @mouseup="mouseup"/>
        </g>
        <g>
            <text
                :x="point.x-15"
                :y="point.y + 30"
                fill="#ff7675"
                @click="remove"
                v-if="selected"
                class="button">
                削除
            </text>
        </g>
    </svg>
</template>
<script>
export default {
    props: {
        link: {
            id: Number,
            source: Number,
            destination: Number, 
            point1: {
                x: Number,
                y: Number
            },
            point2: {
                x: Number,
                y: Number
            },
            point: {
                x: Number,
                y: Number
            }
        }
    },
    data() {
        return {
            selected: false,
            startPosition: null,
            cursorOffset: {
                x: 0,
                y: 0
            },
            id: this.link.id,
            source: this.link.source,
            destination: this.link.destination,
            point1: this.link.point1,
            point2: this.link.point2,
            point: this.link.point
        }
    },
    computed: {
        links() {
            return this.$store.state.graph.links
        }
    },
    methods: {
        mousedown(e) {
            this.cursorOffset.x = e.pageX;
            this.cursorOffset.y = e.pageY;
            this.startPosition = {x: this.point.x, y: this.point.y}
            //イベントを登録
            document.addEventListener("mousemove", this.mousemove)
            document.addEventListener("mouseup", this.mouseup)
        },
        mousemove(e) {
            if(this.startPosition){
                this.point.x = this.startPosition.x + (e.pageX - this.cursorOffset.x);
                this.point.y = this.startPosition.y + (e.pageY - this.cursorOffset.y);
                this.$emit('updateLocation', {
                    id: this.id, 
                    x: this.point.x,
                    y: this.point.y
                })
            }
        },
        mouseup(e) {
            this.startPosition = null
            //イベントの後始末
            document.removeEventListener("mousemove", this.mousemove)
            document.removeEventListener("mouseup", this.mouseup)
        },
        remove(e) {
            this.$emit('remove', this.id)
        }
    }
}
</script>
<style scoped>

</style>