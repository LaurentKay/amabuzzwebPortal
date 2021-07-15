import React, { useState, useEffect } from 'react';
import { MessageBox } from './MessageBox';
import ProgressBr from './Progress';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoanSummary from './LoanSummary';
const Questions = ({nextStep, prevStep, handleChange, values, error, RSAIDNumber}) => {
    const selectedApp = useSelector(state => state.applicationReducer.selectedApp);
    const {affordability} = selectedApp;
  const [ questions, setQuestions ] = useState([]);
  const [ obj, setObj ] = useState({
    telephoneNumbers: false,
    employers: false,
    addresses: false,
    accounts: false
  });
  const Continue = e => {
    // check all questions is correct ?
    // validate ?
    console.log('obj', obj);
    e.preventDefault();
    nextStep();
  }
  const Previous = e => {
      e.preventDefault();
      prevStep();
  }
  /*
   * Get the list of questions
   *
   * @method fetchQuestions
   */
  const fetchQuestions = async () => {
    // let url = `http://localhost:4000/questions/${RSAIDNumber}`;
    let url = 'http://localhost:4000/questions/8209147250087';
    const result = await axios.get(url);
    let { data } = result;
    // test
    data[0].accounts.splice(Math.floor(Math.random() * data[0].telephoneNumbers.length), 0, data[1].accounts[0]);
    data[0].addresses.splice(Math.floor(Math.random() * data[0].telephoneNumbers.length), 0, data[1].addresses[0]);
    data[0].employers.splice(Math.floor(Math.random() * data[0].telephoneNumbers.length), 0, data[1].employers[0]);
    data[0].telephoneNumbers.splice(Math.floor(Math.random() * data[0].telephoneNumbers.length), 0, data[1].telephoneNumbers[0]);
    setQuestions(data);
  };

  const onChangeHandler = (aEvent) => {
    let name = aEvent.target.name;
    let value = aEvent.target.value;
    console.log('questions:: ', questions);
    console.log('name', name);
    console.log('value', value)
    Object.assign(obj, {
      [name]: questions[1][name].findIndex(a => a === value) >= 0 ? true : false
    });
    setObj(obj);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);
  return(
      <>
      <main id="main">
      <div className="container" data-aos="fade-up">
      <div className="section-title">
          <h2>Application</h2>
      </div>
      <section id="application" className="application_section">
          <LoanSummary affordability={affordability} />
          <ProgressBr n ={5}/>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="row mb">
              <div className="col-12" data-oas="fade-left" data-oas-delay="100">
                  {/* <h2 className="mb-15">Personal Information</h2> */}
                  <div className="card">
                      <div className="card-body">
                          <div className="card-title">
                              <h5 className="text-grey">Please Answer the following questions</h5>
                          </div>
                          <div className="col-12">
                              <div style={{}}>

                                  <p>Which of the following Cellphone number is familiar to you?</p>
                                  <ol style={{width:'100%'}}>
                                    {questions.length > 0 ? questions[0].telephoneNumbers.map((aItem, aIndex) => {
                                      return (
                                        <li style={{float:'left',textAlign:'left',width:'100%'}} key={aIndex}>
                                          <div>
                                            <input style={{width:'10%'}} type="radio" name={'telephoneNumbers'} value={aItem} onChange={onChangeHandler}/>
                                              <span>{aItem}</span>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                  </ol>
                                  <br/>
                                  <p>Which of these employers did you work for?</p>
                                  <ol style={{width:'100%'}}>
                                    {questions.length > 0 ? questions[0].employers.map((aItem, aIndex) => {
                                      return (
                                        <li style={{float:'left',textAlign:'left',width:'100%'}} key={aIndex}>
                                          <div>
                                            <input style={{width:'10%'}} type="radio" name={'employers'} value={aItem} onChange={onChangeHandler}/>
                                              <span>{aItem}</span>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                  </ol>
                                  <br/>
                                  <p>Which of the following the following addresses do you reside at?</p>
                                  <ol style={{width:'100%'}}>
                                    {questions.length > 0 ? questions[0].addresses.map((aItem, aIndex) => {
                                      return (
                                        <li style={{float:'left',textAlign:'left',width:'100%'}} key={aIndex}>
                                          <div>
                                            <input style={{width:'10%'}} type="radio" name={'addresses'} value={aItem} onChange={onChangeHandler}/>
                                              <span>{aItem}</span>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                  </ol>
                                  <br/>
                                  <p>Which of the following the following accounts do you own?</p>
                                  <ol style={{width:'100%'}}>
                                    {questions.length > 0 ? questions[0].accounts.map((aItem, aIndex) => {
                                      return (
                                        <li style={{float:'left',textAlign:'left',width:'100%'}} key={aIndex}>
                                          <div>
                                            <input style={{width:'10%'}} type="radio" name={'accounts'} value={aItem} onChange={onChangeHandler}/>
                                              <span>{aItem}</span>
                                          </div>
                                        </li>
                                      )
                                    }) : null}
                                  </ol>
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

export default Questions;
