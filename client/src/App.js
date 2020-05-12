import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/graphql";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Movies,
  TvSeries,
  DetailMovies,
  DetailTvSeries,
  FormMovies,
  FormTvSeries,
  Favorites,
} from "./pages";
import { NavigationBar } from "./components";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/movies/:id" component={DetailMovies} />
            <Route path="/tv/:id" component={DetailTvSeries} />
            <Route path="/entertainme" component={Home} />
            <Route path="/movies" component={Movies} />
            <Route path="/tv" component={TvSeries} />
            <Route path="/formMovies" component={FormMovies} />
            <Route path="/formTvSeries" component={FormTvSeries} />
            <Route path="/favorites" component={Favorites} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
