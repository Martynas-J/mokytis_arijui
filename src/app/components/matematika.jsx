"use client";
import { levels } from "@/variables/variables";
import React, { useState } from "react";

const generateRandomProblem = (level, action) => {
  let num1 = Math.floor(Math.random() * 10 * level) + 1;
  let num2 = Math.floor(Math.random() * 10 * level) + 1;
  let correctAnswer;

  switch(action) {
    case "addition":
      correctAnswer = num1 + num2;
      break;
    case "subtraction":
      if (num1 < num2) [num1, num2] = [num2, num1];
      correctAnswer = num1 - num2;
      break;
    case "multiplication":
      correctAnswer = num1 * num2;
      break;
    case "division":
      while (num2 === 0 || num1 % num2 !== 0) {
        num2 = Math.floor(Math.random() * 10 * level) + 1;
      }
      correctAnswer = num1 / num2;
      break;
    default:
      throw new Error("Invalid action");
  }

  let choices = new Set([correctAnswer]);

  while (choices.size < 6) {
    let choice;
    switch(action) {
      case "addition":
      case "multiplication":
        choice = Math.floor(Math.random() * 10 * level * 2) + 1;
        break;
      case "subtraction":
      case "division":
        choice = Math.floor(Math.random() * 10 * level * 2) - (10 * level) + 1;
        break;
    }
    choices.add(choice);
  }

  choices = Array.from(choices).sort(() => Math.random() - 0.5);

  const problemText = {
    addition: `${num1} + ${num2} = ?`,
    subtraction: `${num1} - ${num2} = ?`,
    multiplication: `${num1} × ${num2} = ?`,
    division: `${num1} ÷ ${num2} = ?`
  }[action];

  return {
    problem: problemText,
    correctAnswer,
    choices,
  };
};

const Matematika = ({ action, updateScores, passedLevelsDb, setPassedLevels, title }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [problems, setProblems] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [passedLevels, setPassedLevelsState] = useState(passedLevelsDb || []);

  const startQuiz = (level) => {
    const generatedProblems = Array.from({ length: 10 }, () =>
      generateRandomProblem(level.value, action)
    );
    setProblems(generatedProblems);
    setSelectedLevel(level);
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setCorrectAnswersCount(0);
  };

  const handleAnswer = (answer) => {
    const isCorrect = problems[currentQuestion].correctAnswer === answer;
    updateScores(isCorrect, selectedLevel);

    if (isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }

    if (currentQuestion + 1 < problems.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      if (correctAnswersCount + (isCorrect ? 1 : 0) >= 8) {
        const updatedPassedLevels = [...passedLevels, selectedLevel.value];
        setPassedLevelsState(updatedPassedLevels);
        setPassedLevels(updatedPassedLevels);
        window.localStorage.setItem(
          `passedLevels${action.charAt(0).toUpperCase() + action.slice(1)}`,
          JSON.stringify(updatedPassedLevels)
        );
      }
    }
  };

  const questionProgress = (currentQuestion / problems.length) * 100;
  const answerProgress = Math.min((correctAnswersCount / 8) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center bg-blue-50 p-4 lg:text-3xl">
      <div className="w-full">
        <h2 className="text-2xl lg:text-4xl font-semibold mb-4 text-blue-600 text-center ">
          {title.toUpperCase()}
        </h2>
        <div className="grid grid-cols-5 gap-4 mb-8 text-sm sm:text-xl">
          {levels.map((lvl, index) => (
            <button
              key={index}
              onClick={() => startQuiz(lvl)}
              disabled={lvl.value > Math.max(...passedLevels, 0) + 1}
              className={`py-2 rounded-lg ${
                lvl.value <= Math.max(...passedLevels, 0) + 1
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {lvl.title}
            </button>
          ))}
        </div>
        {selectedLevel && !quizCompleted && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto ">
            <h3 className="text-xl lg:text-3xl font-semibold mb-4 text-center">
              {selectedLevel.title} Užduotys
            </h3>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${answerProgress}%` }}
                ></div>
              </div>
              <p className="text-center mb-4">
                {correctAnswersCount}/8 teisingi atsakymai
              </p>
              <p className="text-lg lg:text-3xl mb-4">
                {problems[currentQuestion].problem}
              </p>
              <div className="grid grid-cols-6 gap-4 mb-4">
                {problems[currentQuestion].choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(choice)}
                    className="bg-blue-300 text-blue-700 py-2 rounded-lg hover:bg-blue-400"
                  >
                    {choice}
                  </button>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${questionProgress}%` }}
                ></div>
              </div>
              <p className="text-center">
                {currentQuestion}/{problems.length}
              </p>
            </div>
          </div>
        )}
        {quizCompleted && (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center lg:text-3xl">
            <h3 className="text-xl font-semibold mb-4">Resultatas:</h3>
            {correctAnswersCount >= 8 ? (
              <p>Pereita į kitą lygį!</p>
            ) : (
              <p>Neišlaikėte, bandykite dar kartą! {correctAnswersCount}/10</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matematika;
