import logo from '/images/logo.svg';
import menu from '/images/icon-menu.svg';
import carts from '/images/icon-cart.svg';
import avartar from '/images/image-avatar.png';
import { CartContext } from '../store/CartContext';
import { useContext } from 'react';

function Header() {
    const { menuToggle, items, cartToggler} = useContext(CartContext);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    function handleShowMnue() {
        menuToggle();
    }
    function handleShowCart() {
        cartToggler();
    }

    
    return(
        <>
        <section id='header' className='flex items-center justify-between mt-3 px-6 md:px-0'>
            <article className='flex items-center gap-3 md:gap-10'>
                <button className='cursor-pointer md:hidden' onClick={handleShowMnue}>
                    <img className='h-4' src={menu} alt="menu-icon" />
                </button>
                <img src={logo} alt="logo" />
                <ul className='hidden text-grey-500 text-text-5 md:flex  gap-9'>
                    <li>Collections</li>
                    <li>Men</li>
                    <li>Women</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </article>
            
            <article className='flex items-center gap-5 md:gap-8 relative'>
                <span className='text-white bg-orange-500 px-0.5 rounded-md text-xs absolute left-3 -top-1.5'>{totalQuantity >= 1 ? totalQuantity : null}</span>
                <button onClick={handleShowCart}>
                    <img className='w-5.5 h-5 cursor-pointer' src={carts} alt="cart-icon" />
                </button>
                <img className='w-6 h-6 md:w-12.5 md:h-12.5' src={avartar} alt="avtar-image" />
            </article>
        </section>
        <div className='relative'>
            <span className="hidden md:block h-1 bg-orange-500 w-14 absolute left-89 -top-1"></span>
            <hr className='mt-7 text-grey-100' />
        </div>
        </>
    );
}

export default Header;