import React, { Fragment } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import { NavBar } from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { AddressesDashboard } from '../../features/addresses/AddressesDashboard';

export const App = () => {
  return (
    <Fragment>
      {/* <Route exact path="/" component={HomePage} /> */}
      <Route exact path="/" render={() => (
        <Fragment>
          <NavBar />
          <HomePage />
        </Fragment>
      )} />
      <Route path={"/(.+)"} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Route exact path="/addresses" component={AddressesDashboard} />
          </Container>
        </Fragment>
      )} />
    </Fragment>
  );
}
