import React, { useState } from 'react';
import axios from 'axios';


export default function Search() {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      axios.get(`http://localhost:8080/company/showCompanyProfile/${searchQuery}`,{headers:{
          'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
      }}).then(response => {
          console.log('Item searched successfully:', response.data);
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };

return (
    <div>
      <input
        type="text"
        placeholder="Search company name ..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
    </div>
  );
}