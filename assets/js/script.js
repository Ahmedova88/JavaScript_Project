document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
    
        function createUserCard() { 
    
            data.forEach((product) => {
            let card = document.createElement("div")
            card.classList.add("card")
            card.addEventListener("click", () => {
              window.location.href = `productDetail.html?id=${product.id}`
            })
    
            let heartIcon = document.createElement("i")
            heartIcon.classList.add("card-heart", "fa-regular", "fa-heart")
            heartIcon.addEventListener("click", (e) => {
              e.stopPropagation()
              toggleAddWishlist(product.id, heartIcon)
            })
    
            let cardImage = document.createElement("div")
            cardImage.classList.add("card-image")
    
            let img = document.createElement("img")
            img.src = product.image
            cardImage.appendChild(img)
    
            let cardContent = document.createElement("div")
            cardContent.classList.add("card-content")
    
            let cardRating = document.createElement("div")
            cardRating.classList.add("card-rating")
    
            let starIcon = document.createElement("span")
            starIcon.textContent = "⭐⭐⭐⭐⭐"
            cardRating.appendChild(starIcon)
    
            let cardTitle = document.createElement("h2")
            cardTitle.classList.add("card-title")
            cardTitle.textContent = product.title
    
            let cardFooter = document.createElement("div")
            cardFooter.classList.add("card-footer")
    
            let cardPrice = document.createElement("span")
            cardPrice.classList.add("card-price")
            cardPrice.textContent = product.price
    
            let span = document.createElement("span")
            span.textContent = "From $340.00"
    
            let addBtn = document.createElement("button")
            addBtn.classList.add("btn", "btn-primary", "add-to-cart")
            addBtn.textContent = "Add Basket"
            addBtn.addEventListener("click", (e) => {
              e.stopPropagation()
              addBasket(product.id)
            })
    
            cardFooter.append(cardPrice, span)
            cardContent.append(cardRating, cardTitle, cardFooter)
            card.append(heartIcon, cardImage, cardContent, addBtn)
    
            let cards = document.querySelector(".cards")
            cards.appendChild(card)
            })
        }
    createUserCard()
    })
    
    })
    