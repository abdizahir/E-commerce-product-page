import previous from '/images/icon-previous.svg';
import next from '/images/icon-next.svg';
import close from '/images/icon-close.svg';
import { createPortal } from 'react-dom';

import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function ImgOverlay() {
    const { products, currentIndex, nextProduct, prevProduct, curentProduct, setOverlay, overlayToggler } = useContext(CartContext);
    const currentProduct = products[currentIndex];
    
    function overlayCloser() {
        overlayToggler();
    }

    function handeleCurrentProd(id) {
        curentProduct(id);
    }

    function handlePrevCart() {
        prevProduct(products.length);
    }

    function handleNextCart() {
        nextProduct(products.length);
    }
    
    return createPortal(
        <div>
            {setOverlay &&
                <>
                <div className="fixed inset-0 bg-black/50 z-40"></div>
                <div className='w-[550px] h-[722px] sm:p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 mt-5'>
                    <button className='fixed right-6 -top-2 cursor-pointer'>
                        <img className='cursor-pointer transition hover:invert hover:brightness-0 hover:sepia hover:hue-rotate-30' onClick={overlayCloser} src={close} alt="colse" />
                    </button>
                    <div className='w-full h-full relative'>
                        <img className='object-cover w-[550px] h-[550px] rounded-lg' src={currentProduct.images.full} alt={currentProduct.name} />
                        <button className='w-fit h-fit cursor-pointer' onClick={handlePrevCart}>
                            <img className='p-3 bg-white absolute top-[296px] -left-4 -translate-y-1/2 rounded-3xl' src={previous} alt="" />
                        </button>
                        <button className='w-fit h-fit cursor-pointer' onClick={handleNextCart}>
                            <img className='p-3 bg-white absolute  top-[296px] -right-4 -translate-y-1/2 rounded-4xl' src={next} alt="" />
                        </button>
                    <ul className='flex gap-6 mt- mx-13'>
                        {products.map((p) => (
                            <li key={p.id}  className='cursor-pointer' onClick={() => handeleCurrentProd(p.id)}>
                                <img id={p.id} className='w-22 h-22 rounded-md hover:outline-3 hover:outline-orange-500 hover:opacity-50 hover:z-30' src={p.images.thumbnail} alt={p.name} />
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
                </>
            }
        </div>, document.getElementById('img-root')
    );
}