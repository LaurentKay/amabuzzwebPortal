import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageBox } from './MessageBox';
import ProgressBr from './Progress';
import LoanSummary from './LoanSummary';
const BankingInfo = ({nextStep, prevStep, error, values}) => {
    const [bankName, setbankName] = useState(values.bankName);
    const [bankBranch, setbankBranch] = useState(values.bankBranch);
    const [bankAccountNumber, setbankAccountNumber] = useState(values.bankAccountNumber);
    const [bankAccountType, setbankAccountType] = useState(values.bankAccountType);
    const selectedApp = useSelector(state => state.applicationReducer.selectedApp);
    const {affordability} = selectedApp;
    const Continue = e => {
        e.preventDefault();
        if(handleValidation()){
            nextStep({bankName, bankBranch, bankAccountNumber, bankAccountType});
        }
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }
    const handleValidation = () =>{
        let valid = true;
        if(document.getElementById('bankName').value === "")
        {
            document.getElementById('bankName').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('bankName').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('bankAccountNumber').value === "")
        {
            document.getElementById('bankAccountNumber').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('bankAccountNumber').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('bankAccountType').value === "")
        {
            document.getElementById('bankAccountType').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('bankAccountType').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('bankBranch').value === "")
        {
            document.getElementById('bankBranch').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('bankBranch').style.backgroundColor = '#ffffff';
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
            <ProgressBr n ={3}/>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="row mb">
                <div className="col-12" data-oas="fade-left" data-oas-delay="100">
                    {/* <h2 className="mb-15">Personal Information</h2> */}
                    <div className="card">
                        <div className="card-body">
                            <div class="card-title mb">
                                <h5 class="text-grey">Banking Information</h5>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label for="bankName" className="form-label">Bank Name</label>
                                    <div className="input-group">
                                        <select name="bankName" id="bankName" className="form-select" aria-label="Bank Name" onClick={(e) => {document.getElementById('bankName').style.backgroundColor='#ffffff'}} onChange={e => setbankName(e.target.value)} value={bankName}>
                                            <option selected>select...</option>
                                            <option value="C0E405A4-DF1F-4EFB-A07D-016C59194BFA">
                                            Nedbank
                                            </option>
                                            <option value="E747A210-F00A-4E27-975E-2CF6EFDEB68D">
                                            Capitec Bank
                                            </option>
                                            <option value="18B75560-681A-48F0-8895-5A0261AF24B8">
                                            FNB Namibia
                                            </option>
                                            <option value="BAB094657-DE17-43FA-812A-8030F9A4895F">
                                            Bank of Baroda
                                            </option>
                                            <option value="64102B65-D1F7-438A-8D3E-AAB6AC376F57">
                                            Bank Windhoek
                                            </option>
                                            <option value="F479BA15C-A85C-44CC-93A8-EB9F76FD6AF8">
                                            FNB Botswana
                                            </option>
                                            <option value="F08AFE75-39C1-4590-9389-CBCEC8339CEE">
                                            ABSA
                                            </option>
                                            <option value="B57737C5D-5114-48FF-857A-E51D40079429">
                                            Bank of Athens
                                            </option>
                                            <option value="168D23D9-CB7A-47FB-8308-EF85DB4C20DD">
                                            Standard Bank South Africa
                                            </option>
                                            <option value="0CF9A57A-37BD-4943-94C7-FC7D3955AC1A">
                                            FNB South Africa
                                            </option>
                                            <option value="0CF9A57A-37BD-4943-94C7-FC7D3955AC1A">
                                            FNB SOUTH AFRICA EDO
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label for="bankAccountNumber" className="form-label">Account Number</label>
                                    <div className="input-group">
                                        <input name="bankAccountNumber" id="bankAccountNumber" type="text" className="form-control" onClick={(e) => {document.getElementById('bankAccountNumber').style.backgroundColor='#ffffff'}} onChange={e => setbankAccountNumber(e.target.value)} value={bankAccountNumber}/>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label for="bankAccountType" className="form-label">Account Type</label>
                                    <div className="input-group">
                                        <select name="bankAccountType" id="bankAccountType" className="form-select" aria-label="Bank Name" onClick={(e) => {document.getElementById('bankAccountType').style.backgroundColor='#ffffff'}} onChange={e => setbankAccountType(e.target.value)} value={bankAccountType}>
                                            <option selected>select...</option>
                                            <option value="1">
                                            Savings
                                            </option>
                                            <option value="2">
                                            Current
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label for="bankBranch" className="form-label">Branch Name</label>
                                    <div className="input-group">
                                        <input name="bankBranch" id="bankBranch" type="text" className="form-control" onClick={(e) => {document.getElementById('bankBranch').style.backgroundColor='#ffffff'}} onChange={e => setbankBranch(e.target.value)} value={bankBranch} />
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

export default BankingInfo;