// Incremental search of all plants

import { View } from './View';
import { h } from 'snabbdom';
import { generalArea, specificArea } from '../plants';
import { search } from '../search';

export const Search = new View('search', '/search');

Search.onlyRHS = false;
Search.searchTerm = '';

Search.onLoad = function () {
  const el = document.getElementById('search');
  if (el) {
    el.focus();
    const len = el.value.length + 1;
    el.setSelectionRange(len, len);
  }
};

Search.view = function () {
  return h('div', [
    this.nav(),
    h('main', [
      h('input#search', {
        on: {
          input: () => {
            this.searchTerm = document.getElementById('search').value;
            this.redraw();
          },
        },
        attrs: {
          type: 'text',
          placeholder: 'Type to search...',
          value: this.searchTerm,
        },
      }),
      h('label', [
        'Only RHS award winners:',
        h('input', {
          on: {
            change: () => {
              this.onlyRHS = !this.onlyRHS;
              this.redraw();
            },
          },
          attrs: { type: 'checkbox', checked: this.onlyRHS },
        }),
      ]),
      h(
        'ul',
        search(
          this.plants.filter((p) => (this.onlyRHS ? p.rhs : true)),
          this.searchTerm
        ).map((plant) =>
          h('li', { on: { click: () => this.goto('view-plant', plant) } }, [
            h('p', [plant.name]),
            h(
              'p',
              plant.areas.map((area) =>
                h('p.area-in-list', [
                  `${generalArea(area.general)}:${specificArea(
                    area.general,
                    area.specific
                  )}`,
                ])
              )
            ),
          ])
        )
      ),
    ]),
  ]);
};
