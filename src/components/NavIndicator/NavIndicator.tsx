type TProps = {
  leftLong?: string;
  leftShort?: string;
  centreShort?: string;
  centreLong?: string;
  rightShort?: string;
  rightLong?: string;
};

const NavIndicator: React.FC<TProps> = ({ leftLong, leftShort, centreLong, centreShort, rightLong, rightShort }) => {
  console.log("🚀 => rightShort:", rightShort);
  console.log("🚀 => rightLong:", rightLong);
  console.log("🚀 => centreShort:", centreShort);
  console.log("🚀 => centreLong:", centreLong);
  console.log("🚀 => leftShort:", leftShort);
  console.log("🚀 => leftLong:", leftLong);

  return (
    <div className="grid grid-cols-4 grid-rows-3 border">
      <div>
        <p>Short</p>
      </div>
      <div>left</div>
      <div>middle</div>
      <div>right</div>
      <div>button</div>
      <div>O</div>
      <div>O</div>
      <div>O</div>
      <div>Long</div>
      <div>left</div>
      <div>middle</div>
      <div>right</div>
    </div>
  );
};

export default NavIndicator;
