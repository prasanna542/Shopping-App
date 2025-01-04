document.addEventListener('DOMContentLoaded', ()=> {
    
    const cart_div = document.getElementById("cart_details");
    const total_amt = document.getElementById("total_amount");
    const checkout_btn = document.getElementById("checkout");

    // products = [
    //     {id:1, name:"product-1", price:25},
    //     {id:2, name:"product-2", price:45},
    //     {id:3, name:"product-3", price:15}
    // ];

    // //lets upload these products to local storage only first time 
    // localStorage.setItem("products",JSON.stringify(products));

    products = []; 
    cart = [];

    let total_amount = 0;
    total_amt.textContent = `RS ${total_amount}`;


    function update_total(amount){
        total_amount = total_amount + amount;
        total_amt.textContent = `RS ${total_amount}`;
    }


    checkout_btn.addEventListener("click",()=>{
        alert("checked out successfully!!!!");
        cart=[];
        total_amount = 0;
        update_total(0);
        empty_cart();
    })


    function empty_cart(){
        cart_div.innerHTML = "<h2>Cart is empty</h2>";
    }

    //lets take all the products
    function takeAllProductsFromLocalStorage(){
        products  = JSON.parse(localStorage.getItem('products')) || []; 
    }

    //
    function updateCart(id,name,price,product){
        if(cart.length === 0){

            cart_div.innerHTML = "<h2>Cart</h2>";
            cart.push(product);
            let div_cart = document.createElement('div');
            div_cart.innerHTML = `${name}- Rs${price}`;
            cart_div.appendChild(div_cart);
            update_total(price);


        }
        else{
            cart.push(product);
            let div_cart = document.createElement('div');
            div_cart.innerHTML = `${name}- Rs${price}`;
            cart_div.appendChild(div_cart);
            update_total(price);

        }
        


    }

    takeAllProductsFromLocalStorage();
    // console.log(products);
    

    
    const product_div = document.getElementById("product_list");

    products.forEach(product => {

        let idHere = product.id;
        let nameHere = product.name;
        let priceHere =  product.price;

        let divHere = document.createElement('div');
        divHere.innerHTML= `<span>${nameHere} - Rs ${priceHere}</span> <button>Add to Cart</button>` ;

        divHere.addEventListener("click",(event)=>{
            if(event.target.tagName === 'BUTTON'){
                // cart.push();
                console.log(cart);
                updateCart(idHere,nameHere,priceHere,product);
                // alert("cart_updated");
            }
        });

        product_div.appendChild(divHere);


        
    });
})