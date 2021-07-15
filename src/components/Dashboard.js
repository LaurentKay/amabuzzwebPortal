// CORE
import React from 'react';
import {Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { useDispatch, useSelector,connect } from 'react-redux';
import {loadFreshCompuscan} from '../reducers/core/index';

const EditCommandCell = (props) => {
  return (
    <td>
      <button
        className="k-button k-primary"
        onClick={() => props.enterEdit(props.dataItem)}
      >
        Complete
      </button>
    </td>
  );
};
const Dashboard = (props) => {
  const [openForm, setOpenForm] = React.useState(false);
  //const customerSignIn = useSelector(state => state.applicationReducer.customerSignIn);
  let {account} = props.customerSignIn;
  account[0].loan1 = account[0].affordability[0].loan1;
  account[0].loanTerms = account[0].affordability[0].loanTerms;
  //const compuscan = useSelector(state => state.applicationReducer.compuscan);
  console.log('Compuscan?: ', props.compuscan);
  // if(!props.compuscan.customerId){
  //   //get Fresh copy
  //   props.loadFreshCompuscan();
  // }

  const enterEdit = (item) => {
    const appInfo = {...item, appid:item._id};
    dispatch({type:'SAVE_APP_DATA', payload:appInfo});
    console.log(appInfo);
    props.history.push('/application');
  };

  if(account.length === 0){
    props.history.push('/application');
  }
  console.log('Is it an array?: ',props.customerSignIn);
  const dispatch = useDispatch();

  const handleRowClick = (event) =>{
    // const appInfo = {...event.dataItem, appid:event.dataItem._id};
    // dispatch({type:'SAVE_APP_DATA', payload:appInfo});
    // console.log(appInfo);
    // props.history.push('/application');
  }

  const MyEditCommandCell = (props) => (
    <EditCommandCell {...props} enterEdit={enterEdit} />
  );
  return (
    <>
    <main id="main">
      <div className="container" data-aos="fade-up">
      <div className='section-title'>
        <h2>Dashboard</h2>
      </div>
      <section id='dashboard' className='dashboard_section'>    
        <div className="row mb">
          <div className="col-12" style={{marginBottom:'30px'}}>    
            <Grid
              data={account}
              onRowClick={handleRowClick}
              >
              <Column field="appReference" title="Application Reference" width="250px"/>
              <Column field="loan1" title="Loan Amount" width="250px"/>
              <Column field="loanTerms" title="Loan Period" width="250px"/>
              <Column field="ApplicationStatus" title="Application Status" width="200px"/>
              <Column cell={MyEditCommandCell} />
            </Grid> 
          </div>
        </div>       
      </section>
      </div>
      </main>
    </>
  );
};
const mapStateToProps = state => ({
  compuscan: state.applicationReducer.compuscan,
  error: state.applicationReducer.error,
  registerSuc: state.applicationReducer.registerSuc,
  customerSignIn: state.applicationReducer.customerSignIn,
});
const mapDispatchToProps =  {
  loadFreshCompuscan
};

const Dash = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default Dash;
