import 'whatwg-fetch';

const options = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export function getTargets() {
  return fetch('/api/getTargets', options)
    .then(response => response.json());
}

export function updateTarget(name, link) {
  var url = '/api/updateTarget?name=' + name + '&link=' + link;
  return fetch(url, options)
    .then(response => response.json());
}
