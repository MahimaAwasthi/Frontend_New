import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';
import ExcelDownloadButton from './ExcelDownloadButton';
import { Link } from 'react-router-dom';

export default function ShowAllCompanyProfile() {

   const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8080/company/showAllCompanyProfile',{headers:{
        'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    }})
      .then(response => {
        setData(response.data);
        console.log("Fetched Data successfully");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (id) => {
    const parsedId = parseInt(id);
   
    axios.delete(`http://localhost:8080/company/deleteCompanyProfile/${parsedId}`,{headers:{
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }}).then(response => {
            console.log('Deleted successfully:', response.data);
            fetchData();
          })
          .catch(error => {
            console.error('Error deleting item:', error);
          });
    }
    const headers = ['ID', 'Company Name', 'Technical Requirement','Experience','Package Offered'];


  return (
      <div>
        <ExcelDownloadButton headers={headers} tableData = {data}></ExcelDownloadButton>
        <Link to="/home" target="_blank">
        <button>Add Company</button>
        </Link>
        <Search></Search>
        <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {data.map(item => (
        <tr key={item.id}>
         <td> <input type="text" value={item.id} readOnly /></td>
          <td><input type="text" value={item.companyName} readOnly /></td>
          <td><input type="text" value={item.technicalRequirement} readOnly /></td>
          <td><input type="text" value={item.experience} readOnly /></td>
         <td> <input type="text" value={item.packageOffered} readOnly /></td>
         <td> <button onClick={() => handleDelete(item.id)}>Delete</button></td>
         <td> <button >Edit</button></td>
        </tr>
      ))}
      </tbody>
      </table>
      </div>
  );
}