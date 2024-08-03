import './App.css'
import NavigationBar from "./NavigationBar.jsx";
import {Outlet} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import getShopItems from "./ShopApi.js";
import ShoppingCard from "./ShoppingCard.jsx";


function App() {
    const [shopItems,setShopItems] = useState([]);
    const [itemsInCards, setItemsInCards] = useState([]);

    const refOfShoppingCardButton = useRef(null)



    useEffect(() => {
        async function getItems(){
            let data = await getShopItems();
            setShopItems(data);
        }
        getItems()
    }, []);



    return (
        <>
            <NavigationBar useRef = {refOfShoppingCardButton} items={itemsInCards} setItems={setItemsInCards}/>
            <Outlet context={[shopItems,setShopItems,itemsInCards,setItemsInCards,refOfShoppingCardButton]} />
        </>
    )
}

export default App