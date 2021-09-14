// Edit plant page

import { View } from './View';
import { h } from 'snabbdom';
import {
  generalArea,
  specificArea,
  initialisePlant,
  numberOfGeneralAreas,
  numberOfSpecificAreas,
  season,
} from '../plants';

function log(a) {
  console.log(a);
  return a;
}

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
  this.originalPlant = JSON.stringify(this.plant);
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
              if (this.plants.indexOf(this.plant) !== -1) {
                const original = JSON.parse(this.originalPlant);
                Object.keys(original).forEach(
                  (key) => (this.plant[key] = original[key])
                );
              }
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
          h(
            'select',
            {
              attrs: { placeholder: '--' },
              on: {
                change: (e) => {
                  if (!area.date) area.date = [];
                  area.date[1] = parseInt(e.target.value);
                  if (area.date[1] === -1) area.date[1] = null;
                  this.redraw();
                },
              },
            },
            [
              h(
                'option',
                { attrs: { value: -1, selected: !area.date || !area.date[1] } },
                ['None']
              ),
              h(
                'option',
                {
                  attrs: {
                    value: 0,
                    selected: (area.date && area.date[1] === 0) || false,
                  },
                },
                [season(0)]
              ),
              h(
                'option',
                {
                  attrs: {
                    value: 1,
                    selected: (area.date && area.date[1] === 1) || false,
                  },
                },
                [season(1)]
              ),
              h(
                'option',
                {
                  attrs: {
                    value: 2,
                    selected: (area.date && area.date[1] === 2) || false,
                  },
                },
                [season(2)]
              ),
              h(
                'option',
                {
                  attrs: {
                    value: 3,
                    selected: (area.date && area.date[1] === 3) || false,
                  },
                },
                [season(3)]
              ),
            ]
          ),
          h(
            'select',
            {
              on: {
                change: (e) => {
                  if (!area.date) area.date = [];
                  area.date[0] = parseInt(e.target.value);
                  if (area.date[0] === -1) area.date[0] = null;
                  this.redraw();
                },
              },
            },
            [
              h(
                'option',
                { attrs: { value: -1, selected: !area.date || !area.date[0] } },
                ['No year']
              ),
              ...[...new Array(new Date().getFullYear() - 1999).keys()]
                .reverse()
                .map((n) => n + 2000)
                .map((year) =>
                  h(
                    'option',
                    {
                      attrs: {
                        value: year,
                        selected: (area.date && area.date[0] === year) || false,
                      },
                    },
                    [year]
                  )
                ),
            ]
          ),
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
