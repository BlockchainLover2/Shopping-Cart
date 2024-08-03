import {useParams} from "react-router-dom";

function Page(){
    const { name } = useParams();

    return (
        <>
            {name === "shop" ? <p>Shop</p> : name === "home" ? <p>Home</p> : ""}
        </>
    )
}

export default Page