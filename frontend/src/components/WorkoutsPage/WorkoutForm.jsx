import { useState } from "react";

export function WorkoutForm({ onWorkoutCreated, exercises }) {
  const initialWorkoutState = {
    nombre: "",
    fecha: new Date().toISOString().split("T")[0],
    valoracion: 3,
    comentarios: "",
    ejercicios: [{ nombre_id: "", peso: "", series: "", repeticiones: "", observaciones: "" }],
  };

  const [workout, setWorkout] = useState(initialWorkoutState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout(prev => ({ ...prev, [name]: value }));
  };

  const handleExerciseChange = (index, e) => {
    const { name, value } = e.target;
    const newExercises = [...workout.ejercicios];
    newExercises[index] = { ...newExercises[index], [name]: value };
    setWorkout(prev => ({ ...prev, ejercicios: newExercises }));
  };

  const addExercise = () => {
    setWorkout(prev => ({
      ...prev,
      ejercicios: [
        ...prev.ejercicios,
        { nombre_id: "", peso: "", series: "", repeticiones: "", observaciones: "" },
      ],
    }));
  };

  const removeExercise = (index) => {
    if (workout.ejercicios.length <= 1) return;
    const newExercises = workout.ejercicios.filter((_, i) => i !== index);
    setWorkout(prev => ({ ...prev, ejercicios: newExercises }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!workout.nombre.trim()) newErrors.nombre = "Workout name is required";
    if (!workout.fecha) newErrors.fecha = "Date is required";
    
    const exerciseErrors = workout.ejercicios.map(ex => {
      const err = {};
      if (!ex.nombre_id) err.nombre_id = "Exercise is required";
      if (!ex.peso) err.peso = "Weight is required";
      if (!ex.series) err.series = "Sets are required";
      if (!ex.repeticiones) err.repeticiones = "Reps are required";
      return Object.keys(err).length > 0 ? err : null;
    });

    if (exerciseErrors.some(err => err !== null)) {
      newErrors.ejercicios = exerciseErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await onWorkoutCreated(workout);
      
      // Reseteamos el formulario a su estado inicial.
      setWorkout(initialWorkoutState);

    } catch (error) {
      console.error("Error creating workout:", error);
      setErrors({ submit: error.message || "Failed to create workout. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add New Workout</h2>
      
      <form onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors.submit}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Workout Name
            </label>
            <input
              type="text"
              name="nombre"
              value={workout.nombre}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.nombre ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
              placeholder="e.g., Leg Day, Upper Body, etc."
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              name="fecha"
              value={workout.fecha}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.fecha ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
            />
            {errors.fecha && (
              <p className="mt-1 text-sm text-red-500">{errors.fecha}</p>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rating
          </label>
          <div className="flex items-center">
            <input
              type="range"
              name="valoracion"
              min="1"
              max="5"
              value={workout.valoracion}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">{workout.valoracion}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Comments (Optional)
          </label>
          <textarea
            name="comentarios"
            value={workout.comentarios}
            onChange={handleChange}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="How was your workout? Any notes?"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Exercises</h3>
            <button
              type="button"
              onClick={addExercise}
              className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
            >
              Add Exercise
            </button>
          </div>
          {workout.ejercicios.map((exercise, index) => (
            <div key={index} className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Exercise
                  </label>
                  <select
                    name="nombre_id"
                    value={exercise.nombre_id}
                    onChange={(e) => handleExerciseChange(index, e)}
                    className={`w-full px-3 py-2 border ${
                      errors.ejercicios?.[index]?.nombre_id ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
                  >
                    <option value="">Select an exercise</option>
                    {exercises.map((exerciseOption) => (
                      <option key={exerciseOption.id} value={exerciseOption.id}>
                        {exerciseOption.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.ejercicios?.[index]?.nombre_id && (
                    <p className="mt-1 text-sm text-red-500">{errors.ejercicios[index].nombre_id}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="peso"
                    value={exercise.peso}
                    onChange={(e) => handleExerciseChange(index, e)}
                    className={`w-full px-3 py-2 border ${
                      errors.ejercicios?.[index]?.peso ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.ejercicios?.[index]?.peso && (
                    <p className="mt-1 text-sm text-red-500">{errors.ejercicios[index].peso}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sets
                  </label>
                  <input
                    type="number"
                    name="series"
                    value={exercise.series}
                    onChange={(e) => handleExerciseChange(index, e)}
                    className={`w-full px-3 py-2 border ${
                      errors.ejercicios?.[index]?.series ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.ejercicios?.[index]?.series && (
                    <p className="mt-1 text-sm text-red-500">{errors.ejercicios[index].series}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reps
                  </label>
                  <input
                    type="number"
                    name="repeticiones"
                    value={exercise.repeticiones}
                    onChange={(e) => handleExerciseChange(index, e)}
                    className={`w-full px-3 py-2 border ${
                      errors.ejercicios?.[index]?.repeticiones ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.ejercicios?.[index]?.repeticiones && (
                    <p className="mt-1 text-sm text-red-500">{errors.ejercicios[index].repeticiones}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Observations (Optional)
                  </label>
                  <input
                    type="text"
                    name="observaciones"
                    value={exercise.observaciones}
                    onChange={(e) => handleExerciseChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                {index > 0 && (
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {isSubmitting ? "Creating..." : "Create Workout"}
          </button>
        </div>
      </form>
    </div>
  );
}