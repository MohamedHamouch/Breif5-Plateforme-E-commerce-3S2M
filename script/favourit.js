const otherBook1 = document.getElementById('other-book1');
const otherBook2 = document.getElementById('other-book2');
const otherBook3 = document.getElementById('other-book3');
const otherBook4 = document.getElementById('other-book4');
const favContainer = document.querySelector('#favContainer');

let booksData = [];
let favData = [];
document.addEventListener("DOMContentLoaded", () => {
    booksData = JSON.parse(localStorage.getItem('booksData')) || [];
    favData = JSON.parse(localStorage.getItem('favourite')) || [];
    favourite = JSON.parse(localStorage.getItem('favourite')) || [];
    showdata()
    displayBooks()
    displayFavBooks();
});

function displayFavBooks() {
    favContainer.innerHTML = "";
    favContainer.className = "w-full sm:w-4/5 md:w-3/4 lg:w-11/12 xl:w-10/12 min-h-44 grid lg:grid-cols-2 gap-y-8 lg:gap-x-8 xl:gap-x-14 px-3 sm:px-5 m-auto text-base sm:text-lg md:text-2xlg lg:text-lg xl:text-xl";

    if (favData.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Your favourite list is empty.";
        emptyMessage.className = "text-center text-gray-500 mt-4 mb-6 md:mb-12 text-lg md:text-3xl font-semibold";
        favContainer.classList.remove("grid", "lg:grid-cols-2", "gap-y-8", "lg:gap-x-8", "xl:gap-x-14");
        favContainer.classList.add("flex", "flex-col", "items-center", "justify-center");
        favContainer.appendChild(emptyMessage);
        return;
    }

    favData.forEach((book) => {
        let newBook = document.createElement('div');
        newBook.className = "grid grid-cols-[35%,1fr] p-2 sm:p-4 min-h-44 rounded-md md:rounded-lg fav-book";
        newBook.innerHTML = `
            <img src="${book.img}" alt="${book.title}" class="w-[85%] sm:w-4/5 h-auto object-contain">
            <div class="flex flex-col justify-between font-semibold">
                <p>${book.title}</p>
                <p>by <span class="font-bold text-[#4B6587]">${book.author}</span></p>
                <p>${book.category}</p>
                <p class="text-[#C44436]">$${book.price}</p>
                <div class="flex justify-between">
                    <button class="add-cart-btn bg-[#4B6587] text-white text-xs sm:text-base lg:text-sm xl:text-base md:p-2 lg:p-0 font-semibold w-2/5 lg:w-[45%] xl:w-2/5 h-9 sm:h-11 lg:h-9 xl:h-11 rounded-md">Add to Cart</button>
                    <button class="remove-fav-btn bg-[#C44436] text-white text-xs sm:text-base lg:text-sm xl:text-base md:p-2 lg:p-0 font-semibold w-2/5 lg:w-[45%] xl:w-2/5 h-9 sm:h-11 lg:h-9 xl:h-11 rounded-md">Remove</button>
                </div>
            </div>`;
        favContainer.appendChild(newBook);

        const removeButton = newBook.querySelector('.remove-fav-btn');
        removeButton.addEventListener('click', () => {
            newBook.remove();
            const bookIndex = favData.findIndex(favBook => favBook.title === book.title);
            if (bookIndex !== -1) {
                favData.splice(bookIndex, 1);
                localStorage.setItem('favourite', JSON.stringify(favData));
                if (favData.length === 0) {
                    displayFavBooks();
                }
            }
        });

        const addCartButton = newBook.querySelector('.add-cart-btn');
        addCartButton.addEventListener('click', (event) => {
            event.stopPropagation();

            const existingBookIndex = card.findIndex(item => item.id === book.id);
            if (existingBookIndex === -1) {
                let newBook = { ...book, quantity: 1 };
                card.push(newBook);
                localStorage.setItem('card', JSON.stringify(card));
                countbook();
            }
        });
    });
}


let quantite = "";

function displayBooks(){
    const data = JSON.parse(localStorage.getItem('booksData'))
    for(let i = 0 ; i<data.length;i++){
        
        const heartButton = document.querySelector(`#heartButton-${i}`);
    
    
        if (heartButton) {
            const heartIcon = heartButton.querySelector('i');
            if (favourite.some(book => book.id === data[i].id)) {
                heartIcon.classList.add('fa-solid');
                heartIcon.classList.remove('fa-regular');
                heartIcon.style.color = 'red';
            }
    
            heartButton.addEventListener('click', () => {
                if (heartIcon.classList.contains('fa-solid')) {
                    heartIcon.classList.remove('fa-solid');
                    heartIcon.classList.add('fa-regular');
                    heartIcon.style.color = 'black';
                    favourite = favourite.filter(book => book.id !== data[i].id);
                } else {
                    heartIcon.classList.add('fa-solid');
                    heartIcon.classList.remove('fa-regular');
                    heartIcon.style.color = 'red';
                    favourite.push(data[i]);
                    
                }
                localStorage.setItem('favourite', JSON.stringify(favourite));
                favData = [...favourite];
                displayFavBooks();
                
               
            });
                
                document.querySelector(`#eyeButton-${i}`).addEventListener('click', () => {
                    let detailbook = [data[i]]
                    localStorage.setItem('detailbook', JSON.stringify(detailbook));
                    window.location.href = 'details.html';
                })
              
    
            
                document.querySelector(`#box-book-${i}`).addEventListener('mouseenter', () => {
                    const addcart = document.querySelector(`#addcart-${i}`);
                    addcart.classList.remove('hidden');
                  
                    document.querySelector(`#addcart-${i}`).addEventListener('click', (event) => {
                      event.stopPropagation();
                  
                      if (!quantite[i]) {
                        quantite[i] = 0;
                      }
                  
                      const exitaddcard = card.findIndex(item => item.id === data[i].id);
                      if (exitaddcard !== -1) {
                        card[exitaddcard].quantity = 1; 
                      } else {
                        quantite[i] += 1;
                        let datacard = { ...data[i], quantity: quantite[i] };
                        card.push(datacard);
                      }
                  
                      localStorage.setItem('card', JSON.stringify(card));
                      countbook();
                      displayFavBooks()
                    },{ once: true });
                  });
                  
                
            document.querySelector(`#box-book-${i}`).addEventListener('mouseleave', () => {
                const addcart = document.querySelector(`#addcart-${i}`);
                addcart.classList.add('hidden');
            });
        }  }
    }
function showdata(){
    const data = JSON.parse(localStorage.getItem('booksData'))

        let table = "";
        
            for(let i =10;i<data.length;i++){
            table =
            `      
            <div id="book-element-${i}">
            
             <div class="bg-custemgraytext w-[270px] h-[250px] flex justify-center items-center relative" id="box-book-${i}">
                <div class="w-[123px] h-[175px]">
                    <img src=${data[i].img} alt="">
                </div>
                <div class="w-[55px] h-[30px] rounded flex justify-center absolute mb-48 mr-48 items-center" style="background-color: #4B6587;">
                    <h1 class="text-white">-40%</h1>
                </div>
                <div class="w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center absolute ml-52 mb-48">
                    <button id="heartButton-${i}" class="text-black text-xl focus:outline-none">
                        <i class="fa-regular fa-heart" style="color: #000000;"></i>
                    </button>
                </div>
                <div class="w-[40px] h-[40px] bg-white rounded-full flex justify-center mb-24 items-center absolute ml-52">
                    <button id="eyeButton-${i}" class="text-gray-400 text-xl focus:outline-none">
                        <i class="fa-regular fa-eye" style="color: #000000;"></i>
                    </button>
                </div>
                <div class="w-full h-[50px] bg-black flex justify-center mt-52 items-center absolute hidden" id="addcart-${i}">
                    <button >
                        <h1 class="text-white font-bold text-xl">Add To Cart</h1>
                    </button> 
                </div>
            </div>
            <div class="mt-3">
                <h1 class="font-bold">${data[i].title}</h1>
                <div class="flex space-x-3">
                    <h3 class="text-gray-500 font-bold">${data[i].price}$</h3>
                    <h3 class="text-gray-500 font-bold line-through">${data[i].price+19.9}$</h3>
                </div>
                <div class="flex space-x-2 mt-1 relative">
                   <div>
                    <i class="fa-sharp fa-solid fa-star" style="color: #ffad33;"></i>
                    <i class="fa-sharp fa-solid fa-star" style="color: #ffad33;"></i>
                    <i class="fa-sharp fa-solid fa-star" style="color: #ffad33;"></i>
                    <i class="fa-sharp fa-solid fa-star" style="color: #ffad33;"></i>
                    <i class="fa-sharp fa-solid fa-star" style="color: #ffad33;"></i>
                   </div>
                    <div><h1 class="absolute text-gray-500 font-bold ">(88)</h1></div>
    
                </div>
                
            </div>   
            </div>
    
        `  
        if(i>=10 && i<14){
            document.querySelector("#div-book1").innerHTML += table
        }
    
    
          
    }}

