// script.js
document.addEventListener("DOMContentLoaded", function () {
  const questionElement = document.getElementById("question");
  const formElement = document.getElementById("quiz-form");
  const resultElement = document.getElementById("result");
  const submitButton = document.getElementById("submit-btn");

  let currentQuestionIndex = 0;
  let selectedAnswer = null;

  // Load the current question
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];

    // Set the question text
    questionElement.textContent = currentQuestion.question;

    // Clear previous options
    formElement.innerHTML = "";

    // Load options as radio buttons
    currentQuestion.options.forEach((option, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = option;
      input.id = `option${index}`;

      label.htmlFor = input.id;
      label.textContent = option;
      label.prepend(input);

      formElement.appendChild(label);
    });
  }

  // Check the answer
  function checkAnswer() {
    const selectedOption = document.querySelector(
      'input[name="answer"]:checked'
    );

    if (selectedOption) {
      selectedAnswer = selectedOption.value;

      const correctAnswer = quizData[currentQuestionIndex].correct;
      if (selectedAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
      } else {
        resultElement.textContent = "Wrong!";
        resultElement.style.color = "red";
      }
    } else {
      resultElement.textContent = "Please select an answer.";
      resultElement.style.color = "orange";
    }
  }

  // Event listener for submit button
  submitButton.addEventListener("click", function () {
    checkAnswer();
  });

  // Load the first question when the page is ready
  loadQuestion();
});
