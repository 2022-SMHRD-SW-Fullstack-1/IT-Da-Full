import "../../css/M_full.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import M_course_list from "./M_course_list";

const M_edit_course = () => {
  const [course_list, setCourse_list] = useState([]);

  useEffect(() => {
    axios
      .get("/course/select_all_course")
      .then(function (res) {
        setCourse_list(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log("error");
      });
  }, []);

  return (
    <div className="container">
      <table className="M_full_main_table">
        <tbody>
          <tr className="M_full_title">
            <th>구분</th>
            <th>사업명</th>
            <th>과정명</th>
            <th>캠퍼스</th>
            <th>담당 연구원</th>
            <th>개설 년도</th>
            <th>훈련 기간</th>
            <th>총원</th>
            <th>취업 현황</th>
            <th>취업률</th>
            <th>관리 마감일</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default M_edit_course;
