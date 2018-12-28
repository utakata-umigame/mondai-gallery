
const graph = {
    namespaced: true,
    state: {
      nodes: [],
      links: []
    },
    mutations: {
      generateID(state) {
        return (
          new Date().getTime().toString(16) +
          Math.floor(Math.random() * 1000000).toString(16)
        );
      },
      addNode(state, item) {
        state.nodes.push({
          id: graph.mutations.generateID(state),
          content: {
            text: item.content.text,
            url: item.content.url,
            color: item.content.color
          },
          width: 150,
          height: 60,
          point: {
            x: 10,
            y: 100 + Math.random() * 100
          }
        });
        this.isModalActive = false;
      },
      editNode(state, item) {
        let tmp = state.nodes.find(x => x.id === item.id);
        tmp.content.text = item.content.text;
        tmp.content.url = item.content.url;
        tmp.content.color = item.content.color;
      },
      nodeChanged(state, obj) {
        state.nodes = obj.nodes;
      },
      linkChanged(state, obj) {
        state.links = obj.links;
      }
    },
    getters: {
      nodes(state) {return state.nodes},
      links(state) {return state.links}
    }
  }
  
  export default graph