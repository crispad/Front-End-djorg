import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.register(this.state.username, this.password);
    }

    render() {
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        return (
            <form onSubmit={this.onSubmit}>
                <fieldset>
                    <legend>Register</legend>
                    {this.props.errors.length > 0 && (
                        <ul>
                            {this.props.errors.map(error => (
                                <li key={error.field}>{error.message}</li>
                            ))}
                            </ul>
                    )}
                    <p>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" id="username"
                            onChange={event => this.setState({username: event.target.value})}/>
                    </p>
                    <p>
                        <button type="submit">Register</button>
                    </p>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    </fieldset>
                    </form>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        register: (username, password) => dispatch(auth.register(username, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
