import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const M_make_teacher = () => {

    const { state } = useLocation();
    console.log(state)

    const [course_key, setCourse_key] = useState("")

    // 전 페이지 정보로 과정 불러오기
    useEffect(() => {
        course_key === "" && axios
            .post("/course/select_course", {
                course_teacher: state.course_teacher,
                course_s_dt: state.course_s_dt,
            })
            .then(function (res) {
                console.log(res.data)
                setCourse_key(res.data)
            })
            .catch(function (err) {
                console.log("error")
            })
    }, [])


    // 담임생성 버튼
    const makeTeacher = e => {
        e.preventDefault();
        axios
            .post("/course/make_teacher", {
                course_teacher: state.course_teacher,
                course_s_dt: state.course_s_dt,
                course_key: course_key,
            })
            .then(function (res) {
                alert("담임생성 완료")
                window.location.replace("/");
            })
            .catch(function (err) {
                console.log("error")
            })
    }

    return (
        <div className='registerContainer M_make_course_container'>
            <div>
                <p>담임 연구원 계정 생성</p>
                <div className=''>
                    <p style={{margin: '0.8rem 0'}}>담임명 : {state.course_teacher}</p>
                    <p>과정키 : {course_key}</p>
                </div>
                <button onClick={makeTeacher}>계정 생성하기</button>
            </div>
        </div>
    )
}

export default M_make_teacher