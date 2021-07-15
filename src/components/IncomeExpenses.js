import React, { useState } from 'react';
import { MessageBox } from './MessageBox';
import ProgressBr from './Progress';
import LoanSummary from './LoanSummary';
import { useSelector } from 'react-redux';
const IncomeExpenses = ({nextStep, prevStep, newFieldI, newFieldE, handleChange, InCome, Expenses, error}) => {
    // let [Income, setIncome] = useState(InCome);
    // let [Expense,setExpense] = useState(Expenses);
    const Continue = e => {
        e.preventDefault();
        let afford = {};
        for(var i = 0; i < InCome.length; i++){
            afford[InCome[i].name.replace("_", "").replace("_", "").replace("_", "")] = InCome[i].value;
        }
        for(var j = 0; j < Expenses.length; j++){
            afford[Expenses[j].name.replace("_", "").replace("_", "").replace("_", "")] = Expenses[j].value;
        }
        nextStep(afford); //{InCome, Expenses}
    }
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }
    const addFieldI = (e) =>{
        let sel = document.getElementById('Income').value;
        if(sel !== 'select...'){
            newFieldI(sel);
        }
    }
    const addFieldE = (e) =>{
        let sel = document.getElementById('Expenses').value;
        if(sel !== 'select...'){
            newFieldE(sel);
        }
    }
    const selectedApp = useSelector(state => state.applicationReducer.selectedApp);
    const {affordability} = selectedApp;
    return(
        <>
        <main id="main">
        <div className="container" data-aos="fade-up">
        <div className="section-title">
            <h2>Application</h2>
        </div>
        <section id="application" className="application_section">
            <LoanSummary affordability={affordability} />
            <ProgressBr n ={4}/>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="row mb">
                <div className="col-12" data-oas="fade-left" data-oas-delay="100">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb">
                                <div className="col-6" id="containerIn">
                                    <div className="card-title mb">
                                        <h5 className="text-grey">Income</h5>
                                    </div>
                                    <div className="row mb">
                                        <div className="col-6">
                                            <select name="Income" id="Income" className="form-select">
                                                <option selected>select...</option>
                                                <option value="monthly Fixed salary">monthly Fixed salary</option>
                                                <option value="income rental">Income Rental</option>
                                                <option value="monthly Overtime">monthly Overtime</option>
                                                <option value="monthly Other Income">Monthly Other Income</option>
                                            </select>
                                        </div>
                                        <div><button type="button" id="add_income_field" onClick={addFieldI}>Add</button></div>
                                    </div>
                                   {
                                       InCome.map((val) => {
                                            return (
                                                <div><label htmlFor={val.name} className="form-label">{val.name.replace("_", " ").replace("_", " ").replace("_", " ")}</label>
                                                    <input name={val.name} type="text" onChange={handleChange(val.name)} className="form-control" value={val.value}/>
                                                </div>
                                            )
                                       })
                                   } 
                                </div>
                                <div className="col-6" id="container1">
                                    <div className="card-title mb">
                                        <h5 className="text-grey">Expensenses</h5>
                                    </div>
                                    <div className="row mb">
                                        <div className="col-6">
                                        <select name="Expenses" id="Expenses" className="form-select">
                                            <option selected>select...</option>
                                            <option value="expense Accomodation">Expense Accomodation</option>
                                            <option value="expense Food">Expense Food</option>
                                            {/* <option value="Insurance Premiums">Insurance Premiums</option> */}
                                            <option value="Expense Maintenance">Expense Maintenance</option>
                                            <option value="expense Utilities">Expense Utilities</option>
                                            {/* <option value="Vehicle Instalment">Vehicle Instalment</option> */}
                                            <option value="expense Education">Expsense Education</option>
                                            {/* <option value="expense Electricity">Electricity</option> */}
                                            {/* <option value="Entertainment">Entertainment</option> */}
                                            <option value="Expense Medical">Expense Medical</option>
                                            <option value="expense Rent">Rent</option>
                                            {/* <option value="Telephones">Telephones</option> */}
                                            <option value="expense Transport">Expense Transport/Fuel Cost</option>
                                            {/* <option value="Water">Water</option> */}
                                        </select>
                                        </div>
                                        <div>
                                            <button type="button" id="add_form_field" onClick={addFieldE}>Add</button>
                                        </div>
                                    </div>
                                    {
                                       Expenses.map((val) => {
                                            return (
                                                <div><label htmlFor={val.name} className="form-label">{val.name.replace("_", " ").replace("_", " ").replace("_", " ")}</label>
                                                    <input name={val.name} type="text" onChange={handleChange(val.name)} className="form-control" value={val.value}/>
                                                </div>
                                            )
                                       })
                                   } 
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

export default IncomeExpenses;