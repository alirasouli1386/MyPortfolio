import React, { Fragment } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import { AdminPanel } from '../../features/admin/AdminPanel';
import { NavBar } from '../../features/nav/NavBar';

import { Footer } from '../../features/nav/Footer';

export const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Route exact path="/" component={HomePage} />
      <Route path="/admin" component={AdminPanel} />
      <Footer />
    </Fragment>
  );
}
