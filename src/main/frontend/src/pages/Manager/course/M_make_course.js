import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const M_make_course = () => {

  const navigate = useNavigate();

  const [course_subject, setCourse_subject] = useState('');
  const [course_name, setCourse_name] = useState('');
  const [course_campus, setCourse_campus] = useState('');
  const [course_s_dt, setCourse_s_dt] = useState('');
  const [course_e_dt, setCourse_e_dt] = useState('');
  const [course_teacher, setCourse_teacher] = useState('');
  const [course_limit, setCourse_limit] = useState('');

  const onCourse_subject = (e) => {
    setCourse_subject(e.target.value);
  };
  const onCourse_name = (e) => {
    setCourse_name(e.target.value);
  };
  const onCourse_campus = (e) => {
    setCourse_campus(e.target.value);
  };
  const onCourse_s_dt = (e) => {
    setCourse_s_dt(e.target.value);
  };
  const onCourse_e_dt = (e) => {
    setCourse_e_dt(e.target.value);
  };
  const onCourse_teacher = (e) => {
    setCourse_teacher(e.target.value);
  };
  const onCourse_limit = (e) => {
    setCourse_limit(e.target.value);
  };
  // 과정 생성하기
  const make_course_submit = (e) => {
    e.preventDefault();
    axios
      .post('/course/make_course', {
        course_subject: course_subject,
        course_name: course_name,
        course_campus: course_campus,
        course_s_dt: course_s_dt,
        course_e_dt: course_e_dt,
        course_teacher: course_teacher,
        course_limit: course_limit,
      })
      .then(function (res) {
        alert('과정생성 완료');
        navigate('/make_teacher', {
          state: { course_teacher: course_teacher, course_s_dt: course_s_dt },
        });
      })
      .catch(function (err) {
        console.log('error');
      });
  };

  return (
    <div className="registerContainer M_make_course_container ">
      <div>
        <p className="classMake">과정 생성</p>
        <div>
          <span>과정 주제</span>
          <input
            placeholder="입력해주세요."
            type="text"
            value={course_subject}
            onChange={onCourse_subject}
          />
        </div>
        <div>
          <span>과정 명</span>
          <input
            placeholder="입력해주세요."
            type="text"
            value={course_name}
            onChange={onCourse_name}
          />
        </div>
        <div>
          <span>캠퍼스</span>
          <input
            placeholder="입력해주세요."
            type="text"
            value={course_campus}
            onChange={onCourse_campus}
          />
        </div>
        <div>
          <span>과정 시작 날짜</span>
          <input
            placeholder="입력해주세요."
            type="text"
            value={course_s_dt}
            onChange={onCourse_s_dt}
          />
        </div>
        <div>
          <span>과정 종료 날짜</span>
          <input
            placeholder="입력해주세요."
            type="text"
            value={course_e_dt}
            onChange={onCourse_e_dt}
          />
        </div>
        <div>
          <span>담임명</span>
          <input
            placeholder="입력해주세요."
            type="text"
            value={course_teacher}
            onChange={onCourse_teacher}
          />
        </div>
        <div>
          <span>총원</span>
          <input
            placeholder="입력해주세요."
            type="text"
            value={course_limit}
            onChange={onCourse_limit}
          />
        </div>
        <button className="M_make_course_button" onClick={make_course_submit}>
          과정 생성하기
        </button>
      </div>
    </div>
  );
};
export default M_make_course;
