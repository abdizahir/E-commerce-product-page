import previous from '/images/icon-previous.svg';
import next from '/images/icon-next.svg';
import deleteIcon from '/images/icon-delete.svg';

import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

function ProductImage() {
    const { products, items, currentIndex, nextProduct,  prevProduct, removeItem, cart, cartToggler, curentProduct, overlayToggler } = useContext(CartContext);
    const currentProduct = products[currentIndex];
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    function handlePrevCart() {
        prevProduct(products.length);
    }

    function handleNextCart() {
        nextProduct(products.length);
    }

    function handeleCurrentProd(id) {
        curentProduct(id);
        cartToggler();
    }
    
    function handleOverlayProd() {
        overlayToggler();
    }

    function CheckoutHandler() {
        cartToggler();
    }
    function handleRemoveItem(id) {
        removeItem(id)
    }

    return(
        <section id='product-imge' className='mt-6 relative w-full h-[300px] sm:w-full sm:h-[290px] md:w-[448px] md:h-[565px] md:my-0'>
            {totalQuantity >= 1  && cart && (
                <div id='full-cart' className='z-10 bg-white absolute left-1.5 top-2 sm:left-72 sm:-top-13 md:left-187  md:-top-15 w-[360px] h-fit rounded-md shadow-xl'>
                <section className='py-6 mx-3.5'>
                    <h4 className='font-bold mb-6'>Cart</h4>
                    <hr className='text-grey-100' />
                    <div className=''>
                        <ul className=''>
                            {items.map((item) => (
                                <li key={item.id} id={item.id} className='flex items-center gap-4 my-6'>
                                    <img src={item.images.thumbnail} alt={item.name} className='w-12.5 h-12.5' />
                                    <article>
                                        <p className='text-grey-500'>Fall Limited Edition Sneakers</p>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-grey-500'>{(item.price * item.discount).toFixed(2)} x {item.quantity}</span>
                                            <span className='font-bold'>{((item.price * item.discount).toFixed(2) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </article>
                                    <button className='cursor-pointer' onClick={() => handleRemoveItem(item.id)}>
                                        <img src={deleteIcon} alt="delete icon" className='rounded-md' />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={CheckoutHandler} className='bg-orange-500 p-5 rounded-md font-bold text-grey-950 w-full cursor-pointer'>Checkout</button>
                    </div>
                </section>
            </div>
            )}
            {totalQuantity === 0 && cart &&(
                <div id='empty-cart' className='z-10 bg-white absolute left-1.5 sm:left-72 sm:-top-13 top-2 md:left-187  md:-top-15 w-[360px] h-[256px] rounded-md shadow-xl'>
                    <section className='py-6 mx-3.5'>
                        <h4 className='font-bold mb-6'>Cart</h4>
                        <hr className='text-grey-100' />
                    </section>
                    <div className='flex justify-center items-center h-1/3'>
                            <p className='text-center text-grey-500 font-bold'>Your cart is empty.</p>
                    </div>
                </div>
            )}
            <article>
                <button className='hidden md:block' onClick={handleOverlayProd}>
                    <img className='object-cover w-full h-[300px] sm:w-full sm:h-[290px] md:w-[448px] md:h-[445px] md:rounded-lg sm:rounded-2xl' src={currentProduct.images.full} alt={currentProduct.name} />
                </button>
                <img className='md:hidden object-cover w-full h-[300px] sm:w-full sm:h-[290px] md:w-[448px] md:h-[445px] md:rounded-lg sm:rounded-2xl' src={currentProduct.images.full} alt={currentProduct.name} />
                <button className='md:hidden cursor-pointer' onClick={handlePrevCart}>
                    <img className='p-3 bg-white absolute left-2.5 top-1/2 -translate-y-1/2 rounded-3xl' src={previous} alt="" />
                </button>
                <button className='md:hidden cursor-pointer' onClick={handleNextCart}>
                    <img className='p-3 bg-white absolute right-2.5 top-1/2 -translate-y-1/2 rounded-4xl' src={next} alt="" />
                </button>
                <ul className='hidden md:flex gap-8 mt-8'>
                    {products.map((p) => (
                        <li key={p.id}  className='cursor-pointer' onClick={() => handeleCurrentProd(p.id)}>
                            <img id={p.id} className='w-22 h-22 rounded-md hover:outline-3 hover:outline-orange-500 hover:opacity-50' src={p.images.thumbnail} alt={p.name} />
                        </li>
                    ))}
                </ul>
            </article>
        </section>
    );
}

export default ProductImage;