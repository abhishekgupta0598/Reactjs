import "materialize-css/dist/css/materialize.min.css";
import { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import RetailerList from "./RetailerList";
import Product from "./Product";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/retailer" component={RetailerList} />
            <Route path="/product" component={Product} />
          </Switch>
        </Router>
      </div>
    );
  }
}
