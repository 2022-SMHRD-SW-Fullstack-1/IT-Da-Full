import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Calendar from 'react-calendar';
import moment from 'moment';
import intoKorean from '../../utils/dateCaculate'

import 'react-calendar/dist/Calendar.css';
import '../../css/Calendar.css';
import '../../css/MainComponent.css'

const Schedule = () => {

  const navigate = useNavigate()
  const goToSchedule = (e) => {
    navigate('/schedule')
  }

  // 오늘 날짜
  const today = new Date().toString().substring(0, 10)
  // 클릭한 날짜를 저장할 변수
  const [value, setValue] = useState(new Date());

  const tempList = ["지각하지 않기! (9시 전에 등원 후 수업준비하기)", "지각, 결석 특이사항 있을 경우 사전에 얘기해주기", "예습, 복습, 자체 스터디 등 공부시간 가지기!"]

  // 해당 코스의 모든 일정을 저장할 변수
  const [data, setData] = useState([])
  // 보여줄 일정 리스트를 저장할 변수
  const [list, setList] = useState([])

  useEffect(() => {
    //setMark(["2023-02-15", "2023-02-16", "2023-02-17"])
    axios
      .post('/announcement/getSchedule', {
        course_key: window.sessionStorage.getItem('course_key')
      })
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
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

  return (
    <div className='topDiv'>
      <Calendar onChange={setValue} value={value} calendarType="US" formatDay={(locale, date) => moment(date).format("DD")} showNeighboringMonth={false} />
      <div className='annHead' style={{ marginTop: '1.5rem' }}>
        <p value={value}>{value.toString().substring(0, 10) == today ? '오늘의' : intoKorean(value.toString().substring(4, 10))} 일정</p>
        <div>
          <p className='hoverHand' onClick={goToSchedule}>더보기</p>
        </div>
      </div>
      <div className='annBody' style={{ minHeight: '12.6rem' }}>
      {list.map(item => <p className='annItem' key={item.sche_num}>▪ [{item.sche_type}] {item.sche_content}</p>)}
      </div>
    </div>
  )
}

export default Schedule