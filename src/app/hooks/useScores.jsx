"use client";
import { useState, useEffect } from "react";

const useScores = () => {
  const getInitialValue = (key, defaultValue) => {
    if (typeof window !== "undefined") {
      const savedValue = window.localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : defaultValue;
    }
    return defaultValue;
  };

  const [pointsAddition, setPointsAddition] = useState(() => getInitialValue("pointsAddition", 0));
  const [pointsSubtraction, setPointsSubtraction] = useState(() => getInitialValue("pointsSubtraction", 0));
  const [pointsMultiplication, setPointsMultiplication] = useState(() => getInitialValue("pointsMultiplication", 0));
  const [pointsDivision, setPointsDivision] = useState(() => getInitialValue("pointsDivision", 0));

  const [passedLevelsAddition, setPassedLevelsAddition] = useState(() => getInitialValue("passedLevelsAddition", []));
  const [passedLevelsSubtraction, setPassedLevelsSubtraction] = useState(() => getInitialValue("passedLevelsSubtraction", []));
  const [passedLevelsMultiplication, setPassedLevelsMultiplication] = useState(() => getInitialValue("passedLevelsMultiplication", []));
  const [passedLevelsDivision, setPassedLevelsDivision] = useState(() => getInitialValue("passedLevelsDivision", []));

  const [correctAnswers, setCorrectAnswers] = useState(() => getInitialValue("correctAnswers", 0));
  const [incorrectAnswers, setIncorrectAnswers] = useState(() => getInitialValue("incorrectAnswers", 0));

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pointsAddition", JSON.stringify(pointsAddition));
      localStorage.setItem("pointsSubtraction", JSON.stringify(pointsSubtraction));
      localStorage.setItem("pointsMultiplication", JSON.stringify(pointsMultiplication));
      localStorage.setItem("pointsDivision", JSON.stringify(pointsDivision));
      localStorage.setItem("passedLevelsAddition", JSON.stringify(passedLevelsAddition));
      localStorage.setItem("passedLevelsSubtraction", JSON.stringify(passedLevelsSubtraction));
      localStorage.setItem("passedLevelsMultiplication", JSON.stringify(passedLevelsMultiplication));
      localStorage.setItem("passedLevelsDivision", JSON.stringify(passedLevelsDivision));
      localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
      localStorage.setItem("incorrectAnswers", JSON.stringify(incorrectAnswers));
    }
  }, [pointsAddition, pointsSubtraction, pointsMultiplication, pointsDivision, passedLevelsAddition, passedLevelsSubtraction, passedLevelsMultiplication, passedLevelsDivision, correctAnswers, incorrectAnswers]);

  return {
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
  };
};

export default useScores;
