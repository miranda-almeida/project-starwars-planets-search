import PropTypes from 'prop-types';
import { useMemo, useEffect, useState } from 'react';
import StarwarsContext from './StarwarsContext';

function StarwarsProvider({ children }) {
  // FETCH API
  const [planetsList, setPlanetsList] = useState([]);
  // SEARCH INPUT
  const [searchTextInput, setSearchTextInput] = useState('');

  // FILTERS
  const [filterByColumn, setFilterByColumn] = useState('population'); // DROPDOWN SELECTOR, COLUMNS
  const columns = ({ target: { value } }) => setFilterByColumn(value);

  const [filterByOperator, setFilterByOperator] = useState('maior que'); // DROPDOWN SELECTOR, COMPARISON OPERATORS
  const operators = ({ target: { value } }) => setFilterByOperator(value);

  const [filterByNumber, setFilterByNumber] = useState(0); // INPUT FOR NUMBER
  const numbers = ({ target: { value } }) => setFilterByNumber(value);

  // LIMIT FILTER OPTIONS
  const [filterOptions, setFilterOptions] = useState([
    'population', // erro cypress: só é removido population ao selecionar outro filtro
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [filterNumbers, setFilterNumbers] = useState([]);
  const [filterColumns, setFilterColumns] = useState('population');

  const operatorsLogic = () => {
    setFilterNumbers([...filterNumbers, {
      filterColumns, operator: filterByOperator, value: filterByNumber }]);
    const filtering = filterOptions
      .filter((element) => element !== filterColumns);
    setFilterOptions(filtering);
    setFilterColumns(filtering[0]);
    console.log(filtering, filterColumns);

    if (filterByOperator === 'maior que') {
      const greaterThan = planetsList
        .filter((element) => +element[filterByColumn] > +filterByNumber);
      setPlanetsList(greaterThan);
    }

    if (filterByOperator === 'menor que') {
      const lessThan = planetsList
        .filter((element) => +element[filterByColumn] < +filterByNumber);
      setPlanetsList(lessThan);
    }

    if (filterByOperator === 'igual a') {
      const equalsTo = planetsList
        .filter((element) => +element[filterByColumn] === +filterByNumber);
      setPlanetsList(equalsTo);
    }
  };
  // console.log(operatorsLogic);

  // FETCH API
  useEffect(() => {
    const endpoint = 'https://swapi.dev/api/planets';
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      results.filter((planet) => delete planet.residents);
      setPlanetsList(results);
      // console.log(results);
    };
    getPlanets();
  }, []);

  // SEARCH INPUT
  const applyTextInput = ({ target: { value } }) => {
    setSearchTextInput(value);
  };

  const fetchPlanets = useMemo(() => ({
    planetsList,
    searchTextInput,
    applyTextInput,
    filterByColumn,
    columns,
    filterByOperator,
    operators,
    filterByNumber,
    numbers,
    operatorsLogic,
    filterOptions,
    filterNumbers,
  }), [
    planetsList,
    searchTextInput,
    filterByColumn,
    filterByOperator,
    filterByNumber,
    filterOptions,
    // operatorsLogic,
  ]);

  return (
    <StarwarsContext.Provider value={ fetchPlanets }>
      {children}
    </StarwarsContext.Provider>
  );
}

StarwarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarwarsProvider;
