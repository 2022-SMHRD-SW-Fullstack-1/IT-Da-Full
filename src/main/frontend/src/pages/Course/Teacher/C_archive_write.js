import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';

import '../../../css/Course.css'
import 'react-quill/dist/quill.snow.css';
const C_archive_write = () => {

   const navigate = useNavigate();

   // navigate를 이용해 전달한 값 가져오기
   const { state } = useLocation();

   const [title, setTitle] = useState('');
   const onTitleChange = e => {
      setTitle(e.target.value)
   };
   const [content, setContent] = useState('');
   const [b_file, setBFile] = useState('');
   const [selectedFile, setSelectedFile] = useState(null)


   // 화면 로딩시 글 수정과 글 작성인지 구분하여 제목을 띄우기
   useEffect(() => {
      if (state.title == '글 수정') {
         setTitle(state.b_title)
         setContent(state.b_content)
         setBFile(state.b_file)
      }
   }, [])


   // 글 작성 버튼 누르면 작성된 내용 가져오기
   const clickWriteBtn = () => {
      console.log(title)
      console.log(content)
      console.log(b_file)
      if (state.title == '글 수정') {
         axios
            .post('/announcement/editArchive', {
               title: title,
               content: content,
               b_num: state.b_num,
               b_file: b_file,
            })
            .then((res) => {
               console.log(res)
               navigate('/archive', { state: { state: title } })
               selectedFile&&(uploadFile(selectedFile,state.b_num))
            })
            .catch((e) => console.log(e));
      } else {
         axios
            .post('/announcement/addArchive', {
               title: title,
               content: content,
               id: window.sessionStorage.getItem("loginId"),
               key: window.sessionStorage.getItem("course_key"),
               b_file:b_file,
            })
            .then((res) => {
               console.log(res)
               navigate('/archive', { state: { state: title } })
               selectedFile&&(uploadFile(selectedFile,state.b_num))
            })
            .catch((e) => console.log(e));
      } 
   }

   const handleFileInput = (e) => {
      const file = e.target.files[0];
      console.log('파일선택', file)
      setSelectedFile(e.target.files[0]);
      setBFile(e.target.files[0].name)
   }
   const fileInput = useRef();
   const onClickFileInput= () => {
      fileInput.current.click()
    }

    const uploadFile = (file, num) => {

     const formData =new FormData();
     formData.append('file', file)
     formData.append('id', sessionStorage.getItem("loginId"))
     formData.append('num',num)
     const config = {
       headers: {            
         'content-type': 'multipart/form-data'
       }
     }
      axios
      .post('/file/upload/board', formData, config)
      .then((res)=>{
         console.log(res)
      })
      .catch((err)=> console.error(err))
  }

   return (
      <div className='container annContainer'>
         <p>공유 자료실 {state.title}</p>
         <div className='content annContent'>
            <p>제목</p>
            <input onChange={onTitleChange} value={title} type='text'></input>

            <p>내용</p>
            <ReactQuill theme="snow" value={content} onChange={setContent} />
            <button onClick={onClickFileInput}>{'파일첨부'}</button>
            <input type='file' style={{ display: "none" }} name='b_file' onChange={handleFileInput} ref={fileInput} />
            <input name='b_file' value={selectedFile?(selectedFile.name):(b_file)} type='text' readOnly/>
            {/* <img src={files && files}/> */}
            <div className='annWriteButton'>
               <button onClick={clickWriteBtn}>저장하기</button>
            </div>
         </div>
      </div>
   )
}

export default C_archive_write