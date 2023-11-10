import {root} from '../source/environment/worker.ts';

let count = 0;
const countText = document.createTextNode(String(count));
const countElement = document.createElement('span');
countElement.append(countText);
countElement.setAttribute('style', 'font-weight: bold;');

root.append('Hello world, from a worker! count: ', countElement);

setInterval(() => {
  count += 1;
  countText.textContent = String(count);
}, 1000);
