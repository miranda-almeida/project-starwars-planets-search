import PropTypes from 'prop-types';
import { useMemo, useEffect, useState } from 'react';
import StarwarsContext from './StarwarsContext';

function StarwarsProvider({ children }) {
  // FETCH API
  const [planetsList, setPlanetsList] = useState([]);
  // SEARCH INPUT
  const [searchTextInput, setSearchTextInput] = useState('');

  // FILTERS
  // const [filterByColumn, setFilterByColumn] = useState('population'); // DROPDOWN SELECTOR, COLUMNS

  const [filterByOperator, setFilterByOperator] = useState('maior que'); // DROPDOWN SELECTOR, COMPARISON OPERATORS
  const operators = ({ target: { value } }) => setFilterByOperator(value);

  const [filterByNumber, setFilterByNumber] = useState(0); // INPUT FOR NUMBER
  const numbers = ({ target: { value } }) => setFilterByNumber(value);

  // LIMIT FILTER OPTIONS
  const [filterOptions, setFilterOptions] = useState([
    'population', // alterar a ordem passa no 4 mas quebra o 6
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [filterNumbers, setFilterNumbers] = useState([]);
  // const [filterColumns, setFilterColumns] = useState('population');
  const [filterColumns, setFilterColumns] = useState(filterOptions[0]); // passando no 6, quebra o 4
  const columns = ({ target: { value } }) => setFilterColumns(value);
  const operatorsLogic = () => {
    setFilterNumbers([...filterNumbers, {
      filterColumns, operator: filterByOperator, value: filterByNumber }]);
    const filtering = filterOptions
      .filter((element) => (element !== filterColumns));
    console.log(filtering);
    setFilterOptions(filtering);
    setFilterColumns(filtering[0]);

    if (filterByOperator === 'maior que') {
      const greaterThan = planetsList
        .filter((element) => +element[filterColumns] > +filterByNumber);
      setPlanetsList(greaterThan);
    }

    if (filterByOperator === 'menor que') {
      const lessThan = planetsList
        .filter((element) => +element[filterColumns] < +filterByNumber);
      setPlanetsList(lessThan);
    }

    if (filterByOperator === 'igual a') {
      const equalsTo = planetsList
        .filter((element) => +element[filterColumns] === +filterByNumber);
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
    filterColumns,
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
    filterColumns,
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
