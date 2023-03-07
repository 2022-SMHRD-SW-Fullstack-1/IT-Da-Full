import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const M_announcement = () => {

   const navigate = useNavigate()
   const goToDetail = (e) => {
      navigate('/manager_announcement_detail', { state: { num: e.currentTarget.getAttribute('num') } })
   }
   const goToWrite = () => {
      navigate('/manager_announcement_write', { state: { title: '글 작성' } })
   }
   const goToAnnList = () => {
      navigate('/manager_announcement')
   }

   // 데이터 가져오기
   const [boardList, setBoardList] = useState([])

   useEffect(() => {
      axios
         .get('/announcement/get_manager_post', { params: { key: window.sessionStorage.getItem("course_key") } })
         .then(function(res){
            setBoardList(res.data);
         })
         .catch((e) => console.log(e));
   }, [])

   return (
      <div className='topDiv' style={{minHeight: '12rem'}}>
         <div className='annHead'>
            <p>전체 공지사항</p>
            <div>
               {window.sessionStorage.getItem("role") === 'a' &&
                  <p className='hoverHand' onClick={goToWrite} >작성하기</p>}
               <p className='hoverHand' onClick={goToAnnList}>전체보기</p>
            </div>
         </div>
         <div className='annBody_manager'>
            {boardList.map((item) => (<p onClick={goToDetail} className='annItem hoverHand' num={item.b_num} key={item.b_num}>▪ {item.b_title}</p>))}
         </div>
      </div>
   )
}

export default M_announcement