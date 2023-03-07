import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios'
import intoKorean from '../../utils/dateCaculate'

const C_schedule = () => {

   // 해당 코스의 모든 일정을 저장할 변수
   const [data, setData] = useState([])
   // 보여줄 일정 리스트를 저장할 변수
   const [list, setList] = useState([])
   // 일정 추가의 스케줄 타입 저장 변수
   const [type, setType] = useState('오전')
   const onTypeChange = (e) => {
      setType(e.target.value)
   }
   // 일정 추가의 내용 저장 변수
   const [content, setContent] = useState('')
   const onContentChange = e => {
      setContent(e.target.value)
   };
   // 일정 추가 입력 보여줄지 말지 저장할 변수
   const [add, setAdd] = useState(false)
   // 오늘 날짜
   const today = new Date().toString().substring(0, 10)
   // 클릭한 날짜를 저장할 변수
   const [value, setValue] = useState(new Date());

   const [mark, setMark] = useState([]);

   const getData = () => {
      axios
      .post('/announcement/getSchedule', {
         course_key: window.sessionStorage.getItem('course_key')
      })
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
   }

   useEffect(() => {
      //setMark(["2023-02-15", "2023-02-16", "2023-02-17"])
      getData()
   }, [])

   useEffect(() => {
      let date = value.getFullYear().toString() + '-'
      if (value.getMonth() + 1 < 10) {
         date += '0';
      }
      date += (value.getMonth() + 1).toString() + '-'
      if (value.getDate() < 10)
         date += '0';
      date += value.getDate().toString()
      setList(data.filter(item => item.sche_date.includes(date)))
   }, [value, data])

   // 저장 버튼 누르면 실행될 메서드
   const save = () => {
      let date = value.getFullYear().toString() + '-' + (value.getMonth() + 1).toString() + '-' + value.getDate().toString()
      console.log(type)
      console.log(content)
      console.log(date)
      axios
         .post('/announcement/addSchedule', {
            course_key: window.sessionStorage.getItem('course_key'),
            sche_type: type,
            sche_date: date,
            sche_content: content,
         })
         .then((res) => {
            getData()
            console.log(res)
         })
         .catch((e) => console.log(e));
   }
   console.log(data)

   const onDelete = (e) => {
      let sche_num = e.currentTarget.getAttribute('sche_num')
      axios.get("/announcement/deleteSchedule", {
         params: {
            sche_num: sche_num,
         }
      })
         .then((res) => {
            setData(data.filter(item=>item.sche_num!=sche_num))
            console.log(res)
         })
         .catch((e) => console.log(e));
   }

   return (
      <div className='schedule_topDiv'>
         <p>강의 일정</p>
         <Calendar
            onChange={setValue}
            value={value}
            calendarType="US"
            formatDay={(locale, date) => moment(date).format("DD")}
            showNeighboringMonth={false}
            tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
               // 추가할 html 태그를 변수 초기화
               let html = [];
               // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
               if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                  html.push(<div className="dot"></div>);
               }
               // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
               return (
                  <>
                     <div className="schedule_custom">
                        {html}
                     </div>
                  </>
               );
            }} />
         <div>
            <span value={value}>{value.toString().substring(0, 10) == today ? '오늘의' : intoKorean(value.toString().substring(4, 10))} 일정</span>
            <span className={window.sessionStorage.getItem('role') === 't' ? 'hoverHand' : 'invisible'} onClick={() => { setAdd(!add) }}>일정 추가</span>
         </div>
         <div>
            {list.map(item => <p key={item.sche_num}>▪ [{item.sche_type}] {item.sche_content}<button className={window.sessionStorage.getItem('role') === 't' ? 'hoverHand' : 'invisible'} onClick={onDelete} sche_num={item.sche_num} id='deleteBtn'>삭제하기</button></p>)}
            {add && <div>
               <select onChange={onTypeChange}>
                  <option>오전</option>
                  <option>오후</option>
                  <option>종일</option>
               </select>
               <input onChange={onContentChange} value={content} type='text'></input>
               <button onClick={save}>저장</button>
            </div>}

         </div>
      </div>
   )
}

export default C_schedule