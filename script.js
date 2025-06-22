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

    cart_div.innerHTML = "<h2>Cart Here</h2>";


    products = [];   //initializing product array
    cart = [];  //initializing cart array

    let total_amount = 0;  //initializing total amount 
    total_amt.textContent = `RS ${total_amount}`;

    updateCartFromLocal();  //take cart products from local storage and render it on ui.
    

    function updateCartToLocal(){
        localStorage.setItem('cartProducts', JSON.stringify(cart));
    }


    function updateCartFromLocal(){
        cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
        renderCartProducts();
    }

    function renderCartProducts(){
       
            cart_div.innerHTML = "";
            cart_div.innerHTML = "<h2>Cart Here</h2>";

            total_amount = 0;
            update_total(0);
            // cart.push(product);
            cart.forEach((cart_product,index) => {
                let div_cart = document.createElement('div');
                div_cart.innerHTML = `Product- ${cart_product.id}- Rs${cart_product.price} <button >remove</button>`;
                

                div_cart.addEventListener("click",(event)=>{
                    if(event.target.tagName === 'BUTTON'){
                    // cart.push();
                    // console.log(cart);
                    // cart.push(product);
                    cart = cart.filter((item,indexhere) => index !== indexhere);  
                    total_amount = 0;
                    update_total(0);
                    updateCartToLocal();
                    updateCartFromLocal();
                    // renderCartProducts();

                    // updateCart(idHere,nameHere,priceHere,product);
                    // alert("cart_updated");
                    }
                });

                cart_div.appendChild(div_cart);
                update_total(cart_product.price);


            });
    }

    function update_total(amount){
        total_amount = total_amount + amount;
        total_amt.textContent = `RS ${total_amount}`;
    }


    checkout_btn.addEventListener("click",()=>{
        alert("checked out successfully!!!!");
        cart=[];
        updateCartToLocal();
        total_amount = 0;
        update_total(0);
        empty_cart();
    })


    function empty_cart(){
        cart_div.innerHTML = "<h2>Cart is empty</h2>";
    }

    //lets take all the products
    function takeAllProductsFromLocalStorage(){
        products  = JSON.parse(localStorage.getItem('products')) || [];     //this is how we get data from our local storage. 
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
                cart.push(product);
                updateCartToLocal();
                updateCartFromLocal();
                // renderCartProducts();

                // updateCart(idHere,nameHere,priceHere,product);
                // alert("cart_updated");
            }
        });

        product_div.appendChild(divHere);


        
    });
})