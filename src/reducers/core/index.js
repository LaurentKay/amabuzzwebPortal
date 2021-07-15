import axios from "axios";

export const notify = (aClass, aMessage) =>  {
  // return dispatch => {
  //   dispatch(notification({
  //     type: aClass,
  //     text: aMessage
  //   }))
  //   setTimeout(() => {
  //     dispatch(notification({
  //       type: '',
  //       text: ''
  //     }))
  //   }, 2500);
  // }
}
// loader
export const loader = (aOption)=> {
  return {
    type: 'LOADER',
    data: aOption
  }
}
//Application Actions
export const saveGeneralInfo = (generalInfo) => async dispatch => {
  try {
    const { data } = await axios.post('http://localhost:4000/customers', generalInfo);
    // generalInfo.customerid = data._id;
    // generalInfo.creditScore = data.creditScore;
    dispatch({type:'ADD_APP_ID', payload:data._id});
  } catch(e) {
    dispatch({
      type:'SAVE_INFORMATION_ERROR',
      payload:e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
};

export const saveAddressInfo = (addressInfo) => async (dispatch,getState) => {
  const {
    applicationReducer: { selectedApp }
  } = getState();
  try {
    const { data } = await axios.put(`http://localhost:4000/customers/${selectedApp.appid}`,addressInfo);
    //dispatch({type:'SAVE_ADDRESS_INFO', payload:addressInfo});
  } catch(e) {
    dispatch({
      type:'SAVE_INFORMATION_ERROR',
      payload:e.response && e.response.data.message ? e.response.data.message : e.message
    });
  }
};

export const saveEmployerInfo = (employerInfo) => async (dispatch, getState) => {
  const {
    applicationReducer: {selectedApp}
  } = getState();
  try {
    const { data } = await axios.put(`http://localhost:4000/customers/${selectedApp.appid}`, employerInfo);
    //dispatch({type:'SAVE_EMPLOYER_INFO', payload:employerInfo});
  } catch(e) {
    dispatch({
      type:'SAVE_INFORMATION_ERROR',
      payload:e.response & e.response.data.message ? e.response.data.message : e.message
    });
  }
};

export const saveBankingInfo = (bankingInfo) => async (dispatch, getState) => {
  const {
    applicationReducer: {selectedApp}
  } = getState();
  try {
    const { data } = await axios.put(`http://localhost:4000/customers/${selectedApp.appid}`, bankingInfo);
    //dispatch({type:'SAVE_BANKING_INFO', payload:bankingInfo});
  } catch(e) {
    dispatch({
      type:'SAVE_INFORMATION_ERROR',
      payload:e.response & e.response.data.message ? e.response.data.message : e.message
    });
  }
};

export const saveIncomeExpenses = (info, Income, Expenses) => async (dispatch, getState) => {
  const {
    applicationReducer: { selectedApp }
  } = getState();
  try {
    const {data} = await axios.put(`http://localhost:4000/customers/affordability/${selectedApp.appid}`, info);
    dispatch({type:'SAVE_INCOME_EXPENSES', payload:{Income, Expenses}});
  } catch(e) {
    dispatch({
      type:'SAVE_INFORMATION_ERROR',
      payload:e.response & e.response.data.message ? e.response.data.message : e.message
    });
  }
};

export const saveDocuments = (documents) => dispatch => {
  dispatch({type:'SAVE_DOCUMENTS', payload:documents});
};

export const saveQuestionsAns = (questionsAns) => dispatch => {
  dispatch({type:'SAVE_QUESTIONS_ANSWERS', payload:questionsAns});
};

export const registerCustomer = (customer) => async dispatch => {
  try {
    const { data } = await axios.post(`http://localhost:4000/customers/register`, customer);
    dispatch({type:'CUSTOMER_REGISTER_SUCCESS', payload:data});
  } catch(e) {
    let msg = e.response.data.substr(e.response.data.indexOf("<pre>")+5, 39);
    console.log(msg);
    dispatch({
      type:'CUSTOMER_REGISTER_ERROR',
      payload:e.response & e.response.data.message || msg ? e.response.data.message || msg : e.message
    });
  }
};

export const loginCustomer = (customer) => async dispatch => {
  try {
    const { data } = await axios.post('http://localhost:4000/customers/login', customer);
    dispatch({type:'CUSTOMER_LOGIN_SUCCESS', payload:data});
  } catch(e) {
    let msg = e.response.data.substr(e.response.data.indexOf("<pre>")+5, 34);
    console.log(msg);
    dispatch({
      type:'CUSTOMER_LOGIN_ERROR',
      payload:e.response & e.response.data.message || msg ? e.response.data.message || msg : e.message
    });
  }
};


export const addData = (info) => dispatch =>{
  //console.log(info);
  dispatch({type:'SAVE_INFO_REQUEST', payload:info});
};
export const addIncomeExpense = (info) => dispatch =>{
  dispatch({type:'SAVE_INC_EXP_REQUEST', payload:info});
}
export const loadCompuscan = (id) => async dispatch => {
  try{
    const {data} = await axios.get(`http://localhost:4000/compuscan/getReportFromDB/${id}`);
    dispatch({type:'LOAD_COMPUSCAN_DATA', payload:data})
  }catch(e){
    let msg = e.response.data.substr(e.response.data.indexOf("<pre>")+5, 34);
    dispatch({type:'LOAD_COMPUSCAN_DATA_ERROR', payload:e.response & e.response.data.message || msg ? e.response.data.message || msg : e.message});
  }
};
export const loadFreshCompuscan = () => async (dispatch,getState) => {
  const {
    applicationReducer: {customerSignIn}
  }=getState();
  const {custRet} = customerSignIn;
  try{
    const {data} = await axios.post(`http://localhost:4000/compuscan`,{Identity_number:custRet.RSAIDNumber, Forename:custRet.firstName, Surname: custRet.lastName });
    dispatch({type:'LOAD_COMPUSCAN_DATA', payload:data})
  }catch(e){
    let msg = e.response.data.substr(e.response.data.indexOf("<pre>")+5, 34);
    dispatch({type:'LOAD_COMPUSCAN_DATA_ERROR', payload:e.response & e.response.data.message || msg ? e.response.data.message || msg : e.message});
  }
};
