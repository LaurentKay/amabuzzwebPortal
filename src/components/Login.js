// CORE
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {loginCustomer, registerCustomer, loadCompuscan, loadFreshCompuscan} from '../reducers/core/index';
import { MessageBox } from './MessageBox';
const LoginModule = (props) => {
  console.log('LO', props)
  /*
   * Login to dashbaord
   *
   * @method login
   * @param {aEvent}, Button event
   *
   */
  const login = (aEvent) => {
    aEvent.preventDefault();
    let RSAIDNumber = document.getElementById('IDNumber').value,
    customerPassword = document.getElementById('Password').value;
    // check creds
    // TODO: Check creds and login then redirect to /dashboard
    if (RSAIDNumber !== '' && customerPassword !== '') {
      props.loginCustomer({RSAIDNumber, customerPassword});
      //props.history.push('/dashboard')
    }
  };
  /*
   * register user and redirect to login
   *
   * @method register
   * @param {aEvent}, Button event
   *
   */
  const register = (aEvent) => {
    aEvent.preventDefault();
    let r_obj = {
      RSAIDNumber: document.getElementById('r_idNumber').value,
      firstName: document.getElementById('FirstName').value,
      lastName: document.getElementById('LastName').value,
      mobileNumber: document.getElementById('CellNo').value,
      emailAddress: document.getElementById('email').value,
      customerPassword: document.getElementById('r_password').value,
      role: 'Customer'
    };
    console.log('test:: ', r_obj);
    // TODO: call to reg here
    props.registerCustomer(r_obj);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if(props.customerSignIn.custRet.firstName){
      props.loadFreshCompuscan();//loadCompuscan(props.customerSignIn.custRet.RSAIDNumber);
      props.history.push('/dashboard');
    }
  },[props.history, props.customerSignIn.custRet.firstName]);
  return (
    <main id="main">
    <div className="container" data-aos="fade-up">
    <section id='login' className='login'>
      {props.error && <MessageBox variant="danger">{props.error}</MessageBox>}
      {props.registerSuc && <MessageBox>{props.registerSuc}</MessageBox>}
        <div className='section-title pt'>
          <p>Account Profile</p>
        </div>

		    <div className='col-md-12 row'>
    		  <div className='col-md-6'>
      			<div align='center'><h3>Existing Profile</h3></div>
            <form className='login-form'>
              <div className='form-row'>
                <div className='col-md-6 form-group'>
    	            <label>ID Number</label>
                  <input type='text' name='name' className='form-control' id='IDNumber' placeholder='ID Number' maxLength="13" data-rule='minlen:4' data-msg='Please enter your 13 digit ID number.' />
                  <div className='validate'></div>
                </div>
    	        </div>
    	        <div className='form-row'>
                <div className='col-md-6 form-group'>
  		            <label>Password</label>
                  <input type='password' className='form-control' name='Password' id='Password' placeholder='Your Password' data-rule='minlen:4' data-msg='Please enter your password.' />
                  <div className='validate'></div>
                </div>
              </div>
              <div className='col-md-6 text-right'>
                <button type='submit' className='get-started-btn' onClick={login}>Login</button>
              </div>
            </form>
          </div>

          <div className='col-md-6' style={{marginBottom:'50px'}}>
		        <div align='center'><h3>New Profile</h3></div>
            <form className='login-form'>
              <div className='form-row'>
                <div className='col-md-6 form-group'>
		              <label>ID Number</label>
                  <input type='text' name='name' className='form-control' id='r_idNumber' placeholder='ID Number' maxLength="13" data-rule='minlen:4' data-msg='Please enter your 13 digit ID number.' />
                  <div className='validate'></div>
                </div>
	            </div>
	            <div className='form-row'>
                <div className='col-md-6 form-group'>
		              <label>First Name</label>
                  <input type='text' name='name' className='form-control' id='FirstName' placeholder='First Name' data-rule='minlen:4' data-msg='Please enter your first name.' />
                  <div className='validate'></div>
                </div>
	 	            <div className='col-md-6 form-group'>
		              <label>Last Name</label>
                  <input type='text' name='name' className='form-control' id='LastName' placeholder='Last Name' data-rule='minlen:4' data-msg='Please enter your last name.' />
                  <div className='validate'></div>
                </div>
	            </div>
	            <div className='form-row'>
                <div className='col-md-6 form-group'>
		              <label>Cell No</label>
                  <input type='text' name='name' className='form-control' id='CellNo' placeholder='CellNo' data-rule='minlen:4' data-msg='Please enter your 10 digit cell no.' />
                  <div className='validate'></div>
                </div>
                <div className='col-md-6 form-group'>
		              <label>Email</label>
                  <input type='email' className='form-control' name='email' id='email' placeholder='Your Email' data-rule='email' data-msg='Please enter a valid email' />
                  <div className='validate'></div>
                </div>
	            </div>
	            <div className='form-row'>
                <div className='col-md-6 form-group'>
		              <label>Password</label>
                  <input type='password' className='form-control' name='Password' id='r_password' placeholder='Your Password' data-rule='minlen:4' data-msg='Please enter your password.' />
                  <div className='validate'></div>
                </div>
              </div>
              <div className='col-md-6 text-right'>
                <button type='submit' className='get-started-btn' onClick={register}>Create Profile</button>
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </section>
    </div>
    </main>
  );
};

const mapStateToProps = state => ({
  generalInfo: state.applicationReducer.generalInfo,
  addressInfo: state.applicationReducer.addressInfo,
  employerInfo: state.applicationReducer.employerInfo,
  bankingInfo: state.applicationReducer.bankingInfo,
  Income: state.applicationReducer.Income,
  Expenses: state.applicationReducer.Expenses,
  QuestionsAns: state.applicationReducer.QuestionsAns,
  documents: state.applicationReducer.documents,
  error: state.applicationReducer.error,
  registerSuc: state.applicationReducer.registerSuc,
  customerSignIn: state.applicationReducer.customerSignIn,
});
const mapDispatchToProps =  {
  loginCustomer,
  registerCustomer,
  loadCompuscan,
  loadFreshCompuscan
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginModule);
export default Login;
