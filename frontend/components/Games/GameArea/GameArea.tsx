"use client"
import GameCard from "./Component/GameCard";
import axios from "axios";
import { useState } from "react";

interface Response {
  status: boolean;
}

export default function GameArea() {
  const [cards, setCards] = useState(
    Array.from({ length: 25 }).map(() => ({ loading: false, status: false }))
  );

  const handleOnClick = async (index: number) => {
    // Set clicked card to loading state
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index].loading = true;
      return updatedCards;
    });

    try {
      const response = await axios.get<Response>("https://backend-production.krishnakmar-005.workers.dev/api/mines");

      // Update the clicked card with the status result
      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[index] = { loading: false, status: response.data.status };
        return updatedCards;
      });
    } catch (error) {
      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[index] = { loading: false, status: false }; // Default to "Lose" on error
        return updatedCards;
      });
    }
  };

  return (
    <div className="my-3 p-5 grid grid-cols-5 gap-x-3 gap-y-2 rounded-md bg-C1-dark">
      {cards.map((card, index) => (
        <GameCard
          key={index}
          Loading={card.loading}
          Status={card.status}
          onClick={() => handleOnClick(index)}
        />
      ))}
    </div>
  );
}
