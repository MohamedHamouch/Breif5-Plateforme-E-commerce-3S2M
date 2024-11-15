
const booksContainer = document.querySelector('.books-container');
let booksData = []

document.addEventListener("DOMContentLoaded", () => {

    booksData = JSON.parse(localStorage.getItem('booksData'));
    displayBooks(booksData);

    
});

    function displayBooks (data){

       
        booksContainer.innerHTML = "";

        data.forEach(book => {
          let bookElement = document.createElement('div');
            bookElement.classList.add('book-item','w-auto','flex','flex-col','items-center','gap-1');

            bookElement.innerHTML = `<div class="w-auto h-[350px] flex flex-col items-center justify-between gap-1 ">
              <div class="bg-[#4B6587] w-[200px] h-[230px] max-[750px]:w-[130px] ">
              <a onclick="" href="../pages/details.html"><img src="${book.img}" alt="${book.title} " class="w-full h-full"></a>
              </div>
              <h2 class="font-bold text-center">${book.title}</h2>
              <h3 class="font-extralight text-center">${book.author}</h3>
              <button type="button" id="${book.id}" class="bg-orange-600 font-bold text-white  h-[40px] w-auto text-center max-[600px]:text-xs rounded-md py-2 px-3 ">Add to Cart</button>
            </div>`
            
            booksContainer.appendChild(bookElement);

        });
    }


    const filterByGenre = document.getElementById('genre');
    const filterByLang = document.getElementById('language');
    const sorting = document.getElementById('sort');

sorting.onchange = function(){

    switch(sorting.value){
        case "low": booksData.sort(function (a,b){return a.price-b.price}) ; displayBooks(booksData);break;
        case "high": booksData.sort(function (a,b){return b.price-a.price}) ; displayBooks(booksData);break;
        case "a": booksData.sort(function (a,b){
        if (a.title[0] < b.title[0]) {return -1;}
        if (a.title[0] > b.title[0]) {return 1;}
        return 0;}) ; displayBooks(booksData);break;
        case "z": booksData.sort(function (a,b){
        if (a.title[0] > b.title[0]) {return -1;}
        if (a.title[0] < b.title[0]) {return 1;}
        return 0;}) ; displayBooks(booksData);break;
    }

}
let filteredData = [];

filterByLang.onchange= function() {

    filteredData = [];
    if(filterByGenre.value === "none"){
        for (let book of booksData) { 
          
            if(book.language === filterByLang.value ){filteredData.push(book)}
        }
        displayBooks(filteredData);
        return;
    }

    for (let book of booksData) { 
          
        if(book.language === filterByLang.value && book.category === filterByGenre.value){filteredData.push(book)}
    }
    displayBooks(filteredData);
    }
filterByGenre.onchange = function () {

    filteredData = [];
    if(filterByLang.value === "none"){
        for (let book of booksData) { 
          
            if(book.category === filterByGenre.value ){filteredData.push(book)}
        }
        displayBooks(filteredData);
        return;
    }

    for (let book of booksData) { 
          
        if(book.language === filterByLang.value && book.category === filterByGenre.value){filteredData.push(book)}
    }
    displayBooks(filteredData);
    }

const Search = document.getElementById("search");

Search.onkeyup = function () {
    if(filterByLang.value === "none" && filterByGenre.value === "none") {
    booksContainer.innerHTML = "";
    for(let book of booksData){
        if(book.title.toLowerCase().includes(Search.value.toLowerCase())) {
        let bookElement = document.createElement('div');
          bookElement.classList.add('book-item','w-auto','flex','flex-col','items-center','gap-1');

          bookElement.innerHTML = `<div class="w-auto h-[350px] flex flex-col items-center justify-between gap-1 ">
            <div class="bg-[#4B6587] w-[200px] h-[230px] max-[750px]:w-[130px] ">
            <a onclick="" href="../pages/details.html"><img src="${book.img}" alt="${book.title} " class="w-full h-full"></a>
            </div>
            <h2 class="font-bold text-center">${book.title}</h2>
            <h3 class="font-extralight text-center">${book.author}</h3>
            <button type="button" id="${book.id}" class="bg-orange-600 font-bold text-white  h-[40px] w-auto text-center max-[600px]:text-xs rounded-md py-2 px-3 ">Add to Cart</button>
          </div>`
          booksContainer.appendChild(bookElement);

      }
    }
    } else {
        booksContainer.innerHTML = "";
    for(let book of filteredData){
        if(book.title.toLowerCase().includes(Search.value.toLowerCase())) {
        let bookElement = document.createElement('div');
          bookElement.classList.add('book-item','w-auto','flex','flex-col','items-center','gap-1');

          bookElement.innerHTML = `<div class="w-auto h-[350px] flex flex-col items-center justify-between gap-1 ">
            <div class="bg-[#4B6587] w-[200px] h-[230px] max-[750px]:w-[130px] ">
            <a onclick="" href="../pages/details.html"><img src="${book.img}" alt="${book.title} " class="w-full h-full"></a>
            </div>
            <h2 class="font-bold text-center">${book.title}</h2>
            <h3 class="font-extralight text-center">${book.author}</h3>
            <button type="button" id="${book.id}" class="bg-orange-600 font-bold text-white  h-[40px] w-auto text-center max-[600px]:text-xs rounded-md py-2 px-3 ">Add to Cart</button>
          </div>`
          booksContainer.appendChild(bookElement);

      }
    }
    }
}