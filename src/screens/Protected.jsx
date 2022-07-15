import { Fragment } from "react";
import { Navigate } from "react-router-dom";

const Protected=(props)=>{
  if(props.isLoggedIn && props.wantLoggedIn)
  {
    return <Navigate to='/dashboard' replace />;
  }
  if(!props.isLoggedIn && !props.wantLoggedIn)
  {

    return <Navigate to='/login' replace />;
  }
  return (
    <Fragment>
      {props.children}
    </Fragment>
  )
}
export default Protected;