import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import GeneralInfo from './GeneralInfo';
import AddressInfo from './AddressInfo';
import EmployerInfo from './EmployerInfo';
import BankingInfo from './BankingInfo';
import IncomeExpenses from './IncomeExpenses';
import Questions from './Questions';
import Documents from './Documents';
import { Stepper } from '@progress/kendo-react-layout';
import "../../node_modules/@progress/kendo-theme-bootstrap/dist/all.css";
import {saveGeneralInfo, saveAddressInfo, saveEmployerInfo,
        saveBankingInfo, saveIncomeExpenses,saveQuestionsAns, saveDocuments, addData, addIncomeExpense} from '../reducers/core/index';

const steps = [
    {
      label: "",
      icon: "",
    },
    {
      label: "",
      icon: "",
    },
    {
      label: "",
      icon: "",
    },
    {
      label: "",
      icon: "",
    },
    {
        label: "",
        icon: "",
    },
    {
        label: "",
        icon: "",
    },
    {
      label: "",
      icon: "",
    },
  ];

class Application extends Component  {
    state ={
        step: 0,
        InCome:[],
        // firstName: '',
        // lastName: '',
        // RSAIDNumber: '',
        // mobileNumber: '',
        // homeNumber: '',
        // maritalStatus:'',
        // workNumber: '',
        // emailAddress: '',
        // homeAddress1: '',
        // homeAddress2: '',
        // homeCity: '',
        // homeProvince: '',
        // homePostalCode: '',
        // deliveryAddress1: '',
        // deliveryAddress2: '',
        // deliveryCity: '',
        // deliverySuburb: '',
        // deliveryPostalCode: '',
        // employerName:'',
        // employerAddress1: '',
        // employerAddress2: '',
        // employerAddressCity: '',
        // employerAddressPostalCode: '',
        // employerContactNumber: '',
        // salaryDay:'',
        // yearEmployed:0,
        // salaryFrequency:'',
        // employmentNumber:'',
        // bankName:'',
        // bankBranch:'',
        // bankAccountNumber:'',
        // bankAccountType:'',
        // bankAccHolderName:'',
        // role: 'User',
        // creditScore:'',
         Expenses:[],
    }
    prevStep = () => {
        const { step } = this.state;
        this.setState({step: step - 1});
    }
    nextStep = (info) => {
        const { step } = this.state;
        console.log('The step: ', step);
        this.setState({ step: step + 1});
        switch(step){
            case 0:
                console.log('The step: ', step, info);
                if(!this.props.selectedApp.appid){
                    //this.props.addData(info);
                    this.props.saveGeneralInfo(Object.assign(info, this.props.selectedApp));//this.props.selectedApp
                }
                this.props.addData(info);
                break;
            case 1:
                console.log('The step: ', step, info);
                this.props.saveAddressInfo(Object.assign(info, this.props.selectedApp));
                this.props.addData(info);
                break;
            case 2:
                console.log('The step: ', step, info);
                this.props.saveEmployerInfo(Object.assign(info, this.props.selectedApp));
                this.props.addData(info);
                break;
            case 3:
                console.log('The step: ', step, info);
                this.props.saveBankingInfo(Object.assign(info, this.props.selectedApp));
                this.props.addData(info);
                break;
            case 4:
                info = Object.assign(info, {loan1:this.props.selectedApp.affordability[0].loan1, 
                    loanTerms:this.props.selectedApp.affordability[0].loanTerms, installMent:this.props.selectedApp.affordability[0].installMent});
                console.log('The step: ', step, info);
                this.props.saveIncomeExpenses(info, this.props.Income, this.props.Expenses);
                this.props.addIncomeExpense(info);
                break;
            case 5:
                console.log('The step: ', step,info);
                this.props.addData(info);
                this.props.saveQuestionsAns(info);
                break;
            case 6:
                console.log('The step: ', step);
                break;
            default:
                //
        }
    }
    handleChange = input => e => {
        let Income = this.state.InCome;
        let Expenses = this.state.Expenses;
        let indexi = Income.findIndex((x) => x.name === input);
        let indexe = Expenses.findIndex((x) => x.name === input);
        if(indexi >= 0){
            Income[indexi].value = e.target.value;
            this.setState({
                InCome: Income
            });
        }else if(indexe >= 0){
            Expenses[indexe].value = e.target.value;
            this.setState({
                Expenses: Expenses
            });
        }else{
            this.setState({[input]: e.target.value});
        }
    }
    newFieldI = (field) => {
        let Income = this.state.InCome;
        let fld = field.replace(" ", "_").replace(" ", "_");
        console.log("The array: ", Income, field);
        let bfound = false;
        for(var i = 0; i < Income.length; i++){
            if(Income[i].name === fld){
                bfound = true;
                break;
            }
        }
        if(!bfound){
            this.setState({
                InCome: [...Income,{name:fld, value:""}],
            });
        }
        console.log('Cur State: ', this.state.InCome);
    }
    newFieldE = (field) => {
        let Expenses = this.state.Expenses;
        let fld = field.replace(" ", "_").replace(" ", "_").replace("/", "_");
        console.log("The array: ", Expenses, field);
        let bfound = false;
        for(var i = 0; i < Expenses.length; i++){
            if(Expenses[i].name === fld){
                bfound = true;
                break;
            }
        }
        if(!bfound){
            this.setState({
                Expenses: [...Expenses,{name:fld, value:""}],
            });
        }
        console.log('Cur State: ', this.state.Expenses);
    }
    printstate = () =>{
        console.log(this.state.InCome);
    }
    componentDidMount(){
        const {affordability} = this.props.selectedApp;
        console.log(affordability);
        let incom = [];
        let expens = [];
        if(affordability){
            if(affordability[0].hasOwnProperty('expenseAccomodation')){
                expens.push({name:'expenseAccomodation', value:affordability[0].expenseAccomodation})
            }
            if(affordability[0].hasOwnProperty('expenseFood')){
                expens.push({name:'expenseFood', value:affordability[0].expenseFood})
            }
            if(affordability[0].hasOwnProperty('monthlyFixedsalary')){
                incom.push({name:'monthlyFixedsalary', value:affordability[0].monthlyFixedsalary})
            }
            if(affordability[0].hasOwnProperty('incomerental')){
                incom.push({name:'incomerental', value:affordability[0].incomerental})
            }
            if(incom.length){
                this.setState({InCome:incom});
            }
            if(expens.length){
                this.setState({Expenses:expens});
            }
        }
    }
    render() {
      console.log('==>', this);
        const { step } = this.state;
        //const { InCome, Expenses } = this.state;
        // const {firstName,lastName,RSAIDNumber,mobileNumber,homeNumber,maritalStatus,workNumber,emailAddress,homeAddress1,homeAddress2,homeCity,
        //         homeSuburb,homePostalCode,deliveryAddress1,deliveryAddress2,deliveryCity,deliverySuburb,deliveryPostalCode,employerName,
        //         employerAddress1,employerAddress2,employerAddressCity,employerAddressPostalCode,employerContactNumber,salaryDay,
        //         yearEmployed,salaryFrequency,employmentNumber,bankName,bankBranch,bankAccountNumber,bankAccountType,bankAccHolderName,
        //         InCome, Expenses
        //     } = this.state;
        // const values = {firstName,lastName,RSAIDNumber,mobileNumber,homeNumber,maritalStatus,workNumber,emailAddress,homeAddress1,homeAddress2,homeCity,
        //     homeSuburb,homePostalCode,deliveryAddress1,deliveryAddress2,deliveryCity,deliverySuburb,deliveryPostalCode,employerName,
        //     employerAddress1,employerAddress2,employerAddressCity,employerAddressPostalCode,employerContactNumber,salaryDay,
        //     yearEmployed,salaryFrequency,employmentNumber,bankName,bankBranch,bankAccountNumber,bankAccountType,bankAccHolderName,
        //     InCome, Expenses
        // };
        //const values = {InCome, Expenses};

        switch(step){
            case 0:
                return(
                    <>
                    <GeneralInfo
                        nextStep={this.nextStep}
                        values={this.props.selectedApp}
                    />
                    </>
                );
            case 1:
                return(
                    <>
                    {/* <Stepper value={step} items={steps} /> */}
                    <AddressInfo
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={this.props.selectedApp}
                    />
                    </>
                );
            case 2:
                return(
                    <>
                    {/* <Stepper value={step} items={steps} /> */}
                    <EmployerInfo
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={this.props.selectedApp}
                    />
                    </>
                );
            case 3:
                return(
                    <>
                    {/* <Stepper value={step} items={steps} /> */}
                    <BankingInfo
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={this.props.selectedApp}
                    />
                    </>
                );
            case 4:
                return(
                    <>
                    {/* <Stepper value={step} items={steps} /> */}
                    <IncomeExpenses
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        newFieldI={this.newFieldI}
                        newFieldE={this.newFieldE}
                        handleChange={this.handleChange}
                        InCome={this.state.InCome}
                        Expenses={this.state.Expenses}
                    />
                    </>
                );
            case 5:
                return(
                    <>
                    {/* <Stepper value={step} items={steps} /> */}
                    <Questions
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      handleChange={this.handleChange}
                      values={this.props.QuestionsAns}
                      RSAIDNumber={this.props.selectedApp.RSAIDNumber}
                    />
                    </>
                );
            case 6:
                return(
                    <>
                    {/* <Stepper value={step} items={steps} /> */}
                    <Documents
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={this.props.documents}
                    />
                    </>
                );
            default:
                //
        }
    }

}
const mapStateToProps = state =>({
    generalInfo: state.applicationReducer.generalInfo,
    addressInfo: state.applicationReducer.addressInfo,
    employerInfo: state.applicationReducer.employerInfo,
    bankingInfo: state.applicationReducer.bankingInfo,
    Income: state.applicationReducer.Income,
    Expenses: state.applicationReducer.Expenses,
    // QuestionsAns: state.applicationReducer.QuestionsAns,
    documents: state.applicationReducer.documents,
    selectedApp: state.applicationReducer.selectedApp,
});
const mapDispatchToProps = {
    saveGeneralInfo,
    saveAddressInfo,
    saveEmployerInfo,
    saveBankingInfo,
    saveIncomeExpenses,
    saveQuestionsAns,
    saveDocuments,
    addData,
    addIncomeExpense
}
export default connect(
    mapStateToProps,
    mapDispatchToProps)(Application);
