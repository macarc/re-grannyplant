// Search is very simple and stupid
// Simply checks for substr on all the fields of each plant
// Requires an exact match and is very slow, but it doesn't really matter

import { generalArea, specificArea } from './plants';

function stringify(plant) {
  return (
    plant.name +
    ' ' +
    plant.description +
    ' ' +
    plant.size +
    ' ' +
    plant.care +
    ' ' +
    plant.areas
      .map(
        (area) =>
          generalArea(area.general) +
          ' ' +
          specificArea(area.general, area.specific) +
          ' ' +
          area.number +
          ' ' +
          area.date
      )
      .join('')
  );
}

export function search(plants, st) {
  if (st === '') return plants;
  return plants.filter(
    (plant) => stringify(plant).toLowerCase().indexOf(st.toLowerCase()) !== -1
  );
}
