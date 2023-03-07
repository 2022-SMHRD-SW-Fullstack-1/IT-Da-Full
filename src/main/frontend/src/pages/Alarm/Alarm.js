import React, { useState, useEffect } from 'react';
import axios from "axios"
import ToastContainer from 'react-bootstrap/ToastContainer';
import Alarm_list from './Alarm_list';

import '../../css/alarm.css'

function Alarm({ socket, connect }) {

  const [newAlarm, setNewAlarm] = useState([])

  const newAlarmList =
    newAlarm.map((item) => <Alarm_list newAlarm={newAlarm} setNewAlarm={setNewAlarm} item={item} key={item.alarm_num} />)

  // 소켓에서 오는 메세지를 받는 함수

  useEffect(()=>{
    axios
  .get("/alarm/selectNewAlarm",
    {
      params: {
        mb_id_to: window.sessionStorage.getItem("loginId")
      }
    })
  .then(function (res) {
    setNewAlarm(res.data)
  })
  .catch(function (error) {
    console.log("error")
  })
  }, [])

  if (socket) {
    socket.onmessage = function (msg) {
      let message = JSON.parse(msg.data)
      console.log("소켓" + socket);
      console.log("메시지 : " + message)
      let newNewAlarm = {
        alarm_num : message.alarm_num,
        mb_id_to: message.mb_id_to,
        mb_id_from: message.mb_id_from,
        alarm_content: message.alarm_content,
        alarm_check : message.alarm_check,
        alarm_dt : message.alarm_dt,
      }
        setNewAlarm(newAlarm.concat(newNewAlarm))
    }
  }

  return (
    <div className='alarmPosition'>
      <ToastContainer autoclose={3000} style={{ margin: '1rem' }}>
        {newAlarmList}
      </ToastContainer>
    </div>
  );
}

export default Alarm