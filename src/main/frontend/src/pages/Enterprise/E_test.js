import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import dateCompare from "../../utils/filter";

import "bootstrap/dist/css/bootstrap.css";
import "../../css/E_main.css";
import axios from "axios";

const E_test = () => {
  //증명사진 맵
  const photoList = [
    {
      pl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGVefgpaMA8Z2xnaQWPA4eoUKB9Swx4EzlTg&usqp=CAU",
    },
    {
      pl: "https://blog.kakaocdn.net/dn/IOYEi/btq1JzPmm2w/Jn7TB4RqutJNkyeAS8K0U1/img.jpg",
    },
    {
      pl: "https://img.hankyung.com/photo/202109/BF.27474984.1.jpg",
    },
    {
      pl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1cGeRfYemAJ__8LPwfOUCDbAha5EUQ_Ff2Q&usqp=CAU",
    },
  ];

  //맵으로 뿌려줄 임의 데이터
  const tempList = [
    {
      photo:
        "https://news.nateimg.co.kr/orgImg/my/2022/03/30/202203301657532027_1.jpg",
      name: "차은우",
      hopeLoc: ["서울", "경기"],
      skillStack: ["자바", "코틀린", "안드로이드", "스프링"],
      cmt: "분골쇄신의 정신으로 열심히 하겠습니다어쩌구저쩌구분골쇄신의 정신으로 열심히 하겠습니다어쩌구저쩌구",
      project: [
        "취업연계를 위한 이력 정보 관리 서비스",
        "웹소켓을 활용한 초단기 알바 구인구직 플랫폼",
      ],
      updateDT: "2023-01-17",
      gender: "남자",
      age: "27세",
    },
    {
      photo:
        "https://blog.kakaocdn.net/dn/IOYEi/btq1JzPmm2w/Jn7TB4RqutJNkyeAS8K0U1/img.jpg",
      name: "아무개",
      hopeLoc: ["제주"],
      skillStack: ["자바", "코틀린", "안드로이드", "스프링"],
      cmt: "분골쇄신의 정신으로 열심히 하겠습니다어쩌구저쩌구분골쇄신의 정신으로 열심히 하겠습니다어쩌구저쩌구",
      project: [
        "취업연계를 위한 이력 정보 관리 서비스",
        "웹소켓을 활용한 초단기 알바 구인구직 플랫폼",
      ],
      updateDT: "2022-11-22",
      gender: "여자",
      age: "25세",
    },
  ];

  //필터 데이터
  const month = ["전체", , "1주일전", "1개월전", "3개월전", "6개월전"];
  const location = [
    "전체",
    "서울",
    "부산",
    "대구",
    "광주",
    "세종특별자치",
    "경기",
    "강원",
    "전남",
    "전북",
    "제주",
  ];
  const skill_stack = [
    "전체",
    "java",
    "html",
    "css",
    "react",
    "Linux",
    "android",
    "IOS",
  ];

  const navigate = useNavigate();

  const [update_month, setUpdate_month] = useState("전체");
  const [hope_location, setHope_location] = useState("전체");
  const [skill, setSkill] = useState("전체");
  const [info, setInfo] = useState();

  //수강생 디테일 페이지로 이동
  const go_to_userdetail = (e) => {
    navigate("/detail_user", {
      //버튼 클릭시 정보를 수강생 정보를 넘겨준다
      state: {
        mb_id: e.currentTarget.getAttribute("mb_id"),
        photo: e.currentTarget.getAttribute("photo"),
        name: e.currentTarget.getAttribute("name"),
        phone: e.currentTarget.getAttribute("phone"),
        gender: e.currentTarget.getAttribute("gender"),
        birthday: e.currentTarget.getAttribute("birthday"),
        email: e.currentTarget.getAttribute("email"),
        addr: e.currentTarget.getAttribute("addr"),
        wish_area1: e.currentTarget.getAttribute("wish_area1"),
        wish_area2: e.currentTarget.getAttribute("wish_area2"),
        wish_area3: e.currentTarget.getAttribute("wish_area3"),
      },
    });
    console.log();
  };

  //업데이트 날짜 필터
  const month_change = (e) => {
    const { value } = e.target;
    setUpdate_month(value);
  };

  //희망 지역 날짜 필터
  const hope_change = (e) => {
    const { value } = e.target;
    setHope_location(value);
  };

  //기술 스택 필터
  const skill_filter = (e) => {
    const { value } = e.target;
    setSkill(value);
  };

  //상세보기 필터 적용 버튼
  const button_filterclick = () => {
    setFilterData(
      simple_info.filter(
        (item) =>
          (hope_location == "전체" ||
            item.wish_area1 == hope_location ||
            item.wish_area2 == hope_location ||
            item.wish_area3 == hope_location) &&
          (skill == "전체" || item.skills.includes(skill))
        // dateCompare(update_month, item.updateDT)
      )
    );
    console.log(skill);

    console.log(typeof (new Date() - new Date("2022-01-20")));
  };

  //필터링 한 후 데이터 list
  const [filterDate, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(simple_info);
  }, []);

  //데이터 초기화
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
    },
  ]);

  // 백에서 가져온 데이터
  useEffect(() => {
    axios
      .get("/student/resume/all")
      .then((res) => {
        setSimple_info(res.data);
        // console.log("전체", res.data);
        // console.log(res.data[0].name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function detail_student() {
    axios
      .get("/student/resume/one", {
        params: { id: sessionStorage.current.value },
      })
      .then((res) => {
        console.log(res.data);
        // setResume(res.data[0]);
        // setGraduation(res.data[1]);
        console.log(res.data[1]);
        // setCareer(res.data[2]);
        console.log(res.data[2]);
        // setCertification(res.data[3]);
        console.log(res.data[3]);
        // setPrize(res.data[4]);
        console.log(res.data[4]);
        // setMilitary(res.data[5]);
        console.log(res.data[5]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //초기화면
  useEffect(() => {
    setFilterData(simple_info);
  }, [simple_info]);

  // let listMap = filterDate.map((item) => (
  //   <div className="two_div" onClick={go_to_userdetail}>
  //     <div className="e_main_photo" key={item.photo}>
  //       <img src={item.photo} />
  //     </div>
  //     <div className="e_main_resume">
  //       <div className="e_main_resume_info">
  //         이름 : {item.name}{" "}
  //         <div>
  //           {item.gender}/{item.age}
  //         </div>
  //       </div>
  //       <div className="e_main_resume_info" key={item.hopeLoc.toString()}>
  //         희망지역 : {item.hopeLoc.toString()}
  //       </div>
  //       <div className="e_main_resume_info" key={item.skillStack.toString()}>
  //         보유 기술스택 : {item.skillStack.toString()}
  //       </div>
  //     </div>
  //     <div className="e_main_comment">
  //       <div className="e_main_comment_info">
  //         한줄소개
  //         <div key={item.cmt}>{item.cmt}</div>
  //       </div>

  //       <div className="e_main_comment_project">
  //         <div>
  //           대표 프로젝트
  //           {item.project.map((item) => (
  //             <div key={item}>{item}</div>
  //           ))}
  //         </div>
  //       </div>
  //       <div className="e_main_update">업데이트 날짜 2023-01-17</div>
  //     </div>
  //   </div>
  // ));

  let listMap = filterDate.map((item) => (
    <div
      className="two_div"
      mb_id={item.mb_id}
      name={item.name}
      photo={item.photo}
      email={item.email}
      phone={item.phone}
      addr={item.addr}
      gender={item.gender}
      birthday={item.birthday}
      wish_area1={item.wish_area1}
      wish_area2={item.wish_area2}
      wish_area3={item.wish_area3}
      onClick={go_to_userdetail}
    >
      <div className="e_main_photo">
        {/* {photoList.map((item) => (
          <img src={item.pl} />
        ))} */}
        <img className="id_photo" src={item.photo}></img>
      </div>
      <div className="e_main_resume">
        <div className="e_main_resume_info">
          이름 : {item.name}{" "}
          <div>
            {item.gender}/{item.birthday}
          </div>
        </div>
        <div className="e_main_resume_info">
          희망지역 : {item.wish_area1}, {item.wish_area2}, {item.wish_area3}
        </div>
        <div className="e_main_resume_info">기술스택 : {item.skills}</div>
      </div>
      <div className="e_main_comment">
        <div className="e_main_comment_info">
          한줄소개
          <div>{item.simple_comment}</div>
        </div>

        <div className="e_main_comment_project">
          <div>
            대표 프로젝트
            {/* {item.project.map((item) => (
              <div key={item}>{item}</div>
            ))} */}
            <div>{item.project}</div>
            <div>{item.project2}</div>
          </div>
        </div>
        <div className="e_main_update">업데이트 날짜 2022-12-01</div>
      </div>
    </div>
  ));

  return (
    <div className="E_main_page">
      <div className="big_div">
        <div className="in">수료생 프로필</div>
        <div className="E_main_detail">
          <Accordion defaultActiveKey="1" className="a">
            <Accordion.Item eventKey="1">
              <Accordion.Header>상세검색</Accordion.Header>
              <Accordion.Body className="E_main_input_detail">
                <div className="E_main_input_detail_first_div">
                  <div className="detail_inner_info">
                    <div>
                      업데이트 날짜
                      <div>
                        <select onChange={month_change}>
                          {month.map((item) => (
                            <option>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="E_main_input_detail_two_div">
                      <div>희망지역</div>
                      <div>
                        <select onChange={hope_change}>
                          {location.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="E_main_input_detail_three_div">
                      <div>기술스택</div>
                      <div>
                        <select onChange={skill_filter}>
                          {skill_stack.map((item) => (
                            <option>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filter">
                  <div
                    onClick={button_filterclick}
                    id="btn_filter"
                    className="test"
                  >
                    적용
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        {listMap}
      </div>
    </div>
  );
};
export default E_test;
