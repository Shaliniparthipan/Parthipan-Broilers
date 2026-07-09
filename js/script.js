console.log("JavaScript Connected");
const toast = document.querySelector("#toast")
const overlay = document.querySelector("#overlay")
const cartPanel = document.querySelector("#cartPanel");
const cartButton = document.querySelector("#cartButton");
const closeCart = document.querySelector("#closeCart")
cartButton.addEventListener("click",function(){
    cartPanel.classList.toggle("active");
    overlay.classList.toggle("active");
});
closeCart.addEventListener("click",function(){
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
})

window.addEventListener("scroll",function(){
    const header= document.querySelector("header");
    if(window.scrollY > 50){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky")
    }
});
function showToast(message){
    toast.innerHTML = "✅ " + message;
    toast.classList.add("show");
    setTimeout(function(){
        toast.classList.remove("show");
    },2500);
}

const menuToggle=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");
menuToggle.addEventListener("click" ,function(){
    navLinks.classList.toggle("active");
});
const topBtn = document.querySelector("#topBtn");
window.addEventListener("scroll",function(){
    if(window.scrollY > 10){
        topBtn.style.display="block";
    }
    else{
        topBtn.style.display="none"
    }
});
topBtn.addEventListener("click",function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
const allnavLinks = document.querySelectorAll(".nav-links a");
allnavLinks.forEach(function(link){

})
const sections = document.querySelectorAll("section");
const AllnavLinks= document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", function(){
    let currentSection="";
    sections.forEach(function(section){ 
        const sectionTop=section.offsetTop-120;
        const sectionHeight=section.offsetHeight;
        if(window.scrollY>=sectionTop && 
            window.scrollY < sectionTop + sectionHeight
        ){
            currentSection = section.getAttribute("id");
        }
    });
    AllnavLinks.forEach(function(link){
        link.classList.remove("active");
        if(link.getAttribute("href")=== "#" + currentSection){
            link.classList.add("active");
        }
    })
});
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll",function(){
    reveals.forEach(function(reveal){
        const windowHeight= window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;
        if(revealTop < windowHeight - revealPoint){
    reveal.classList.add("active");
}else{
    reveal.classList.remove("active");
}
    }); 
});
const counters = document.querySelectorAll(".counter");
counters.forEach(function(counter){
    const target=Number(counter.dataset.target)
    let count=0;
    const timer = setInterval(function(){
        count++ ;
        counter.innerText = count;
        if(count >= target){
            clearInterval(timer);
        }
    },10)
});
const searchInput=document.querySelector("#searchInput");
const productCards=document.querySelectorAll(".product-card");
const noProducts=document.querySelector("#noProducts")
 
searchInput.addEventListener("input",function(){
    let found=false;
    const searchText=searchInput.value.toLowerCase();
    productCards.forEach(function(card){
          const productName=card.textContent.toLowerCase();
            if(productName.includes(searchText)){
                 found = true;
                card.style.display="";
            }else{
                card.style.display="none";
            }
        
    });
    if(found){
    noProducts.style.display="none"
 }  else{
    noProducts.style.display="block"
 }

});
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(function(button){
    button.addEventListener("click",function(){
        filterButtons.forEach(function(btn){
            btn.classList.remove("active")
        })
        button.classList.add("active")
        const filterValue = button.dataset.filter;
        productCards.forEach(function(card){
            const productCategory=card.dataset.category;

        if(filterValue==="all" || filterValue===productCategory){
            card.style.display="";
        }else{
            card.style.display="none";
        }
         }); 

    });
});

const modalImage = document.querySelector("#modalImage");
const viewButtons = document.querySelectorAll(".view-details");
const modal = document.querySelector("#productModal");
const closeBtn = document.querySelector(".close");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalPrice = document.querySelector("#modalPrice");
const whatsappBtn = document.querySelector("#whatsappBtn");
viewButtons.forEach(function(button){
    button.addEventListener("click",function(){
        const card=button.closest(".product-card");
        const title=card.querySelector("h3").textContent;
        const description=card.querySelector("p").textContent;
        const image = card.dataset.image;
        const price = card.dataset.price;
        const phone ="9788835930";
        const message =`Hello,Parthipan Broilers! I want to order ${title} (${price})`;
        whatsappBtn.href=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        modalTitle.textContent=title;
        modalDescription.textContent=description;
        modalPrice.textContent=price;
        modalImage.src=image;
        modal.style.display="block";
       
    });
});
closeBtn.addEventListener("click",function(){
    modal.style.display="none"
});
window.addEventListener("click",function(event){
    if(event.target===modal){
        modal.style.display="none";
    }
});
const cartTotal = document.querySelector("#cartTotal");
const addCartButtons=document.querySelectorAll(".add-cart");
const cartCount=document.querySelector("#cartCount");   
 const cartItems=document.querySelector("#cartItems");
let cart=[];
const savedCart = localStorage.getItem("cart");
if(savedCart){
    cart = JSON.parse(savedCart);
    displayCart();
    cartCount.textContent=cart.length;
}
function saveCart(){
        localStorage.setItem("cart",JSON.stringify(cart));
       }
 function displayCart(){
    if(cart.length === 0){
    cartItems.innerHTML = `
        <p style="text-align:center;padding:30px;color:#777;">
        🛒 Your cart is empty
        </p>`;
    cartTotal.textContent = "Total : ₹0";
    return;
}
        cartItems.innerHTML="";
        let total=0;
         cart.forEach(function(item,index){
            const price = parseInt(item.price.replace("₹",""));
            total += price*item.quantity;
            cartItems.innerHTML+=`
            <div class="cart-item">
            <div class="cart-image">
            <img src="${item.image}" alt="${item.name}">
            </div>
           <div class="cart-details">
    <h4>${item.name}</h4>
    <p>${item.price}</p>
    <div class="cart-actions">
        <div class="quantity-controls">
            <button class="minus-btn" data-index="${index}">−</button>
            <span>${item.quantity}</span>
            <button class="plus-btn" data-index="${index}">+</button>
        </div>
        <button class="remove-btn" data-index="${index}">
            🗑 Remove
        </button>
    </div>
</div>`;  
         });
         cartTotal.textContent = `Total: ₹${total}`;
         }
addCartButtons.forEach(function(button){
    button.addEventListener("click",function(){
        const card=button.closest(".product-card");
        const product={
            name:card.querySelector("h3").textContent,
            price:card.dataset.price,
            image:card.dataset.image,
            quantity : 1
        };
        const existingProduct = cart.find(function(item){
            return item.name === product.name;
        });
        if (existingProduct){
            existingProduct.quantity++;  
             showToast(product.name + " is already in your cart.");
        }else{
        cart.push(product);
        showToast(product.name + " added to cart.");
        }
        displayCart();
        
        
        cartCount.textContent=cart.length;
        saveCart();
        }); 
        });
         
        cartItems.addEventListener("click",function(event){
            if(event.target.classList.contains("remove-btn")){
                const index=event.target.dataset.index;
                cart.splice(index, 1);
                cartCount.textContent=cart.length;
                saveCart();
            };
            displayCart();
             if(event.target.classList.contains("plus-btn")){
                const index = event.target.dataset.index;
                cart[index].quantity++;
                displayCart();
                saveCart();
             };

             if(event.target.classList.contains("minus-btn")){
            const index = event.target.dataset.index;
            if(cart[index].quantity > 1){
            cart[index].quantity--;
        }else{
            cart.splice(index,1);
            cartCount.textContent = cart.length;
            saveCart();

       }
       
           displayCart();
       }
             });
       const slides = document.querySelectorAll(".hero-slider img");
let currentSlide = 0;
setInterval(function(){
    slides[currentSlide].classList.remove("active");
    currentSlide++;
    if(currentSlide >= slides.length){
        currentSlide = 0;
    }
    slides[currentSlide].classList.add("active");
},3000);
const orderModal = document.querySelector("#orderModal");
const closeOrder = document.querySelector(".close-order");
const sendOrder = document.querySelector("#sendOrder");

let selectedProduct = "";
let selectedPrice = "";
const quickOrderButtons = document.querySelectorAll(".quick-order");
quickOrderButtons.forEach(function(button){
    button.addEventListener("click", function(){
        const card = button.closest(".product-card");
        const orderProduct = document.querySelector("#orderProduct");
        const orderPrice = document.querySelector("#orderPrice");
        closeOrder.addEventListener("click", function () {
          orderModal.style.display = "none"; 
    });
        selectedProduct = card.querySelector("h3").textContent;
        selectedPrice = card.dataset.price;
        orderModal.style.display = "block";
        orderProduct.textContent = selectedProduct;
        orderPrice.textContent = selectedPrice;
        orderModal.style.display = "block";
    });
});
const customerName = document.querySelector("#customerName");
const customerPhone = document.querySelector("#customerPhone");
const orderQty = document.querySelector("#orderQty");
const customerAddress = document.querySelector("#customerAddress");
sendOrder.addEventListener("click", function () {
    const name = customerName.value;
    const phone = customerPhone.value;
    const quantity = orderQty.value;
    const address = customerAddress.value;
    if(name === "" || phone === "" || quantity === "" || address === ""){
        alert("Please fill all the fields.");
        return;
    }
    const shopNumber = "919788835930";
    const message =
`Hello Parthipan Broilers,
I would like to place an order.
🐔 Product : ${selectedProduct}
💰 Price : ${selectedPrice}
📦 Quantity : ${quantity}
👤 Name : ${name}
📞 Phone : ${phone}
🏠 Address : ${address}
Please confirm my order.
Thank you!`;
    window.open(
        `https://wa.me/${shopNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
    });
const checkoutModal = document.querySelector("#checkoutModal");
const closeCheckout = document.querySelector(".close-checkout");
const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutItems = document.querySelector("#checkoutItems");
const checkoutTotal = document.querySelector("#checkoutTotal");
const placeOrder = document.querySelector("#placeOrder");
// OPEN CHECKOUT
checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    checkoutItems.innerHTML = "";
    let total = 0;
    cart.forEach(function(item){
        const price = parseInt(item.price.replace("₹",""));
        const itemTotal = price * item.quantity;
        total += itemTotal;
        checkoutItems.innerHTML += `
        <div class="checkout-item">
            <div class="checkout-left">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>
            <div class="checkout-right">
                <p>Qty : ${item.quantity}</p>
                <h4>₹${itemTotal}</h4>
            </div>
        </div>`;
    });
    checkoutTotal.textContent = "Total : ₹" + total;
    checkoutModal.style.display = "block";
});
// CLOSE BUTTON
closeCheckout.addEventListener("click", function () {
    checkoutModal.style.display = "none";
});
// CLICK OUTSIDE
window.addEventListener("click", function (event) {
    if(event.target === checkoutModal){
        checkoutModal.style.display = "none";
    }
});
// PLACE ORDER
placeOrder.addEventListener("click", function(){
    const customerName = document.querySelector("#checkoutName").value.trim();
    const customerPhone = document.querySelector("#checkoutPhone").value.trim();
    const customerAddress = document.querySelector("#checkoutAddress").value.trim();
     const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    if(
        customerName === "" ||
        customerPhone === "" ||
        customerAddress === ""
    ){
        alert("Please fill all details.");
        return;
    }
    let orderList = "";
    let total = 0;
    cart.forEach(function(item){
        const price = parseInt(item.price.replace("₹",""));
        const itemTotal = price * item.quantity;
        total += itemTotal;
        orderList +=`${item.name}Qty : ${item.quantity} Price : ₹${itemTotal}`;
    });
    const message =`🐔 *Parthipan Broilers Order*
👤 Name : ${customerName}
📞 Phone : ${customerPhone}
📍 Address :
${customerAddress}
💳 Payment : ${paymentMethod}
-------------------------
${orderList}
-------------------------
💰 Total : ₹${total}
Thank you!`;
 const phone = "919788835930";
placeOrder.disabled = true;
placeOrder.textContent = "Opening WhatsApp...";
window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
);
showToast("✅ Your order has been placed successfully!");
setTimeout(function(){
    placeOrder.disabled = false;
    placeOrder.textContent = "Place Order on WhatsApp";
},3000);
});
window.addEventListener("load",function(){
    setTimeout(function(){
        document.querySelector("#loader").style.opacity = "0";
        setTimeout(function(){
            document.querySelector("#loader").style.display = "none";
        },600);
    },1500);
});
const progressBar = document.querySelector("#progressBar");
window.addEventListener("scroll", function(){
    const scrollTop = window.scrollY;
    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / pageHeight) * 100;
    progressBar.style.width = progress + "%";
});
