import { Spin } from "antd";
import { Navigate, useLocation } from "react-router-dom"
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/rootStore";
// import { allPaths } from "../../router";

const Auth = ({children}: any) => {
  const location = useLocation();
  const {userStore} = useStore()
  const {isLogin, state, checkState} = userStore;
  
  if ((!isLogin && state === 'error') || (!isLogin && checkState === 'error'))  {
    return <Navigate to='/login' state={{from: location}}/>
  }
  //setAppState('pending')
  //  if( state === 'pending') {
  //    return <Spin/>
  //  }
  return children;
}
export default observer(Auth)