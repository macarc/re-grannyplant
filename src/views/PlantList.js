// All plants, ordered alphabetically

import { View } from './View';
import { h } from 'snabbdom';
import { generalArea, specificArea } from '../plants';

export const PlantList = new View('plants', '/plants');

PlantList.view = function () {
  return h('div', [
    this.nav(),
    h('main', [
      h('h1', [`${this.plants.length} Plants`]),
      h('div.add-plant', [
        h('button.save-backup', { on: { click: () => this.saveBackup() } }, [
          'Save backup',
        ]),
        h('button', { on: { click: () => this.goto('edit-plant') } }, [
          '+ Plant',
        ]),
      ]),
      h('table.plant-table', [
        h('tr', [h('th', ['Name']), h('th', ['Areas'])]),
        ...this.plants
          .filter((plant) => plant.name != undefined)
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(this.renderPlant.bind(this)),
      ]),
    ]),
  ]);
};

PlantList.renderPlant = function (plant) {
  const descriptionLength = 100;
  return h('tr', { on: { click: () => this.goto('view-plant', plant) } }, [
    h('td', [plant.name]),
    h(
      'td',
      plant.areas.map((area) =>
        h('p.area-text', [
          `${generalArea(area.general)} - ${specificArea(
            area.general,
            area.specific
          )}`,
        ])
      )
    ),
  ]);
};
