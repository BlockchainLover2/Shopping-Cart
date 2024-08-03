import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";

function ShoppingCard({items, setItems, isExpending , isClosing,setIsClosing}){

    const expending = isExpending ? "expending" : ""
    const closing = isClosing ? "closing" : ""

    const itemsEndRef = useRef(null)

    const scrollToBottom = () => {
        itemsEndRef.current?.scrollIntoView({ inline:"center",  behavior: "smooth" ,block:"nearest" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [items]);



    let sum = 0

    return (

        <div onAnimationEnd={(e)=>{
            if(e.animationName === "reverseExpand")
                setIsClosing(false)
        }} className={"shopping-card " + expending + " "+closing}>
            {items.map((item, index) => {
                sum+=item.price


                return (
                    <CardElement  item={item} key = {index}/>
                )
            })}
            <div className={"button-container"}>
                <button className={"checkout-button"}>Checkout</button>
            </div>
            <p ref={itemsEndRef}>{sum}</p>
        </div>

    )
}

function CardElement({item}){
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
        </div>



    )

}



ShoppingCard.propTypes = {
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired,
}

export default ShoppingCard

