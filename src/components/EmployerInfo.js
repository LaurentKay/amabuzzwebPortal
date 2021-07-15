import React, { useState } from 'react';
import { MessageBox } from './MessageBox';
import ProgressBr from './Progress';
import LoanSummary from './LoanSummary';
import { useSelector } from 'react-redux';
const EmployerInfo = ({nextStep, prevStep, error, values}) => {
    const [employerName, setemplooyerName] = useState(values.employerName);
    const [employerAddress1, setemployerAddres1] = useState(values.employerAddress1);
    const [workNumber, setworkNumber] = useState(values.workNumber);
    const [employerAddressCity, setemployerAddressCity] = useState(values.employerAddressCity);
    const [employerAddressPostalCode, setemployerPostalCode] = useState(values.employerAddressPostalCode);
    const [employerContactNumber, setemployerContactNumber] = useState(values.employerContactNumber);
    const [salaryDay, setsalryDay] = useState(values.salaryDay);
    const [yearEmployed, setyearEmployed] = useState(values.yearEmployed);
    const [salaryFrequency, setsalaryFrequence] = useState(values.salaryFrequency);
    const [employmentNumber, setemploymentNumber] = useState(values.employmentNumber);
    const selectedApp = useSelector(state => state.applicationReducer.selectedApp);
    const {affordability} = selectedApp;
    const Continue = e => {
        e.preventDefault();
        if(handleValidation()){
           nextStep({employerName, employerAddress1, workNumber, employerAddressCity, employerAddressPostalCode,
                    employerContactNumber, salaryDay, yearEmployed, salaryFrequency, employmentNumber}); 
        }
        
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }
    const handleValidation = () =>{
        let valid = true;
        if(document.getElementById('employerName').value === "")
        {
            document.getElementById('employerName').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('employerName').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('workNumber').value === "")
        {
            document.getElementById('workNumber').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('workNumber').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('employerContactNumber').value === "")
        {
            document.getElementById('employerContactNumber').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('employerContactNumber').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('employmentNumber').value === "")
        {
            document.getElementById('employmentNumber').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('employmentNumber').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('employerAddress1').value === "")
        {
            document.getElementById('employerAddress1').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('employerAddress1').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('employerAddressCity').value === "")
        {
            document.getElementById('employerAddressCity').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('employerAddressCity').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('yearEmployed').value === "")
        {
            document.getElementById('yearEmployed').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('yearEmployed').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('employerAddressPostalCode').value === "")
        {
            document.getElementById('employerAddressPostalCode').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('employerAddressPostalCode').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('salaryFrequency').value === "select...")
        {
            document.getElementById('salaryFrequency').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('salaryFrequency').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('salaryDay').value === "select...")
        {
            document.getElementById('salaryDay').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('salaryDay').style.backgroundColor = '#ffffff';
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
            <ProgressBr n ={2}/>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="row mb">
                <div className="col-12" data-oas="fade-left" data-oas-delay="100">
                    {/* <h2 className="mb-15">Personal Information</h2> */}
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title mb">
                                <h5 className="text-grey">Employer Information</h5>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label for="employerName" className="form-label">Employer Name</label>
                                    <div className="input-group">
                                        <input name="employerName" id="employerName" type="text" className="form-control" onClick={(e) => {document.getElementById('employerName').style.backgroundColor='#ffffff'}} onChange={e => setemplooyerName(e.target.value)} value={employerName} />
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label for="workNumber" className="form-label">Work Number</label>
                                    <div className="input-group">
                                        <input name="workNumber" id="workNumber" type="text" className="form-control" onClick={(e) => {document.getElementById('workNumber').style.backgroundColor='#ffffff'}} onChange={e => setworkNumber(e.target.value) } value={workNumber}/>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label for="taxNumber" className="form-label">Tax Number</label>
                                    <div className="input-group">
                                        <input name="taxNumber" id="taxNumber" type="text" className="form-control" onClick={(e) => {document.getElementById('taxNumber').style.backgroundColor='#ffffff'}} value={values.taxNumber}/>
                                    </div>
                                </div>
                            </div>

                           
                            <div className="row mb">
                                <div className="col-4">
                                    <label for="employerContactNumber" className="form-label">Employer Contact Number</label>
                                    <div className="input-group">
                                        <input name="employerContactNumber" id="employerContactNumber" type="text" className="form-control" onClick={(e) => {document.getElementById('employerContactNumber').style.backgroundColor='#ffffff'}} onChange={e => setemployerContactNumber(e.target.value)} value={employerContactNumber}/>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label for="employmentNumber" className="form-label">Employment Number</label>
                                    <div className="input-group">
                                        <input name="employmentNumber" id="employmentNumber" type="text" className="form-control" onClick={(e) => {document.getElementById('employmentNumber').style.backgroundColor='#ffffff'}} onChange={e => setemploymentNumber(e.target.value)} value={employmentNumber}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label for="employerAddress" className="form-label">Employer Address</label>
                                    <div className="input-group">
                                        <input name="employerAddress1" id="employerAddress1" type="text" className="form-control" onClick={(e) => {document.getElementById('employerAddress1').style.backgroundColor='#ffffff'}} onChange={e => setemployerAddres1(e.target.value)} value={employerAddress1}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <label for="employerAddressCity" className="form-label">Employer City</label>
                                    <div className="input-group">
                                        <input name="employerAddressCity" id="employerAddressCity" type="text" className="form-control" onClick={(e) => {document.getElementById('employerAddressCity').style.backgroundColor='#ffffff'}} onChange={e => setemployerAddressCity(e.target.value)} value={employerAddressCity}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label for="yearEmployed" className="form-label">Year Employed</label>
                                    <div className="input-group">
                                        <input name="yearEmployed" id="yearEmployed" type="text" className="form-control" onClick={(e) => {document.getElementById('yearEmployed').style.backgroundColor='#ffffff'}} onChange={e => setyearEmployed(e.target.value)} value={yearEmployed}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <label for="employerAddressPostalCode" className="form-label">Employer Address Postal Code</label>
                                    <div className="input-group">
                                        <input name="employerAddressPostalCode" id="employerAddressPostalCode" type="text" className="form-control" onClick={(e) => {document.getElementById('employerAddressPostalCode').style.backgroundColor='#ffffff'}} onChange={e => setemployerPostalCode(e.target.value)} value={employerAddressPostalCode}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label for="salaryFrequency" className="form-label">Salary Frequency</label>
                                    <div className="input-group">
                                        <select name="salaryFrequency" id="salaryFrequency" className="form-select" aria-label="Bank Name" onClick={(e) => {document.getElementById('salaryFrequency').style.backgroundColor='#ffffff'}} onChange={e => setsalaryFrequence(e.target.value)} value={salaryFrequency}>
                                        <option selected>select...</option>
                                        <option value="weekly">
                                            Weekly
                                        </option>
                                        <option value="monthly">
                                            Monthly
                                        </option>
                                        <option value="fortnightly">
                                            Fortnightly
                                        </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label for="salaryDay" className="form-label">Salary Day</label>
                                    <div className="input-group">
                                        <select name="salaryDay" id="salaryDay" className="form-select" aria-label="Bank Name" onClick={(e) => {document.getElementById('salaryDay').style.backgroundColor='#ffffff'}} onChange={e => setsalryDay(e.target.value)} value={salaryDay}>
                                        <option selected>select...</option>
                                        <option value="Last Monday">Last Monday</option>
                                        <option value="Last Tuesday">Last Tuesday</option>
                                        <option value="Last Wednesday">Last Wednesday</option>
                                        <option value="Last Thursday">Last Thursday</option>
                                        <option value="Last Friday">Last Friday</option>
                                        <option value="Last Working Day">Last Working Day</option>
                                        <option value="2nd Last Working Day">2nd Last Working Day</option>
                                        <option value="2nd Last Tuesday">2nd Last Tuesday</option>
                                        <option value="2nd Last Wednesday">2nd Last Wednesday</option>
                                        <option value="2nd Last Thursday">2nd Last Thursday</option>
                                        <option value="2nd Last Friday">2nd Last Friday</option>
                                        <option value="4th Friday">4th Friday</option>
                                        <option value="Temp">Temp</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                        </select>
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
                                <button type="button" className="get-started-btn" onClick={Previous}><i className="fa fa-chevron-left"></i> Back</button>
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

export default EmployerInfo;