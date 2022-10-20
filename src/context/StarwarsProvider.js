import PropTypes from 'prop-types';
import { useMemo, useEffect, useState } from 'react';
import StarwarsContext from './StarwarsContext';

function StarwarsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    const endpoint = 'https://swapi.dev/api/planets';
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      results.forEach((planet) => delete planet.residents);
      setPlanetsList(results);
      // console.log(results);
    };
    getPlanets();
  }, []);

  const fetchPlanets = useMemo(() => ({ planetsList }), [planetsList]);
  return (
    <StarwarsContext.Provider value={ fetchPlanets }>
      {children}
    </StarwarsContext.Provider>
  );
}

StarwarsProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default StarwarsProvider;
