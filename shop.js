// start off with manually adding items with an id




cart = []
itemDatabase = [] // pretend this is a backend database
totalPrice = 0
// shop items would usually have an ID number attached to them to make it easier to manipulate in js


function fetchItems(){

    const jsonFromDatabase = `
    {
    "items":[
    {"name":"750s","price":300000,"id":"0"},
    {"name":"750","price":250000,"id":"1"},
    {"name":"750","price":250000,"id":"2"},
    {"name":"750","price":250000,"id":"3"}
    ]

    
    
    }`
    let itemDatabase = JSON.parse(jsonFromDatabase);
    return itemDatabase;

}


function setupListener(button){
    button.addEventListener("click",function(event){
        try{
            let numItems = itemDatabase.items.length -1
            itemID = event.target.parentElement.id;
            
            for(let i = 0; i <= numItems;i +=1){
                console.log(event.target.parentElement.id)
                console.log(itemDatabase.items[i].id)
                if(itemDatabase.items[i].id == event.target.parentElement.id){
                    console.log( itemDatabase.items[i].price)
                    totalPrice += itemDatabase.items[i].price;
                    cart.push(itemDatabase.items[i].name)
                    updateUI();

                }

            }
            
            console.log(totalPrice)
        }
        catch(err){
            console.log(err);
        }

    });
}

function updateUI(){
    document.getElementById("cart").innerHTML = `Cart:$${totalPrice}`;

}

function setupButtons(){

    try{
        allItems = document.getElementsByClassName("shopItem")
        numberOfItems = (allItems.length) - 1    // subtracting one so for loop will index correctly because for loops start at 0 & we are using <=
        for(let i = 0; i <= numberOfItems; i +=1){

            let itemChildren = allItems[i].children;
            let buyButton;
            for(x = 0; x <= (itemChildren.length-1); x += 1){
                
                if(itemChildren[x].classList.contains("buyCar")){
                    
                    buyButton = itemChildren[x];
                }
            }
            if(buyButton === undefined){
                throw("Error missing button!");
            }
            else{
                setupListener(buyButton);
            }
        }
    }
    catch(err){
        console.log(err);
    }
}


function constructUI(itemDatabase){

    let items = itemDatabase.items;
    for(let i=0;i <= items.length-1; i +=1){

        let container = document.createElement("div");
        container.id = items[i].id;
        container.classList.add("shopItem");

        let img = document.createElement("img");
        img.src = `mclaren${items[i].id}.jpg`;
        container.appendChild(img);

        let price = document.createElement("p");
        price.innerHTML = items[i].price;
        price.classList.add("price");
        container.appendChild(price);
        
        let button = document.createElement("button");
        button.innerHTML = "Buy";
        button.classList.add("buyCar");
        container.appendChild(button);

        document.body.appendChild(container);
        

    }
    setupButtons();

}

itemDatabase = fetchItems();

constructUI(itemDatabase);

