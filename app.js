//app.js
//Variable that maintain visible state of cart
var cartVisible = false;

//element of the page
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //add button-functionality
  var buttonEliminaItem = document.getElementsByClassName("btn-eliminate");
  for (var i = 0; i < buttonEliminaItem.length; i++) {
    var button = buttonEliminaItem[i];
    button.addEventListener("click", eliminaItemCart);
  }
  //plus button
  var buttonPlusQuantity = document.getElementsByClassName("plus-quantity");
  for (var i = 0; i < buttonPlusQuantity.length; i++) {
    var button = buttonPlusQuantity[i];
    button.addEventListener("click", plusQuantity);
  }
  //Minus button
  var buttonMinusQuantity = document.getElementsByClassName("remove-quantity");
  for (var i = 0; i < buttonMinusQuantity.length; i++) {
    var button = buttonMinusQuantity[i];
    button.addEventListener("click", minusQuantity);
  }

  //button add element
  var buttonAddCart = document.getElementsByClassName("button-item");
  for (var i = 0; i < buttonAddCart.length; i++) {
    var button = buttonAddCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //Button pay
  document
    .getElementsByClassName("btn-pay")[0]
    .addEventListener("click", payClicked);
}
//Eliminate select item
function eliminaItemCart(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  //Update total item
  updateTotalCart();
  //hidden cart
  hiddenCart();
}
//Update Total
function updateTotalCart() {
  var cartContainer = document.getElementsByClassName("cart")[0];
  var cartItems = cartContainer.getElementsByClassName("cart-item");
  var total = 0;

  //we run each element
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var priceElement = item.getElementsByClassName("cart-item-price")[0];
    console.log(priceElement);

    var price = parseFloat(
      priceElement.innerText.replace("$", "").replace(".", "")
    );
    console.log(price);
    var quantityItem = item.getElementsByClassName("cart-item-quantity")[0];
    var quantity = quantityItem.value;
    console.log(quantity);
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-price-total")[0].innerText =
    "$" + total.toLocaleString("en") + ".00";
}
function hiddenCart() {
  var cartItems = document.getElementsByClassName("cart-items")[0];
  if (cartItems.childElementCount == 0) {
    var cart = document.getElementsByClassName("cart")[0];
    cart.style.marginRight = "-100%";
    cart.style.opacity = "0";
    cartVisible = false;

    //maximize the container of items
    var items = document.getElementsByClassName("container-items")[0];
    items.style.width = "100%";
  }
}

//Increase element
function plusQuantity(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var quantityCurrent =
    selector.getElementsByClassName("cart-item-quantity")[0].value;
  console.log(quantityCurrent);
  quantityCurrent++;
  selector.getElementsByClassName("cart-item-quantity")[0].value =
    quantityCurrent;
  updateTotalCart();
}
function minusQuantity(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var quantityCurrent =
    selector.getElementsByClassName("cart-item-quantity")[0].value;
  console.log(quantityCurrent);
  quantityCurrent--;
  //contoler
  if (quantityCurrent >= 1) {
    selector.getElementsByClassName("cart-item-quantity")[0].value =
      quantityCurrent;
    updateTotalCart();
  }
}

function addCartClicked(event) {
  var button = event.target;
  var item = button.parentElement;
  var title = item.getElementsByClassName("title-item")[0].innerText;
  console.log(title);
  var price = item.getElementsByClassName("price-item")[0].innerText;
  var imageSrc = item.getElementsByClassName("img-item")[0].src;
  console.log(imageSrc);

  //function add element to cart
  addItemCart(title, price, imageSrc);
  makeVisibleCart();
}

function addItemCart(title, price, imageSrc) {
  var item = document.createElement("div");
  item.classList.add = "item";
  var itemsCart = document.getElementsByClassName("cart-items")[0];

  var nameItemCart = itemsCart.getElementsByClassName("cart-item-title");
  for (var i = 0; i < nameItemCart.length; i++) {
    if (nameItemCart[i].innerText == title) {
      alert("The item is already in the cart. ");
      return;
    }
  }
  var itemCartContent = `
    <div class="cart-item">
                  <img src="${imageSrc}" alt="" width="80px">
                  <div class="cart-item-details">
                    <span class="cart-item-title">${title}</span><br>
                    <div class="selector-quantity">
                        <i class="fa-solid fa-minus remove-quantity"></i>
                        <input type="text" value="1" class="cart-item-quantity" disabled>
                        <i class="fa-solid fa-plus plus-quantity"></i>
                    </div>
                    <span class="cart-item-price">${price}</span>
                  </div>
                  <span class="btn-eliminate">
                    <i class="fa-solid fa-trash"></i>
                  </span>                    
                </div>
                `;
  item.innerHTML = itemCartContent;
  itemsCart.append(item);

  //remove new item
  item
    .getElementsByClassName("btn-eliminate")[0]
    .addEventListener("click", eliminaItemCart);
  //Add new item
  var buttonPlusQuantity = item.getElementsByClassName("plus-quantity")[0];
  buttonPlusQuantity.addEventListener("click", plusQuantity);

  //Minus new item
  var buttonMinuQuantity = item.getElementsByClassName("remove-quantity")[0];
  buttonMinuQuantity.addEventListener("click", minusQuantity);
  updateTotalCart();
}

function payClicked(event) {
  alert("Thanks for your purchase!!");

  // Retrieve cart details from the DOM
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var items = cartItems.getElementsByClassName("cart-item");
  var cart = {
    subtotal: 0,
    tax: 0,
    total: 0,
  };
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var priceElement = item.getElementsByClassName("cart-item-price")[0];
    var quantityElement = item.getElementsByClassName("cart-item-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    var itemTotal = price * quantity;
    cart.subtotal += itemTotal;
  }
  cart.tax = cart.subtotal * 0.1;
  cart.total = cart.subtotal + cart.tax;

  // Create a new element with the payment information
  var paymentInfo = document.createElement("div");

  // Fill the payment information with the cart details
  paymentInfo.innerHTML = "<h1>Better LifeStyle </h1>";
  paymentInfo.innerHTML += "<h2>Payment Details</h2>";
  paymentInfo.innerHTML += "<p>Subtotal: $" + cart.subtotal.toFixed(2) + "</p>";
  paymentInfo.innerHTML += "<p>Tax: $" + cart.tax.toFixed(2) + "</p>";
  paymentInfo.innerHTML += "<p>Total: $" + cart.total.toFixed(2) + "</p>";

  // Open a new window with the payment information
  var paymentWindow = window.open("", "_blank");
  paymentWindow.document.write(paymentInfo.innerHTML);
  paymentWindow.print();

  // Clear the cart
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateTotalCart();
  hiddenCart();
}

function makeVisibleCart() {
  cartVisible = true;
  var cart = document.getElementsByClassName("cart")[0];
  cart.style.marginRight = "0";
  cart.style.opacity = "1";

  var items = document.getElementsByClassName("container-items")[0];
  items.style.width = "60%";
}

/*function Receipt() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
  return total;
}*/