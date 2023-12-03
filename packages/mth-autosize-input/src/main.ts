import './main.css';

import autoResize from '../lib';

document.querySelectorAll('#root')[0].innerHTML = `
  <div>
    <p></p><input type="text" data-js="input" /></p>
    <p></p><input type="text" data-js="input2" /></p>
  </div>
`;

autoResize(document.querySelectorAll<HTMLInputElement>('[data-js="input"]')[0]);
autoResize(document.querySelectorAll<HTMLInputElement>('[data-js="input2"]')[0]);
