import {root} from '../environments/worker.ts';

let count = 0;
const countText = document.createTextNode(String(count));

root.append('Hello, world, from a worker! count: ', countText);

setInterval(() => {
  count += 1;
  countText.textContent = String(count);
}, 1000);
