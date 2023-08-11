import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXERCISES } from '../utils/queries';
import weights from '../images/weights.jpg';
import getExercises from '../utils/helper';


const ExerciseList = ()  => {
    const [muscle, setMuscle] = useState('');
    const [data, setExercise] = useState('');
    // const {searchExercises, } = useQuery(GET_EXERCISES);

    const handleInputChange = (e) => {
        setMuscle(e.target.value);
    };


    const handleSearch = async () => {
        console.log('test')
       let searchExercises = await getExercises(muscle)
       setExercise(searchExercises); 
        };
        
        // if (loading) {
            //     return <div>Loading...</div>;
            // }
            
            // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }
    
    const exercises = data || [];
    
    return (
        <div className="exerciseBg" style={{ backgroundImage: `url(${weights})` }}>
            <div className="exerciseContainer">
                <div>
                    <h1 className="exerciseHeader">Recommended Exercises</h1>
                    <div>
                        <input className="exercise-input"
                            type="text"
                            placeholder="Enter a Muscle Group"
                            value={muscle}
                            onChange={handleInputChange}
                            />
                        <button className="exercise-btn" onClick={handleSearch}>Search</button>
                    </div>
                    <div className="exerciseList">
                        {exercises.length > 0 ? (
                            exercises.slice(0, 8).map((exercise) => (
                                <div className="exercise-card" key={exercise.name}>
                                    <h3 className="exercise-title">{exercise.name}</h3>
                                    <p className="exercise-type">Type: {exercise.type}</p>
                                    <p className="exercise-muscle">Muscle: {exercise.muscle}</p>
                                    <p className="exercise-equip">Equipment: {exercise.equipment}</p>
                                    <p className="exercise-diff">Difficulty: {exercise.difficulty}</p>
                                    <p className="exercise-instructions">Instructions: {exercise.instructions}</p>
                                </div>

))
) : (
    <img  />
    )}

                    </div>
                </div>
            </div>


        </div>
    );

};

    
    export default ExerciseList;