import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../../css/Course.css'

const C_archive_detail = () => {

   // navigate를 이용해 전달한 값(b_num) 가져오기
   const { state } = useLocation();
   
   // 게시글 정보를 저장하는 변수
   const [ post, setPost ] = useState({})

   useEffect(()=>{
      axios
      .get("/announcement/getOneArchive", { params: {key: state.num } })
         .then(res => setPost(res.data))
         .catch(e => console.log(e));
   },[])

   const navigate = useNavigate()
   const goToWrite = () => {
      navigate('/archive/write', { state: { title: '글 수정', b_title: post.b_title, b_content: post.b_content, b_num: post.b_num, b_file: post.b_file } })
   }
   const deletePost = () => {
      const formData = new FormData();
      formData.append('id', sessionStorage.getItem("loginId"))
      axios
      .post('file/delete/board',formData)
         .then(axios
            .get("/announcement/deleteArchive", { params: {key: state.num } })
            .then(res => navigate('/archive'))
            .catch(e => console.log(e))
         )
         .catch(e => console.log(e))
   }
   const url = process.env.PUBLIC_URL+`/file/board/${post.b_file}`
   return (
      <div className='container'>
         <p>공유 자료실</p>
         <div className='content'>
            <div className='annViewTitle'>
               <p>{post.b_title}</p>
               <p> 작성일 {post.b_dt}</p>
            </div>
            <div className='annViewContent'>
               <p dangerouslySetInnerHTML={ {__html: post.b_content} }></p>
            </div>
            <p>첨부파일 <span className='fileColor' onClick={()=> window.open(url)}>{post.b_file.slice(10,-1)}</span></p>
         </div>
         {window.sessionStorage.getItem("role") === 't' &&
            <div className='content annViewButton'>
               <button onClick={goToWrite}>글수정</button>
               <button onClick={deletePost}>글삭제</button>
            </div>}
      </div>
   )
}

export default C_archive_detail