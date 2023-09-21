import { observer } from 'mobx-react-lite';
import {FC} from 'react';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from '../../router';
import Auth from './Auth';

const PageRouter: FC = () => {
  return (
    <Routes>
      {
        privateRoutes.map(route =>
          <Route 
            key={route.path}
            path={route.path}
            element={
              <Auth>
                {route.component}
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
          element={route.component}
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
