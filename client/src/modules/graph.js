
const graph = {
    namespaced: true,
    state: {
      nodes: [],
      links: []
    },
    mutations: {
      update(state, obj) {
        state.nodes = obj.nodes
        state.links = obj.links
      }
    },
    getters: {
      nodes(state) {return state.nodes},
      links(state) {return state.links}
    }
  }
  
  export default graph