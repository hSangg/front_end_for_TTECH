import BestSaleProduct from "./BestSaleProduct";
import ImageSlide from "./ImageSlide";

const MainContent = () => {
  return (
    <div>
      <div className="m-2">
        <ImageSlide />
        <BestSaleProduct />
      </div>
    </div>
  );
};

export default MainContent;
