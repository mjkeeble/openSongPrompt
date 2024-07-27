import { TSetlist } from 'src/types';

export const storeSetlist = (setlist: TSetlist) => {
  window.sessionStorage.setItem('SETLIST', JSON.stringify(setlist));
};

export const deleteSetlist = () => {
  window.sessionStorage.removeItem('SETLIST');
};

export const getSetlist = (): TSetlist  => {
  const setlist = window.sessionStorage.getItem('SETLIST');
  return setlist ? JSON.parse(setlist) : [];
}
