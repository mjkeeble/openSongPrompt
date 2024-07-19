import {TSong} from "src/types";

type SongFormProps = Omit<TSong, 'id'> & {
  id?: string;
};

const newSong: SongFormProps = {
  title: '',
  writtenBy: [],
  pages: [],
};


export default newSong;
