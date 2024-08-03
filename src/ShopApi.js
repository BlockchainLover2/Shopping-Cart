async function getShopItems(){
    let response = await fetch("https://fakestoreapi.com/products")
    let json = await response.json();
    let newArray = []

    for (const jsonElement of json) {
        let newElement = {id:jsonElement.id,
        title:jsonElement.title,price:jsonElement.price,
        description:jsonElement.description,image:jsonElement.image,
        stock:getRandomInt(0,15)}
        newArray.push(newElement)
    }


    return newArray

}

function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

export default getShopItems