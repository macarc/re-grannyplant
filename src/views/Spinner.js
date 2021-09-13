// Loading spinner

import { View } from './View';
import { h } from 'snabbdom';

export const Spinner = new View('spinner', '/loading');

Spinner.addToHistory = false;

Spinner.setup = function (prom) {
  this.prom = prom;
  prom.then((...res) => this.goto(...res));
};

Spinner.view = function () {
  return h('div.spinner', [h('div.spinner-in')]);
};
