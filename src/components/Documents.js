import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBr from './Progress';
import LoanSummary from './LoanSummary';
const Documents = ({nextStep, prevStep, handleChange, values}) => {
    const [error, setError] = useState('');
    const [idDodument, setIDDocument] = useState('');
    const [banStatement, setBankStatement] = useState('');
    const [paySlip, setPaySlip] = useState('');
    const customerSignIn = useSelector(state =>state.applicationReducer.customerSignIn);
    const selectedApp = useSelector(state => state.applicationReducer.selectedApp);
    const {uploadedDocs, affordability} = selectedApp;
    const {custRet} = customerSignIn;
    const Continue = e => {
        e.preventDefault();
        if( idDodument !== '' || banStatement !== '' || paySlip !== ''){
            nextStep({idDodument, banStatement, paySlip});
        }
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }
    const dispatch = useDispatch();
    const uploadDocs = async (event) =>{
        event.preventDefault();
        const file = event.target.files[0];
        console.log(event, event.target.id);
        const bodyFormData = new FormData();
        bodyFormData.append("attach1", file, file.filename);
        bodyFormData.append('idNumber', custRet.RSAIDNumber);
        bodyFormData.append('name', custRet.firstName);
        bodyFormData.append('surname', custRet.lastName);
        bodyFormData.append('documentType', event.target.id);
        bodyFormData.append('bankStatement', uploadedDocs.bankStatement ? uploadedDocs.banStatement : '');
        bodyFormData.append('idDocument', uploadedDocs.idDocument ? uploadedDocs.idDocument : '');
        bodyFormData.append('paySlip', uploadedDocs.paySlip ? uploadedDocs.paySlip : '');
        //setLoadingUpload(true);
        try{
            const {data} = await axios.post('http://localhost:4000/customers/uploads', bodyFormData, {
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            });
            dispatch({type:'SAVE_UPDLOADED_DOCS', payload:data});
            setError('');
            if(event.target.id === 'identityDocument'){
                setIDDocument('identityDocument');
            }else if(event.target.id === 'bankStatement'){
                setBankStatement('bankStatement');
            }else if(event.target.id === 'payslip'){
                setPaySlip('payslip');
            }
        }catch(e){
            setError(e.message);
        }
    };
    return(
        <>
        <main id="main">
        <div className="container" data-aos="fade-up">
        <div className="section-title">
            <h2>Application</h2>
        </div>
        <section id="application" className="application_section">
            <LoanSummary affordability={affordability} />
            <ProgressBr n ={6}/>
            <div className="row mb">
                <div className="col-12" data-oas="fade-left" data-oas-delay="100">
                    <div className="card">
                        <div className="card-body">
                        <div class="row pt">
                            <div class="col-12" data-aos="fade-left" data-aos-delay="100">
                                <h5 class="card-title">Attachments</h5>
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb">
                                            <div class="col-6">
                                                <label for="identityDocument" class="form-label">Identity Document</label>
                                                <div class="input-group">
                                                    <input name="identityDocument" accept=".pdf, .jpeg, .jpg, .gif, .png" onChange={uploadDocs} class="form-control" type="file" id="identityDocument" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb">
                                            <div class="col-6">
                                                <label for="bankStatement" class="form-label">Bank Statement</label>
                                                <div class="input-group">
                                                    <input name="bankStatement" accept=".pdf, .jpeg, .jpg, .gif, .png" onChange={uploadDocs} class="form-control" type="file" id="bankStatement" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb">
                                            <div class="col-6">
                                                <label for="payslip" class="form-label">Payslip</label>
                                                <div class="input-group">
                                                    <input name="payslip" accept=".pdf, .jpeg, .jpg, .gif, .png" onChange={uploadDocs} class="form-control" type="file" id="payslip" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
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
                            <div style={{float:'right',marginTop:'10px',marginBottom:'30px'}}>
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

export default Documents;
