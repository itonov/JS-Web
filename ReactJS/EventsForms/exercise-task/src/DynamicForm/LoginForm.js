import React from 'react';
import './login.css';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={(event) => {
                   // TODO: prevent the default behavior of the event and use the loginUser function by passing it the data from the form
                    event.preventDefault();
                    this.props.loginUser(this.state);
                }}>
                    <label>Username</label>
                    <input type="text" name="username" id="usernameLogin" onChange={this.handleChange}/>
                    <label>Password</label>
                    <input type="password" name="password" id="passwordLogin" onChange={this.handleChange}/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default LogInForm;
