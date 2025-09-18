import { createPortal } from "react-dom";
import close from '/images/icon-close.svg'

import { CartContext } from "../store/CartContext";
import { useContext } from "react";

export default function Menu() {
    const { menu, menuToggle } = useContext(CartContext);

    function handleCloseMenue() {
        menuToggle();
    }
    
    return createPortal(
        <>
            {menu &&(
                <>
                    <div className="fixed inset-0 bg-black/50 z-40"></div>
                    <div className="fixed top-0 left-0 h-screen bg-white w-55 z-50">
                        <menu className='p-5'>
                            <button className='mb-9 cursor-pointer' onClick={handleCloseMenue}>
                                <img src={close} alt="" />
                            </button>
                            <ul className='font-bold flex flex-col gap-4'>
                                <li>Collections</li>
                                <li>Men</li>
                                <li>Women</li>
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                        </menu>
                    </div>
                </>
            )}
            
        </>,
        document.getElementById('menu')
    )
}