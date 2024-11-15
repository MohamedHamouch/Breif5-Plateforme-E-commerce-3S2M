
const booksContainer = document.querySelector('.books-container');
let booksData = []

document.addEventListener("DOMContentLoaded", () => {

    booksData = JSON.parse(localStorage.getItem('booksData'));
    displayBooks(booksData);

    
});
    function bookItem(book){
        return `<div class="w-auto h-[350px] flex flex-col items-center justify-between gap-2 ">
              <div class="bg-[#4B6587] w-[200px] h-[230px] max-[750px]:w-[130px] ">
              <a onclick="" href="../pages/details.html"><img src="${book.img}" alt="${book.title} " class="w-full h-full"></a>
              </div>
              <h2 class="font-bold text-center">${book.title}</h2>
              <h3 class="font-extralight text-center">${book.author}</h3>
              <button type="button" id="${book.id}" class="bg-orange-600 font-bold text-white  h-[40px] w-auto text-center max-[600px]:text-xs rounded-md py-2 px-3 ">Add to Cart</button>
            </div>`
    }
    function displayBooks (data){

       
        booksContainer.innerHTML = "";

        data.forEach(book => {
          let bookElement = document.createElement('div');
            bookElement.classList.add('book-item','w-auto','flex','flex-col','items-center','gap-x-22','gap-y-10','rounded-sm','shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]','p-1');

            bookElement.innerHTML = bookItem(book);
            
            booksContainer.appendChild(bookElement);

        });
    }



    const filterByGenre = document.getElementById('genre');
    const filterByLang = document.getElementById('language');
    const sorting = document.getElementById('sort');
    const filterByType = document.getElementById("byType")
    
sorting.onchange = function(){

    if(filterByGenre.value === "none" && filterByLang.value === "none" && filterByType.value === "none" ){
        sortt(booksData);
    }
    else{
        sortt(filteredData);
    }
    
    
   function sortt(data){
     switch(sorting.value){
        case "low": data.sort(function (a,b){return a.price-b.price}) ; displayBooks(data);break;
        case "high": data.sort(function (a,b){return b.price-a.price}) ; displayBooks(data);break;
        case "a": data.sort(function (a,b){
        if (a.title[0] < b.title[0]) {return -1;}
        if (a.title[0] > b.title[0]) {return 1;}
        return 0;}) ; displayBooks(data);break;
        case "z": data.sort(function (a,b){
        if (a.title[0] > b.title[0]) {return -1;}
        if (a.title[0] < b.title[0]) {return 1;}
        return 0;}) ; displayBooks(data);break;
    }}

}
let filteredData = [];

filterByLang.onchange= function() {
    if(filterByGenre.value === "none" && filterByLang.value === "none" && filterByType.value === "none"){
        displayBooks(booksData);
        return;
    }else if(filterByGenre.value != "none" && filterByLang.value === "none"){ 
        Filter(filterByGenre.value,filterByLang.value,filterByType.value,'g');
        return;
    }else if (filterByType.value != "none"&& filterByLang.value === "none"){
        Filter(filterByGenre.value,filterByLang.value,filterByType.value,'t');
        return;
    }
    Filter(filterByGenre.value,filterByLang.value,filterByType.value,'l');
    }

   function Filter (byGenre,byLang,byType,filter) {
    
        filteredData = [];
        
    switch (filter) {

        case "g": 
            if(byLang === "none" && byType === "none"){
            
            
            for (let book of booksData) { 
              
                if(book.category === byGenre ){ filteredData.push(book)}
            }
            displayBooks(filteredData);
            return;
        }else {
            if(byLang != "none" && byType != "none"){
            for (let book of booksData) { 
          
                if(book.language === byLang && book.category === byGenre && book.type === byType){filteredData.push(book)}
            }}
            else if (byLang != "none") {
                for (let book of booksData) { 
          
                    if(book.language === byLang && book.category === byGenre){filteredData.push(book)}
                }
            }
            else if ( byType != "none") {
                for (let book of booksData) { 
          
                    if(book.type === byType && book.category === byGenre){filteredData.push(book)}
                }
            }
            displayBooks(filteredData);
            return;
        
        } ;
        case "l":if(byGenre === "none" && byType === "none"){
            for (let book of booksData) { 
              
                if(book.language === byLang ){filteredData.push(book)}
            }
            displayBooks(filteredData);
            return;
        }else {
            if(byGenre != "none" && byType != "none"){
            for (let book of booksData) { 
          
                if(book.language === byLang && book.category === byGenre && book.type === byType){filteredData.push(book)}
            }}
            else if (byGenre != "none") {
                for (let book of booksData) { 
          
                    if(book.language === byLang && book.category === byGenre){filteredData.push(book)}
                }
            }
            else if ( byType != "none") {
                for (let book of booksData) { 
          
                    if(book.type === byType && book.language === byLang){filteredData.push(book)}
                }
            }
            displayBooks(filteredData);
            return;
        
        } ; 
        case "t":if(byLang === "none" && byGenre === "none"){
            for (let book of booksData) { 
                
                if(book.type === byType ){filteredData.push(book)}
            }
            displayBooks(filteredData);
            return;
        }else {
            if(byLang != "none" && byGenre != "none"){
            for (let book of booksData) { 
          
                if(book.language === byLang && book.category === byGenre && book.type === byType){filteredData.push(book)}
            }}
            else if (byLang != "none") {
                for (let book of booksData) { 
          
                    if(book.language === byLang && book.type === byType){filteredData.push(book)}
                }
            }
            else if ( byGenre != "none") {
                for (let book of booksData) { 
          
                    if(book.type === byType && book.category === byGenre){filteredData.push(book)}
                }
            }
            displayBooks(filteredData);
            return;
        
        } ;
    }}
    
filterByGenre.onchange = function () {
    if(filterByGenre.value === "none" && filterByLang.value === "none" && filterByType.value === "none"){
        
        displayBooks(booksData);
        return;
    }else if(filterByGenre.value === "none" && filterByLang.value != "none"){ 
        Filter(filterByGenre.value,filterByLang.value,filterByType.value,'l');
        return;
    }else if (filterByType.value != "none"&& filterByGenre.value === "none"){
        Filter(filterByGenre.value,filterByLang.value,filterByType.value,'t');
        return;
    }
    Filter(filterByGenre.value,filterByLang.value,filterByType.value,'g');
    }

const Search = document.getElementById("search");

Search.onkeyup = function () {
    if(filterByLang.value === "none" && filterByGenre.value === "none") {
    booksContainer.innerHTML = "";
    for(let book of booksData){
        if(book.title.toLowerCase().includes(Search.value.toLowerCase())) {
        let bookElement = document.createElement('div');
          bookElement.classList.add('book-item','w-auto','flex','flex-col','items-center','gap-1','shadow-[0_0px_0px_2px_rgba(0,0,0,0.3)]','p-1');

          bookElement.innerHTML = bookItem(book);
          booksContainer.appendChild(bookElement);

      }
    }
    } else {
        booksContainer.innerHTML = "";
    for(let book of filteredData){
        if(book.title.toLowerCase().includes(Search.value.toLowerCase())) {
        let bookElement = document.createElement('div');
          bookElement.classList.add('book-item','w-auto','flex','flex-col','items-center','gap-1','shadow-[0_0px_0px_2px_rgba(0,0,0,0.3)]','p-1');

          bookElement.innerHTML = bookItem(book);
          booksContainer.appendChild(bookElement);
        
      }
    }
    }
}


filterByType.onchange = function () {
    if(filterByGenre.value === "none" && filterByLang.value === "none" && filterByType.value === "none"){
        displayBooks(booksData);
        return
    }else if(filterByGenre.value != "none" && filterByType.value === "none"){ 
        Filter(filterByGenre.value,filterByLang.value,filterByType.value,'g');
        return;
    }else if (filterByType.value === "none"&& filterByLang.value != "none"){
        Filter(filterByGenre.value,filterByLang.value,filterByType.value,'l');
        return;
    }
    Filter(filterByGenre.value,filterByLang.value,filterByType.value,'t');
}