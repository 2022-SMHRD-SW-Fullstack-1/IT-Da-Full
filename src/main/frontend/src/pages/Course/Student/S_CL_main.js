import axios from "axios";
import React, { useRef } from "react";
import "../../../css/Resume.css";
import ReactQuill from 'react-quill';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const S_CL_main = () => {
  const [coverLetter, SetCoverLetter] = useState({
    growth: "",
    pros_cons: "",
    goal_and_crisis: "",
    motivation: "",
  });
  const [growth, setGrowth] = useState('')
  const [pros_cons, setPros_cons] = useState('')
  const [goal_and_crisis, setGoal_and_crisis] = useState('')
  const [motivation, setMotivation] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target;
    SetCoverLetter({
      ...coverLetter,
      [name]: value,
    });
    console.log(coverLetter);
  };

  const btnResume = () => {
    console.log("click");

    console.log(coverLetter);
    axios
      .post("/student/cover_letter/update", {
        growth: growth,
        pros_cons: pros_cons,
        goal_and_crisis: goal_and_crisis,
        motivation: motivation,
        id: sessionStorage.getItem("loginId"),
      })
      .then((res) => {
        console.log(res);
        alert('저장되었습니다.')
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    axios
      .get("/student/cover_letter/one", {
        params: { id: sessionStorage.getItem("loginId") },
      })
      .then((res) => {
        console.log(res.data);
        setGrowth(res.data.growth);
        setPros_cons(res.data.pros_cons);
        setGoal_and_crisis(res.data.goal_and_crisis);
        setMotivation(res.data.motivation);
      })
      .catch((e) => console.error(e));
  }, []);


  const navigate = useNavigate()
  const goToCoverLetterFrame = () => {
    navigate('/cover_letter/frame',
      { state: { growth:growth, pros_cons:pros_cons, goal_and_crisis:goal_and_crisis, motivation:motivation } })
  }

  const goToFrame = useRef()
  const moveConfirm = () => {
    if (window.confirm("페이지를 이동하시겠습니까? 변경사항이 저장되지 않을 수 있습니다")) {
      goToFrame.current.click()
    } else {
    }

  }

  return (
    <div className="topDiv_resume">
      <div style={{ height: '16rem' }}>
        <p>성장배경</p>
        <ReactQuill theme="snow"
          className="cLInput"
          name="growth"
          value={growth}
          onChange={setGrowth} />
      </div>
      <div style={{ height: '16rem' }}>
        <p>성격의 장단점</p>
        <ReactQuill theme="snow"
          className="cLInput"
          name="pros_cons"
          onChange={setPros_cons}
          value={pros_cons}
        />
      </div>
      <div style={{ height: '16rem' }}>
        <p className="sCLTitle">위기극복 및 목표달성</p>
        <ReactQuill theme="snow"
          className="cLInput"
          name="goal_and_crisis"
          onChange={setGoal_and_crisis}
          value={goal_and_crisis}
        />
      </div>
      <div style={{ height: '16rem' }}>
        <p>지원 동기 및 입사 후 포부</p>
        <ReactQuill theme="snow"
          className="cLInput"
          name="motivation"
          onChange={setMotivation}
          value={motivation}
        />
      </div>
      <div className="saveDiv">
        <span>
          <button className="blueBtn" onClick={btnResume}>
            저장하기
          </button>
        </span>
        <span><button className="blueBtn" onClick={moveConfirm}>출력페이지</button></span>
        <span><button style={{ display: "none" }} onClick={goToCoverLetterFrame} ref={goToFrame}></button></span>
      </div>
    </div>
  );
};
export default S_CL_main;
