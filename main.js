window.onload = setup;

let url, data;
let graph;
let start, end;
let path;
let searchAlgorithme;
let dropdown1, dropdown2;
const algorithmes = ['bfs()', 'dfs()'];

function reload() {
  graph = new Graph();
  evaluate(data);
  start = graph.getNode(dropdown1.value());
  end = graph.getNode(dropdown2.value());
  let startTime = Date.now();
  eval(searchAlgorithme.value());
  let dur = Date.now() - startTime;
  console.log(dur+'ms');
}

async function setup() {
  url = await JSONToBlob('media/json/movies-actors.json');
  data = await loadJSON(url);
  graph = new Graph();
  evaluate(data);
  setupDropdowns();
  reload();
}

function evaluate(data) {
  for (let movie of data.movies) {
    let movieNode = new Node(movie.title, 'movie');
    graph.addNode(movieNode);
    for (let actor of movie.cast) {
      let actorNode = graph.getNode(actor);
      if (!actorNode) {
        actorNode = new Node(actor, 'actor');
        graph.addNode(actorNode);
      }
      movieNode.addEdge(actorNode);
    }
  }
}

function bfs() {
  let queue = [];
  start.searched = true;
  queue.push(start);

  while (queue.length) {
    let current = queue.shift();
    if (current == end) {
      console.log('Found', end.value, '!');
      break;
    }
    for (let edge of current.edges) {
      if (!edge.searched) {
        edge.searched = true;
        edge.parent = current;
        queue.push(edge);
      }
    }    
  }

  path = [];
  path.push(end);
  let next = end.parent;
  while (next) {
    path.push(next);
    next = next.parent;
  }

  path.reverse();
  displayPath();
}

function dfs() {
  let stack = [];
  start.searched = true;
  stack.push(start);

  let current;
  while (stack.length) {
    current = stack.pop();
    for (let edge of current.edges) {
      if (!edge.searched) {
        edge.searched = true;
        edge.parent = current;
        stack.push(edge); 
      }
    }
  }

  path = [];
  path.push(end);
  let next = end.parent;
  while (next) {
    path.push(next);
    next = next.parent;
  }

  path.reverse();
  displayPath();
}

function displayPath() {
  let txt = '';
  for (let i=0; i<path.length; i++) (i > 0) ? txt += nodeTypeToText(path[i].type, i) + path[i].value : txt += path[i].value;
  if (path.length <= 1) txt = 'There is no link between <blue>'+start.value+'</blue> and <blue>'+end.value+'</blue>'; 
  document.getElementById('link-container').innerHTML = txt;
}

function setupDropdowns() {
  let container;

  dropdown1 = createSelect();
  container = document.createElement('label');
  container.classList.add('dropdown-text');
  container.innerHTML = 'Actor 1 :';
  container.appendChild(dropdown1.element);  
  document.getElementById('dropdown-container').appendChild(container);
  dropdown1.onchanged(reload);
  for (let node of graph.nodes) if (node.type == 'actor') dropdown1.option(node.value);

  dropdown2 = createSelect();
  container = document.createElement('label');
  container.classList.add('dropdown-text');
  container.innerHTML = 'Actor 2 :';
  container.appendChild(dropdown2.element);  
  document.getElementById('dropdown-container').appendChild(container);
  dropdown2.onchanged(reload);
  for (let node of graph.nodes) if (node.type == 'actor') dropdown2.option(node.value);

  searchAlgorithme = createSelect();
  for (let algorithme of algorithmes) {
    searchAlgorithme.option(algorithme);
  }
  container = document.createElement('label');
  container.classList.add('dropdown-text');
  container.innerHTML = 'Algorithme :';
  container.appendChild(searchAlgorithme.element);  
  document.getElementById('dropdown-container').appendChild(container);
  searchAlgorithme.onchanged(reload);
  for (let node of graph.nodes) if (node.type == 'actor') dropdown2.option(node.value);
}

function nodeTypeToText(type, i) {
  let txt;
  if (type == 'movie') txt = 'was in';
  if (type == 'actor') txt = 'with';

  //DYNAMIC TEXT WITH INDEX
  if (i > 2) {
    (txt.includes('was')) ? before = 'who ' : before = 'who was ';
    txt = before + txt;
  }

  //ADDDING SPACING
  txt = ' ' + txt + ' ';
  
  //ADDING BLUE TAG
  let elem = document.createElement('blue');
  elem.innerHTML = txt;
  return elem.outerHTML;
}

window.onload = setup;