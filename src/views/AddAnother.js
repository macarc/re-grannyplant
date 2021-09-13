// The menu shown after adding a plant, prompting the user on whether to add another plant or not

import { View } from './View';
import { h } from 'snabbdom';

export const AddAnother = new View('add-another', '/add-another');

AddAnother.setup = function (plantJustAdded) {
  this.justAdded = plantJustAdded;
};

AddAnother.view = function () {
  return h('div', [
    h('main', [
      h('h2', ['Added!']),
      ...this.viewPlantDataTable(this.justAdded),
      h('p', ['Add another?']),
      h('button', { on: { click: () => this.goto('edit-plant') } }, ['Yes']),
      h(
        'button',
        { on: { click: () => this.goto('view-plant', this.justAdded) } },
        ['No']
      ),
    ]),
  ]);
};
