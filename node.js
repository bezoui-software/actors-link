function Node(value, type) {
  this.value = value; 
  this.type = type;
  this.edges= [];
  this.searched;
  this.parent;
}

Node.prototype.addEdge = function(edge) {
  this.edges.push(edge);
  edge.edges.push(this);
}

Node.prototype.setEdge = function(edge) {
  this.edges = [edge];
}