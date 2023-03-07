import React, { useState, useEffect, } from 'react'
import axios from "axios"

const C_extend_list = (props) => {

  const [extend_name, setExtend_name] = useState("")
  const [extend_time, setExtend_time] = useState("")
  const [extend_num, setExtend_num] = useState("")
  
  const onExtend_time = e => {
    setExtend_time(e.target.value)
  }
  
  const [edit_style_po, setEdit_style_po] = useState({ display: "" })
  const [edit_style_op, setEdit_style_op] = useState({ display: "none" })
  

  // 수정
  const edit_extend_submit = (e) => {
    e.preventDefault();
    axios
      .post("/student/edit_extend", {
        extend_time: extend_time,
        extend_num: props.item.extend_num
      }).then(function (res) {
        window.location.reload()
      }).catch(function (err) {
        console.log("실패")
      })
  }

  // 제거
  const delete_extend_submit = (e) => {
    e.preventDefault();
    axios
      .post("/student/delete_extend", {
        extend_num: props.item.extend_num
      }).then(function (res) {
        window.location.reload();
      }).catch(function (err) {
        console.log("실패")
      })
  }
  // 수정 클릭 시
  const edit_e_button = () => {
    setEdit_style_po({ display: "none" })
    setEdit_style_op({ display: "" })
  }

  const edit_e_button_quit = () => {
    setEdit_style_po({ display: "" })
    setEdit_style_op({ display: "none" })
  }

  return (
    <tr >
      <td>{props.item.extend_name}</td>

      <td style={edit_style_po}>{props.item.extend_time}</td>
      <td style={edit_style_op} className=''><input type='text' value={extend_time} onChange={onExtend_time} placeholder={props.item.extend_time}></input></td>

      <td style={edit_style_po}>{window.sessionStorage.getItem("loginId") === props.item.mb_id && <button onClick={edit_e_button}>수정하기</button>}{window.sessionStorage.getItem("loginId") === props.item.mb_id && <button onClick={delete_extend_submit}>삭제하기</button>}</td>
      <td className='' style={edit_style_op}><div className=''><button onClick={edit_extend_submit}>수정완료</button><button onClick={edit_e_button_quit}>수정취소</button></div></td>
    </tr>
  )
}

export default C_extend_list