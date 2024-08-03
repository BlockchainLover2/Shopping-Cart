import {useOutletContext} from "react-router-dom";
import PropTypes from "prop-types";
import {useRef, useState} from "react";

function ShopPage(){
    let outletContext = useOutletContext();
    const [shopItems, setShopItems] = outletContext.slice(0,2)
    const [itemsInCard,setItemsInCard] =  outletContext.slice(2,4)



    const refOfShoppingCard = outletContext.slice(4)[0]


    function addItemToCard(item){
        setItemsInCard([...itemsInCard,item])
    }



    return (
        <>
            <div className={"page shop"}>
                {shopItems.map((item, index) => {
                    return (
                            <ShopItem
                                category={item.category}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                price={item.price}
                                id = {item.id}
                                addItemToCard = {(item,cardImage)=>{
                                    addItemToCard(item)
                                    const shoppingCardButtonCoordinates = refOfShoppingCard.current?.getBoundingClientRect()
                                    const cardImageCoordinates = cardImage.getBoundingClientRect()
                                    const xMoveAmount = shoppingCardButtonCoordinates.x - cardImageCoordinates.x
                                    const yMoveAmount = shoppingCardButtonCoordinates.y - cardImageCoordinates.y
                                    cardImage.style.setProperty("--x-amount",xMoveAmount+"px")
                                    cardImage.style.setProperty("--y-amount",yMoveAmount+"px")
                                }}
                                key = {index}
                            />
                    )
                })}
            </div>
        </>
    )
}



 function ShopItem({category,description,id,image,price,rating,title,addItemToCard}){
     const [classNameForCardImage,setClassNameForCardImage] =  useState("")
     const [moveImageArray,setMoveImageArray] =  useState([])
     const [isVisible,setIsVisible] = useState(false);


    return (
        <>
            <div className={"shop-item"}>
                <div className={"image-container"}>
                    <img src={image} alt=""/>
                </div>
                <p className={"title"}>{title}</p>
                <p className={"price"}>{price} $</p>
                <div className={"button-container"}>
                    <button className={"buy-button"} onClick={(e) => {

                        setIsVisible(true)

                        addItemToCard({image, price, title},e.currentTarget.parentElement.parentElement.lastChild)
                        setClassNameForCardImage("move-card-image")

                    }}>Add To The
                        Card
                    </button>
                </div>

                <div onTransitionEnd={()=> {
                    setIsVisible(false)
                    setClassNameForCardImage("")
                }} className={"image-container to-card "+classNameForCardImage + (!isVisible ? " hide":"")}>
                    <img src={image} alt=""/>
                </div>

            </div>
        </>

    )

 }

ShopItem.propTypes = {
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    image:PropTypes.string,
    price:PropTypes.number,
    title:PropTypes.string,
}



export default ShopPage