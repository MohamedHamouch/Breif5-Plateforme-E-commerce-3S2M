
let detailbook = JSON.parse(localStorage.getItem('detailbook')) || [];

function affichData() {


    let table = "";

    table = `  
   <!-- image principale -->
            <div class=" img-hero flex bg-neutral-100	justify-center items-center content-center w-[300px] h-[434px] lg:w-[420px] lg:h-[480px] my-2">
                <img src=${detailbook[0].img} id="kingImg"
                    class="w-[280px] h-[400px] lg:w-[340px] lg:h-[450px]  ">
            </div>

            <!-- container principale des informations -->
            <div class="info-hero flex  flex-col  justify-center mx-2 md:flex-col  min-h-[300px] gap-4 ">


               

                <!-- etoile et le prix et titre -->

                  <!-- titre -->
                <div class="star flex flex-col ">
                    <div>
                        <h2 id="title" class="text-3xl   font-semibold font-serif">${detailbook[0].title}</h2>
                    </div>

                    <!-- etoile -->
                    <div class="mb-2 flex"> 
          

                         <!-- prix -->
                        <pre class="" ><span class="font-bold text-xl ">Price : </span><span id="price" class="font-bold text-2xl">${detailbook[0].price}$</span>|<span  id="stock" class="font-bold text-2xl">${detailbook[0].stock}</span></pre>
                    </div>
                              <div >
                    <span> <i class="fa-solid fa-star " style="color: #FFD43B;"></i></span>
                        <span> <i class="fa-solid fa-star" style="color: #FFD43B;"></i></span>
                         <span> <i class="fa-solid fa-star" style="color: #FFD43B;"></i></span>
                        <span> <i class="fa-solid fa-star" style="color: #FFD43B;"></i></span>
                        <span> <i class="fa-solid fa-star " style="color: #a1a1a1;"></i></span>
                        <span class="font-bold text-xl ">(120 views)</span>
                    </div>
                   
                </div>

                <div class=" flex flex-col  justify-around gap-4 my-4">

                    <div class="parag w-[370px]">
                        <p id="descreption"> </p>
                        ${detailbook[0].description}
                        </p>
                    </div>

                    <!-- ligne des bottons  et j'adore-->
                    <div class="flex items-center justify-between  ">

                        <!-- button de quantite -->
                        <div class="border-2 border-solid border-black  h-[46px] flex  rounded-md ">
                            <button id="moins" class=" w-[30px] h-[40px] md:w-[40px] md:h-[44px] text-black ">-</button>
                            <button id="countour" class=" md:w-[80px] h-[44px] w-[60px] border-r-2 border-l-2 border-solid border-black text-black ">1</button>
                            <button id="plus" class="w-[30px] h-[43px] md:w-[40px]  text-white text-center  rounded-tr-[3.5px]  rounded-br-[3.5px]  bg-red-500 ">+</button>
                        </div>

                        <!-- button de buy now -->
                        <div class="h-[45px] md:w-[165px] w-[120px] bg-red-500 border-1 border-solid border-black  text-center content center items-center rounded-md transition hover:scale-125 hover:duration-500	">
                            <a href="cart.html"><button id="buyNowbutton" class="rounded-sm text-center text-white h-[45px] md:w-[165px] w-[120px] ">Buy Now</button></a>  
                        </div>

                        <div class="hover:animate-ping duration-0">
                           <button id="heartButton" class="text-black text-xl ">
                    <i class="fa-regular fa-heart fa-2x fa-2x" style="color: #000000;"></i>
                    </button>
                        </div>

                    </div>

                     <!-- laivraison -->
               <div class="flex justify-around">
                    <div class="border-2 border-black border-solid min-h[180px] w-[350px] md:w-[420px]  lg:w-[500px] ">
                      <div class="flex justify-around border-b-2 border-solid border-black mt-2 gap-8">
                        <div >
                            <img src="../images/details/delivery.png" alt="icone de voiture de laivraison"
                                class="h-[40px] w-[40px] ml-2">
                        </div>

                        <div class="gap-5">
                            <p>Free Delivery</p>
                            <p> <a href="#">Enter your postal code for Delivery Availability</a></p>
                        </div>
                    </div>

                    <!-- deuxieme partie -->
                    <div class="flex justify-around gap-8 ">
                        <div >
                            <p><i class="fa-solid fa-rotate fa-2x fa-2x" style="color: #000000;"></i></p>
                        </div>

                        <div class="gap-5">
                            <p>Free Delivery</p>
                            <p> <a href="#">Enter your postal code for Delivery Availability</a></p>
                        </div>
                    </div>

                </div>
                </div>
                </div>

               
            </div>
`

    document.querySelector("#container1").innerHTML = table
};

let quantite = "";

function buyNow() {
    document.querySelector("#buyNowbutton").addEventListener('click', () => {
        let quantite = countour.innerText;
        let detailbook = JSON.parse(localStorage.getItem('detailbook')) || [];
        let card = JSON.parse(localStorage.getItem('card')) || [];
        detailbook[0] = { ...detailbook[0], quantity: quantite };
        card.push(detailbook[0]);
        localStorage.setItem('card', JSON.stringify(card));
        console.log(detailbook)
    })
}


affichData()







let count = 1;
const moins = document.getElementById("moins");
const plus = document.getElementById("plus");
const countour = document.getElementById("countour");

plus.addEventListener('click', () => {
    count++;
    countour.innerText = count; 
});

moins.addEventListener('click', () => {
    if (count > 1) { 
        count--; 
        countour.innerText = count; 
    }
});

buyNow();


//ajouter la fonctionalite de favoris

let favourite = JSON.parse(localStorage.getItem('favourite')) || [];

const heartIcon = document.querySelector("#heartButton i");

if (favourite.some(book => book.id === detailbook[0].id)) {

    heartIcon.classList.add('fa-solid');
    heartIcon.classList.remove('fa-regular');
    heartIcon.style.color = 'red';
} else {

    heartIcon.classList.remove('fa-solid');
    heartIcon.classList.add('fa-regular');
    heartIcon.style.color = 'black';
}
heartIcon.addEventListener('click', () => {

    if (heartIcon.classList.contains('fa-solid')) {

        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        heartIcon.style.color = 'black';

        const index = favourite.findIndex(book => book.id === detailbook[0].id);
        if (index !== -1) {

            favourite.splice(index, 1);
        }
    } else {

        heartIcon.classList.add('fa-solid');
        heartIcon.classList.remove('fa-regular');
        heartIcon.style.color = 'red';
        favourite.push(detailbook[0]);


    }

    localStorage.setItem('favourite', JSON.stringify(favourite));
});



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

showdata()
displayBooks()
