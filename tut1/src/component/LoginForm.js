import InputField from "./InputField";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
      
    const [inputText, setInputText] = useState({username:"",password:""});
    const handleChange = (e) => {
        setInputText({...inputText, [e.target.name]: e.target.value})
      };
      const onSubmitFormRequest = (e)=> {
        e.preventDefault()
           axios.post("http://localhost:8080/authenticate",
           {
                ...inputText
           },headers).then((response) => {
            console.log(response.data)
            localStorage.setItem("jwtToken",response.data.jwtToken)
            //window.location.href = "/Home";
            window.location.href = "/showAllCompanyProfile";
           }).catch((error)=>{
            console.log(error)
            
           })
           setInputText({username:"",password:""})
      }
      
    return (
     
        <div>
        <form onSubmit={onSubmitFormRequest}>
        <InputField type="text" placeholder="Name" name="username" onChange={handleChange} value={inputText.username}/>
        <InputField type="password" placeholder="Password" name="password" onChange={handleChange} value={inputText.password}/>
        <input type="submit" />
        </form>
        </div>
    );
}