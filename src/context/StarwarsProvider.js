import PropTypes from 'prop-types';
import { useMemo, useEffect, useState } from 'react';
import StarwarsContext from './StarwarsContext';

function StarwarsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [searchTextInput, setSearchTextInput] = useState('');

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

  const applyTextInput = ({ target: { value } }) => {
    setSearchTextInput(value);
  };

  const fetchPlanets = useMemo(() => ({
    planetsList,
    searchTextInput,
    applyTextInput,
  }), [planetsList, searchTextInput]);

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
