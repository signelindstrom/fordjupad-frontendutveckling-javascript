// get elements fot button and login inputs
const loginButton = document.querySelector("#loginButton");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

// get parent element and create element for login error message
const loginSection = document.getElementById("loginSection");
const loginError = document.createElement("h3");
loginError.classList = "errorMessage";
loginSection.append(loginError);

// when usser clicks button it calls function to compare username and password with api
loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  getUserData();
});

// fetch endpoint with user information
async function getUserData() {
  const response = await fetch("https://jek-hb.github.io/portal/students.json");
  const data = await response.json();

  // puts all user into array
  const userArray = Object.values(data);

  // sends array with users to funtion to compare to existing users
  compareUser(userArray);

  // function to compare user input to existing users from api
  function compareUser(array) {
    // create boolean to flag if user exists
    let foundUser = false;

    // if one of input fields are empty, error message is displayed
    if ((usernameInput.value === "") | (passwordInput.value === "")) {
      loginError.innerText = "Please fill in all requierd fields";
      return;
    }

    for (let i = 0; i < array.length; i++) {
      // compares user input to existing users from api
      if (
        usernameInput.value == array[i].login.username &&
        passwordInput.value == array[i].login.password
      ) {
        foundUser = true;

        // saves logged in user to local storage to display as logged in
        localStorage.setItem("loggedInUser", array[i].name.first);

        // redirects logged in user to courses.html
        location.assign("./html/courses.html");

        break;
      }
    }
    // if no user was found, error message is displayed
    if (!foundUser) {
      loginError.innerText = "Wrong username or password";
    }
  }
}
