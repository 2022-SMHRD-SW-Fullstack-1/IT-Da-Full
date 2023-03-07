import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';

import '../../../css/C_consulting.css'

const C_consulting = () => {

  // 학생 리스트
  const [stdList, setStdList] = useState([])
  // 상담 리스트
  const [consultingList, setConsultingList] = useState([])

  const [selectStd, setSelectStd] = useState("학생을 선택해주세요")
  const [selectDt, setSelectDt] = useState("새 상담 내역 작성")
  const [selectSeq, setSelectSeq] = useState('')
  const [btnText, setBtnText] = useState("상담 작성")

  const [title, setTitle] = useState('');
  const onTitleChange = e => {
    setTitle(e.target.value)
  };
  const [content, setContent] = useState('');
  const [date, setDate] = useState('')
  const onDateChange = e => {
    setDate(e.target.value)
  };

  const onStdClick = (e) => {
    setSelectStd(e.target.innerText)
    axios
      .get('/teacher/getConsultingList', { params: { student: e.currentTarget.getAttribute('mb_id') } })
      .then((res) => {
        res.data[0] === undefined
        && setBtnText('상담 작성')
        setConsultingList(res.data.sort((a, b) => a.date < b.date ? -1 : 1))
      })
      .catch((e) => console.log(e))
  }

  const onDateClick = (e) => {
    let seq = e.currentTarget.getAttribute('seq')
    setSelectDt(e.target.innerText)
    setSelectSeq(seq)
    setTitle(consultingList.find(e => e.seq == seq).title)
    setContent(consultingList.find(e => e.seq == seq).content)
    setDate(consultingList.find(e => e.seq == seq).date)
    setBtnText('수정')
  }

  const addConsulting = () => {
    // 상담 추가 버튼
    setTitle('')
    setContent('')
    setDate('')
    setSelectDt('새 상담 내역 작성')
    setBtnText('상담 작성')
  }

  const deleteConsulting = () => {
    axios
    .get('/teacher/deleteConsulting', { params: { seq: selectSeq } })
    .then((res)=> {
      setConsultingList(consultingList.filter(e => e.seq != selectSeq))
      addConsulting();
    })
    .catch((e)=>console.log(e));
  }

  const onBtnClick = () => {
    // 학생과 상담일자가 선택되어있으면서 버튼의 글자가 수정하기 일때 실행
    (btnText === '수정' && selectStd !== "학생을 선택해주세요" && selectDt !== "새 상담 내역 작성")
    && axios
    .post('/teacher/updateConsulting', { seq: selectSeq, title: title, content: content, date: date })
    .then((res) => {
      setConsultingList((consultingList.filter(e => e.seq != selectSeq).concat({ seq: selectSeq, title: title, content: content, date: date })).sort((a, b) => a.date < b.date ? -1 : 1))
    })
    .catch((e) => console.log(e));

    (btnText === '상담 작성' && title !== "" && content !== "" && date !== "")
    && axios
    .post('/teacher/addConsulting', { title: title, content: content, date: date, teacher: window.sessionStorage.getItem('loginId'), student: stdList.find(e => e.mb_name === selectStd).mb_id })
    .then((res) => {
      setConsultingList(consultingList.concat([{seq: res.data, title: title, content: content, date: date, teacher: window.sessionStorage.getItem('loginId'), student: stdList.find(e => e.mb_name === selectStd).mb_id}]).sort((a, b) => a.date < b.date ? -1 : 1))
      addConsulting();
    })
    .catch((e) => console.log(e));

    title === "" && alert('상담 제목을 입력해주세요');
    content === "" && alert('상담 내용을 입력해주세요');
    date === "" && alert('상담일자를 선택해주세요');
  }

  useEffect(() => {
    axios
      .post('/teacher/getStdList', { course_key: window.sessionStorage.getItem('course_key') })
      .then((res) => setStdList(res.data))
      .catch((e) => console.log(e))
  }, [])

  return (
    <div className='consultingBox'>
      <div className='consultingBox_Head'>
        <span>{selectStd} / {selectDt} </span>
      </div>
      <div className='consultingBox_Body'>
        <div>
          {stdList.map((item, idx) => <p onClick={onStdClick} mb_id={item.mb_id} key={item + idx}>{item.mb_name}</p>)}
        </div>
        <div>
          {consultingList.map((item, idx) => <p onClick={onDateClick} seq={item.seq} key={item.seq}>{item.date}</p>)}
          <p onClick={addConsulting}>상담 추가</p>
        </div>
        <div>
          <input onChange={onTitleChange} value={title} type='text' placeholder='상담제목'></input>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
          <span>상담일자 : </span>
          <input onChange={onDateChange} value={date} type='date'></input>
          {btnText === '수정' &&<button onClick={deleteConsulting}>삭제</button>}
          <button onClick={onBtnClick}>{btnText}</button>
        </div>
      </div>
    </div>
  )
}

export default C_consulting