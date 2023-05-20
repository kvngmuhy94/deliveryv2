import React, { useEffect } from 'react';
import {UserProfile} from '.';
import { useStateContext } from '../context/ContextProvider';
import { Tooltip } from '@mui/material';
import { KeyboardArrowDown, Menu, NotificationsActive} from '@mui/icons-material';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placement="bottom">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className='md:bg-white shadow-lg fixed w-full'>
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative ">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<Menu />} />
      
      <div className="flex">
        <Tooltip title="Profile" placement="bottom">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            {/* <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            /> */}
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Admin
              </span>
            </p>
            <KeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </Tooltip>

        
        {isClicked.userProfile && (<UserProfile />)} 
      </div>
    </div>
    </div>
  );
};

export default Navbar;
