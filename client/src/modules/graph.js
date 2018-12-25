import Vue from 'vue';

const graph = {
    namespaced: true,
    state: {
      nodeId: 0,
      linkId: 100000,
      nodes: [],
      links: []
    },
    mutations: {
      updateLocation(state, obj) {
        let item = state.nodes.find(x => x.id === obj.id)
        item.point.x = obj.x
        item.point.y = obj.y
        state.links.filter(x => x.source === obj.id).forEach(item => {
          item.point1.x = obj.x + 50
          item.point1.y = obj.y + 30
        })
        state.links.filter(x => x.destination === obj.id).forEach(item => {
          item.point2.x = obj.x + 50
          item.point2.y = obj.y + 30
        })
      },
      updateLinkLocation(state, obj) {
        let item = state.links.find(x => x.id === obj.id)
        item.point.x = obj.x
        item.point.y = obj.y
      },
      add(state) {
        state.nodes.push({
          id: state.nodeId++,
          point: {
              x: 10,
              y: 10 + Math.random() * 100
          }
        })
      },
      removeNode(state, id) {
        state.nodes = state.nodes.filter(x => x.id !== id)
        state.links = state.links.filter(x => {
          return x.source !== id && x.destination !== id
        })
      },
      removeLink(state, id) {
        state.links = state.links.filter(x => x.id !== id)
      },
      commitDest(state, obj) {
        let src = state.nodes.find(x => x.id === obj.src)
        let dest = state.nodes.find(x => x.id === obj.dest)
        state.links.push({
          id: state.linkId++,
          source: obj.src,
          destination: obj.dest,
          point1: {
            x: src.point.x + 50,
            y: src.point.y + 30
          },
          point2: {
            x: dest.point.x + 50,
            y: dest.point.y + 30
          },
          point: {
            x: (src.point.x + dest.point.x) * 0.5,
            y: (src.point.y + dest.point.y) * 0.5
          }
        })
      }
    },
    getters: {
      nodes(state) {return state.nodes},
      links(state) {return state.links}
    }
  }
  
  export default graph