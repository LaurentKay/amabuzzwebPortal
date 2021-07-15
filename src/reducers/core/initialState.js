
// init InitialState
var InitialState = {
  language: 'en',
  isLoadingComplete: false,
  loader: false,
  notification: {
    type: '',
    text: ''
  },
  customerSignIn:{custRet:{}, account:[]},
  selectedApp:{affordability:[{loan1:0,loanTerms:0, installMent:0}]},
  generalInfo:{},
  addressInfo:{},
  employerInfo:{},
  bankingInfo:{},
  Income:[],
  Expenses:[],
  questionsAns:{},
  documents:{},
  error:'',
  registerSuc:'',
  compuscan:{},
  loanParams:{},
};
// export InitialState
export default InitialState
