// Initialise views and start

import { View } from './View';

// Effectful imports
import './PlantList';
import './AddAnother';
import './AreaList';
import './EditPlant';
import './ViewPlant';
import './Search';
import './SignIn';
import './Spinner';

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
