let card = JSON.parse(localStorage.getItem('card')) || [];

        
const toTopBtn = document.getElementById("toTopBtn");
    
 window.onscroll = function() {
          if (document.documentElement.scrollTop > 100) {
            toTopBtn.classList.remove("hidden");
          } else {
            toTopBtn.classList.add("hidden");
          }
        };
    
        
        toTopBtn.addEventListener("click", function() {
          window.scrollTo({ top: 0, behavior: "smooth" });
});
      
function countbook(){
          let countbook = document.querySelector("#book-count")  
          countbook.innerHTML = card.length
}
countbook()