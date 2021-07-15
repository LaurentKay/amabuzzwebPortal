import React from 'react';

const ProgressBr = (props) =>{
    return (

        <div className="progress" style={{height:"30px", marginBottom:'10px'}}>
          <div className="progress-bar progress-bar-success" id="prog" role="progressbar" aria-valuenow="0"
          aria-valuemin="0" aria-valuemax="0" style={{minWidth:"20px", width: props.n * 17 + '%'}}>
          </div>
        </div>
    );
};

export default ProgressBr;