import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import StudentsPage from './pages/Students';
import AssetsPage from './pages/Assets';
import CheckingoutsPage from './pages/Checkingouts';

function App() {
  return (

    <BrowserRouter>
      <Switch>
        
        <Redirect from="/" to="/auth" exact />
        <Route path="/auth" component = {AuthPage} />
        <Route path="/bookings" component = {BookingsPage} />
        <Route path="/events" component = {EventsPage} />
        <Route path="/students" component = {StudentsPage} />
        <Route path="/assets" component = {AssetsPage} />
        <Route path="/checkingouts" component = {CheckingoutsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
