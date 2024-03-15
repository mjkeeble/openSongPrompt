import CountIn from './CountIn';

type TProps = {
  title: string;
  songKey: string | undefined;
  setup: string | undefined;
  tempo: number;
  timeSignature: string;
};

const TitlePage: React.FC<TProps> = ({ title, songKey, setup, tempo, timeSignature }) => {
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex h-screen w-full flex-col p-2">
      <header className=" m-2 flex items-start justify-between text-6xl ">
        <h1>{title}</h1>
        <h2>{currentTime}</h2>
      </header>
      <div className="flex h-full items-center justify-center">
        <div className="w-full text-center text-lyric">
          {songKey && <p>Key: {songKey}</p>}
          {setup && (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-lyric">{setup}</p>
            </div>
          )}
          <div>
            <CountIn tempo={tempo} timeSignature={timeSignature} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
