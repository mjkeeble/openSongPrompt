import { TGig } from '../../types';

const GIGS: TGig[] = [
  {
    id: '1',
    location: 'Die Alte Garage, Babelsberg',

    date: '2024-02-19',
    setList: ['ALL_THAT_I_CAN_DO_IS_SING_THE_BLUES', 'BLACK_COFFEE', null, 'THE_THRILL_IS_GONE'],
  },
  {
    id: '2',
    location: 'Göhren',

    date: '2024-04-07',
    setList: ['THE_THRILL_IS_GONE', 'ALL_THAT_I_CAN_DO_IS_SING_THE_BLUES', 'BLACK_COFFEE'],
  },
  {
    id: '3',
    location: 'Die Blues Garage, Berlin',

    date: '2023-04-08',
    setList: ['BLACK_COFFEE', null, 'ALL_THAT_I_CAN_DO_IS_SING_THE_BLUES', 'THE_THRILL_IS_GONE', "Black Banana"],
  },
].sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());

export default GIGS;
