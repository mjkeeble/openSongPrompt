type TProps = {
  currentPage: number;
  title: string;
  totalPages: number;
  pageHasChords: boolean;
};


const PageTitle:React.FC<TProps> = ({currentPage, pageHasChords, title, totalPages}) => {
  return (
    <div className={`flex ${pageHasChords ? "flex-col flex-start" : "flex-row justify-between w-1/2"} text-bj-green-light text-left`}>
      <p className="text-5xl font-semibold">{title}</p>

      <p className="text-3xl">
        {currentPage}/{totalPages}
      </p>
    </div>
  );
}

export default PageTitle
