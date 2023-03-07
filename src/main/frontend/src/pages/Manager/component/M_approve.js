import React, { useEffect, useState } from 'react'
import axios from "axios"

const M_approve = (props) => {

   const [enter, setEnter] = useState([])

   useEffect(() => {
      axios.get("/enterprise/approve_list")
         .then(function (res) {
            setEnter(res.data)
         })
         .catch(function (error) {
            console.log("error")
         })
   }, [])

   const enter_approve_submit = (e) => {
      e.preventDefault()
      console.log(e.currentTarget.getAttribute('enter_id'))
      axios.get("/enterprise/approve", { params: {
         enter_id: e.currentTarget.getAttribute('enter_id')
      } })
         .then(function (res) {
            window.location.reload();
         })
         .catch(function (error) {
            console.log("error")
         })
   }

   const approveList = enter.map((item) => (
      <tr key={item.enter_id}>
         <td className='annItem_manager'>{item.enter_name}</td>
         <td className='annItem_manager'>{item.enter_id}</td>
         <td className='annItem_manager'><button enter_id={item.enter_id} onClick={enter_approve_submit} className='btbtbtbt'>승인</button></td>
      </tr>))

   return (
      <div className='topDiv' style={{minHeight: '12rem'}}>
         <div className='annHead'>
            <p>기업 승인</p>
         </div>
         <div className='annBody_manager'>
            <table className='attTable_manager'>
               <thead>
                  <tr>
                     <td className='annItem_manager'>기업명</td>
                     <td className='annItem_manager'>아이디</td>
                     <td className='annItem_manager'></td>
                  </tr>
               </thead>
               <tbody>
                  {approveList}
               </tbody>
            </table>
         </div>

      </div>
   )
}

export default M_approve