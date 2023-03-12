import React, { useRef } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import "./Register.css";
import axios from "axios";

export const Register = ({ setShowRegister }) => {
    const nameRef = useRef();
    const passRef = useRef();
    const emailRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username: nameRef.current.value,
            password: passRef.current.value,
            email: emailRef.current.value,
        };

        try {
            const response = await axios.post("/users/register", newUser);

            // Successful register. Display Success notification
            console.log(response);
            setShowRegister(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="register_container">
            <div className="welcome_banner">
                Welcome! Create a Profile&nbsp;
                <ExitToAppIcon />
            </div>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" ref={emailRef} />
                <input type="text" placeholder="Username" ref={nameRef} />
                <input type="password" placeholder="Password" ref={passRef} />
                <button className="register_button">Register</button>
                <CloseIcon className="register_cancel" onClick={() => setShowRegister(false)} />
            </form>
        </div>
    );
};
