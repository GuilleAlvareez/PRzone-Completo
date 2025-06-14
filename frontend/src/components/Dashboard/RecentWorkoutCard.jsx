import { useEffect, useState } from "react";

export function RecentWorkoutCard({ id, nombre, fecha, valoracion, numero_ejercicios}) {
  const [totalLift, setTotalLift] = useState(0);

  useEffect(() => {
    const fetchTotalLift = async () => {
      const response = await fetch(`http://localhost:3000/workouts/details/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Error fetching workout details");
        }

        const data = await response.json();
        let weight = 0;

        data.ejercicios.forEach((exercise) => {
          weight += exercise.peso * exercise.repeticiones * exercise.series;
        });
        setTotalLift(weight);
    }
    fetchTotalLift();
  }, [id])

  function formatDate(fecha) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${
            i <= rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="p-4 border-b border-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors duration-200">
      <h3 className="font-semibold">
        {nombre} - {formatDate(fecha)}
      </h3>
      <p className="text-gray-600">
        Rate: {renderRating(valoracion)} • {numero_ejercicios} exercises • {totalLift}
        kg total
      </p>
    </div>
  );
}
