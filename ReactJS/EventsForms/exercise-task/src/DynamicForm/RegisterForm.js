import React from 'react';
import './register.css';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="Register">
                <h1>Sign Up</h1>
                <form onSubmit={(event) => {
                    // TODO: prevent the default behavior of the event and use the registerUser function by passing it the data from the form
                    event.preventDefault();
                    this.props.registerUser(this.state);
                }}>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.handleChange}
                           id="usernameReg"/>
                    <label>Email</label>
                    <input type="text" name="email" onChange={this.handleChange} id="emailReg"/>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange}
                           id="passwordReg"/>
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}

export default RegisterForm;