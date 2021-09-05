import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../../App';

export default function PrivateRoute({ children, ...rest }) {
    const [userInfo] = useContext(UserContext);
    return (
        <Route
          {...rest}
          render={({ location }) =>
          userInfo.status ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}
