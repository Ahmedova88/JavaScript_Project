document.addEventListener("DOMContentLoaded", () => {

    let users = JSON.parse(localStorage.getItem("snobellaa_users"))

    let form = document.querySelector("form")
    let username = document.querySelector("#username")
    let password = document.querySelector("#password")

    let failedAttempts = 0
    let lockoutTime = 0


    form.addEventListener("submit", login)

    function login(e) {
        e.preventDefault()

        if (lockoutTime > 0) {
            sweetToast(`Your account is locked. Please try again in ${lockoutTime} minutes.`);
            return;
        }

        function checkLockout() {
            if (failedAttempts >= 3) {
                lockoutTime = 15; 
                sweetToast("Account locked due to too many failed login attempts.");
                setTimeout(() => {
                    lockoutTime = 0;
                    failedAttempts = 0;
                    sweetToast("You can try again now.");
                }, 15 * 60 * 1000); 
            }
        }

        let loginedUser = users.find(
            (user) => user.username == username.value && user.password == password.value)
            if (!loginedUser) {
                sweetToast("Username or passsword incorrect")
                failedAttempts++;
                checkLockout();
                return;
            }

            if (loginedUser) {
                loginedUser.isLogined = true
                localStorage.setItem("users", JSON.stringify(users))
                sweetToast("User login successfully...")
                setTimeout(() => {
                    window.location.href = "index.html"
                }, 3000);
            } 
    }


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
