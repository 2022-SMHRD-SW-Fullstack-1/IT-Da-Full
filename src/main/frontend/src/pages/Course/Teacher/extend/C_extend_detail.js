import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import C_extend_list from "./C_extend_list"

const C_extend_detail = () => {

   // navigate를 이용해 전달한 값(b_num) 가져오기
   const { state } = useLocation();

   // 게시글 정보를 저장하는 변수
   const [post, setPost] = useState({})
   const [extend_num, setExtend_num] = useState("")
   const [extend_name, setExtend_name] = useState("")
   const [extend_time, setExtend_time] = useState("")
   const [extend, setExtend] = useState([])

   const [extend_over, setExtend_over] = useState(true)

   const onExtend_nameChange = e => {
      setExtend_name(e.target.value)
   };

   const onExtend_timeChange = e => {
      setExtend_time(e.target.value)
   };

   useEffect(() => {
      axios
         .get("/announcement/get_one_extend", { params: { key: state.num } })
         .then(res => setPost(res.data))
         .catch(e => console.log(e));
   }, [])

   const navigate = useNavigate()

   const goToWrite = () => {
      navigate('/extend/write', { state: { title: '글 수정', b_title: post.b_title, b_content: post.b_content, b_num: post.b_num } })
   }

   // 게시물 삭제
   const deletePost = () => {
      axios
         .get("/announcement/deletePost", { params: { key: state.num } })
         .then(res => navigate('/extend'))
         .catch(e => console.log(e));
   }

   // 연장신청 하기
   const registerExtend = () => {
      axios.post("/student/register_extend", {
         b_num: state.num,
         mb_id: window.sessionStorage.getItem("loginId"),
         extend_name: window.sessionStorage.getItem("userName"),
         extend_time: extend_time
      }).then(function (res) {
         window.location.reload()
      })
         .catch(function (error) {
            console.log(error)
         })
   }

   // 연장신청한거 가져오기
   useEffect(() => {
      axios.get("/student/select_extend", {
         params: {
            b_num: state.num,
         }
      })
         .then(function (res) {
            console.log(res.data)
            setExtend(res.data)
            if(res.data.findIndex(e => e.extend_name === window.sessionStorage.getItem("userName")) !== -1)
               setExtend_over(false)
         })
         .catch(function (error) {
            console.log(error)
         })
   }, [])

   const extendList =
      extend.map((item) => <C_extend_list item={item} key={item.extend_name} />)


   return (
      <div className='container'>
         <p>연장사용 신청</p>
         <div className='content'>
            <div className='annViewTitle'>
               <p>{post.b_title}</p>
               <p> 작성일 {post.b_dt}</p>
            </div>
            <div className='annViewContent'>
               <p dangerouslySetInnerHTML={{ __html: post.b_content }}></p>
            </div>
         </div>
         
         {window.sessionStorage.getItem("role") === 't' &&
            <div className='content annViewButton'>
               <button onClick={goToWrite}>글수정</button>
               <button onClick={deletePost}>글삭제</button>
            </div>}
         <div className='content extendTable'>
            <table>
               <thead>
                  <tr>
                     <td>이름</td>
                     <td>시간</td>
                  </tr>
               </thead>
               <tbody>
                  {extendList}
                  {window.sessionStorage.getItem("role") === 's' && extend_over == true &&
                  <tr>
                     <td><span>{window.sessionStorage.getItem("userName")}</span></td>
                     <td><input placeholder='예) 21:00' type="text" value={extend_time} onChange={onExtend_timeChange} /></td>
                     <td><button onClick={registerExtend}>신청하기</button></td>
                  </tr>}
               </tbody>
            </table>
            
         </div>
      </div>
   )
}

export default C_extend_detail