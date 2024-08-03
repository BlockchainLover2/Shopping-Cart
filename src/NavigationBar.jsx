import {Link} from "react-router-dom";
import ShoppingCard from "./ShoppingCard.jsx";
import {useState} from "react";

function NavigationBar({items,setItems,useRef}){
    const [isExpending,setIsExpending] = useState(false);
    const [isClosing,setIsClosing] = useState(false);


    function changeStates(){
        setIsExpending(!isExpending);
        if(isExpending)
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
                    <button ref={useRef} onClick={()=>{changeStates()}} className={"header-button"}>Shopping Card</button>
                    <ShoppingCard setIsClosing={setIsClosing} isExpending = {isExpending} isClosing={isClosing} setItems={setItems} items={items}/>
                </div>
            </nav>
        </>
    )
}


export default NavigationBar