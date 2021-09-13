// View a single plant

import { View } from './View';
import { h } from 'snabbdom';
import { generalArea, specificArea } from '../plants';

export const ViewPlant = new View('view-plant', '/viewplant');

ViewPlant.setup = function (plant) {
  this.plant = plant;
};

ViewPlant.onLoad = function () {
  window.scrollTo(0, 0);
};

ViewPlant.view = function () {
  return h('div', [
    this.nav(),
    h('main', [
      h('h2', [this.plant.name]),
      h(
        'button',
        {
          on: {
            click: () =>
              this.goto('edit-plant', this.plant, 'view-plant', [this.plant]),
          },
        },
        ['Edit']
      ),
      h(
        'button',
        {
          on: {
            click: () => {
              const really = confirm(
                `Are you sure you want to delete "${this.plant.name}"?`
              );
              if (really) {
                this.plants.splice(this.plants.indexOf(this.plant), 1);
                this.saveToDb();
                this.goto('plants');
              }
            },
          },
        },
        ['Delete']
      ),
      ...this.viewPlantDataTable(this.plant),
    ]),
  ]);
};
