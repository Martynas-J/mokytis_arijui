"use client";
import React from "react";
import useScores from "../hooks/useScores";
import Matematika from "./matematika";

export default function Scores({ action, title }) {
  const {
    pointsAddition,
    setPointsAddition,
    pointsSubtraction,
    setPointsSubtraction,
    pointsMultiplication,
    setPointsMultiplication,
    pointsDivision,
    setPointsDivision,
    passedLevelsAddition,
    setPassedLevelsAddition,
    passedLevelsSubtraction,
    setPassedLevelsSubtraction,
    passedLevelsMultiplication,
    setPassedLevelsMultiplication,
    passedLevelsDivision,
    setPassedLevelsDivision,
    correctAnswers,
    setCorrectAnswers,
    incorrectAnswers,
    setIncorrectAnswers,
  } = useScores();

  const updateScores = (isCorrect, selectedLevel) => {
    switch (action) {
      case "addition":
        if (isCorrect) {
          setPointsAddition((prevPoints) => prevPoints + 1 * selectedLevel.value);
          setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
        } else {
          setIncorrectAnswers((prevIncorrectAnswers) => prevIncorrectAnswers + 1);
        }
        break;
      case "subtraction":
        if (isCorrect) {
          setPointsSubtraction((prevPoints) => prevPoints + 1 * selectedLevel.value);
          setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
        } else {
          setIncorrectAnswers((prevIncorrectAnswers) => prevIncorrectAnswers + 1);
        }
        break;
      case "multiplication":
        if (isCorrect) {
          setPointsMultiplication((prevPoints) => prevPoints + 1 * selectedLevel.value);
          setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
        } else {
          setIncorrectAnswers((prevIncorrectAnswers) => prevIncorrectAnswers + 1);
        }
        break;
      case "division":
        if (isCorrect) {
          setPointsDivision((prevPoints) => prevPoints + 1 * selectedLevel.value);
          setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
        } else {
          setIncorrectAnswers((prevIncorrectAnswers) => prevIncorrectAnswers + 1);
        }
        break;
      default:
        throw new Error("Invalid action");
    }
  };

  const getPassedLevels = () => {
    switch (action) {
      case "addition":
        return passedLevelsAddition;
      case "subtraction":
        return passedLevelsSubtraction;
      case "multiplication":
        return passedLevelsMultiplication;
      case "division":
        return passedLevelsDivision;
      default:
        throw new Error("Invalid action");
    }
  };

  const setPassedLevels = (levels) => {
    switch (action) {
      case "addition":
        setPassedLevelsAddition(levels);
        break;
      case "subtraction":
        setPassedLevelsSubtraction(levels);
        break;
      case "multiplication":
        setPassedLevelsMultiplication(levels);
        break;
      case "division":
        setPassedLevelsDivision(levels);
        break;
      default:
        throw new Error("Invalid action");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-blue-50 p-4">
      <div className="mb-8 w-full flex gap-2 justify-around text-md md:text-xl lg:text-3xl text-green-500">
        <div>Sudėtis : {pointsAddition}</div>
        <div>Atimtis : {pointsSubtraction}</div>
        <div>Daugyba : {pointsMultiplication}</div>
        <div>Dalyba : {pointsDivision}</div>
        <div>😊 {correctAnswers}</div>
        <div className="text-red-500">😞 {incorrectAnswers}</div>
      </div>
      <div className="w-full">
        <Matematika
          updateScores={updateScores}
          passedLevelsDb={getPassedLevels()}
          setPassedLevels={setPassedLevels}
          action={action}
          title={title}
        />
      </div>
    </main>
  );
}
