// import React from 'react';
// import ExcelJS from 'exceljs';

// const ExcelDownloadButton = ({ headers, tableData }) => {
//   const handleDownload = async () => {
//     try {
//         const excelBuffer = await formatDataForExcel(tableData, headers);
//         const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'Companies_Data.xlsx');
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//   };

//   const formatDataForExcel = (data, headers) => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Sheet 1');
//     worksheet.addRow(headers);
//     data.forEach((row) => {
//       worksheet.addRow(Object.values(row));
//     });
  
//     return workbook.xlsx.writeBuffer();
//   };  
//   return (
//     <button onClick={handleDownload}>Download Excel</button>
//   );
// };

// export default ExcelDownloadButton;


import React from 'react';
import axios from 'axios';

const ExcelDownloadButton = ({ headers, tableData,className }) => {
  const handleDownload = () => {
    axios.post('http://localhost:8081/company/downloadExcel',{},{headers:{
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    },responseType:'blob'}).then((response)=> {
        console.log(response.data)
        const blob = new Blob([response.data], { type: 'application/octet-stream' });

        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);

        // Create a temporary <a> element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample.xlsx'; // Set the desired file name

        // Trigger the download
        a.click();

        // Clean up by revoking the Object URL
        window.URL.revokeObjectURL(url);
    }).catch((error) => {
      console.log(error)
    })
  };
  return(
    <div>
        <button onClick={handleDownload}>Download Excel</button>
      </div>
  )
}

export default ExcelDownloadButton;
