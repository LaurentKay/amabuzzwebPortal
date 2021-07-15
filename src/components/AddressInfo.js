import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageBox } from './MessageBox';
import ProgressBr from './Progress';
import LoanSummary from './LoanSummary';
const AddressInfo = ({nextStep, prevStep, error, values}) => {
    const [homeAddress1, setHomeAddress1] = useState(values.homeAddress1);
    const [homeAddress2, setHomeAddress2] = useState(values.homeAddress2);
    const [homeCity, setHomeCity] = useState(values.homeCity);
    const [homeProvince, sethomeProvince] = useState(values.homeProvince);
    const [homePostalCode, sethomePostalCode] = useState(values.homePostalCode);
    const [homeSuburb, sethomeSuburb] = useState(values.homeSuburb);
    const [errContinue, setErrCont] = useState('');
    const [canContinue, setCanContinue] = useState(false);

    const compuscan = useSelector(state => state.applicationReducer.compuscan);
    let bfoundAdmin = false, bfoundFraudster = false, bfoundDebtReview = false;
    const selectedApp = useSelector(state => state.applicationReducer.selectedApp);
    const {affordability} = selectedApp;
    // let reason = compuscan.CODIX.PRODUCTS.product.reasons.reason;
    // for(var i = 0; i < reason.length; i++){
    //     let str = reason[i]._;
    //     if(str.indexOf('Customer is under administration') >= 0){
    //       bfoundAdmin = true;
    //     }else if(str.indexOf('Customer is listed as under Debt Counselling') >= 0){
    //       bfoundDebtReview = true;
    //     }else if(str.indexOf('Listed with SAFPS as a perpetrator (Fraud)') >= 0){
    //       bfoundFraudster = true;
    //     }
    // }
    // let canContinue = false;
    // if(compuscan.EnqCC_CustomSCORE.ROW.SCORE > 500 && !bfoundAdmin && !bfoundDebtReview && !bfoundFraudster){
    //     canContinue = true;
    //     setErrCont('');
    // }else{
    //     setErrCont('You do not qualify, please try again in the future');
    // }
    const Continue = e => {
        e.preventDefault();
        if(handleValidation()){
            nextStep({homeAddress1, homeAddress2, homeCity, homePostalCode, homeSuburb, homeProvince});
        }
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }
    const handleValidation = () =>{
        let valid = true;
        if(document.getElementById('homeAddress1').value === "")
        {
            document.getElementById('homeAddress1').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('homeAddress1').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('homeCity').value === "")
        {
            document.getElementById('homeCity').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('homeCity').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('homeSuburb').value === "")
        {
            document.getElementById('homeSuburb').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('homeSuburb').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('homeProvince').value === "select...")
        {
            document.getElementById('homeProvince').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('homeProvince').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        if(document.getElementById('homePostalCode').value === "")
        {
            document.getElementById('homePostalCode').style.backgroundColor = '#ffebe6';
            valid = false;
        }else{
            document.getElementById('homePostalCode').style.backgroundColor = '#ffffff';
            //valid = true;
        }
        
        return valid;
    }
    useEffect(()=>{
        let reason = compuscan.CODIX.PRODUCTS.product.reasons.reason;
        if(reason.length){
            for(var i = 0; i < reason.length; i++){
                let str = reason[i]._;
                if(str.indexOf('Customer is under administration') >= 0){
                bfoundAdmin = true;
                }else if(str.indexOf('Customer is listed as under Debt Counselling') >= 0){
                bfoundDebtReview = true;
                }else if(str.indexOf('Listed with SAFPS as a perpetrator (Fraud)') >= 0){
                bfoundFraudster = true;
                }
            }
            if(compuscan.EnqCC_CustomSCORE.ROW.SCORE > 500 && !bfoundAdmin && !bfoundDebtReview && !bfoundFraudster){
                setCanContinue(true);
                setErrCont('');
            }else{
                setCanContinue(false);
                setErrCont('You do not qualify, please try again in the future');
            }
            console.log('Can I continue?: ', canContinue);
        }
    },[compuscan.CODIX.PRODUCTS.product.reasons.reason.length])
    return (
        <>
        <main id="main">
        <div className="container" data-aos="fade-up">
            <div className="section-title">
                <h2>Application</h2>
            </div>
            <section id="application" className="application_section">
                <LoanSummary affordability={affordability} />
                <ProgressBr n ={1}/>
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {errContinue && <MessageBox variant="danger">{errContinue}</MessageBox>}
                <div className="col-12" data-oas="fade-left" data-oas-delay="100">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <h5 className="text-grey">Address Information</h5>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label htmlFor="homeAddress1" className="form-label">Home Address</label>
                                    <div className="input-group">
                                        <input name="homeAddress1" id="homeAddress1" type="text" className="form-control" onClick={(e) => {document.getElementById('homeAddress1').style.backgroundColor='#ffffff'}} onChange={e => setHomeAddress1(e.target.value)} value={homeAddress1}  />
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="homeAddress2" className="form-label">Home Address 2</label>
                                    <div className="input-group">
                                        <input name="homeAddress2" type="text" className="form-control" onClick={(e) => {document.getElementById('homeAddress2').style.backgroundColor='#ffffff'}} onChange={e => setHomeAddress2(e.target.value)} value={homeAddress2}/>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="homeCity" className="form-label">City</label>
                                    <div className="input-group">
                                        <input name="homeCity" id="homeCity" type="text" className="form-control" onClick={(e) => {document.getElementById('homeCity').style.backgroundColor='#ffffff'}} onChange={e => setHomeCity(e.target.value)} value={homeCity}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb">
                                <div className="col-4">
                                    <label htmlFor="homeSuburb" className="form-label">Subrub</label>
                                    <div className="input-group">
                                        <input name="homeSuburb" id="homeSuburb" type="text" className="form-control" onClick={(e) => {document.getElementById('homeSuburb').style.backgroundColor='#ffffff'}} onChange={e => sethomeSuburb(e.target.value)} value={homeSuburb}/>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="homeProvince" className="form-label">Province</label>
                                    <div className="input-group">
                                        <select name="homeProvince" id="homeProvince" className="form-select" aria-label="Bank Name" onClick={(e) => {document.getElementById('homeProvince').style.backgroundColor='#ffffff'}} onChange={e => sethomeProvince(e.target.value)} value={homeProvince}>
                                        <option selected>select...</option>
                                        <option value="Western Cape">Western Cape</option>
                                        <option value="Eastern Cape">Eastern Cape</option>
                                        <option value="Northern Cape">Northern Cape</option>
                                        <option value="Limpopo">Limpopo</option>
                                        <option value="Gauteng">Gauteng</option>
                                        <option value="Free State">Free State</option>
                                        <option value="North West">North West</option>
                                        <option value="Mpumalanga">Mpumalanga</option>
                                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="homePostalCode" className="form-label">Postal Code</label>
                                    <div className="input-group">
                                        <input name="homePostalCode" id="homePostalCode" type="text" className="form-control" onClick={(e) => {document.getElementById('homePostalCode').style.backgroundColor='#ffffff'}} onChange={e => sethomePostalCode(e.target.value)} value={homePostalCode}/>
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
                                {canContinue ? <button type="button" className="get-started-btn" onClick={Continue}>Next</button> :
                                <button type="button" className="get-started-btn" disabled onClick={Continue}>Next</button>}
                                
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
export default AddressInfo;