const menuButton = document.getElementById('button-menu');
const menu = document.getElementById('menuShow');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('opacity-0');
});

// Close the menu if clicking outside of it
document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && event.target !== menuButton) {
        menu.classList.add('hidden');
        menu.classList.add('opacity-0');
    }
});




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