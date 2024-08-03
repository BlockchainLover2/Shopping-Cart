import {useEffect, useState} from "react";

function PurchaseModal({purchasedItemsArray,setPurchasedItems}){

    const [animationClass,setAnimationClass] = useState("")

    useEffect(() => {
        setAnimationClass("visible")
    }, []);

    return (
        <>
            <div onTransitionEnd={(event)=>{
                if(!event.target.classList.contains("visible") && event.target.tagName === "DIV")
                    setPurchasedItems([])
            }} className={"purchase-modal "+animationClass}>
                <h1>You have successfully purchased!</h1>
                <div className={"purchased-items"}>
                    {purchasedItemsArray.map((item,index)=>{
                        return <PurchaseModalItem key={index} item={item}/>
                    })}
                </div>

                    <div className={"button-container"}>
                        <button onClick={()=>setAnimationClass("")}>OK</button>
                    </div>
            </div>
        </>


    )
}


export default PurchaseModal

function PurchaseModalItem({item}) {

    return (
        <>
            <div className={"purchase-modal-item"}>
                <div className={"image-container"}>
                    <img src={item.image} alt=""/>
                </div>
                <p className={"title"}>{item.title}</p>
                <p className={"price"}>{item.price} $</p>
            </div>

        </>
    )
}





