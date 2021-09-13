// View all plants organised by area

import { View } from './View';
import { h } from 'snabbdom';
import {
  generalArea,
  specificArea,
  numberOfGeneralAreas,
  numberOfSpecificAreas,
  initialisePlant,
} from '../plants';

export const AreaList = new View('areas', '/areas');

AreaList.setup = function (jumpToArea = null) {
  this.jumpToArea = jumpToArea;
};

AreaList.onLoad = function () {
  if (this.jumpToArea)
    document
      .getElementById(`${this.jumpToArea.general}-${this.jumpToArea.specific}`)
      .scrollIntoView();
};

AreaList.view = function () {
  let areas = [];
  for (let i = 0; i < numberOfGeneralAreas; i++) {
    areas.push(new Array(numberOfSpecificAreas(i)));
    for (let j = 0; j < areas[i].length; j++) {
      areas[i][j] = new Array();
    }
  }
  for (const plant of this.plants) {
    for (const area of plant.areas) {
      areas[area.general][area.specific].push(plant);
    }
  }
  return h('div', [
    this.nav(),
    h(
      'main',
      areas.map((area, generalIndex) =>
        h('section', [
          h('h2', [generalArea(generalIndex)]),
          ...area.map((specific, specificIndex) =>
            h('div', [
              h(`details#${generalIndex}-${specificIndex}`, [
                h('summary', [specificArea(generalIndex, specificIndex)]),
                h(
                  'ul.specific-area',
                  specific.map((plant) =>
                    h(
                      'li',
                      { on: { click: () => this.goto('view-plant', plant) } },
                      [plant.name]
                    )
                  )
                ),
                h('div.add-plant-to-specific-area', [
                  h(
                    'button',
                    {
                      on: {
                        click: () => {
                          const newPlant = {
                            ...initialisePlant(),
                            areas: [
                              {
                                general: generalIndex,
                                specific: specificIndex,
                                date: null,
                                number: 1,
                              },
                            ],
                          };
                          this.plants.push(newPlant);
                          this.goto('edit-plant', newPlant);
                        },
                      },
                    },
                    ['+ Plant']
                  ),
                ]),
              ]),
            ])
          ),
        ])
      )
    ),
  ]);
};
