import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import T_Routes from './T_Routes'
import S_Routes from './S_Routes';
import M_Routes from './M_Routes';
import E_Routes from './E_Routes';
import Navbar from '../components/Navbar';

import menuList_t from '../asset/json/menuList_t.json'
import menuList_s from '../asset/json/menuList_s.json'
import menuList_m from '../asset/json/menuList_m.json'
import menuList_e from '../asset/json/menuList_e.json'

const ITDaRoutes = ({ connect, socket }) => {

   useEffect(() => {
      connect(window.sessionStorage.getItem('loginId'));
   }, [])

   const location = useLocation();

   return (

      <div className='T_mainInner'>
         {location.pathname !== "/consulting"
            && <div className='T_mainInnerL'>
               {(window.sessionStorage.getItem("role") === 's') && (<Navbar menuList={menuList_s} />)}
               {(window.sessionStorage.getItem("role") === 't') && (<Navbar menuList={menuList_t} />)}
               {(window.sessionStorage.getItem("role") === 'a') && (<Navbar menuList={menuList_m} />)}
               {(window.sessionStorage.getItem("role") === 'e') && (<Navbar menuList={menuList_e} />)}
            </div>}

         <div className='T_mainInnerR'>
            {(window.sessionStorage.getItem("role") === 's') && (<S_Routes socket={socket} />)}
            {(window.sessionStorage.getItem("role") === 't') && (<T_Routes socket={socket} />)}
            {(window.sessionStorage.getItem("role") === 'a') && (<M_Routes socket={socket} />)}
            {(window.sessionStorage.getItem("role") === 'e') && (<E_Routes socket={socket} />)}
         </div>
      </div>


   )
}

export default ITDaRoutes