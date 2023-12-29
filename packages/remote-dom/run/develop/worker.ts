import {root} from '../source/environment/worker.ts';
import {updateRemoteElementProperty} from '@lemonmade/remote-ui/elements';
// import {root} from 'https://remote-dom.io/run/environment/worker.js';

import './elements.ts';

let count = 0;
const countText = document.createTextNode(String(count));
const countElement = document.createElement('span');
countElement.setAttribute('style', 'color: red');
countElement.append(countText);

const button = document.createElement('ui-button');
button.emphasis = true;
button.textContent = 'Do it!';
button.onPress = (...args) => {
  console.log(...args);
};

root.append('Hello world, from a worker! count: ', countElement, ' ', button);

setInterval(() => {
  count += 1;
  countText.textContent = String(count);

  if (count % 2 === 0) {
    countElement.setAttribute('style', 'color: red');
    updateRemoteElementProperty(countElement, 'style', 'color: red');
  } else {
    countElement.removeAttribute('style');
    updateRemoteElementProperty(countElement, 'style', undefined);
  }
}, 1000);
