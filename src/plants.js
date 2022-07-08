// Functions for dealing with plants and areas
// Mostly for turning areas from indices into human-readable strings

const areas = [
  {
    name: 'Raised bed along back of house',
    areas: [
      'Opposite kitchen window',
      'Back alpine bed, higher section',
      'Back alpine bed, shed section',
      'Back alpine bed, path corner',
      'Rockface bed',
    ],
  },
  {
    name: 'Road fence bed',
    areas: ['Blackthorn to Olearia', 'Olearia to Hawthorn twins', 'Far corner'],
  },
  {
    name: 'Lawn garden',
    areas: [
      "Icky's seat and sundial bed",
      'House end',
      'Griselinia bed',
      'Far bed',
    ],
  },
  {
    name: 'Raised bed by lawn',
    areas: [
      'Left alpine bed',
      'Raised bed to daisy bush',
      'Washing-pole bed',
      'Raised bed from daisy bush to fence path',
      'Fence path to woodshed',
    ],
  },
  {
    name: 'Central area',
    areas: [
      'Right alpine bed',
      'Fence',
      'Bullnose bed',
      'Main bed',
      'Eucalyptus bed',
    ],
  },
  {
    name: 'Far woodland',
    areas: [
      'Bottom',
      'Centre',
      'Slope above centre',
      'Top',
      'High up, left of path',
    ],
  },
  {
    name: 'Below mid path',
    areas: [
      'Left hand slope',
      'Centre panel',
      'Pine tree to oak tree',
      'Oak tree to escallonia',
    ],
  },
  {
    name: 'Between mid path and top path',
    areas: [
      'From woodland to pine tree',
      'From pine tree to oak tree',
      'From oak tree to escallonia',
    ],
  },
  {
    name: 'Above top path',
    areas: [
      'On the crag',
      'High up to exit, right of path',
      'From spruce trees to bench',
      'From bench to stone seat',
      'Stone seat area',
    ],
  },
  {
    name: 'Pond woodland',
    areas: [
      'Left edge',
      'Pond area, sides and front',
      'Pond area, behind',
      'Past pond',
      'Slope opposite door',
    ],
  },
  { name: 'Gable end', areas: ['Around fence by grass steps', 'Banking'] },
  {
    name: 'Containers',
    areas: [
      'At front, inside gate',
      'At front, at lunchroom window',
      'At front, at front door',
      'At front, at sittingroom window',
      'Roadside gable, near postbox',
      'Roadside gable, by wall bench',
      'Roadside gable, by house wall',
      'Garden gable, by bench',
      'Centre, back path',
      'Centre, circle',
      'Centre, path corner',
      'Centre, woodshed step',
      'Top garden, by bench',
      'Top garden, before pond',
      'Top garden, at sheep gate',
    ],
  },
];

const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

export function generalArea(general) {
  return areas[general].name;
}
export function specificArea(general, specific) {
  return areas[general].areas[specific];
}

export const numberOfGeneralAreas = areas.length;
export function numberOfSpecificAreas(general) {
  return areas[general].areas.length;
}

export function season(s) {
  return seasons[s];
}

export function initialisePlant() {
  return {
    areas: [],
    care: '',
    name: '',
    description: '',
    rhs: false,
    size: '',
  };
}
