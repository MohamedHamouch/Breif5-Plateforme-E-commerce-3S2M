
let days = parseInt(document.getElementById('days').textContent);
let hours = parseInt(document.getElementById('hours').textContent);
let minutes = parseInt(document.getElementById('minutes').textContent);
let seconds = parseInt(document.getElementById('seconds').textContent);

const api = "https://file-json-test.vercel.app/fichier.json"

async function booksAPI(){
    const respond = await fetch(api);
    const data = await respond.json()
    localStorage.setItem('booksData', JSON.stringify(data));
   
}
const data = JSON.parse(localStorage.getItem('booksData'))

window.onload = function() {
    // localStorage.removeItem("card");
    booksAPI()
    showdata()
    displayBooks()
    startCountdown();

};

function startCountdown() {
    let days = parseInt(localStorage.getItem('days')) || 9; 
    let hours = parseInt(localStorage.getItem('hours')) || 0;
    let minutes = parseInt(localStorage.getItem('minutes')) || 0; 
    let seconds = parseInt(localStorage.getItem('seconds')) || 0;

    function updateCountdown() {
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        } else if (days > 0) {
            days--;
            hours = 23;
            minutes = 59;
            seconds = 59;
        }

        localStorage.setItem('days', days);
        localStorage.setItem('hours', hours);
        localStorage.setItem('minutes', minutes);
        localStorage.setItem('seconds', seconds);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
}






let favourite = JSON.parse(localStorage.getItem('favourite')) || [];
let quantite = {};





function displayBooks(){

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
                },{ once: true });
              });
              
            
        document.querySelector(`#box-book-${i}`).addEventListener('mouseleave', () => {
            const addcart = document.querySelector(`#addcart-${i}`);
            addcart.classList.add('hidden');
        });
    }  }
}






function showdata(){
    let table = "";
    
        for(let i =0;i<data.length;i++){
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
    if(i<4){
        document.querySelector("#div-book1").innerHTML += table
    }else if(i>=4 && i<12){
        document.querySelector("#div-book2").innerHTML += table
    }


      
}}

