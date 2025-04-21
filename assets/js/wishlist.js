document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("snobellaa_users"))
    let isLoginedUser = users.find((user) => user.isLogined === true);
    let userWishlist = isLoginedUser.wishlist

    function createWishlistItem() {
        let wishlistTag = document.querySelector(".wishlist");
        wishlistTag.innerHTML = "";

        userWishlist.forEach(item => {
            let wishlistItem = document.createElement("div")
            wishlistItem.classList.add("wishlist-item")

            let removeBtn = document.createElement("button")
            removeBtn.classList.add("btn", "btn-danger", "remove-btn")
            removeBtn.textContent = "x"

            let Image = document.createElement("div")
            Image.classList.add("image")

            let img = document.createElement("img")
            img.src = item.image
            Image.appendChild(img)

            let cardContent = document.createElement("div")
            cardContent.classList.add("card-content")

            let cardRating = document.createElement("div")
            cardRating.classList.add("card-rating")

            let starIcon = document.createElement("span")
            starIcon.textContent = "⭐⭐⭐⭐⭐"
            cardRating.appendChild(starIcon)

            let title = document.createElement("h5")
            title.classList.add("card-title")
            title.textContent = item.title.slice(0,20) + "..."

            let cardFooter = document.createElement("div")
            cardFooter.classList.add("card-footer")

            let price = document.createElement("span")
            price.classList.add("card-price")
            price.textContent = item.price

            let span = document.createElement("span")
            span.textContent = "from $340.00"

            let addBtn = document.createElement("button")
            addBtn.classList.add("add-to-cart")
            addBtn.textContent = "Add to card"

            cardFooter.append(price, span)
            cardContent.append(cardRating, title, cardFooter)
            wishlistItem.append(removeBtn, Image, cardContent, addBtn)

            

            let wishlistTag = document.querySelector(".wishlist")
            wishlistTag.appendChild(wishlistItem)
   
            removeBtn.addEventListener("click", () => {
                userWishlist = userWishlist.filter(prod => prod.id !== item.id);
                users.find(user => user.id === isLoginedUser.id).wishlist = userWishlist;
                localStorage.setItem("snobellaa_users", JSON.stringify(users));
    
                wishlistItem.remove();
 
                sweetToast("Product removed from wishlist...")
            });


            
        });

    }
    
 createWishlistItem()

})


let sweetToast = (text) => {
    Toastify({
        text: `${text}`,
        className: "info",
        duration: 3000,
        position: "right",
        style: {
        background: "linear-gradient(90deg, #d1b3b1, #d39591, #f7d6d4)",
        },
      }).showToast();
}
