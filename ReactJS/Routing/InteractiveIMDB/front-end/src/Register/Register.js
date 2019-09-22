import React, {Component} from 'react';
import './Register.css';

class Register extends Component {
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
                { /* TODO */}
                <div className="Register">
                    <h1>Register</h1>
                    <form onSubmit={(event) => this.props.handleSubmit(event, this.state)}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={this.handleChange}
                               placeholder="Ivan Ivanov"/>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={this.handleChange}
                               placeholder="ivan@gmail.com"/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={this.handleChange}
                               placeholder="******"/>
                        <input type="submit" value="REGISTER"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
