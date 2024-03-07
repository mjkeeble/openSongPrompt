import { TGig } from '../types';

const GIGS: TGig[] = [
  {
    id: '1',
    venue: 'Die Alte Garage',
    town: 'Babelsberg',

    dateTime: '2024-04-06T19:00:00+02:00',
    setlist: [['1', '2'], ['3']],
  },
  {
    id: '2',
    venue: 'Regenbogen Camp',
    town:  'Göhren',

    dateTime: '2023-06-16T21:00:00+02:00',
    setlist: [['2', '3', '4']],
  },
  {
    id: '3',
    venue: 'Die Blues Garage',
    town: 'Berlin',

    dateTime: '2023-09-22T19:00:00+02:00',
    setlist: [['5'], ['23', '15', "21"], ["15"]],
  },
  {
    id: '4',
    venue: 'Strahlwerk',
    town: 'Stralsund',
    dateTime: '2023-04-22T19:00:00+02:00',
    setlist: [['5'], ['23', '15', "21"], ["15"]],
  }
].sort((a, b) => new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf());

export default GIGS;
