async function JSONToBlob(url) {
  let data = await fetch(url)
             .then(async function(res) {
               let jsonRes = await res.json();
               return jsonRes;
             })
             .catch(err => {
               console.error(err);
             })
   
  var blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
  return URL.createObjectURL(blob);
}

async function loadJSON(url) {
  let data = await fetch(url)
             .then(async function(res) {
               let jsonRes = await res.json();
               return jsonRes;
             })
             .catch(err => {
               console.error(err);
             })
   
  return data;
}

function createSelect() {
  return new Select();
}

function Select() {
  this.element = document.createElement('select');
  document.body.appendChild(this.element);
  this.options = [];
  this.value = function() {
    return this.element.value;
  }
  this.option = function(option) {
    let elem = document.createElement('option');
    elem.classList.add('option');
    elem.innerHTML = option;
    this.options.push(option);
    this.element.appendChild(elem);
  }
  this.onchanged = function(func) {
    this.element.addEventListener('change', func);
  }
}


function random(a, b) {
  let max, min;
  if (typeof a == 'number' && typeof b == 'number') {
    min = a
    max = b;
    return Math.random() * (max - min) + min;
  } else if (a instanceof Array) {
    min = 0;
    max = a.length;
    let i = floor(random(min, max));
    return a[i];
  } else if (a instanceof Object) {
    let keys = Object.keys(a);
    let key = random(keys);
    return a[key];
  }
}

function floor(x) {
  return Math.floor(x);
}