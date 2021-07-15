// CORE
import React from 'react';
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// ASSETS
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/icofont/icofont.min.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/remixicon/remixicon.css';
import './assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import './assets/vendor/animate.css/animate.min.css';
import './assets/vendor/aos/aos.css';
import './assets/css/style.css';
import './assets/slider/rangeslider.css';
// VIEWS
import GeneralInfo from './components/GeneralInfo';
import ScriptTag from 'react-script-tag';
import AddressInfo from './components/AddressInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployerInfo from './components/EmployerInfo';
import BankingInfo from './components/BankingInfo';
import IncomeExpenses from './components/IncomeExpenses';
import Questions from './components/Questions';
import Documents from './components/Documents';
import Application from './components/Application';
import Home from './components/Home';

function AppModule(props) {
  console.log('PR', props)
  return (
    <BrowserRouter>
      <Header />
      {/* <main id="main">
        <div className="container" data-aos="fade-up"> */}
          <Switch>
            <Route path="/application" component={Application} />
            <Route path="/login" component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path="/" component={Home} />
          </Switch>
        {/* </div>
      </main> */}
      <Footer />
      <Link to="#" className="back-to-top"><i className="bx bx-up-arrow-alt"></i></Link>
      <div id="preloader"></div>
    </BrowserRouter>

  );
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return {};
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppModule);
export default App;
