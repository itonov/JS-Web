import React from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import CreateForm from "../Games/CreateForm";

class DynamicForm extends React.Component {

    render() {
        return (
            <div>
                <div>
                    {/*TODO: render a form depending on wheather the loginForm property is true*/
                        this.props.user ? <CreateForm createGame={this.props.createGame.bind(this)}/> :
                            this.props.loginForm ? (<LogInForm loginUser={this.props.loginUser.bind(this)}/>) :
                                (<RegisterForm registerUser={this.props.registerUser.bind(this)}/>)
                    }

                </div>
            </div>
        )
    }
}

export default DynamicForm