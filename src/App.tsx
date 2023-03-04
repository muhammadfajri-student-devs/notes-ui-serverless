import "./App.css";

import * as React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import NoteDetails from "./components/NoteDetails";

/**
 * Our Web Application
 */
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/notes/:id">
            <NoteDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
