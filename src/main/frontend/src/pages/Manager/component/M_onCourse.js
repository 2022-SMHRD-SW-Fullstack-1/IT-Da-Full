import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import "../../../css/M_main.css"

const M_onCourse = () => {

  const navigate = useNavigate()

  const [course, setCourse] = useState([])

  const goToMake = () => {
    navigate('/make_course')
  }
  const goToCourseList = () => {
    navigate('/edit_course')
  }

  useEffect(() => {
    axios
      .get("/course/select_all_course")
      .then(function (res) {
        setCourse(res.data)
      })
      .catch(function (error) {
        console.log("error")
      })
  }, [])


  return (
    <div className='topDiv' style={{width: '40rem', maxWidth: 'none', minHeight: '26rem'}}>
      <div className='annHead'>
        <p>진행중인 과정</p>
        <div>
          <p className='hoverHand' onClick={goToMake}>과정추가</p>
          <p className='hoverHand' onClick={goToCourseList}>전체과정</p>
        </div>
      </div>
      <div className='annBody_manager'>
        <table className='attTable_manager'>
          <thead>
            <tr>
              <td className='annItem_manager'>과정명</td>
              <td className='annItem_manager'>담임명</td>
              <td className='annItem_manager'>과정키</td>
            </tr>
          </thead>
          <tbody className=''>
            <tr>
              <td className='annItem_manager'>
              {course.map((item) => (<p course_name={item.course_name} key={item.course_key}>{item.course_name}</p>))}
              </td>
              <td className='annItem_manager'>
              {course.map((item) => (<p course_teacher={item.course_teacher} key={item.course_key}>{item.course_teacher}</p>))}
              </td>
              <td className='annItem_manager'>
              {course.map((item) => (<p course_key={item.course_key} key={item.course_key}>{item.course_key}</p>))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default M_onCourse