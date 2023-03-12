import React, { useRef } from "react";
import "./Login.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Login = ({ setShowLogin, setCurrentUser }) => {
    const nameRef = useRef();
    const passRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username: nameRef.current.value,
            password: passRef.current.value,
        };

        try {
            const response = await axios.post("/users/login", newUser);

            // Successful login. Display Success notification
            console.log(response);
            setShowLogin(false);
            console.log(response.data);
            setCurrentUser(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="login_container">
            <div className="welcome_banner">
                Welcome! Please Login&nbsp;
                <ExitToAppIcon />
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={nameRef} />
                <input type="password" placeholder="Password" ref={passRef} />
                <button className="login_button">Login</button>
                <CloseIcon className="login_cancel" onClick={() => setShowLogin(false)} />
            </form>
        </div>
    );
};

export default Login;
