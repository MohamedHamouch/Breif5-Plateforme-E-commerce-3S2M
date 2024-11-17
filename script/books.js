const booksContainer = document.querySelector('.books-container');
let booksData = JSON.parse(localStorage.getItem('booksData')) || [];

function bookItem(book) {
    return `
        <div class="w-auto h-[350px] flex flex-col items-center justify-between gap-2 hover:bg-gray-100">
            <div class="bg-[#4B6587] w-[200px] h-[230px] max-[750px]:w-[130px]">
                <a href="" id="book-link${book.id}">
                    <img src="${book.img}" alt="${book.title}" class="w-full h-full" id="book-img${book.id}">
                </a>
            </div>
            <h2 class="font-bold text-center">${book.title}</h2>
            <h3 class="font-extralight text-center">${book.author}</h3>
            <button type="button" id="add-cart${book.id}" class="z-50 bg-orange-600 font-bold text-white h-[40px] w-auto text-center max-[600px]:text-xs rounded-md py-2 px-3">Add to Cart</button>
        </div>`;
}

function addbook(books) {
    booksContainer.innerHTML = '';
    books.forEach(book => {
        booksContainer.innerHTML += bookItem(book);
    });

    books.forEach(book => {
        const addCartButton = document.querySelector(`#add-cart${book.id}`);
        if (addCartButton) {
            addCartButton.addEventListener('click', () => {
                const existingBookIndex = card.findIndex(item => item.id === book.id);
                if (existingBookIndex !== -1) {
                   
                } else {
                    let newBook = { ...book, quantity: 1 };
                    card.push(newBook);
                }
                localStorage.setItem('card', JSON.stringify(card));
                countbook();
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addbook(booksData);
    displayBooks(booksData)
    booksData.forEach(book => {
        const imgElement = document.querySelector(`#book-img${book.id}`);
        if (imgElement) {
            imgElement.addEventListener('click', function (e) {
                e.preventDefault(); 
                let detailbook = [book]; 
                localStorage.setItem('detailbook', JSON.stringify(detailbook)); 
                window.location.href = '../pages/details.html'; 
            });
        }
    });
});










function displayBooks(data, currentPage = 0) {
    let booksPerPage = 12;
    if (data.length === 0) {
        booksContainer.innerHTML = '<h1 class="self-center font-bold text-lg">No books found</h1>';
        paginationList.innerHTML = "";
        let page = document.createElement("li");
        page.classList.add("max-[400px]:px-[12]", "max-[400px]:py-[7px]", "px-[15px]", "py-[10px]", "bg-gray-300", "md:hover:bg-[#4B6587]", "active", "bg-slate-500");
        page.innerText = 1;
        paginationList.appendChild(page);
        return;
    }

    let pagesNumber = Math.ceil((data.length + 1) / booksPerPage);
    let p = 0;
    paginationList.innerHTML = "";
    for (let i = paginationN; i <= pagesNumber; i++) {
        let page = document.createElement("li");
        page.classList.add("max-[400px]:px-[12]", "max-[400px]:py-[7px]", "px-[15px]", "py-[10px]", "bg-gray-300", "md:hover:bg-[#4B6587]");
        page.innerText = i;
        paginationList.appendChild(page);
        p++;
        if (p === 5) { break; }
    }
    paginationList.children[currentPage].classList.add("bg-slate-500", "active");

    booksContainer.innerHTML = "";
    booksPerPage = booksPerPage + currentPage * 12;
    for (let i = currentPage * 12; i < booksPerPage; i++) {
        let bookElement = document.createElement('div');
        bookElement.classList.add('book-item', 'w-auto', 'flex', 'flex-col', 'items-center', 'gap-x-22', 'gap-y-10', 'rounded-sm', 'shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]', 'p-1');

        bookElement.innerHTML = bookItem(data[i]);
        booksContainer.appendChild(bookElement);

        const addCartButton = document.querySelector(`#add-cart${data[i].id}`);
        if (addCartButton) {
            addCartButton.addEventListener('click', () => {
                const existingBookIndex = card.findIndex(item => item.id === data[i].id);
                if (existingBookIndex !== -1) {
                    card[existingBookIndex].quantity += 1;
                } else {
                    let newBook = { ...data[i], quantity: 1 };
                    card.push(newBook);
                }
                localStorage.setItem('card', JSON.stringify(card));
                countbook();
            });
        }

        const imgElement = document.querySelector(`#book-img${data[i].id}`);
        if (imgElement) {
            imgElement.addEventListener('click', function (e) {
                e.preventDefault();
                let detailbook = [data[i]]; 
                localStorage.setItem('detailbook', JSON.stringify(detailbook)); 
                window.location.href = '../pages/details.html'; 
            });
        }
    }
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
const paginationList = document.querySelector(".pagination");
const previousPage = document.querySelector("#previousPage");
const nextPage = document.querySelector("#nextPage");

let paginationN = 1;
previousPage.onclick = function (){
    
if(paginationList.children[0].className.includes("active")){
    return ;
}
let currentPage = document.querySelector(".active").innerText - 1;
    switch(paginationList.children[currentPage].innerText){
        case '6':paginationN=1;
        case '11':paginationN=6;
        case '16':paginationN=11;
        case '21':paginationN=16;
        case '26':paginationN=21;
        case '31':paginationN=26;}
paginationList.children[currentPage].classList.remove("active","bg-slate-500");
paginationList.children[+currentPage-1].classList.add("active","bg-slate-500");
if(filterByGenre.value != "none" || filterByLang.value != "none" ||filterByType.value != "none"){
    displayBooks(filteredData,+currentPage-1);
    return;
}
displayBooks(booksData,+currentPage-1);
} 

nextPage.onclick = function (){
   
    let currentPage = document.querySelector(".active").innerText - 1;
    console.log(currentPage);
    
    if(((filterByGenre.value != "none" || filterByLang.value != "none" ||filterByType.value != "none") && Math.ceil((filteredData.length+1)/12)<=(+currentPage+1))||Math.ceil((booksData.length+1)/12)<=(+currentPage+1)){
        return;
    }
    
        switch(paginationList.children[currentPage].innerText){
            case '5':paginationN=6;break;
            case '10':paginationN=11;break;
            case '15':paginationN=16;break;
            case '20':paginationN=21;break;
            case '25':paginationN=26;break;
            case '30':paginationN=31;break;}
    paginationList.children[currentPage].classList.remove("active","bg-slate-500");
    paginationList.children[+currentPage+1].classList.add("active","bg-slate-500");
    
    if(filterByGenre.value != "none" || filterByLang.value != "none" ||filterByType.value != "none"){
        displayBooks(filteredData,+currentPage+1);
        return;
    }
    displayBooks(booksData,+currentPage+1);



}




filterByLang.onchange = function() {
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