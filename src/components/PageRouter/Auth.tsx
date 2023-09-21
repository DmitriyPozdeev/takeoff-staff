import { Navigate, useLocation } from "react-router-dom"
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/rootStore";

const Auth = ({children}: any) => {
  const location = useLocation();
  const {userStore} = useStore()
  const {isLogin, state, checkState, setErrorMessage} = userStore;

  if ((!isLogin && state === 'error') || (!isLogin && checkState === 'error'))  {
    setErrorMessage('Request failed with status code 401')
    return <Navigate to='/login' state={{from: location}}/>
  }
  return children;
}
export default observer(Auth)