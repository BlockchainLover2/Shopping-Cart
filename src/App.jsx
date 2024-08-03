import './App.css'
import NavigationBar from "./NavigationBar.jsx";
import {Outlet} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import getShopItems from "./ShopApi.js";
import ShoppingCard from "./ShoppingCard.jsx";
import PurchaseModal from "./PurchaseModal.jsx";


function App() {
    const [shopItems, setShopItems] = useState([]);
    const [itemsInCards, setItemsInCards] = useState([]);
    const [gettingInformation, setGettingInformation] = useState(false)

    const refOfShoppingCardButton = useRef(null)


    const [purchasedItems,setPurchasedItems]= useState([])


    useEffect(() => {
        async function getItems() {
            if (gettingInformation)
                return
            let data = await getShopItems();
            setGettingInformation(false)
            setShopItems(data);
        }

        getItems()
    }, []);


    return (
        <>
            <NavigationBar useRef={refOfShoppingCardButton} itemsInCard={itemsInCards}
                           setItemsInCard={setItemsInCards} itemsInShop={shopItems} setItemsInShop={setShopItems} setPurchasedItems = {setPurchasedItems}/>
            <Outlet context={[shopItems, setShopItems, itemsInCards, setItemsInCards, refOfShoppingCardButton]}/>

            {purchasedItems.length > 0 && <PurchaseModal setPurchasedItems={setPurchasedItems} purchasedItemsArray={purchasedItems}></PurchaseModal>}

        </>
    )
}

export default App