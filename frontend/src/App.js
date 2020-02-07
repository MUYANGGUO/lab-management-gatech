import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import NotesPage from './pages/Notes';
import StudentsPage from './pages/Students';
import AssetsPage from './pages/Assets';
import CheckingoutsPage from './pages/Checkingouts';
import MainNavigation from './components/Navigation/MainNavigation';
import Footer from './components/Footer/Footer';
import AuthContext from './context/auth-context';

class App extends Component {
  state = {
    token: null,
    userId: null
  }


  login = (token, userId, tokenExpiration) => {
    this.setState({token: token, userId: userId})
  };

  logout = ()=>{
    this.setState({token: null, userId: null})
  };
  render(){
    return (
      <BrowserRouter>
        <React.Fragment>
        <AuthContext.Provider value={{token:this.state.token, userId: this.state.userId, login: this.login, logout: this.logout}}>
          <MainNavigation></MainNavigation>
          <main className="main-content">
            <Switch>
            {!this.state.token && <Redirect from="/" to="/auth" exact />}
       
              {this.state.token && <Redirect from="/" to="/events" exact />}
              {this.state.token && <Redirect from="/auth" to="/events" exact />}
              
              {this.state.token && 
              <Route path="/bookings" component = {BookingsPage} />}
              {!this.state.token && (<Route path="/auth" component = {AuthPage} />)}
              <Route path="/events" component = {NotesPage} />
              <Route path="/students" component = {StudentsPage} />
              <Route path="/assets" component = {AssetsPage} />
              {this.state.token && 
              <Route path="/checkingouts" component = {CheckingoutsPage} />}
            </Switch>
          </main>
          
          </AuthContext.Provider>
          <Footer></Footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
