import State from './initialState';
const initialState = State;

const applicationReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SAVE_INFO_REQUEST':{
            const item = action.payload;
            console.log('M status: ', item);
            return {
                ...state,
                selectedApp:{...state.selectedApp, ...item},
                error:'',
                registerSuc:''
            };
        }
        case 'ADD_APP_ID':
            const appid = action.payload;
            return{
                ...state,
                selectedApp:{...state.selectedApp, appid}
            };
        case 'SAVE_INC_EXP_REQUEST':{
            const affordability = [action.payload];
            return{
                ...state,
                selectedApp:{...state.selectedApp, affordability}
            }
        }
        case 'SAVE_APP_DATA':{
            const item = {...state.selectedApp.affordability[0], ...action.payload.affordability[0]};
            let affordability = [item];
            return{
                ...state,
                selectedApp:{...state.selectedApp, ...action.payload, affordability}
            };
        }
        case 'SAVE_GENERAL_INFO':{
            const item = action.payload;
            return{
                ...state,
                selectedApp:{...state.selectedApp, ...item},
                //generalInfo:action.payload,
                error:'',
                registerSuc:''
            };
        }
        case 'SAVE_UPDLOADED_DOCS':{
            const uploadedDocs = action.payload;
            return{
                ...state, 
                selectedApp: {...state.selectedApp, uploadedDocs}
            };
        }
        case 'SAVE_LOAN_PARAMS':{
            const item = action.payload;
            let affordability = [...state.selectedApp.affordability]; //, ...item
            affordability[0].loan1 = item[0].loan1;
            affordability[0].loanTerms = item[0].loanTerms;
            affordability[0].installMent = item[0].installMent;
            return {
                ...state,
                selectedApp:{...state.selectedApp, affordability}
            };
        }
        case 'SAVE_ADDRESS_INFO':{
            const item = action.payload;
            return{
                ...state,
                //addressInfo:action.payload,
                selectedApp:{...state.selectedApp, ...item},
                error:'',
                registerSuc:''
            };
        }
        case 'SAVE_EMPLOYER_INFO':{
            const item = action.payload;
            return{
                ...state,
                //employerInfo:action.payload,
                selectedApp:{...state.selectedApp, ...item},
                error:'',
                registerSuc:''
            };
        }
        case 'SAVE_BANKING_INFO':{
            const item = action.payload;
            return{
                ...state,
                //bankingInfo:action.payload,
                selectedApp:{...state.selectedApp, ...item},
                error:'',
                registerSuc:''
            };
        }
        case 'SAVE_INCOME_EXPENSES':
            return{
                ...state,
                Income:action.payload.Income,
                Expenses:action.payload.Expenses,
                error:'',
                registerSuc:''
            };
        case 'SAVE_QUESTIONS_ANSWERS':
            return{
                ...state,
                QuestionsAns:action.payload,
                error:'',
                registerSuc:''
            };
        case 'SAVE_DOCUMENTS':
            return{
                ...state,
                documents:action.payload,
                error:'',
                registerSuc:''
            };
        case 'SAVE_INFORMATION_ERROR':
            return{
                ...state,
                error:action.payload,
                registerSuc:''
            };
        case 'CUSTOMER_REGISTER_SUCCESS':
            return {
                ...state,
                registerSuc:action.payload.message,
                error:''
            };
        case 'CUSTOMER_REGISTER_ERROR':
            return{
                ...state,
                error:action.payload,
                registerSuc:''
            };
        case 'CUSTOMER_LOGIN_SUCCESS':
            return{
                ...state,
                error:'',
                customerSignIn:action.payload,
                registerSuc:''
            };
        case 'CUSTOMER_LOGIN_ERROR':
            return{
                ...state,
                error:action.payload,
                registerSuc:''
            };
        case 'SELECTED_APP_USE':
            return{
                ...state,
                selectedApp:action.payload
            };
        case 'LOAD_COMPUSCAN_DATA':
            return{
                ...state,
                error:'',
                registerSuc:'',
                compuscan:action.payload
            };
        default:
            return state;
    }
};

export {applicationReducer};