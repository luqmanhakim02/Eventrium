import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
/* 
function RegisterEvent() {
  return <h2>RegisterEvent</h2>;
}

function MyTicket() {
  return <h2>MyTicket</h2>;
}

function MyEvent() {
  return <h2>MyEvent</h2>;
}

function JoinEvent() {
  return <h2>Page 1</h2>;
}

function CertificateList() {
  return <h2>Page 2</h2>;
}

function MyCert() {
  return <h2>Page 3</h2>;
} */

function App() {
  return (
    <></>

    /* <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">RegisterEvent</Link>
            </li>
            <li>
              <Link to="/services">MyTicket</Link>
            </li>
            <li>
              <Link to="/contact">MyEvent</Link>
            </li>
            <li>
              <Link to="/joinevent">Join Event</Link>
            </li>
            <li>
              <Link to="/certificatelist">Certificate List</Link>
            </li>
            <li>
              <Link to="/mycert">My Certificates</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <RegisterEvent />
          </Route>
          <Route path="/services">
            <MyTicket />
          </Route>
          <Route path="/contact">
            <MyEvent />
          </Route>
          <Route path="/joinevent">
            <JoinEvent />
          </Route>
          <Route path="/certificatelist">
            <CertificateList />
          </Route>
          <Route path="/mycert">
            <MyCert />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router> */
  );
}

export default App;
