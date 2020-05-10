import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/graphql";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Movies,
  TvSeries,
  DetailMovies,
  DetailTvSeries,
  AddMovies,
  AddTvSeries,
} from "./pages";
import { NavigationBar } from "./components";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/entertainme" component={Home} />
            <Route path="/movies/:id" component={DetailMovies} />
            <Route path="/tv/:id" component={DetailTvSeries} />
            <Route path="/movies" component={Movies} />
            <Route path="/tv" component={TvSeries} />
            <Route path="/addMovies" component={AddMovies} />
            <Route path="/addTvSeries" component={AddTvSeries} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
