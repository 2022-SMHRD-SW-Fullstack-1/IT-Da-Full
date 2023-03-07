import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';

import 'react-quill/dist/quill.snow.css';

const M_announcement_write = () => {
   
   const navigate = useNavigate();

   // navigate를 이용해 전달한 값 가져오기
   const { state } = useLocation();

   // input value 가져오기
   const [title, setTitle] = useState('');
   const onTitleChange = e => {
      setTitle(e.target.value)
   };
   const [content, setContent] = useState('');
   
   useEffect(()=>{
      if (state.title == '글 수정') {
         setTitle(state.b_title)
         setContent(state.b_content)
      }
   },[])


   // 글 작성 버튼 누르면 작성된 내용 가져오기
   const clickWriteBtn = () => {
      console.log(title)
      console.log(content)
      if (state.title == '글 수정') {
         axios
         .post('/announcement/editPost', {
            title: title,
            content: content,
            b_num: state.b_num,
         })
         .then((res) => {
            console.log(res)
            navigate('/manager_announcement', { state: { state: title } })
         })
         .catch((e) => console.log(e));
      } else {
         axios
         .post('/announcement/manager_write', {
            b_title: title,
            b_content: content,
            mb_id: window.sessionStorage.getItem("loginId"),
         })
         .then((res) => {
            alert("작성완료")
            navigate('/manager_announcement', { state: { state: title } })
         })
         .catch((e) => console.log(e));
      }
      
   }

   return (
      <div className='container annContainer'>
         <p>공지사항 {state.title}</p>
         <div className='content annContent'>
            <p>제목</p>
            <input onChange={onTitleChange} value={title} type='text'></input>
            <p>내용</p>
            <ReactQuill theme="snow" value={content} onChange={setContent} />
            <div className='annWriteButton'>
               <button onClick={clickWriteBtn}>저장하기</button>
            </div>
         </div>

      </div>
   )
}

export default M_announcement_write