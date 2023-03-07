import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const M_announcement_detail = () => {

  // navigate를 이용해 전달한 값(b_num) 가져오기
  const { state } = useLocation();

  // 게시글 정보를 저장하는 변수
  const [post, setPost] = useState({})

  useEffect(() => {
    axios
      .get("/announcement/getOnePost", { params: { key: state.num } })
      .then(res => setPost(res.data))
      .catch(e => console.log(e));
  }, [])

  const navigate = useNavigate()
  const goToWrite = () => {
    navigate('/manager_announcement_write', { state: { title: '글 수정', b_title: post.b_title, b_content: post.b_content, b_num: post.b_num } })
  }
  
  const deletePost = () => {
    axios
      .get("/announcement/deletePost", { params: { key: state.num } })
      .then(res => navigate('/manager_announcement'))
      .catch(e => console.log(e));
  }

  return (
    <div className='container'>
      <p>공지사항</p>
      <div className='content'>
        <div className='annViewTitle'>
          <p>{post.b_title}</p>
          <p> 작성일 {post.b_dt}</p>
        </div>
        <div className='annViewContent'>
          <p dangerouslySetInnerHTML={{ __html: post.b_content }}></p>
        </div>
      </div>
      {window.sessionStorage.getItem("role") === 'a' &&
        <div className='content annViewButton'>
          <button onClick={goToWrite}>글수정</button>
          <button onClick={deletePost}>글삭제</button>
        </div>}
    </div>
  )
}

export default M_announcement_detail