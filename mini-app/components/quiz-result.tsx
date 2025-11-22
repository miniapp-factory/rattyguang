"use client";

import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

interface Props {
  animal: "cat" | "dog" | "fox" | "hamster" | "horse";
  onRetake: () => void;
}

const animalData: Record<
  Props["animal"],
  { name: string; image: string }
> = {
  cat: { name: "Cat", image: "/cat.png" },
  dog: { name: "Dog", image: "/dog.png" },
  fox: { name: "Fox", image: "/fox.png" },
  hamster: { name: "Hamster", image: "/hamster.png" },
  horse: { name: "Horse", image: "/horse.png" },
};

export default function QuizResult({ animal, onRetake }: Props) {
  const data = animalData[animal];
  const shareText = `I just discovered I'm most similar to a ${data.name}! Check it out: ${url}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">You are a {data.name}!</h2>
      <img
        src={data.image}
        alt={data.name}
        width={256}
        height={256}
        className="rounded-lg"
      />
      <div className="flex gap-2">
        <Share text={shareText} />
        <Button onClick={onRetake}>Retake Quiz</Button>
      </div>
    </div>
  );
}
