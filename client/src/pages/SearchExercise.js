//dependencies
import React, {useState} from 'react';

const SearchExercise = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
  
    const searchEx = async () => {
      try {
        // const response = await fetch();
        // const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    return(
        // Search engine
        <div className="searchEx">
            <input
            type="text"
            placeholder="Search Exercises"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={searchEx}>Search</button>
        </div>
    )
}

export default SearchExercise