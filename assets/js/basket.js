document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("snobellaa_users")) || []
    let isLoginedUser = users.find(user => user.isLogined)
    let userIndex = users.findIndex(user => user.id === isLoginedUser?.id)
    let basket = isLoginedUser?.basket || []

    const basketArea = document.querySelector(".card")
    const emptyBasketText = document.querySelector(".empty-basket")
    const confirmBtn = document.querySelector(".confirm-btn")

    function sweetToast(text) {
        Toastify({
            text: text,
            duration: 3000,
            position: "right",
            style: {
                background: "linear-gradient(90deg, #d1b3b1, #d39591, #f7d6d4)",
            },
        }).showToast()
    }

    function updateLocalStorage() {
        users[userIndex].basket = basket
        localStorage.setItem("snobellaa_users", JSON.stringify(users))
    }

    function renderBasket() {
        basketArea.innerHTML = ""

        if (basket.length === 0) {
            emptyBasketText.classList.remove("d-none")
            return
        } else {
            emptyBasketText.classList.add("d-none")
        }

        basket.forEach(product => {
            const productDiv = document.createElement("div")
            productDiv.classList.add("card-product")

            const img = document.createElement("img")
            img.src = product.image

            const infoDiv = document.createElement("div")
            infoDiv.classList.add("flex-grow-1")

            const title = document.createElement("h6")
            title.textContent = product.title

            const size = document.createElement("p")
            size.textContent = "Size: XS  Color: Grey"

            const delivery = document.createElement("p")
            delivery.textContent = "Delivery: 25-32 days"

            const quantity = document.createElement("div")
            const minusBtn = document.createElement("button")
            minusBtn.textContent = "-"
            minusBtn.disabled = product.count <= 1
            minusBtn.addEventListener("click", () => {
                if (product.count > 1) {
                    product.count--
                    updateLocalStorage()
                    renderBasket()
                    updateTotals()
                    sweetToast("Product removed from basket")
                }
            })

            const count = document.createElement("span")
            count.textContent = product.count
            count.style.margin = "0 10px"

            const plusBtn = document.createElement("button")
            plusBtn.textContent = "+"
            plusBtn.addEventListener("click", () => {
                product.count++
                updateLocalStorage()
                renderBasket()
                updateTotals()
                sweetToast("Product added to basket")
            })

            quantity.append(minusBtn, count, plusBtn)

            const price = document.createElement("p")
            price.textContent = "$" + (parseFloat(product.price.replace("$", "")) * product.count).toFixed(2)


            const buttons = document.createElement("div")
            buttons.className = "d-flex justify-content-end"
            const removeBtn = document.createElement("button")
            removeBtn.className = "trash"
            removeBtn.textContent = "Remove"
            removeBtn.addEventListener("click", () => {
                basket = basket.filter(p => p.id !== product.id)
                updateLocalStorage()
                renderBasket()
                updateTotals()
                sweetToast("Product removed from basket")
            })
            buttons.append(removeBtn)

            infoDiv.append(title, size, delivery, quantity, price, buttons)
            productDiv.append(img, infoDiv)
            basketArea.appendChild(productDiv)
        })

        const removeAllBtn = document.createElement("button")
        removeAllBtn.textContent = "Remove All"
        removeAllBtn.className = "btn btn-danger mt-3"
        removeAllBtn.addEventListener("click", () => {
            basket = []
            updateLocalStorage()
            renderBasket()
            updateTotals()
            sweetToast("All products removed")
        })
        basketArea.appendChild(removeAllBtn)
    }

    function updateTotals() {
        const total = basket.reduce((sum, item) => {
            const itemPrice = parseFloat(item.price.replace("$", ""));
            return sum + (itemPrice * item.count);
        }, 0);
        document.querySelector(".total-price").textContent = total.toFixed(2); 
        document.querySelector(".subtotal").textContent = total.toFixed(2); 
    }
    

    confirmBtn.addEventListener("click", () => {
        if (basket.length === 0) {
            sweetToast("Basket is empty!")
        } else {
            console.log("Basket items:", basket)
            sweetToast("Order confirmed (see console)")
        }
    })

    renderBasket()
    updateTotals()
})