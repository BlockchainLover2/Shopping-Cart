async function getShopItems(){
    let response = await fetch("https://fakestoreapi.com/products")
    let json = await response.json();

    return json

}

export default getShopItems