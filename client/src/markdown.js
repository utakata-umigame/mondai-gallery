import marked from "marked"
export default {
    methods: {
        renderMarkdown(md) {
            if (md) {
                return marked(md, {sanitize: true});
            } else {
                return marked("プロフィールがありません。");
            }
        }
    }
}