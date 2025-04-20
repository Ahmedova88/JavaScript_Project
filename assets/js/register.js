document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("snobellaa_users")) || []

    let form = document.querySelector("form")
    let name = document.querySelector("#name")
    let username = document.querySelector("#username")
    let email = document.querySelector("#email")
    let password = document.querySelector("#password")
    let confirmPassword = document.querySelector("#confirmpassword")
    let checkIcon = document.querySelector("#password-check");
    


    function strongPassword(pw) {
        
        let boyukHerf = false;
        let kicikHerf = false;
        let reqem = false;
        let simvol = false;
        let uzunluq = false;
    
        for (let i = 0; i < pw.length; i++) {
            let char = pw[i];
    
            if (char >= 'A' && char <= 'Z') {
                boyukHerf = true;
            } else if (char >= 'a' && char <= 'z') {
                kicikHerf = true;
            } else if (char >= '0' && char <= '9') {
                reqem = true;
            } else {
                simvol = true;
            }
        }
    
        if (pw.length >= 8) {
            uzunluq = true;
        }
    
        return boyukHerf && kicikHerf && reqem && simvol && uzunluq;
    }

        password.addEventListener("input", () => {

        if (password.value.length === 0) {
            checkIcon.style.display = "none";
            return;
        }

        if (strongPassword(password.value)) {
            checkIcon.className = "icon valid";
            checkIcon.textContent = "✔";
            checkIcon.style.display = "inline";
        } else {
            checkIcon.className = "icon invalid";
            checkIcon.textContent = "✖";
            checkIcon.style.display = "inline";
        }
          });

    form.addEventListener("submit", register)

    function register(e) {
        e.preventDefault()

        if (password.value !== confirmPassword.value) {
            toast("Passwords do not match!")
            return
        }

        if (username.value.length < 3 || username.value.length > 20) {
            toast("Username must be between 3 and 20 characters.")
            return
        }

        for (let char of username.value) {
            let isLetter = (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
            let isDigit = char >= '0' && char <= '9';
            let isUnderscoreOrDash = char === '_' || char === '-';
    
            if (!(isLetter || isDigit || isUnderscoreOrDash)) {
                toast("Only letters, numbers, underscore (_) and dash (-) are allowed.")
                return
            }
        }
        
        if (!email.value.includes("@") || !email.value.includes(".")) {
            toast("Email must contain '@' and '.' symbols.");
            return;
        }

        if (!strongPassword(password.value)) {
            toast("Password must be at least 8 characters long and include uppercase, lowercase, number and special character.");
            return;
        }

        let uniqueUser = users.some(
            (user) => user.username == username.value || user.email == email.value)

        if (uniqueUser) {
                toast("This user already exists!");
                return;
        }
    
        let newUser = {
                name: name.value,
                username: username.value,
                email: email.value,
                password: password.value,
                id: Date.now(),
                isLogined: false,
                wishlist: [],
                basket: []
        };
    
        users.push(newUser);
        localStorage.setItem("snobellaa_users", JSON.stringify(users));

        toast("User registered successfully...");

        form.reset();
        checkIcon.style.display = "none";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000);


    }
})

  
let toast = (text) => {
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
