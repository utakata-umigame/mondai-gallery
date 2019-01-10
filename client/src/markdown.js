import marked from "marked"
export default {
    methods: {
        renderMarkdown(md) {
            return marked(md, {sanitize: true});
        }
    }
}