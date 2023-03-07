import React from 'react'

import '../../css/MainComponent.css'

const Attendance = () => {
  return (
    <div className='topDiv'>
         <table className='attTable'>
            <thead>
               <tr>
                  <td colSpan={3}>오늘 출석 현황</td>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>출석</td>
                  <td>지각</td>
                  <td>결석</td>
               </tr>
               <tr className='attNum'>
                  <td>23</td>
                  <td>1</td>
                  <td>0</td>
               </tr>
            </tbody>
         </table>
      </div>
  )
}

export default Attendance