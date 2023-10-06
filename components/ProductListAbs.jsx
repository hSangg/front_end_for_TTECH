import { productListAbs } from "@/data";
import ProductSlide from "./ProductSlide";

const ProductListAbs = () => {
  return (
    <>
      {productListAbs.map((product, index) => (
        <ProductSlide
          key={index}
          title={product.title}
          imageHref={product.imageHref}
          styleForImage={product.styleForImage}
          //   productList={product.productList}
        />
      ))}
    </>
  );
};

export default ProductListAbs;
