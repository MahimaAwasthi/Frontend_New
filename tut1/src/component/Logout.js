const Logout = ()=> {
return(
    <div>
        <input type="submit" value="Logout" onClick={()=> {
            localStorage.removeItem("jwtToken")
            localStorage.removeItem("expiryTime")
            window.location.replace('http://localhost:3000');
        }}/>
    </div>
)
}

export default Logout