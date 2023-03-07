import React, { useState, useEffect, } from 'react'
import axios from "axios"

const M_course_list = (props) => {

    const [course, setCourse] = useState({
        course_subject: props.item.course_subject,
        course_name: props.item.course_name,
        course_campus: props.item.course_campus,
        course_s_dt: props.item.course_s_dt,
        course_e_dt: props.item.course_e_dt,
        course_limit: props.item.course_limit,
    })

    const [edit_style_po, setEdit_style_po] = useState({ display: "" })
    const [edit_style_op, setEdit_style_op] = useState({ display: "none" })

    const onChange = (e) => {
        const { name, value } = e.target
        setCourse({
          ...course,
          [name]: value
        })
      }

    // 과정수정
    const edit_course_submit = (e) => {
        e.preventDefault();
        axios
            .post("/course/edit_course", {
                course_subject: course.course_subject,
                course_name: course.course_name,
                course_campus: course.course_campus,
                course_s_dt: course.course_s_dt,
                course_e_dt: course.course_e_dt,
                course_limit: course.course_limit,
                course_key: props.item.course_key
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
        <tr>
            <td style={edit_style_po} className='course_subject'>{props.item.course_subject} </td>
            <td style={edit_style_op} className='course_subject'><input type='text' value={course.course_subject} onChange={onChange} name="course_subject"></input></td>

            <td style={edit_style_po} className='course_name'>{props.item.course_name}</td>
            <td style={edit_style_op} className='course_name'><input type='text' value={course.course_name} onChange={onChange}name="course_name" ></input></td>

            <td style={edit_style_po} className='course_campus'>{props.item.course_campus}</td>
            <td style={edit_style_op} className='course_campus'><input type='text' value={course.course_campus} onChange={onChange} name="course_campus" ></input></td>

            <td style={edit_style_po} className='course_period'>{props.item.course_s_dt.substring(0,4)}-{props.item.course_s_dt.substring(4,6)}-{props.item.course_s_dt.substring(6,8)}~<br/>
            {props.item.course_e_dt.substring(0,4)}-{props.item.course_e_dt.substring(4,6)}-{props.item.course_e_dt.substring(6,8)}</td>

            <td style={edit_style_op} className='course_period_edit'><input type='text' value={course.course_s_dt} onChange={onChange} name="course_s_dt"></input>~<br/>
            <input type='text' value={course.course_e_dt} onChange={onChange} name="course_e_dt" ></input></td>

            <td className='course_teacher'>{props.item.course_teacher}</td>

            <td style={edit_style_po} className='course_limit'>{props.item.course_limit}</td>
            <td style={edit_style_op} className='course_limit'><input type='text' value={course.course_limit} onChange={onChange} name="course_limit" ></input></td>

            <td className='course_key'>{props.item.course_key}</td>
            <td className='course_button' style={edit_style_po}><div className='content annViewButton'><button onClick={edit_e_button}>수정</button></div></td>
            <td className='course_button' style={edit_style_op}><div className='content annViewButton'><button onClick={edit_course_submit}>완료</button><button onClick={edit_e_button_quit}>X</button></div></td>

        </tr>
    )
}

export default M_course_list