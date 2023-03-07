import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from "axios"

const M_e_list = (props) => {

  const [enter, setEnter] = useState({
    enter_pw: props.item.enter_pw,
    enter_manager: props.item.enter_manager,
    enter_tel: props.item.enter_tel,
    enter_address: props.item.enter_address,
  })


  const onChange = (e) => {
    const { name, value } = e.target
    setEnter({
      ...enter,
      [name]: value
    })
  }

  const [edit_style_po, setEdit_style_po] = useState({ display: "" })
  const [edit_style_op, setEdit_style_op] = useState({ display: "none" })

  // 기업수정 제출
  const edit_e_submit = (e) => {
    e.preventDefault();
    axios
      .post("/enterprise/edit_enterprise", {
        enter_id: props.item.enter_id,
        enter_pw: enter.enter_pw,
        enter_manager: enter.enter_manager,
        enter_tel: enter.enter_tel,
        enter_address: enter.enter_address
      }).then(function (res) {
        alert("기업 수정완료")
        window.location.reload()
      }).catch(function (err) {
        console.log("실패")
      })
  }

  // 기업제거
  const delete_e_submit = e => {
    e.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {


      axios
        .post("/enterprise/delete_enterprise", {
          enter_num: props.item.enter_num
        }).then(function (res) {
          alert("기업키 제거완료")
          window.location.reload()
        }).catch(function (err) {
          console.log("실패")
        })
    } else {
      alert("삭제취소");
    }
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
    <tr>
      <td>{props.item.enter_name}</td>

      <td>{props.item.enter_id}</td>

      <td style={edit_style_po} className='e_name'>{props.item.enter_pw}</td>
      <td style={edit_style_op} className='e_name'><input type='text' value={enter.enter_pw} onChange={onChange} name="enter_pw"></input></td>

      <td style={edit_style_po} className='e_name'>{props.item.enter_manager}</td>
      <td style={edit_style_op} className='e_name'><input type='text' value={enter.enter_manager} onChange={onChange} name="enter_manager"></input></td>

      <td style={edit_style_po} className='e_name'>{props.item.enter_tel.substring(0, 3)}-{props.item.enter_tel.substring(3, 7)}-{props.item.enter_tel.substring(7, 11)}</td>
      <td style={edit_style_op} className='e_name'><input type='text' value={enter.enter_tel} onChange={onChange} name="enter_tel"></input></td>

      <td style={edit_style_po} className='e_name'>{props.item.enter_address}</td>
      <td style={edit_style_op} className='e_name'><input type='text' value={enter.enter_address} onChange={onChange} name="enter_address"></input></td>

      <td>{props.item.enter_num.substring(0, 3)}-{props.item.enter_num.substring(3, 5)}-{props.item.enter_num.substring(5, 10)}</td>

      <td style={edit_style_po}><div className='content annViewButton'><button onClick={edit_e_button}>수정</button><button onClick={delete_e_submit}>삭제</button></div></td>
      <td style={edit_style_op}><div className='content annViewButton'><button onClick={edit_e_submit}>완료</button><button onClick={edit_e_button_quit}>취소</button></div></td>
    </tr>
  )
}

export default M_e_list