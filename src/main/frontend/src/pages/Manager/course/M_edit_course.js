import React, { useEffect, useState } from 'react'
import "../../../css/M_main.css"
import "../../../css/filter.css"
import axios from "axios"
import M_course_list from "./M_course_list"
import uuid from "react-uuid"

const M_edit_course = (props) => {

    const [course, setCourse] = useState([])

    useEffect(() => {
        axios
            .get("/course/select_all_course")
            .then(function (res) {
                setCourse(res.data)
                console.log(res.data)
                setNewCourse(res.data)
            })
            .catch(function (error) {
                console.log("error")
            })
    }, [])
    //필터기능
    const onFilter = (f_course_campus, f_course_teacher, f_course_name, f_course_subject) => {
        console.log("필터내용", filter)
        //newCourse리스트를 course에서 필터링 내용이 포함된 리스트로 구성
        setNewCourse(course.filter(course =>
            course.course_campus.includes(f_course_campus) &&
            course.course_teacher.includes(f_course_teacher) &&
            course.course_name.includes(f_course_name) &&
            course.course_subject.includes(f_course_subject)))
    }
    //필터input 태그 함수
    const onChange = e => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        })
    }

    //필터관련 변수
    const [filter, setFilter] = useState({
        f_course_campus: '',
        f_course_teacher: '',
        f_course_name: '',
        f_course_subject: '',
    })
    const { f_course_campus, f_course_teacher, f_course_name, f_course_subject } = filter

    const [newCourse, setNewCourse] = useState([{
        course_subject: '',
        course_name: '',
        course_campus: '',
        course_s_dt: '',
        course_e_dt: '',
        course_teacher: '',
        course_limit: '',
    }])

    const courseList =
        newCourse.map((item) => <M_course_list item={item} key={uuid()} />)

    return (
        <div className='container'>
            <p>전체 과정</p>
            <div className="filter_input_div">
                <div><input type='text' name='f_course_subject' placeholder='과정주제로 검색하기' onChange={onChange} /></div>
                <div><input type='text' name='f_course_name' placeholder='과정으로 검색하기' onChange={onChange} /></div>
                <div><input type='text' name='f_course_campus' placeholder='캠퍼스로 검색하기' onChange={onChange} /></div>
                <div><input type='text' name='f_course_teacher' placeholder='담임명으로 검색하기' onChange={onChange} /></div>
                <div><button onClick={() => onFilter(f_course_campus, f_course_teacher, f_course_name, f_course_subject)}>검색</button></div>
            </div>
            <div className='content'>

                <table style={{ minWidth: '80rem' }}>
                    <thead>
                        <tr>
                            <th>과정주제</th>
                            <th>과정명</th>
                            <th>캠퍼스</th>
                            <th>기간</th>
                            <th>담임명</th>
                            <th>총원</th>
                            <th>key</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseList}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default M_edit_course