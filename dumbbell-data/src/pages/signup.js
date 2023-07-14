import React, {useEffect, useState} from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const Signup = () => {
    const [username, setUsername]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:5000/users/add", {
                username,email,password
            })
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <h1>Signup</h1>

            <form action="POST">
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder="username" />
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" />
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" />
                <input type="submit" onClick={submit} />
            </form>
            <br />
            <p>OR</p>
            <Link to="/">Login Page</Link>
        </div>
    )
}

export default Signup