import React, { useEffect } from 'react';
import './App.css';

function App() {
  const endpoint = 'https://swapi.dev/api/planets';
  // const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      console.log(results);
    };
    getPlanets();
  }, []);
  return (
    <div>
      <h1>Starwars Planets Search</h1>
      {/* <table>
          {planetsList
            .map(( {
              name,
              rotation_period: rotation,
              orbital_period: orbital,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surface,
              population,
              residents,
              films,
              created,
              edited,
              url,
            } ) => (
              <tr>{ name }</tr>
              <tr>{ rotation }</tr>
            ))
          }
      </table> */}
    </div>
  );
}

export default App;
