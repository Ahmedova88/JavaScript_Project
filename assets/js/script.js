document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      let users = JSON.parse(localStorage.getItem("snobellaa_users")) || [];
      let isLoginedUser = users.find((user) => user.isLogined == true);
      let userIndex = isLoginedUser ? users.findIndex((user) => user.id == isLoginedUser.id) : -1;
      let userBtn = document.querySelector(".username");
      let logout = document.querySelector(".logout");
    

      function updateUserStatus() {
        if (isLoginedUser) {
            logout.classList.remove("d-none");
            userBtn.textContent = isLoginedUser.username;
        } else {
            logout.classList.add("d-none");
            userBtn.textContent = "Username";
        }
    }

    let logoutUserFunction = () => {
        if (isLoginedUser) {
            isLoginedUser.isLogined = false;
            localStorage.setItem("users", JSON.stringify(users));
            userBtn.textContent = "Username";
        }
        updateUserStatus();
        window.location.reload();
    };

    logout.addEventListener("click", logoutUserFunction);
    updateUserStatus();

        function createUserCard() { 
    
            data.forEach((product) => {
            let card = document.createElement("div")
            card.classList.add("card")
            card.addEventListener("click", () => {
              window.location.href = `productDetail.html?id=${product.id}`
            })
    
            let heartIcon = document.createElement("i")
            heartIcon.classList.add("card-heart", "fa-regular", "fa-heart")
            if (isLoginedUser && isLoginedUser.wishlist.some(item => item.id === product.id)) {
              heartIcon.classList.add("fa-solid");
              heartIcon.style.color = "red";
            } else {
              heartIcon.classList.add("fa-regular");
              heartIcon.style.color = "black";
            }
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
            document.querySelector('.sign-up').addEventListener('click', () => {
              window.location.href = 'welcome.html';
            });
        }

        function toggleAddWishlist(productId, heartIcon) {
          if (!isLoginedUser) {
            sweetToast("You must be logged in to add to wishlist.");
            setTimeout(() => {
              window.location.href = "login.html";
            }, 1500);
            return;
          }
        
          isLoginedUser.wishlist = isLoginedUser.wishlist || [];
        
          const index = isLoginedUser.wishlist.findIndex(item => item.id === productId);
          const product = data.find(p => p.id === productId);
        
          if (index === -1 && product) {
            isLoginedUser.wishlist.push(product);
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa-solid");
            heartIcon.style.color = "red";
            sweetToast("Product added to wishlist...")
          } else {
            isLoginedUser.wishlist.splice(index, 1);
            heartIcon.classList.remove("fa-solid");
            heartIcon.classList.add("fa-regular");
            heartIcon.style.color = "black";
            sweetToast("Product removed from wishlist...")
          }
        
          const userIndex = users.findIndex(u => u.id === isLoginedUser.id);
          if (userIndex !== -1) {
            users[userIndex] = isLoginedUser;
            localStorage.setItem("snobellaa_users", JSON.stringify(users));
          } 
        }

        
        function addBasket(productId) {
          if (!isLoginedUser) {
              sweetToast("Please login to basket.")
    
              setTimeout(() => {
                window.location.href = "login.html";
              }, 1500);
              return;
            }
    
            if (isLoginedUser) {
              let basket = isLoginedUser.basket || [];
              let findProduct = basket.find((product) => product.id == productId)
              if (findProduct) {
              findProduct.count++
            } else {
              let existProduct = data.find((product) => product.id == productId)
              basket.push({
                ...existProduct,
                price: parseFloat(existProduct.price.replace("$", "")),
                count: 1
              })
            }
            users[userIndex].basket = basket;
            localStorage.setItem("snobellaa_users", JSON.stringify(users))
            sweetToast("Product added to basket successfully...")
            basketCount()
            } else {
              console.error("Istifadeci tapilmadi, zehmet olmasa sisteme daxil olun")
            }
    
            
        }
    
        function basketCount() {
          if (isLoginedUser) {
            let basket = isLoginedUser.basket || [];
            let basketItemCount = basket.reduce(
            (acc, product) => acc + product.count, 
            0
          )
          let basketCountElem = document.querySelector(".basketIcon sup")
          basketCountElem.textContent = basketItemCount
          } else {
            console.log("Istifadeci tapilmadi, zehmet olmasa sisteme daxil olun")
          }
          
    
          
        }
    
        basketCount()
        updateUserStatus()
        createUserCard()
    });
    
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
  