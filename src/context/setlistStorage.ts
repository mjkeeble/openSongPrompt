import { TSetlist } from 'src/types';

export const storeSetlist = (setlist: TSetlist) => {
  window.localStorage.setItem('SETLIST', JSON.stringify(setlist));
};

export const deleteSetlist = () => {
  window.localStorage.removeItem('SETLIST');
};

export const getSetlist = (): TSetlist => {
  const setlist = window.localStorage.getItem('SETLIST');
  return setlist ? JSON.parse(setlist) : [];
}
