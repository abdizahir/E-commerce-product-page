import minus from '/images/icon-minus.svg';
import plus from '/images/icon-plus.svg';
import carts from '/images/icon-cart.svg';

import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

function ProductDetails() {
    const { products, currentIndex, addItem, items,  removeCartItem, cartToggler, increaseItem, cart} = useContext(CartContext);
    const currentProduct = products[currentIndex];
    const cartItem = items.find(item => item.id === currentProduct.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    
    const discountedPrice = (currentProduct.price * currentProduct.discount).toFixed(2);
    const discount = currentProduct.discount * 100;
    const price = currentProduct.price.toFixed(2);

    function handleAddToCart() {
        addItem(currentProduct);
        cartToggler();
    }

    function handleIncrease() {
        increaseItem(currentProduct);  
    }
    
    function handleRemoveItem() {
        removeCartItem(currentProduct.id);
    }
    
    return(
        <section className="m-6 sm:mx-0 md:w-[445px] md:h-[432px] sm:w-full sm:h-[334px]">
            <article id="product-info">
                <p className="text-xs font-bold text-grey-500 uppercase">Sneaker Company</p>
                <h1 className="text-text-2 sm:text-text-1 font-bold mb-3">Fall Limited Edition Sneakers</h1>
                <p className="text-text-5 text-grey-500">These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
            </article>
            <article id="product-price" className="my-8 flex sm:flex-col items-center sm:items-start justify-between">
                <div className="flex items-center gap-8">
                    <span className="text-text-3 font-bold text-grey-950">${discountedPrice}</span>
                    <span className="px-3 py-1 bg-grey-950 text-white font-bold rounded-md">{discount}%</span>
                </div>
                <span className="text-grey-500 line-through font-bold">{price}</span>
            </article>
            <div className='sm:flex items-center sm:gap-3' id='sm-buttons'>
                <article id="product-quantity" className='mb-4 sm:mb-0 sm:w-1/2 flex justify-between bg-grey-50 p-4 rounded-md font-bold'>
                    <button className='cursor-pointer' onClick={handleRemoveItem} disabled={cart}>
                        <img src={minus} alt="minus-icon" />
                    </button>
                        {quantity}
                    <button className='cursor-pointer' onClick={handleIncrease} disabled={cart}>
                        <img src={plus} alt="plus-icon" />
                    </button>
                </article>
                <article id='add-to-cart' className='bg-orange-500 sm:w-1/2 p-4 rounded-md font-bold text-grey-950'>
                    <button onClick={handleAddToCart} className='flex items-center gap-5 m-auto cursor-pointer' disabled={cart}>
                        <img className='text-grey-950' src={carts} alt="" />
                        <span>Add to cart</span>
                    </button>
                </article>
            </div>
        </section>
    );
}

export default ProductDetails;