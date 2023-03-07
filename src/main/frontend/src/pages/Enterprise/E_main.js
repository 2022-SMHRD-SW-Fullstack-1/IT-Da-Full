import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import dateCompare from "../../utils/filter";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/E_main.css";
import axios from "axios";
import uuid from "react-uuid";
import { RiStarLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";
import E_main_detail from "./E_main_detail";
import ageCaculate from "../../utils/ageCaculate";
import location from "../../asset/list/Area"
const E_main = () => {
  //필터 데이터
  const month = ["전체", "1주일전", "1개월전", "3개월전", "6개월전"];
  
  const skill_stack = [
    "전체",
    "java",
    "html",
    "css",
    "react",
    "Linux",
    "android",
    "IOS",
    "swift",
  ];
  const wanted_job = [
    "전체",
    "백엔드 개발자",
    "프론트엔드 개발자",
    "안드로이드 개발자",
    "ios 개발자",
  ];

  const navigate = useNavigate();
  const [update_month, setUpdate_month] = useState("전체");
  const [hope_location, setHope_location] = useState("전체");
  const [skill, setSkill] = useState("전체");
  const [hope_job, setHope_job] = useState("전체");
  const [certificate_info, setCertificate_info] = useState("");
  const [wishfield_info,setWishfield_info]=useState("");
  const [skill_info,setskill_info]=useState("");

  const onCertiChange = (e) => {
    setCertificate_info(e.target.value);
  };
  const onWishfieldChange=(e)=>{
    setWishfield_info(e.target.value);
  }
  const onskillChange=(e)=>{
    setskill_info(e.target.value);
  }

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
  const [certification_info, setCertification_info] = useState([]);

  //수강생 디테일 페이지로 이동
  const go_to_userdetail = (e) => {
    navigate("/detail_user", {
      //버튼 클릭시 정보를 수강생 정보를 넘겨준다
      state: {
        mb_id: e.currentTarget.getAttribute("mb_id"),
        name: e.currentTarget.getAttribute("name"),
        portfolio_title:e.currentTarget.getAttribute("portfolio_title"),
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
        })
        .catch(function (error) {
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
        })
        .catch(function (error) {
        });
    }
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

  //희망 직무 필터
  const hope_job_filter = (e) => {
    const { value } = e.target;
    setHope_job(value);
  };

  const certificate_filter = (e) => {
    const { value } = e.target;
  };
  
console.log("1212",simple_info.wish_field);
  //상세보기 필터 적용 버튼
  const button_filterclick = () => {

    console.log("데이터",simple_info)
    
    setFilterData(
      simple_info.filter(
        (item) =>
          (hope_location == "전체" ||
            item.wish_area1 == hope_location ||
            item.wish_area2 == hope_location ||
            item.wish_area3 == hope_location) &&
          // (skill == "전체" ||
          //   (item.skills != null && item.skills.includes(skill))) &&
          // (hope_job == "전체" || item.wish_field!=null&& item.wish_field.includes(hope_job)) &&
          dateCompare(update_month, item.update_dt) &&
          (certification_info
            .filter((i) =>i.cert_name!=null && i.cert_name.includes(certificate_info))
            .findIndex((e) => e.mb_id === item.mb_id) !== -1)
            &&
            (simple_info
            .filter((i) =>i.wish_field!=null && i.wish_field.includes(wishfield_info))
            .findIndex((e) => e.mb_id === item.mb_id) !== -1)
            &&
            (simple_info)
            .filter((i)=>i.skills!=null && i.skills.toLowerCase().includes(skill_info))
            .findIndex((e) => e.mb_id === item.mb_id) !== -1)
      )
      
    ;
    console.log(skill);
    console.log(typeof (new Date() - new Date("2022-01-20")));
    console.log("인포",certificate_info);
    // console.log("데이터12",
    //   wishfield_info
    //     .filter((i) => i.cert_name.includes(simple_info.wish_field))
    //     .findIndex((e) => e.mb_id === "jingu@naver.com") !== -1
    // );
  };

  // 이력서 입력한 정보 /기업이 저장한 인재 북마크 데이터
  useEffect(() => {
    axios
      .get("/bookmark/select_bookmark", {
        params: { enter_id: window.sessionStorage.getItem("loginId"),},
      })
      .then((res) => {
        // console.log("데이터",res.data)
        setCertification_info(res.data.certification);
        setSimple_info(res.data.resume);
        setFilterData(res.data.resume);
        setBookmark_info(res.data.bookmark);
        setMember_info(res.data.member);
        setSimple_info({
          ...simple_info,
          update_dt:res.data.member.mb_update
      })
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let id = "";

  /**MAP으로 보여줄 필터 데이터 */
  let listMap = filterDate.map(
    (item) => (
      (id = item.mb_id),
      (
        <tr key={uuid()} className="E_main_info">
          <td mb_id={item.mb_id} onClick={onHandleBookmark}>
            {bookmark_info.includes(item.mb_id) ? (
              <RiStarFill />
            ) : (
              <RiStarLine />
            )}
          </td>
          <td mb_id={item.mb_id} name={item.name} onClick={go_to_userdetail}>
            {item.name}
          </td>
          <td mb_id={item.mb_id} name={item.name} onClick={go_to_userdetail}>
            {ageCaculate(item.birthday.substring(0, 4))}세
          </td>
          <td mb_id={item.mb_id} name={item.name} onClick={go_to_userdetail}>
            {certification_info
              .filter((e) => e.mb_id == id)
              .map((i) => i.cert_name + "  ")}
          </td>
          <td mb_id={item.mb_id} name={item.name} onClick={go_to_userdetail}>
            {item.skills&&item.skills.slice(0,-1)}
          </td>
          <td mb_id={item.mb_id} name={item.name} onClick={go_to_userdetail}>
            {item.wish_field!='전체'&&item.wish_field.slice(0,-1)||'전체'}
          </td>
          <td mb_id={item.mb_id} name={item.name} onClick={go_to_userdetail}>
            {item.wish_area1},{item.wish_area2},{item.wish_area3}
          </td>
          <td>{item.update_dt.substring(0, 10)}</td>
        </tr>
      )
    )
  );

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
                            <option key={item}>{item}</option>
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
                      <input
                          value={skill_info}
                          onChange={onskillChange}
                        ></input>
                        
                        {/* <select onChange={skill_filter}>
                          {skill_stack.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select> */}
                      </div>
                    </div>
                    <div className="E_main_input_detail_three_div">
                      <div>자격증</div>
                      <div>
                        <input
                          value={certificate_info}
                          onChange={onCertiChange}
                        ></input>
                      </div>
                    </div>
                    <div className="E_main_input_detail_three_div">
                      <div>희망 직무</div>
                      <div>
                        {/* <select onChange={hope_job_filter}>
                          {wanted_job.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select> */}
                        <input
                          value={wishfield_info}
                          onChange={onWishfieldChange}

                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filter">
                  <div onClick={button_filterclick} id="btn_filter" className="test filterBtn">
                    적용
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <table className="t">
          <thead>
            <tr className="E_main_title">
              <th></th>
              <th>이름</th>
              <th>나이</th>
              <th>자격증</th>
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
export default E_main;
