// // lấy các button thêm vào giỏ hàng và đặt sự kiện click cho chúng
// const addButtons = document.querySelectorAll('.add-to-cart');
// addButtons.forEach(button => {
// button.addEventListener('click', () => {
// const itemName = button.dataset.name;
// const itemPrice = parseInt(button.dataset.price);
// addToCart(itemName, itemPrice);
//  });
// });
// tạo một mảng chứa các sản phẩm trong giỏ hàng
let cartItems = [];

// lấy các button thêm vào giỏ hàng và đặt sự kiện click cho chúng
const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const itemName = button.dataset.name;
    const itemPrice = parseInt(button.dataset.price);
    
    // kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let found = false;
    cartItems.forEach(item => {
      if (item.name == itemName) {
        item.quantity++;
        found = true;
      }
    });
    
    // nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào mảng
    if (!found) {
      cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    } else {
      alert('Sản phẩm đã có trong giỏ hàng. Số lượng sản phẩm đã được tăng lên 1.');
    }
    
    // cập nhật giỏ hàng và tổng giá tiền
    updateCart();
    calculateTotalPrice();
  });
});

// hàm cập nhật giỏ hàng trên trang web
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
  
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <h3>${item.name}</h3>
        <div class='item-details'>
          <p>${item.price} $</p>
          <button class='quantity-btn minus'>-</button>
          <span class='quantity'>${item.quantity}</span>
          <button class='quantity-btn plus'>+</button>
          <button class='remove-btn'>x</button>
        </div>`;
  
      cartItemsElement.appendChild(cartItem);
  
      const minusButton = cartItem.querySelector('.minus');
      const plusButton = cartItem.querySelector('.plus');
      const removeButton = cartItem.querySelector('.remove-btn');
  
      // đặt sự kiện click cho các button tăng/giảm số lượng sản phẩm
      const quantityButtons = cartItem.querySelectorAll('.quantity-btn');
      quantityButtons.forEach(button => {
        button.addEventListener('click', () => {
          const cartItem = button.parentElement.parentElement;
          const itemName = cartItem.querySelector('h3').textContent;
  
          cartItems.forEach(item => {
            if (item.name == itemName) {
              if (button.classList.contains('plus')) {
                item.quantity++;
              } else if (button.classList.contains('minus')) {
                item.quantity--;
                if (item.quantity < 1) {
                  cartItems.splice(cartItems.indexOf(item), 1);
                  cartItem.remove();
                }
              }
            }
          });
  
          updateCart();
          calculateTotalPrice();
        });
      });
  
      // đặt sự kiện click cho các button xóa sản phẩm khỏi giỏ hàng
      removeButton.addEventListener('click', () => {
        const cartItem = removeButton.parentElement.parentElement;
        const itemName = cartItem.querySelector('h3').textContent;
        cartItems.forEach(item => {
          if (item.name == itemName) {
            cartItems.splice(cartItems.indexOf(item), 1);
          }
        });
  
        cartItem.remove();
        updateCart();
        calculateTotalPrice();
      });
    });
  }
  
  // hàm tính tổng giá tiền của các sản phẩm trong giỏ hàng
  function calculateTotalPrice() {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
  
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = totalPrice ;
    const totalCostElement = document.getElementById('costbg');
    totalCostElement.textContent = totalPrice;
    return totalPrice;
  }
  const cartbtn = document.querySelector(".fa-times")
const cartshow = document.querySelector("#cart-icon")
cartshow.addEventListener("click",function(){
 document.querySelector(".cart").style.right = "0"
})
cartbtn.addEventListener("click",function(){
   document.querySelector(".cart").style.right = "-100%"
})
const checkout = document.getElementById("checkout-button");

checkout.addEventListener("click", function() {
  window.location.href = "https://shopee.vn/";
});