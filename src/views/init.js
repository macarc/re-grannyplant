// Initialise views and start

import { View } from './View';

// Effectful imports
import { PlantList } from './PlantList';
import { AddAnother } from './AddAnother';
import { AreaList } from './AreaList';
import { EditPlant } from './PlantEdit';
import { ViewPlant } from './PlantView';
import { Search } from './Search';
import { SignIn } from './SignIn';
import { Spinner } from './Spinner';

export default start = function () {
  View.prototype.goto('spinner', new Promise(() => null));
};

document.addEventListener(
  'DOMContentLoaded',
  () => (View.prototype.vnode = document.getElementById('root'))
);

window.onpopstate = function (event) {
  if (event.state) {
    View.prototype.moveto(event.state.view, ...event.state.args);
  }
};
