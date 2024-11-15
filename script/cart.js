const booksContainer = document.querySelector('#cart-books-container');

let cartData = [];
document.addEventListener("DOMContentLoaded", () => {
    // booksData = JSON.parse(localStorage.getItem('booksData')) || [];
    cartData = JSON.parse(localStorage.getItem('card')) || [];
    // console.log(booksData);
    console.log(cartData);
    displayCart();
});

function displayCart() {
    booksContainer.innerHTML = "";
    if (cartData.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Your Cart is empty, Add items from shop.";
        emptyMessage.className = "text-center text-gray-500 mt-16 mb-8 md:mb-12 text-lg md:text-2xl font-semibold";
        booksContainer.appendChild(emptyMessage);
        return;
    }

    cartData.forEach((book,index) => {
        const cartBook = document.createElement('div');
        cartBook.className = "grid grid-cols-[50%,auto,auto,auto,3%] items-center border-b p-2 gap-2 sm:gap-4 hover:bg-gray-100";
        cartBook.innerHTML = `
                         <div class="flex items-center gap-2">
                            <img src="${book.img}" alt="${book.title}"
                                class="w-12 h-16 object-contain">
                            <span class="text-gray-800">${book.title}</span>
                        </div>

                        <!-- prix -->
                        <div class="text-gray-700">$${book.price}</div>

                        <!-- quantity -->
                        <div class="">
                            <input type="number" class="w-12 text-center border rounded" value="2" min="1">
                        </div>

                        <!-- subtotal -->
                        <div class="text-gray-700">$160.00</div>

                        <!-- delete icon -->
                        <button class="trash-icon">
                            <i class="fa-solid fa-trash" style="color: #ffc857;"></i>
                        </button>
                         `
        booksContainer.appendChild(cartBook);

        const removeIcon = cartBook.querySelector('.trash-icon');
        removeIcon.addEventListener('click', () => {
            cartBook.remove();
            cartData.splice(index, 1);
            localStorage.setItem('card', JSON.stringify(cartData));
            if (cartData.length === 0) {
                displayCart();
            }
        });

    });


}