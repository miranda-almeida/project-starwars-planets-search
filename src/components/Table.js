import React, { useEffect, useState } from 'react';

function Table() {
  const endpoint = 'https://swapi.dev/api/planets';
  const [planetsList, setPlanetsList] = useState([]);
  const [openTable, setTable] = useState(false);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      results.forEach((planet) => delete planet.residents);
      setPlanetsList(results);
      setTable(true);
    };
    getPlanets();
  }, []);

  if (openTable) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              {Object.keys(planetsList[0]).map((key) => (
                <th key={ key }>{ key }</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planetsList
              .map(({
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
              }) => (
                <tr key={ name }>
                  <td>{ name }</td>
                  <td>{ rotation }</td>
                  <td>{ orbital }</td>
                  <td>{ diameter }</td>
                  <td>{ climate }</td>
                  <td>{ gravity }</td>
                  <td>{ terrain }</td>
                  <td>{ surface }</td>
                  <td>{ population }</td>
                  <td>{ residents }</td>
                  <td>{ films }</td>
                  <td>{ created }</td>
                  <td>{ edited }</td>
                  <td>{ url }</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <h4>carregando..</h4>
  );
}

export default Table;
