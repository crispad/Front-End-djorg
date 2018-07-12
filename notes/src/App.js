import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { auth } from "./actions";
import noteApp from "./reducers";

import note from "./components/note";
import register from "./components/register";
import login from "./components/login";

let store = createStore(noteApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (this.props.auth.isLoading) {
            return <em>Loading...</em>;
          } else if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />;
          } else {
            return <ChildComponent {...props} />;
          }
        }}
      />
    );
  };

  render() {
    let { PrivateRoute } = this;
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={note} />
          <Route exact path="/register" component={register} />
          <Route exact path="/login" component={login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  };
};

let RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
