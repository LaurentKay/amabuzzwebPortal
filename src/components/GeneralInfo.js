import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageBox } from './MessageBox';
import ProgressBr from './Progress';
import {addData } from '../reducers/core/index';
import LoanSummary from './LoanSummary';
import { useHistory } from 'react-router-dom';

const GeneralInfo = ({nextStep, values, error}) => {
    const customerSignIn = useSelector(state =>state.applicationReducer.customerSignIn);
    const {custRet} = customerSignIn;
    const compuscan = useSelector(state => state.applicationReducer.compuscan);
    const selectedApp = useSelector(state => state.applicationReducer.selectedApp);
    const {affordability} = selectedApp;
    const [firstName, setFirstName] = useState(values.firstName || custRet.firstName);
    const [lastName, setLastName] = useState(values.lastName || custRet.lastName);
    const [RSAIDNumber, setIDNumber] = useState(values.RSAIDNumber || custRet.RSAIDNumber);
    const [mobileNumber, setMobileNumber] = useState(values.mobileNumber || custRet.mobileNumber);
    const [homeNumber, setHomeNumber] = useState(values.homeNumber);
    const [maritalStatus, setMaritalStatus] = useState(values.maritalStatus );
    const [emailAddress, setEmailAddress] = useState(values.emailAddress || custRet.emailAddress);
    const role = "Customer";
    let history = useHistory();
    const Continue = e => {
        e.preventDefault();
        if(handleValidation()){
            const obj = {firstName, lastName, RSAIDNumber, mobileNumber, homeNumber, maritalStatus, emailAddress,role};
            nextStep(obj);
        }
    }
    if(affordability[0].loan1 === 0 && affordability[0].loanTerms === 0  && affordability[0].installMent === 0){
        history.push("/");
    }
    const handleValidation = () =>{
        let valid = true;
        if(document.getElementById('firstName').value === "")
        {
            document.getElementById('firstName').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('firstName').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('lastName').value === "")
        {
            document.getElementById('lastName').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('lastName').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('RSAIDNumber').value === "")
        {
            document.getElementById('RSAIDNumber').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('RSAIDNumber').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('mobileNumber').value === "")
        {
            document.getElementById('mobileNumber').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('mobileNumber').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('homeNumber').value === "")
        {
            document.getElementById('homeNumber').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('homeNumber').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('maritalStatus').value === "select...")
        {
            document.getElementById('maritalStatus').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('maritalStatus').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('emailAddress').value === "")
        {
            document.getElementById('emailAddress').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('emailAddress').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        return valid;
    }
    return(
        <>
        <main id="main">
        <div className="container" data-aos="fade-up">
        <div className="section-title">
            <h2>Application</h2>
        </div>
        <section id="application" className="application_section">
            <LoanSummary affordability={affordability} />
            <ProgressBr n ={0}/>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="row mb">
                <div className="col-12" data-oas="fade-left" data-oas-delay="100">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <h5 className="text-grey">General Information</h5>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <div className="input-group">
                                        <input name="firstName" id="firstName" type="text" className="form-control" onClick={(e) => {document.getElementById('firstName').style.backgroundColor='#ffffff'}} onChange={e => setFirstName(e.target.value)} value={firstName}/>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <div className="input-group">
                                        <input name="lastName" id="lastName" type="text" className="form-control" onClick={(e) => {document.getElementById('lastName').style.backgroundColor='#ffffff'}} onChange={(e) => setLastName(e.target.value)} value={lastName} />
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="RSAIDNumber" className="form-label">RSA ID Number</label>
                                    <div className="input-group">
                                        <input name="RSAIDNumber" id="RSAIDNumber" type="text" className="form-control" onClick={(e) => {document.getElementById('RSAIDNumber').style.backgroundColor='#ffffff'}} maxLength="13" onChange={(e) => setIDNumber(e.target.value)} value={RSAIDNumber} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                                    <div className="input-group">
                                        <input name="mobileNumber" id="mobileNumber" type="text" className="form-control" onClick={(e) => {document.getElementById('mobileNumber').style.backgroundColor='#ffffff'}} onChange={(e) => setMobileNumber(e.target.value)} value={mobileNumber} />
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="homeNumber" className="form-label">Home Number</label>
                                    <div className="input-group">
                                        <input name="homeNumber" id="homeNumber" type="text" className="form-control" onClick={(e) => {document.getElementById('homeNumber').style.backgroundColor='#ffffff'}} onChange={(e) => setHomeNumber(e.target.value)} value={homeNumber} />
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="passportNumber" className="form-label">Passport Number</label>
                                    <div className="input-group">
                                        <input name="passportNumber" id="passportNumber" type="text" className="form-control" onClick={(e) => {document.getElementById('passportNumber').style.backgroundColor='#ffffff'}}  />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
                                    <div className="input-group">
                                        <select name="maritalStatus" id="maritalStatus" className="form-select" onClick={(e) => {document.getElementById('maritalStatus').style.backgroundColor='#ffffff'}} aria-label="Bank Name" onChange={(e) => setMaritalStatus(e.target.value)} value={maritalStatus}>
                                            <option selected>select...</option>
                                            <option value="Married">Married</option>
                                            <option value="Single">Single</option>
                                            <option value="Divorced">Divorced</option>
                                            <option value="Widowed">Widowed</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="emailAddress"  className="form-label">Email Address</label>
                                    <div className="input-group">
                                        <input name="emailAddress" id="emailAddress" type="text" className="form-control" onClick={(e) => {document.getElementById('emailAddress').style.backgroundColor='#ffffff'}} onChange={(e) => setEmailAddress(e.target.value)} value={emailAddress} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb">
                    <div className="col-12">
                        <div style={{float:'right'}}>
                            <div style={{float:'right',marginTop:'3px',marginBottom:'30px'}}>
                                <button type="button" className="get-started-btn" onClick={Continue}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        </div>
        </main>
        </>
    );
};

export default GeneralInfo;