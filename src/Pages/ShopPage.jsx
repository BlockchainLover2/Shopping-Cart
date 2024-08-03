import {useOutletContext} from "react-router-dom";
import PropTypes from "prop-types";
import {useEffect, useRef, useState, useTransition} from "react";

function ShopPage(){
    let outletContext = useOutletContext();
    const [shopItems, setShopItems] = outletContext.slice(0,2)
    const [itemsInCard,setItemsInCard] =  outletContext.slice(2,4)



    const refOfShoppingCard = outletContext.slice(4)[0]


    function addItemToCard(item,index){
        const newArray = shopItems.map((newItem,newIndex)=>{
            if(index === newIndex){
                newItem.stock--
            }
            return newItem

        })


        setItemsInCard([...itemsInCard,item])
        setShopItems(newArray)

    }





    return (
        <>
            <div className={"page shop"}>
                {shopItems.map((item, index) => {


                    return (
                            <ShopItem
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                price={item.price}
                                id = {item.id}
                                stock = {item.stock}
                                addItemToCard = {(item,cardImage)=>{
                                    addItemToCard(item,index)
                                    const shoppingCardButtonCoordinates = refOfShoppingCard.current?.getBoundingClientRect()
                                    const cardImageCoordinates = cardImage.getBoundingClientRect()
                                    const xMoveAmount = shoppingCardButtonCoordinates.x - cardImageCoordinates.x
                                    const yMoveAmount = shoppingCardButtonCoordinates.y - cardImageCoordinates.y - cardImageCoordinates.height / 2


                                    return [xMoveAmount, yMoveAmount]

                                }}
                                key = {index}
                            />
                    )
                })}
            </div>
        </>
    )
}



 function ShopItem({category,description,id,image,price,rating,title,addItemToCard,stock}){
     const [moveImageArray,setMoveImageArray] =  useState([])
     const [transformAmount,setTransformAmount] =  useState([0,0])



     function onClick(e){
         let newArray = addItemToCard({
             image,
             price,
             title,
         }, e.currentTarget.parentElement.parentElement)
         setMoveImageArray([...moveImageArray, e.currentTarget.parentElement.parentElement.firstChild])
         setTransformAmount(newArray)

     }



     return (
        <>
            <div className={"shop-item"}>
                <div className={"image-container"}>
                    <img src={image} alt=""/>
                </div>
                <p className={"title"}>{title}</p>

                {stock > 0 ? (
                    <>
                        <p className={"price"}>{price} $</p>
                        <div className={"button-container"}>
                            <button className={"buy-button"} onClick={(e) => onClick(e) }>Add To The
                                Card
                            </button>
                        </div>
                    </>

                ) :
                    (
                        <>
                            <p className={"out-of-stock"}>Out Of Stock</p>
                        </>

                    )
                }


                {moveImageArray.map((item, index) => {
                    if (item === undefined)
                        return


                    return <CardImageItem
                        key={index}
                        moveImageArray={moveImageArray}
                        transformAmount={transformAmount}
                        index={index} setMoveImageArray={setMoveImageArray} image={image}/>
                })}


            </div>
        </>

     )

 }

function CardImageItem({transformAmount, index, moveImageArray, setMoveImageArray, image}) {


    const [style, setStyle] = useState({
        "--x-amount": 0 + "px",
        "--y-amount": 0 + "px",
    })

     useEffect(() => {
             setStyle({
                 "--x-amount":transformAmount[0]+"px",
                 "--y-amount":transformAmount[1]+"px",
             })


     }, []);





     return (
         <div onTransitionEnd={(e) => {
             let node = e.currentTarget.parentElement.firstChild
             let newArray = [...moveImageArray]

             for (let i = 0; i < newArray.length; i++) {
                 if(newArray[i] === node){
                     delete newArray[i]
                     break
                 }
             }
             setMoveImageArray(newArray)
         }} className={"image-container to-card move-card-image"}   style={{...style}}>
             <img src={image} alt=""/>
         </div>
     )

 }

ShopItem.propTypes = {
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
}


export default ShopPage