// checks local storage to see if user is logged in, and if so, displays their name
const loggedInUser = localStorage.getItem("loggedInUser");

// does not let you enter page unless logged in
if (loggedInUser === null) {
  location.assign("../index.html");
} else {
  document.getElementById("loggedInUser").innerText =
    `Good luck, ${localStorage.getItem("loggedInUser")}!`;
}

// log out and redirect to start page (index.html)
document.getElementById("logOutBtn").addEventListener("click", () => {
  localStorage.clear("loggedInUser");
  location.assign("../index.html");
});

// get parent element for quiz
const quizElement = document.getElementById("quizSection");

// function to get quiz data from api
getQuizData();
async function getQuizData() {
  const response = await fetch("https://jek-hb.github.io/portal/quiz.json");
  const data = await response.json();

  // adds all quiz information in array
  const quizArray = Object.values(data);

  // sends array with quiz data to funtion to display on page
  displayQuiz(quizArray);
  function displayQuiz(array) {
    array.forEach((element) => {
      // creates form for each quiz question
      const quizForm = document.createElement("form");
      quizElement.append(quizForm);
      // creates element to display quiz question
      const dispayQuestion = document.createElement("h2");
      dispayQuestion.innerText = element.question;

      // creates element to list answers
      const answersList = document.createElement("ul");

      // adds created elements to parent element
      quizForm.append(dispayQuestion, answersList);

      // loops trough all available answers and creates elements for them
      for (i = 0; i < element.answers.length; i++) {
        // creates list item for each answer
        const answersListItem = document.createElement("li");
        answersListItem.className = "quizListItem";
        answersList.append(answersListItem);

        // creates selectable radio input for each answer
        const quizAnswerRadioInput = document.createElement("input");
        quizAnswerRadioInput.type = "radio";
        quizAnswerRadioInput.name = "radioInput";
        quizAnswerRadioInput.value = element.answers[i];

        // creates label with answer for each radio input,
        const quizAnswer = document.createElement("label");
        quizAnswer.htmlFor = "radioInput";
        quizAnswer.innerText = element.answers[i];

        answersListItem.append(quizAnswerRadioInput, quizAnswer);

        // calls for function to compare answer to correct answer
        showCorrectAnswer(quizAnswerRadioInput);
      }

      // checks if selected answer is correct, if correct: radio button turns green, if not: radio button turns red
      function showCorrectAnswer(radioElement) {
        radioElement.addEventListener("focus", () => {
          const selectedAnswer = radioElement.value;
          const correctAnswer = element.correct_answer;

          if (selectedAnswer === correctAnswer) {
            radioElement.style.accentColor = "#77f073";
          } else {
            radioElement.style.accentColor = "#fa1111";
          }
        });
      }
    });
  }
}
