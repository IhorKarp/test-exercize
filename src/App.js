import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import "./App.css";



function CountryList() {
  const [countries, setCountries] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredCountries, setFilteredCountries] = useState([]);
const [selectedFilter, setSelectedFilter] = useState("all");



  useEffect(() => {
    async function fetchData() {
      setFilteredCountries([]);
      const response = await axios.get(
        'https://restcountries.com/v2/all?fields=name,region,area'
      );
      setCountries(response.data);
      console.log(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries
        .filter((country) => country.area < 65300)
        .filter((country) => country.region === "Oceania")
    );
  }, [countries]);

  function sortCountries(order) {
    setSortOrder(order);
    if (order === 'asc') {
      setFilteredCountries([...filteredCountries].sort((a, b) => (a.name > b.name ? 1 : -1)));
    } else {
      setFilteredCountries([...filteredCountries].sort((a, b) => (a.name < b.name ? 1 : -1)));
    }
  }

function handleFilterChange(e) {
  setSelectedFilter(e.target.value);
  if (e.target.value === 'all') {
    setFilteredCountries(countries.sort((a, b) => (a.name > b.name ? 1 : -1)));
  } else {
    setFilteredCountries(countries.filter(country => country.region === e.target.value));
  }
}



  return (
    <div className='bg-light'>
      <form>
  <br />
  <label className='mx-3 my-3 text-center'>
    <span className='fw-bold fs-6'>Region:</span>
    <select className='ms-2' value ={selectedFilter} onChange={handleFilterChange}>
      <option value="all">All</option>
      <option value="Oceania">Oceania</option>
    </select>
  </label>
  <br />
  <button className='btn btn-success mx-3 my-1' onClick={handleFilterChange}>Filter</button>
</form>

      <button className='btn btn-success mx-3 my-1' onClick={() => sortCountries('asc')}>Sort A-Z</button>
      <button className='btn btn-success mx-1 my-1' onClick={() => sortCountries('desc')}>Sort Z-A</button>
      <Table striped bordered hover className='table table-success table-striped-columns'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Area</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country) => (
            <tr key={country.name}>
              <td>{country.name}</td>
              <td>{country.region}</td>
              <td>{country.area}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CountryList;
