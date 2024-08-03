import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";

function ShoppingCard({changeStates,setPurchasedItems,itemsInCard, setItemsInCard, isExpending , isClosing,setIsClosing,shopItems,setShopItems}){

    const expending = isExpending ? "expending" : ""
    const closing = isClosing ? "closing" : ""

    const itemsEndRef = useRef(null)

    const scrollToBottom = () => {
        itemsEndRef.current?.scrollIntoView({  behavior: "smooth" ,block:"nearest" })
    }


    useEffect(() => {
            scrollToBottom()

    }, [itemsInCard]);


    function removeFromCard(item,index){
        const newArray = shopItems.map((newItem,newIndex)=>{
            if(item.title === newItem.title){
                newItem.stock++
            }
            return newItem

        })

        let newItemsInCard = [...itemsInCard.slice(0,index),...itemsInCard.slice(index+1)]


        setItemsInCard(newItemsInCard)
        setShopItems(newArray)
    }


    let sum = 0

    return (

        <div onAnimationEnd={(e)=>{
            if(e.animationName === "reverseExpand")
                setIsClosing(false)
        }} className={"shopping-card " + expending + " "+closing}>
            {itemsInCard.map((item, index) => {
                sum+=item.price


                return (
                    <CardElement  item={item} key = {index} index={index} onClick={removeFromCard}/>
                )
            })}
            <div className={"button-container"}>
                <button onClick={()=>{
                    setPurchasedItems([...itemsInCard])
                    setItemsInCard([])
                    changeStates(true)
                }} className={"checkout-button"}>Checkout</button>
            </div>
            <p ref={itemsEndRef}>{sum}</p>
        </div>
    )
}

function CardElement({item,onClick,index}){
    const [specialClass,setSpecialClass] = useState("special")




    return (

        <div  onAnimationEnd={(e)=>{
            if(e.animationName === "opacityUp"){
                setSpecialClass("")
            }
        }} className={"card-item " + specialClass}>
            <div className={"image-container"}>
                <img src={item.image} alt=""/>
            </div>
            <p className={"title"}>{item.title}</p>
            <p className={"price"}>{item.price} $</p>
            <div className={"button-container"}>
                <button onClick={()=>{onClick(item,index)}} className={"remove-card-item-button"}>Remove</button>
            </div>
        </div>


    )

}


ShoppingCard.propTypes = {
    itemsInCard: PropTypes.array.isRequired,
    setItemsInCard: PropTypes.func.isRequired,
}

export default ShoppingCard

