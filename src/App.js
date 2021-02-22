import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Routes
import Home from "./routes/Home";
import About from "./routes/About";
import Launches from "./routes/Launches";
import Launch from "./routes/Launch";
import Launchpads from "./routes/Launchpads";
import Launchpad from "./routes/Launchpad";
import PageNotFound from "./routes/PageNotFound";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Styles
import "./App.sass";

// Add FontAwesome Libraries
library.add(fas);
library.add(fab);

/**
 * Renders app container component
 * @component
 * @returns {React.ReactElement}
 */

const App = () => {
  console.log(
    `Single Page Application built from the ground-up with create-react-app by SyedMH, https://syedmh.com.`
  );
  console.log(
    `Data sourced from the official Space-x API (V4): https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4.`
  );
  console.log(`More details on ${window.location.origin}/about/.`);
  console.log(`Enjoy your stay here!`);

  return (
    <Router>
      <Header />
      <main className="content-container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/launches">
            <Launches />
          </Route>
          <Route exact path="/launches/:resourceId">
            <Launch />
          </Route>
          <Route exact path="/launchpads">
            <Launchpads />
          </Route>
          <Route exact path="/launchpads/:resourceId">
            <Launchpad />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
