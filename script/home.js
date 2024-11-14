const menuButton = document.getElementById('button-menu');
const menu = document.getElementById('menuShow');
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
    booksAPI()
    showdata()
    displayBooks()
    
};

// // function timeHome(days,hours,minutes,seconds){
// //     if (days>0 && hours>0 && minutes > 0 && seconds){
// //         days--;
// //         hours--;
// //         minutes--;
// //         seconds--;
// //     }
// // }


// // const countdownInterval = setInterval(timeHome(days,hours,minutes,seconds), 1000);


// function startCountdown() {
//     // Get initial values from input fields
//     let days = parseInt(document.getElementById('days').textContent);
//     let hours = parseInt(document.getElementById('hours').textContent);
//     let minutes = parseInt(document.getElementById('minutes').textContent);
//     let seconds = parseInt(document.getElementById('seconds').textContent);

//     function updateCountdown() {
//         if (seconds > 0) {
//             seconds--;
//         } else if (minutes > 0) {
//             minutes--;
//             seconds = 59;
//         } else if (hours > 0) {
//             hours--;
//             minutes = 59;
//             seconds = 59;
//         } else if (days > 0) {
//             days--;
//             hours = 23;
//             minutes = 59;
//             seconds = 59;
//         } else {
//             clearInterval(countdownInterval);
//             alert("Countdown finished!");
//             return;
//         }

//         // Update input fields with new values
//         document.getElementById('days').value = String(days).padStart(2, '0');
//         document.getElementById('hours').value = String(hours).padStart(2, '0');
//         document.getElementById('minutes').value = String(minutes).padStart(2, '0');
//         document.getElementById('seconds').value = String(seconds).padStart(2, '0');
//     }

//     const countdownInterval = setInterval(updateCountdown, 1000);
// }

// startCountdown();


let favourite = JSON.parse(localStorage.getItem('favourite')) || [];
let card = JSON.parse(localStorage.getItem('card')) || [];





function displayBooks(){

for(let i = 0 ; i<data.length;i++){
    const heartIcon = document.querySelector(`#heartButton-${i} i`);
    if(favourite.some(book => book.id === data[i].id)){
        heartIcon.classList.add('fa-solid');
        heartIcon.classList.remove('fa-regular');
        heartIcon.style.color = 'red';
       }else{
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        heartIcon.style.color = 'black'; 
       }
 document.querySelector(`#heartButton-${i}`).addEventListener('click', () => {
            
            if (heartIcon.classList.contains('fa-solid')) {
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
                heartIcon.style.color = 'black';

                const index = favourite.findIndex(book => book.id === data[i].id);
                if (index !== -1) {
                    favourite.splice(index, 1); 
                }
            } else {
                    heartIcon.classList.add('fa-solid');
                    heartIcon.classList.remove('fa-regular');
                    heartIcon.style.color = 'red';
                    favourite.push(data[i])
                   
                console.log(favourite)   
                }

                localStorage.setItem('favourite', JSON.stringify(favourite));
            });
            
            document.querySelector(`#eyeButton-${i}`).addEventListener('click', () => {
                let detailbook = [data[i]]
                localStorage.setItem('detailbook', JSON.stringify(detailbook));
            })
            }

        
            document.querySelector(`#box-book-${i}`).addEventListener('mouseenter', () => {
                const addcart = document.querySelector(`#addcart-${i}`);
                addcart.classList.remove('hidden');
                
                document.querySelector(`#addcart-${i}`).addEventListener('click', (event) => {
                    event.stopPropagation(); 
                    
                    card.push(data[i]);
                    console.log(card);
                    localStorage.setItem('card', JSON.stringify(card));
                });
            });
            
        document.querySelector(`#box-book-${i}`).addEventListener('mouseleave', () => {
            const addcart = document.querySelector(`#addcart-${i}`);
            addcart.classList.add('hidden');
        });
    }






function showdata(){
    let table = "";
    
        for(let i =0;i<data.length;i++){
        table =
        `      
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
    `
        if(i==0){
            document.querySelector("#book-element").innerHTML = table;

        }else if(i==1){
            document.querySelector("#book-element1").innerHTML = table;
        }else if (i==2){
            document.querySelector("#book-element2").innerHTML = table;
        }else if (i==3){
            document.querySelector("#book-element3").innerHTML = table;
        }
}}