<template>
    <div>
        <button v-if="!editable" @click="editable=true" class="button">編集モード</button>
        <Diagram
            :width="2000"
            :height="1000"
            :nodes="nodes"
            :links="links"
            linkColor="#ffeaa7"
            :editable="editable"
            :labels="{
                edit: 'Edit',
                remove: 'Remove',
                link: 'Link',
                select: 'Select'
            }"
            @editNode="openEdit"
            @nodeChanged="nodeChanged"
            @linkChanged="linkChanged"
            >
        </Diagram>
    </div>
</template>
<script>
import Diagram from 'diagram-vue'
import { mapMutations } from 'vuex'
export default {
    components: {
        Diagram
    },
    computed: {
        nodes() {
            return this.$store.state.graph.nodes
        },
        links() {
            return this.$store.state.graph.links
        }
    },
    data() {
        return {
            editable: false
        }
    },
    methods: {
        ...mapMutations([
            openEdit,
            nodeChanged,
            linkChanged
        ])
    }
}
</script>
<style scoped>

</style>