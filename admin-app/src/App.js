import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './container/Home';
import Signin from './container/Signin';
import Signup from './container/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getAllCategory } from './actions';
import Products from './container/Products';
import Category from './container/Category';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getAllCategory());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/category" component={Category} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
