// start off with manually adding items with an id
cart = []
itemDatabase = [] // pretend this is a backend database
totalPrice = 0
// shop items would usually have an ID number attached to them to make it easier to manipulate in js


function fetchItems(){

    // pretend this is coming from a backend database
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

            //this loops through the object containing all the tiems and checks for a match on the ids.
                    // if it finds a match , it adds a number onto the total
            for(let i = 0; i <= numItems;i +=1){

                if(itemDatabase.items[i].id == event.target.parentElement.id){
                    console.log( itemDatabase.items[i].price)
                    totalPrice += itemDatabase.items[i].price;
                    cart.push(itemDatabase.items[i].name)
                    updateUI();

                }

            }
            

        }
        catch(err){
            console.log(err);
        }

    });
}

//this function runs after all of the click logic is complete to ensure we see our total Price increasing.
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

                //use the contains() function for checking if an elemnet has a class attached to it
                //use includes when checking ifa string includes a certain word.
                
                if(itemChildren[x].classList.contains("buyCar")){
                    
                    buyButton = itemChildren[x];
                }
            }
            //before adding an event listener onto the buttons it checks if the button exists.
            
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
    // this functions gets the number of items in our items object 
        // for each item it create a container (div)
        // and adds in ui elements as well as relevant ids,classes, innerHtml
    // after it finishes, it runs the function to setup event listeners for the buttons so they can work 
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


// The program starts off by fetching items from our mock backend database.
itemDatabase = fetchItems();

//Depending on the number of the items, it dynamically constructs UI elements
    // there is a function within the function that adds event listeners to all the buttons
constructUI(itemDatabase);



// While this lesson may seem similar to previous examples (another online store)
    // It is actually quite different. In this case, we wil be dynamically constructing UI elements based ona "mock database"
    // This will help you start to understand the mindset of server side code and browser code.



// Both of these are Backend Code they just run in the same location. 

// Browser JavaScript handles things like 
    //Visual Interactivity (popups appearing when you  click on more info)
    // Animations
    // Validating data before sending it to the server (checking if user has entered in the correct format)

// Server side Javascript handles things like
        //getting data from the database
        //sending a file from the user to download 
        // authentication and security
        // handling important/secretive logic (eg search engine algorithms wouldnt be on the browser regardless of what language they are written in)
