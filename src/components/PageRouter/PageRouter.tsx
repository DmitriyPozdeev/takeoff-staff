import { observer } from 'mobx-react-lite';
import {FC} from 'react';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from '../../router';
import { useStore } from '../../stores/rootStore';
import Auth from './Auth';


const PageRouter: FC = () => {
  const {userStore} = useStore()
  const {isLogin} = userStore;
  return (
    <Routes>
      {/* <Route 
        key={Math.random()}
        path='/work'
        element={
          <Auth>
            <AppTabs/>
          </Auth>
        }
      >
         <Route
          path='root'
          element={<HomeDashboard/>}
        />
        <Route
          path='main-form/*'
          element={<MainForm/>}
        />
          

        <Route
          path='sybase-full'
          element={<SybaseBook/>}
        />
        <Route
          path='number-plan'
          element={<NumberPlan/>}
        />
      </Route>  */}
       {
          privateRoutes.map(route =>
            <Route 
              key={route.path}
              path={route.path}
              element={
                <Auth>
                  <route.component/>
                </Auth>
              }
            /> 
          )
      }  
      {
        publicRoutes.map(route => 
        <Route 
          path={route.path}
          key={route.path}
          element={<route.component/>}
        />
        )
      } 
      <Route
        key="any"
        path="*"
        element={<Navigate to="/not-found" replace />}
      />
    </Routes>
  );
}

export default observer(PageRouter);
