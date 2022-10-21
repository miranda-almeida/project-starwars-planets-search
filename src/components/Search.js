import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Search() {
  const {
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
  } = useContext(StarwarsContext);
  return (
    <form>
      <input
        type="text"
        value={ searchTextInput }
        placeholder="pesquisar"
        data-testid="name-filter"
        onChange={ applyTextInput }
      />

      <select
        value={ filterByColumn }
        onChange={ columns }
        data-testid="column-filter"
      >
        {filterOptions
          .map((selector) => (
            <option key={ selector } value={ selector }>
              { selector }
            </option>
          ))}
      </select>

      <select
        value={ filterByOperator }
        onChange={ operators }
        data-testid="comparison-filter"
      >
        {['maior que', 'menor que', 'igual a']
          .map((options) => (
            <option key={ options } value={ options }>
              { options }
            </option>
          ))}
      </select>

      <input
        type="number"
        value={ filterByNumber }
        onChange={ numbers }
        data-testid="value-filter"
      />

      <button
        type="button"
        onClick={ operatorsLogic }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}

export default Search;
