import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/graphql";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { Home, Movies, TvSeries } from "./pages";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <nav>
            <Link to="/entertainme">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/tv">Tv Series</Link>
          </nav>
          <Switch>
            <Route path="/entertainme" component={Home} />
            <Route path="/movies" component={Movies} />
            <Route path="/tv" component={TvSeries} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
