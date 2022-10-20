import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Table() {
  const { planetsList } = useContext(StarwarsContext);
  // const [openTable, setTable] = useState(false);
  // const [loadSearch, setLoadSearch] = useState([]);
  // const [searchInput, setSearchInput] = useState('');

  // useEffect(() => {
  //   const generateSearchList = () => {
  //     const verifySearch = loadSearch.some((search) => (search.name)
  //       .includes(searchInput));
  //     if (verifySearch) {
  //       const searchResults = loadSearch.filter((search) => (search.name)
  //         .includes(searchInput));
  //       setPlanetsList(searchResults);
  //     }
  //   };
  //   generateSearchList();
  // }, [searchInput, loadSearch]);

  // if (openTable) {
  return (
    <div>
      {/* <input
        type="text"
        placeholder="pesquisar"
        data-testid="name-filter"
        onChange={ ({ target }) => setSearchInput(target.value) }
      /> */}
      <table>
        <thead>
          <tr>
            {/* { planetsList.map((key) => (
              <th key={ key }>{ Object.keys(key) }</th>
            )) } */}
            {/* { Object.keys(planetsList[0]).map((key) => (
              <th key={ key.name }>{ key }</th>
            ))} */}
            <th>name</th>
            <th>rotation period</th>
            <th>orbital period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
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

export default Table;
