import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

const StateContext = createContext();

const initialState = {
  showCart: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {

  const bar = useRef();
  //client context
  
  
  const [qty, setQty] = useState(1);
  const [userProfile, setUserProfile] = useState(initialState);
  const [companyId, setCompanyId] = useState('')
  const [isLogin, setIsLogin] = useState()
  const [auth, setAuth] = useState(localStorage.getItem('auth'))

  

  
  const setAuthFunc = (param)=>{
    localStorage.setItem('auth', param)
    setAuth(localStorage.getItem('auth'))
  } 
  

  //Company context
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#002984');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider 
      value={{
        bar, 
        currentColor, 
        currentMode, 
        activeMenu, 
        screenSize,
        setScreenSize, 
        handleClick, 
        isClicked, 
        initialState, 
        setIsClicked, 
        setActiveMenu, 
        themeSettings, 
        setThemeSettings,
        userProfile,
        setUserProfile,
        companyId,
        setCompanyId,
        isLogin,
        setAuthFunc,
        auth,
        setAuth,
        setCurrentColor,
        setCurrentMode, 
        setMode, 
        setColor, 
        themeSettings, 
        setThemeSettings 
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
