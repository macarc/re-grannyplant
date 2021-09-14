// View is an object that can be extended to produce different
// pages

import {
  attributesModule,
  classModule,
  eventListenersModule,
  h,
  init,
  propsModule,
  styleModule,
} from 'snabbdom';
import { app } from '../fb';
import { saveBackup, saveToDb, readPlants } from '../db';
import { generalArea, specificArea, season } from '../plants';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const patch = init([
  attributesModule,
  classModule,
  eventListenersModule,
  propsModule,
  styleModule,
]);

export function View(name, url) {
  this.name = name;
  this.setUrl(url);
}

View.prototype.name = 'sign-in';
View.prototype.urls = {};
View.prototype.vnode = null;
View.prototype.plants = [];

View.prototype.auth = getAuth();
onAuthStateChanged(View.prototype.auth, updateAuth);

// React to auth change
async function updateAuth(user) {
  if (user) {
    function log(a) {
      console.log(a);
      return a;
    }
    View.prototype.plants = await readPlants();
    View.prototype.goto('plants');
  } else {
    View.prototype.goto('sign-in');
  }
}

// Add a URL to the global urls list
View.prototype.setUrl = function (url) {
  this.urls[this.name] = { obj: this, url };
};

View.prototype.saveBackup = function () {
  saveBackup(this.plants);
};
View.prototype.saveToDb = function () {
  saveToDb(this.plants);
};

// TODO better name
View.prototype.setup = function () {};
View.prototype.onLoad = function () {};

// Can be overriden
View.prototype.addToHistory = true;

// Add view to history (for forward/back navigation in browser)
View.prototype.pushHistory = function (view, ...args) {
  if (this.urls[view].obj.addToHistory) {
    history.pushState(
      {
        view,
        args,
      },
      null,
      this.urls[view].url
    );
  }
};

// Go to a page and add to history
View.prototype.goto = function (view, ...args) {
  this.moveto(view, ...args);
  this.pushHistory(view, ...args);
};

// Go to a page and don't add to history
View.prototype.moveto = function (view, ...args) {
  View.prototype.name = view;
  const newView = this.urls[view].obj;
  newView.setup(...args);
  newView.redraw();
  newView.onLoad();
};

// Redraw the current view
View.prototype.redraw = function () {
  old = View.prototype.vnode;
  View.prototype.vnode = this.view();
  patch(old, View.prototype.vnode);
};

// Draw navigation header menu
View.prototype.nav = function () {
  return h('header', [
    h(
      'button',
      {
        class: {
          selected: this.name === 'plants' || this.name === 'view-plant',
        },
        on: { click: () => this.goto('plants') },
      },
      ['Plant View']
    ),
    h(
      'button',
      {
        class: { selected: this.name === 'areas' },
        on: { click: () => this.goto('areas') },
      },
      ['Area View']
    ),
    h(
      'button',
      {
        class: { selected: this.name === 'search' },
        on: { click: () => this.goto('search') },
      },
      ['Search']
    ),
  ]);
};

// Representation of plant
View.prototype.viewPlantDataTable = function (plant2) {
  return [
    plant2.rhs ? h('h3.rhs', ['RHS award']) : null,
    h('section', [
      h('table.plant-data', [
        plant2.name.length > 0
          ? h('tr', [h('th', ['Name']), h('td', [plant2.name])])
          : null,
        plant2.description.length > 0
          ? h('tr', [h('th', ['Description']), h('td', [plant2.description])])
          : null,
        plant2.size.length > 0
          ? h('tr', [h('th', ['Size']), h('td', [plant2.size])])
          : null,
        plant2.care.length > 0
          ? h('tr', [h('th', ['Care']), h('td', [plant2.care])])
          : null,
      ]),
      ...plant2.areas.map((area) =>
        h(
          'div.area',
          {
            on: {
              click: () => this.goto('areas', area),
            },
          },
          [
            h('p', [
              area.number ? h('span.data', [`${area.number}x`]) : null,
              h('span', [
                ` ${generalArea(area.general)} - ${specificArea(
                  area.general,
                  area.specific
                )}`,
              ]),
            ]),
            area.date && area.date[0]
              ? h('p', [
                  h('span', ['Since ']),
                  h('span.data', [season(area.date[1]), ' ', area.date[0]]),
                ])
              : null,
          ]
        )
      ),
    ]),
  ];
};
