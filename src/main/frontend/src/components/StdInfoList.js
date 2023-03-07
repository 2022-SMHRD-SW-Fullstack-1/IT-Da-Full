import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import ageCaculate from '../utils/ageCaculate'
import '../css/StdInfoList.css'
import MyResponsiveSunburst from './MyResponsiveSunburst'

const StdInfoList = () => {

   const navigate = useNavigate();

   // 코스 정보를 활용해 테이블 제목을 저장
   const [tableTitle, setTableTitle] = useState('')
   // 학생들 정보를 저장
   const [stdInfo, setStdInfo] = useState([])
   // 차트 정보를 저장
   const [chart, setChart] = useState({name: '전체', children: [{name: '성공', children: [{name: '취업', loc: 0},{name: '자력', loc: 0}]},{name: '실패', children:[{name: '희망', loc: 0},{name: '재직', loc: 0}]}]})
   // 수정 가능 여부
   const [modify, setModify] = useState(true)

   const onSpecialChange = (e) => {
      let id = e.currentTarget.getAttribute('mb_id')
      const { value } = e.target;
      setStdInfo(stdInfo.map((item)=> item.id == id ? {...item, special: value} : item))
   }
   const onExampleChange = (e) => {
      let id = e.currentTarget.getAttribute('mb_id')
     const { value } = e.target;
     setStdInfo(stdInfo.map((item)=> item.id == id ? {...item, example: value} : item));
   };
   const onDivisionChange = (e) => {
      let id = e.currentTarget.getAttribute('mb_id')
     const { value } = e.target;
     setStdInfo(stdInfo.map((item)=> item.id == id ? {...item, division: value} : item));
   };

   const go_to_userdetail = (e) => {
      navigate("/detail_user", {
        //버튼 클릭시 정보를 수강생 정보를 넘겨준다
        state: {
          mb_id: e.currentTarget.getAttribute("mb_id")
        },
      });
    };

   const onModifyBtnClick = () => {
      !modify &&
      axios
         .post('/member/updateStdInfo', {stdInfo: stdInfo})
         .then((res) => {
            console.log(res)
         })
         .catch((e) => console.log(e));
      setModify(!modify)
   }


   useEffect(() => {
      axios
         .get('/announcement/getCourseInfo', { params: { key: window.sessionStorage.getItem("course_key") } })
         .then((res) => setTableTitle(res.data))
         .catch((e) => console.log(e));

      axios
         .post('/member/getStudentInfo', { course_key: window.sessionStorage.getItem('course_key') })
         .then((res) => setStdInfo(res.data))
         .catch((e) => console.log(e));
   }, [])

   useEffect(()=>{
      setChart({name: '전체', children: [{name: '성공', children: [{name: '취업', loc: stdInfo.filter((item => item.division === '취업')).length},{name: '자력', loc: stdInfo.filter((item => item.division === '자력')).length}]},{name: '실패', children:[{name: '희망', loc: stdInfo.filter((item => item.division === '희망')).length},{name: '재직', loc: stdInfo.filter((item => item.division === '재직')).length}]}]})
   },[stdInfo])

   const divisionData = [{ item: "희망", explain: "취업 또는 창업을 희망하는자" },
   { item: "재직", explain: "입소시 재직자, 자영업영세업자 등 근로자" },
   { item: "취업", explain: "취업완료 및 창업자(본인명의 사업자등록 발급일)" },
   { item: "자력", explain: "스스로 취업한 자" },
   { item: "제외", explain: "모수 제외(증빙 처리 후 적용) : 군입대, 입원, 진학 등" },
   { item: "기타", explain: "공채, 불가, 연락두절" },
   { item: "중탈", explain: "중도탈락자(월/일)" },]

   return (
      <div className='container stdInfoContainer'>
         <h1>취업 통계</h1>
         <div>
            <div style={{ width: '25rem', height: '20rem', zIndex: '0' }}><MyResponsiveSunburst data={chart} /></div>
            <table>
               <thead>
                  <tr>
                     <th>구분 항목</th>
                     <th>내용 설명</th>
                  </tr>
               </thead>
               <tbody>
                  {divisionData.map((item) => <tr key={item.item}><td>{item.item}</td><td>{item.explain}</td></tr>)}
               </tbody>
            </table>
         </div>
         <div className='content'>
            <p>{tableTitle}<button onClick={onModifyBtnClick} id='modifyBtn'>{modify?'수정':'저장'}</button></p>
            <table>
               <thead>
                  <tr>
                     <th>No</th>
                     <th>이름</th>
                     <th>휴대전화</th>
                     <th>성별</th>
                     <th>나이</th>
                     <th>학교</th>
                     <th>전공</th>
                     <th>자격증</th>
                     <th>희망직무</th>
                     <th>희망지역</th>
                     <th>모범</th>
                     <th>구분</th>
                     <th>특이사항/채용기업</th>
                  </tr>
               </thead>
               <tbody>
                  {stdInfo.map((item, idx) => 
                  <tr key={item.phone}>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{idx + 1}</td>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{item.name}</td>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{item.phone}</td>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{item.gender==='m'?'남':'여'}</td>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{ageCaculate(item.birthdate.substring(0,4))}</td>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{item.school}</td>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{item.major}</td>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{item.certification}</td>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{item.hope_jop==='전체'?'전체':item.hope_jop.slice(0,-1)}</td>
                     <td mb_id={item.id} onClick={go_to_userdetail}>{item.hope_city.includes('전체')?'무관':item.hope_city}</td>
                     {modify?<td>{item.example}</td>:<td><select onChange={onExampleChange} mb_id={item.id} value={item.example}><option>모범</option><option>  </option></select></td>}
                     {modify?<td>{item.division}</td>:<td><select onChange={onDivisionChange} mb_id={item.id} value={item.division}><option>희망</option><option>재직</option><option>취업</option><option>자력</option><option>제외</option><option>기타</option><option>중탈</option></select></td>}
                     {modify?<td>{item.special}</td>:<td><input onChange={onSpecialChange} mb_id={item.id} value={item.special} type='text'></input></td>}
                  </tr>)}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default StdInfoList