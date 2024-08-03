import {Link} from "react-router-dom";
import ShoppingCard from "./ShoppingCard.jsx";
import {useState} from "react";

function NavigationBar({setPurchasedItems, itemsInCard, setItemsInCard, itemsInShop, setItemsInShop, useRef}) {
    const [isExpending, setIsExpending] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    function changeStates() {
        setIsExpending(!isExpending);
        if (isExpending)
            setIsClosing(true)
    }

    return (
        <>
            <nav className="navbar">
                <div>
                    <div className={"button-container"}>
                        <Link to={"/home"}>
                            <button className={"header-button"}>Home</button>
                        </Link>
                    </div>
                    <div className={"button-container"}>
                        <Link to={"/shop"}>
                            <button className={"header-button"}>Shop</button>
                        </Link>
                    </div>
                </div>
                <div className={"button-container"}>
                    <button ref={useRef} onClick={() => {
                        changeStates()
                    }} className={"header-button"}>Shopping Card
                    </button>
                    <ShoppingCard setIsClosing={setIsClosing} isExpending={isExpending} isClosing={isClosing}
                                  setItemsInCard={setItemsInCard} itemsInCard={itemsInCard}
                                  setShopItems={setItemsInShop} shopItems={itemsInShop}
                                  setPurchasedItems={setPurchasedItems} changeStates = {changeStates}/>
                </div>
            </nav>
        </>
    )
}


export default NavigationBar