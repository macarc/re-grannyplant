// Edit plant page

import { View } from './View';
import { h } from 'snabbdom';
import {
  generalArea,
  specificArea,
  initialisePlant,
  numberOfGeneralAreas,
  numberOfSpecificAreas,
} from '../plants';

export const EditPlant = new View('edit-plant', '/edit-plant');

EditPlant.setup = function (
  plant = null,
  // The view to move to after editing the plant
  nextView = null,
  nextViewArgs = null
) {
  if (plant === null) {
    this.plant = initialisePlant();
  } else {
    this.plant = plant;
  }
  if (nextView) {
    this.nextView = nextView;
    this.nextViewArgs = nextViewArgs;
    this.failView = nextView;
    this.failViewArgs = nextViewArgs;
  } else {
    this.nextView = 'add-another';
    this.nextViewArgs = [this.plant];
    this.failView = 'plants';
    this.failViewArgs = [];
  }
};

EditPlant.view = function () {
  const changeValue =
    (value, validate = (a) => a) =>
    (event) => {
      this.plant[value] = validate(event.target.value);
      this.redraw();
    };
  return h('div', [
    h('main', [
      h('h2', ['Plant Editor']),
      h('label', [
        'Name:',
        h('input', {
          on: { input: changeValue('name') },
          attrs: { type: 'text', value: this.plant.name },
        }),
      ]),
      h('label', [
        'Description:',
        h('textarea', { on: { input: changeValue('description') } }, [
          this.plant.description,
        ]),
      ]),
      h('label', [
        'Care:',
        h('textarea', { on: { input: changeValue('care') } }, [
          this.plant.care,
        ]),
      ]),
      h('label', [
        'Size:',
        h('input', {
          on: { input: changeValue('size') },
          attrs: { type: 'text', value: this.plant.size },
        }),
      ]),
      h('label', [
        'RHS:',
        h('input', {
          on: { change: changeValue('rhs', Boolean) },
          attrs: { type: 'checkbox', checked: this.plant.rhs },
        }),
      ]),
      h('hr'),
      this.viewAreaWidget(),
      h('hr'),
      h(
        'button.cancel',
        {
          on: {
            click: () => {
              this.goto(this.failView, ...this.failViewArgs);
            },
          },
        },
        ['Cancel']
      ),
      h(
        'button.done',
        {
          on: {
            click: () => {
              if (this.plants.indexOf(this.plant) === -1)
                this.plants.push(this.plant);
              this.saveToDb();
              this.goto(this.nextView, ...this.nextViewArgs);
            },
          },
        },
        ['Done']
      ),
    ]),
  ]);
};
EditPlant.viewAreaWidget = function () {
  const dateOf = (date) => {
    try {
      return new Date(date).toISOString().slice(0, 10);
    } catch {
      return null;
    }
  };
  return h('div', [
    ...this.plant.areas.map((area) =>
      h('div.inputArea', [
        h(
          'select',
          {
            on: {
              change: (e) => {
                area.general = parseInt(e.target.value);
                if (area.specific >= numberOfSpecificAreas(area.general))
                  area.specific = 0;
                this.redraw();
              },
            },
          },
          [...Array(numberOfGeneralAreas).keys()].map((i) =>
            h('option', { attrs: { value: i, selected: area.general === i } }, [
              generalArea(i),
            ])
          )
        ),

        numberOfSpecificAreas(area.general) > 1
          ? h(
              'select',
              {
                on: {
                  change: (e) => {
                    area.specific = parseInt(e.target.value);
                    this.redraw();
                  },
                },
              },
              [...Array(numberOfSpecificAreas(area.general)).keys()].map((i) =>
                h(
                  'option',
                  { attrs: { value: i, selected: area.specific === i } },
                  [specificArea(area.general, i)]
                )
              )
            )
          : null,
        h('label', [
          'Date: ',
          h('input', {
            on: {
              change: (e) => {
                area.date = dateOf(e.target.value);
                this.redraw();
              },
            },
            attrs: {
              type: 'date',
              value: dateOf(area.date),
            },
          }),
        ]),
        h('label', [
          'Number: ',
          h('input', {
            on: {
              change: (e) => {
                area.number = parseInt(e.target.value);
                this.redraw();
              },
            },
            attrs: { type: 'number', value: area.number },
          }),
        ]),
        h(
          'button.remove-area',
          {
            on: {
              click: () => {
                this.plant.areas.splice(this.plant.areas.indexOf(area), 1);
                this.redraw();
              },
            },
          },
          ['Remove']
        ),
      ])
    ),
    h(
      'button.add-area',
      {
        on: {
          click: () => {
            this.plant.areas.push({ general: 0, specific: 0 });
            this.redraw();
          },
        },
      },
      ['+ Area']
    ),
  ]);
};
