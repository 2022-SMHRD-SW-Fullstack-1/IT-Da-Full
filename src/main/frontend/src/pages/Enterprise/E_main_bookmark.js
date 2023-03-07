import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import dateCompare from "../../utils/filter";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/E_main.css";
import axios from "axios";
import uuid from "react-uuid";
import { RiStarLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";
import E_main_detail from "./E_main_detail";

const E_main_bookmark = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  //필터링 한 후 데이터 list
  const [filterDate, setFilterData] = useState([]);
  //수강생 데이터(MAP으로 뿌릴) 초기화용
  const [simple_info, setSimple_info] = useState([
    {
      mb_id: "",
      name: "",
      gender: "",
      birthday: "",
      major: "",
      phone: "",
      email: "",
      addr: "",
      skills: "",
      wish_field: "",
      wish_salary: "",
      wish_area1: "",
      wish_area2: "",
      wish_area3: "",
      simple_comment: "",
      photo: "",
      project: "",
      project2: "",
      update_dt: "",
    },
  ]);
  const [member_info, setMember_info] = useState([{}]);
  //기업이 누구를 북마크했는지 정보
  const [bookmark_info, setBookmark_info] = useState([]);

  //수강생 디테일 페이지로 이동
  const go_to_userdetail = (e) => {
    navigate("/detail_user", {
      //버튼 클릭시 정보를 수강생 정보를 넘겨준다
      state: {
        mb_id: e.currentTarget.getAttribute("mb_id"),
        isBookmark: bookmark_info.includes(
          e.currentTarget.getAttribute("mb_id")
        ),
        onHandleBookmark: e.currentTarget.getAttribute(onHandleBookmark),
      },
    });
  };

  //찜하기 버튼
  const onHandleBookmark = (e) => {
    //북마크 여부 확인용
    console.log(e.currentTarget.getAttribute("mb_id"));
    if (bookmark_info.includes(e.currentTarget.getAttribute("mb_id"))) {
      // bookmark가 체크 되어있을때 => bookmark 삭제
      var mb_id = e.currentTarget.getAttribute("mb_id");
      setBookmark_info(bookmark_info.filter((e) => e !== mb_id));
      axios
        .post("/bookmark/delete_bookmark", {
          enter_id: window.sessionStorage.getItem("loginId"),
          mb_id: e.currentTarget.getAttribute("mb_id"),
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // bookmark가 체크 안되어있을때 => bookmark 추가
      setBookmark_info([
        ...bookmark_info,
        e.currentTarget.getAttribute("mb_id"),
      ]);
      axios
        .post("/bookmark/add_bookmark", {
          enter_id: window.sessionStorage.getItem("loginId"),
          mb_id: e.currentTarget.getAttribute("mb_id"),
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // 이력서 입력한 정보 /기업이 저장한 인재 북마크 데이터
  useEffect(() => {
    axios
      .get("/bookmark/select_bookmark", {
        params: { enter_id: window.sessionStorage.getItem("loginId") },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.resume);
        setSimple_info(res.data.resume);
        setFilterData(
          res.data.resume.filter((item) =>
            res.data.bookmark.includes(item.mb_id)
          )
        );

        setBookmark_info(res.data.bookmark);
        setMember_info(res.data.member);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //초기화면
  useEffect(() => {
    console.log(simple_info);
  }, [simple_info]);

  /**MAP으로 보여줄 필터 데이터 */

  let listMap = filterDate.map((item) => (
    <tr key={uuid()} className="E_main_info">
      {bookmark_info.includes(item.mb_id) ? (
        <>
          <td mb_id={item.mb_id}>
            {bookmark_info.includes(item.mb_id) ? (
              <RiStarFill />
            ) : (
              <RiStarLine />
            )}
          </td>
          <td mb_id={item.mb_id} onClick={go_to_userdetail}>
            {item.name}
          </td>

          <td mb_id={item.mb_id} onClick={go_to_userdetail}>
            {item.addr}
          </td>
          <td mb_id={item.mb_id} onClick={go_to_userdetail}>
            {item.birthday}
          </td>
          <td mb_id={item.mb_id} onClick={go_to_userdetail}>
            {item.skills}
          </td>
          <td mb_id={item.mb_id} onClick={go_to_userdetail}>
            {item.wish_field}
          </td>
          <td mb_id={item.mb_id} onClick={go_to_userdetail}>
            {item.wish_area1},{item.wish_area2},{item.wish_area3}
          </td>
          <td>{item.update_dt}</td>
        </>
      ) : (
        <td>"스크랩인재가 없습니다 "</td>
      )}
    </tr>
  ));

  return (
    <div className="E_main_page">
      <div className="big_div">
        <div className="in">스크랩 인재 리스트</div>

        <table className="t">
          <thead>
            <tr className="E_main_title">
              <th></th>
              <th>이름</th>
              <th>주소</th>
              <th>나이</th>
              <th>기술스택</th>
              <th>지원 분야</th>
              <th>희망지역</th>
              <th>업데이트 날짜</th>
            </tr>
          </thead>
          <tbody>{listMap}</tbody>
        </table>
      </div>
    </div>
  );
};
export default E_main_bookmark;
