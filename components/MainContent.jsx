import BestSaleProduct from "./BestSaleProduct";
import FakePage from "./FakePage";
import ImageSlide from "./ImageSlide";
import ProductListAbs from "./ProductListAbs";

const MainContent = () => {
  return (
    <div>
      <div className="m-2 ">
        <ImageSlide />
        <BestSaleProduct />
        <ProductListAbs />
        <FakePage />
      </div>
    </div>
  );
};

export default MainContent;
