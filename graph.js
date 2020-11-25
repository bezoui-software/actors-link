function Graph() {
  this.nodes = [];
  this.graph = {};

  this.addNode = function(node) {
    this.nodes.push(node); 
    this.graph[node.value] = node;
  }

  this.getNode = function(node) {
    return this.graph[node];
  }

  this.getRandomNode = function(node) {
    return random(this.graph);
  }
}