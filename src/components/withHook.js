// This is a Higher Order Component that wraps <App> so that I can use the hooks from react-router-dom

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Allows the use of hooks in class components
export const withHook = (Component) => {
  return (props) => {
    // Returns the pathname
    const location = useLocation();

    // Returns a function from react-router-dom that handles changing routes
    const navigate = useNavigate();

    return <Component location={location} navigate={navigate} {...props} />;
  };
};
