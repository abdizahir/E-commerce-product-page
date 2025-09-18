import ProductDetails from "./ProductDetails"
import ProductImage from "./ProductImage"

function Products() {
    return(
        <div className="md:flex md:items-center md:gap-32  md:mx-12 md:my-12">
            <ProductImage />
            <ProductDetails />
        </div>
    );
}

export default Products;