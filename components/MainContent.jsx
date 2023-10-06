import BestSaleProduct from "./BestSaleProduct";
import FakePage from "./FakePage";
import ImageSlide from "./ImageSlide";
import ProductListAbs from "./ProductListAbs";

const MainContent = () => {
  return (
    <div>
      <div className="m-2 ">
        <div className="md:flex gap-5">
          <div className="md:flex-1">
            <ImageSlide />
          </div>
          <BestSaleProduct />
        </div>
        <ProductListAbs />
        <FakePage />
      </div>
    </div>
  );
};

export default MainContent;
