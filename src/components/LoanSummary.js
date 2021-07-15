import React from 'react';

const LoanSummary = (props) =>{

    return (
        <div style={{border:'1px solid #ccc',padding:'8px 0px 0px 8px',marginBottom:'5px'}}>
            <div style={{fontSize:'16px',fontWeight:'bold'}}>Loan Summary:</div>
            <div className="row mb">
                <div className="col-4">Loan Amount: {props.affordability[0].loan1}</div>
                <div className="col-4">Loan Terms: {props.affordability[0].loanTerms}</div>
                <div className="col-4">Loan Installment: {props.affordability[0].installMent}</div>
            </div>
        </div>
    );
};

export default LoanSummary;