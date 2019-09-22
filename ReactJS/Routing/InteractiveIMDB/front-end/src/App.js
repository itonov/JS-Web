import React, {Component, Fragment} from 'react';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './Header/Header';
import toast from 'react-toastr';

class App extends Component {
    handleSubmit(e, data) {
        e.preventDefault();
        toast.success('test')
        fetch('http://localhost:9999/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(body => {
                if (body.errors.length > 0) {
                    toast.success('test')
                }
            });
    }

    render() {
        return (
            <div className="App">
                { /* TODO */}
                <BrowserRouter>
                    <Fragment>
                        <Header/>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/register" render={() => <Register handleSubmit={this.handleSubmit}/>}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/create" component={Create}/>
                            <Route render={() => <h1>Not Found</h1>}/>
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
