import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Search() {
  const { searchTextInput, applyTextInput } = useContext(StarwarsContext);
  return (
    <form>
      <input
        type="text"
        value={ searchTextInput }
        placeholder="pesquisar"
        data-testid="name-filter"
        onChange={ applyTextInput }
      />
    </form>
  );
}

export default Search;
