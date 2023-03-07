import React from 'react'
import { Routes, Route } from 'react-router-dom'

import T_main from '../pages/Course/Teacher/T_main'
import C_announcement from '../pages/Course/C_announcement';
import C_announcement_detail from '../pages/Course/C_announcement_detail';
import C_announcement_write from '../pages/Course/Teacher/C_announcement_write'
import Resume from '../components/Resume'
import C_archive from '../pages/Course/C_archive';
import C_archive_write from '../pages/Course/Teacher/C_archive_write';
import C_archive_detail from '../pages/Course/C_archive_detail';
import StdInfoList from '../components/StdInfoList';
import C_extend from '../pages/Course/Teacher/extend/C_extend';
import C_extend_write from '../pages/Course/Teacher/extend/C_extend_write';
import C_extend_detail from '../pages/Course/Teacher/extend/C_extend_detail';
import C_schedule from '../pages/Course/C_schedule';
import E_main_detail from '../pages/Enterprise/E_main_detail';
import C_consulting from '../pages/Course/Teacher/C_consulting';

const T_Routes = () => {
   return (
      <Routes>
         <Route path='/' element={<T_main />}/>
         <Route path='/announcement' element={<C_announcement />}/>
         <Route path='/announcement/detail' element={<C_announcement_detail />}/>
         <Route path='/announcement/write' element={<C_announcement_write />}/>
         <Route path='/resume' element={<Resume/>}/>
         <Route path='/archive' element={<C_archive/>}/>
         <Route path='/archive/detail' element={<C_archive_detail/>}/>
         <Route path='/archive/write' element={<C_archive_write/>}/>
         <Route path='/std_info' element={<StdInfoList/>}/>
         <Route path='/extend' element={<C_extend/>}/>
         <Route path='/extend/write' element={<C_extend_write/>}/>
         <Route path='/extend/detail' element={<C_extend_detail/>}/>
         <Route path='/schedule' element={<C_schedule/>}/>
         <Route path='/detail_user' element={<E_main_detail/>}/>
         <Route path='/consulting' element={<C_consulting/>}/>
      </Routes>
   )
}

export default T_Routes