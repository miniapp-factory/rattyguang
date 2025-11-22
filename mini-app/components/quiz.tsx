"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QuizResult from "./quiz-result";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface Question {
  text: string;
  options: {
    text: string;
    animal: Animal;
  }[];
}

const questions: Question[] = [
  {
    text: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grains", animal: "horse" },
    ],
  },
  {
    text: "Which environment do you prefer?",
    options: [
      { text: "Indoor", animal: "cat" },
      { text: "Outdoor", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    text: "What is your energy level?",
    options: [
      { text: "Low", animal: "cat" },
      { text: "High", animal: "dog" },
      { text: "Medium", animal: "fox" },
      { text: "Low", animal: "hamster" },
      { text: "High", animal: "horse" },
    ],
  },
  {
    text: "How do you like to play?",
    options: [
      { text: "Pounce", animal: "cat" },
      { text: "Fetch", animal: "dog" },
      { text: "Chase", animal: "fox" },
      { text: "Nibble", animal: "hamster" },
      { text: "Run", animal: "horse" },
    ],
  },
  {
    text: "What is your preferred companion?",
    options: [
      { text: "Human", animal: "cat" },
      { text: "Human", animal: "dog" },
      { text: "Human", animal: "fox" },
      { text: "Human", animal: "hamster" },
      { text: "Human", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [shuffledOptions, setShuffledOptions] = useState(
    shuffleArray(questions[0].options)
  );
  const [showResult, setShowResult] = useState(false);
  const [resultAnimal, setResultAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    setShuffledOptions(shuffleArray(questions[current].options));
  }, [current]);

  const handleAnswer = (animal: Animal) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const maxScore = Math.max(...Object.values(scores));
      const topAnimals = Object.entries(scores)
        .filter(([, s]) => s === maxScore)
        .map(([a]) => a as Animal);
      setResultAnimal(topAnimals[0]); // pick first in case of tie
      setShowResult(true);
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShowResult(false);
    setResultAnimal(null);
  };

  if (showResult && resultAnimal) {
    return <QuizResult animal={resultAnimal} onRetake={retake} />;
  }

  const question = questions[current];

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">{question.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
