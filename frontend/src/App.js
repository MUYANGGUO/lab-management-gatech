import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import StudentsPage from './pages/Students';
import AssetsPage from './pages/Assets';
import CheckingoutsPage from './pages/Checkingouts';
import MainNavigation from './components/Navigation/MainNavigation';
import Footer from './components/Footer/Footer';


function App() {
  return (

    <BrowserRouter>
      <React.Fragment>
        <MainNavigation></MainNavigation>
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component = {AuthPage} />
            <Route path="/bookings" component = {BookingsPage} />
            <Route path="/events" component = {EventsPage} />
            <Route path="/students" component = {StudentsPage} />
            <Route path="/assets" component = {AssetsPage} />
            <Route path="/checkingouts" component = {CheckingoutsPage} />
          </Switch>
        </main>
        <Footer></Footer>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
