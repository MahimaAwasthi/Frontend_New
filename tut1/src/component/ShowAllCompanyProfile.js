import { useEffect,useState } from "react"
import axios from "axios"
import InputField from "./InputField"
import ExcelDownloadButton from "./ExcelDownloadButton"

const DisplayAllCompanies = ()=> {
    const [companyDetail,setAllCompanies] = useState([])
    const [updatedCompanyDetail,setUpdatedCompanyDetail] = useState({companyName:"",technicalRequirement:"",experience:"",packageOffered:""})
    const [isEditEnable,setIsEditEnable] = useState()
    const handleChange = (e) => {
        setUpdatedCompanyDetail({...updatedCompanyDetail, [e.target.name]: e.target.value})
        console.log(updatedCompanyDetail)
      };

        useEffect(()=> {
        axios.get("http://localhost:8081/company/showAllCompanies",{headers:{
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }}).then((res)=> {
            console.log(res.data)
            // for(let i =0;i<res.data.length;i++){
            // console.log(res.data[i])
            setAllCompanies(res.data)
            // }
        }).catch((err) => {
            console.log(err)
        })
    },[companyDetail.length])
    const headers = ['ID', 'Company Name', 'Technical Requirement','Experience','Package Offered'];
const updateDetails = (e) => {
    axios.put(`http://localhost:8081/company/modifyCompanyProfile/${isEditEnable}`,updatedCompanyDetail,{
        headers:{
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }
    }).then((res) => {
        console.log(res.data)
        setIsEditEnable()
    }).catch((err)=> {
        console.log(err)
    })
}

return(
    <div>
        <ExcelDownloadButton headers={headers} tableData = {companyDetail}></ExcelDownloadButton>
        {
        companyDetail.map((comp)=> {
            return(
        <form >
            <InputField  id type="text" name="companyName" placeholder="Company Name"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.companyName :comp.companyName} disabled={isEditEnable === comp.id ? false : true}/>
            <InputField  type="text" name="technicalRequirement" placeholder="Technical Requirement"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.technicalRequirement :comp.technicalRequirement} disabled={isEditEnable === comp.id ? false : true}/>
            <InputField type="text" name="experience" placeholder="Experience"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.experience :comp.experience} disabled={isEditEnable === comp.id ? false : true}/>
            <InputField type="text" name="packageOffered" placeholder="Package Offered"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.packageOffered :comp.packageOffered} disabled={isEditEnable === comp.id ? false : true}/>
            {
                isEditEnable === comp.id ?
                <input type="submit" value="Save" onClick={updateDetails} />
            :<input type="submit" value="Edit" onClick={(e)=> {
                e.preventDefault()
                console.log(comp.id)
                setIsEditEnable(comp.id)
                setUpdatedCompanyDetail({companyName:comp.companyName,packageOffered:comp.packageOffered,technicalRequirement:comp.technicalRequirement,experience:comp.experience})
            }} />
        }
            </form>
            )
        })}
    </div>
)
}

export default DisplayAllCompanies
