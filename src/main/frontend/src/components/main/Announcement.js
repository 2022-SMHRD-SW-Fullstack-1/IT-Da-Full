import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import '../../css/MainComponent.css'

const Announcement = () => {

   const navigate = useNavigate()
   const goToDetail = (e) => {
      navigate('/announcement/detail', {state: { num: e.currentTarget.getAttribute('num')}})
   }
   const goToWrite = () => {
      navigate('/announcement/write', {state: {title: '글 작성'}})
   }
   const goToAnnList = () => {
      navigate('/announcement')
   }

   // 임시 데이터
   const tempList = ["지각하지 않기! (9시 전에 등원 후 수업준비하기)", "지각, 결석 특이사항 있을 경우 사전에 얘기해주기", "예습, 복습, 자체 스터디 등 공부시간 가지기!", "흡연은 7층에서 부탁합니다~~!", "5층, 6층 사용하지 않기"]

   const [boardList, setBoardList] = useState([])

   // 데이터 가져오기
   useEffect(() => {
     axios
       .get('/announcement/getPost', { params: { key: window.sessionStorage.getItem("course_key") } })
       .then((res) => setBoardList(res.data))
       .catch((e) => console.log(e));
   }, [])


   return (
      <div className='topDiv'>
         <div className='annHead'>
            <p>공지사항</p>
            <div>
               {window.sessionStorage.getItem("role") === 't' &&
                  <p className='hoverHand' onClick={goToWrite}>작성하기</p>}
               <p className='hoverHand' onClick={goToAnnList}>더보기</p>
            </div>
         </div>
         <div className='annBody'>
            {boardList.map((item) => (<p onClick={goToDetail} className='annItem hoverHand' num={item.b_num} key={item.b_title}>▪ {item.b_title}</p>))}
         </div>
      </div>
   )
}

export default Announcement