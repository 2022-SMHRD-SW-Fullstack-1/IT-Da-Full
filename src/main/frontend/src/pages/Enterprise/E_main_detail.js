import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiStarLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";
import uuid from 'react-uuid'
import "../../css/E_main_detail.css";
import ageCaculate from "../../utils/ageCaculate";
import S_portfolio_detail from "../Course/Student/S_portfolio_detail";
import Major from "../../asset/list/Major";

const E_main_detail = ({ socket }) => {
  const { state } = useLocation();
  const majorList = Major;
  const [isBookmark, setIsBookmark] = useState(state.isBookmark);
  const [portfolio_info, setPortfolio_info] = useState([
    {
      portfolio_num: '',
      portfolio_title: '',
      portfolio_period: '',
      portfolio_etc: '',
      portfolio_img1: '',
      portfolio_img2: '',
      portfolio_img3: '',
      portfolio_content: '',
      portfolio_stack_front: '',
      portfolio_stack_back: '',
      portfolio_stack_db: '',
      portfolio_url: '',
      portfolio_file: ''
    }
  ]);
  //이력서 정보
  const [resume, setResume] = useState({
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
    project1: "1",
    project2: "2",
    update_dt: "",
  });
  //학력
  const [graduation, setGraduation] = useState([
    {
      grad_num: "",
      grad_school: "",
      school_type: "",
      grad_dt: "",
      grad_type: "",
      grad_score: "",
    },
  ]);

  //경력,교육
  const [career, setCareer] = useState([
    {
      cr_num: "",
      cr_organization: "",
      cr_position: "",
      cr_s_dt: "",
      cr_e_dt: "",
      activity: "",
    },
  ]);
  //자격증
  const [certification, setCertification] = useState([
    {
      cert_num: "",
      cert_org: "",
      cert_name: "",
      cert_dt: "",
    },
  ]);
  //수상내역
  const [prize, setPrize] = useState([
    {
      prize_num: "",
      prize_org: "",
      prize_name: "",
      prize_dt: "",
    },
  ]);
  //병역
  const [military, setMilitary] = useState([
    {
      mili_num: "",
      mili_title: "",
      mili_army: "",
      mili_s_dt: "",
      mili_e_dt: "",
      veteran_yn: "",
    },
  ]);
  const [skills, setSkill] = useState([{
    skill_num: '',
    skill_name:'',
    skill_grade:''
}])

  // 인적사항, 학력, 경력/교육, 자격증, 수상내역, 병역, 기술스택 정보 백에서 가져옴
  useEffect(() => {
    axios
      .get("/student/resume/one", {
        params: { id: state.mb_id },
      })
      .then((res) => {
        setResume(res.data[0]);
        setGraduation(res.data[1]);
        // console.log("뭐에요".res.data[1]);
        setCareer(res.data[2]);
        // console.log(res.data[2]);
        setCertification(res.data[3]);
        // console.log(res.data[3]);
        setPrize(res.data[4]);
        // console.log(res.data[4]);
        setMilitary(res.data[5]);
        setSkill(res.data[6])
        // console.log(res.data[5]);
        setCoverLetter(res.data[7]);
      })
      .then(() => {
        axios
          .get("/student/portfolio", {
            params: { id: state.mb_id },
          })
          .then((res) => {
            setPortfolio_info(res.data)
            console.log(res.data);
          })
      }
      )
      .catch((e) => console.error(e));
  }, []);

  const onHandleBookmark = (e) => {
    //북마크 여부 확인용

    if (isBookmark) {
      // bookmark가 체크 되어있을때 => bookmark 삭제
      setIsBookmark(false);
      axios
        .post("/bookmark/delete_bookmark", {
          enter_id: window.sessionStorage.getItem("loginId"),
          mb_id: state.mb_id,
        })
        .then((res) => {
        })
        .catch(function (error) {
        });
    } else {
      // bookmark가 체크 안되어있을때 => bookmark 추가
      setIsBookmark(true);
      axios
        .post("/bookmark/add_bookmark", {
          enter_id: window.sessionStorage.getItem("loginId"),
          mb_id: state.mb_id,
        })
        .then((res) => {

        })
        .catch(function (error) {
        });
    }
  };

  var now = new Date(); // 현재 날짜 및 시간
  var year = now.getFullYear(); // 연도
  var bdYear = 0;
  bdYear = resume.birthday.substring(0, 4);

  const navigate = useNavigate()

  // 담임 연구원 불러오기
  const [teacher, setTeacher] = useState('');
  useEffect(() => {
    axios
      .get("/alarm/selectTeacher", {
        params: {
          mb_id_to: state.mb_id,
        }
      })
      .then((res) => {
        setTeacher(res.data)
        console.log(res.data)
      })
      .catch(function (error) {
      })
  })

  // 이력서 컨택

  const goToResumeFrame = () => {
    //연결된 웹소켓서버에 정보를 전달
    console.log(teacher)
    if (socket) {
      socket.send(JSON.stringify({
        alarm_num: 0,
        mb_id_from: window.sessionStorage.getItem("loginId"),
        mb_id_to: state.mb_id,
        alarm_content: `${window.sessionStorage.getItem('userName')}님이 ${state.name}님의 이력서를 출력하셨습니다.`,
        alarm_check: 'N',
        alarm_dt: '방금 전'
      }))

      socket.send(JSON.stringify({
        alarm_num: 0,
        mb_id_from: window.sessionStorage.getItem("loginId"),
        mb_id_to: teacher,
        alarm_content: `${window.sessionStorage.getItem('userName')}님이 ${state.name}님의 이력서를 출력하셨습니다.`,
        alarm_check: 'N',
        alarm_dt: '방금 전'
      }))
    }

    axios
      .post("/alarm/addSAlarm", {
        mb_id_from: window.sessionStorage.getItem('loginId'),
        mb_id_to: state.mb_id,
        alarm_content: `${window.sessionStorage.getItem('userName')}님이 ${state.name}님의 이력서를 출력하셨습니다.`
      })
      .then((res) => {
      })
      .catch(function (error) {
      });

    axios
      .post("/alarm/addTAlarm", {
        mb_id_from: window.sessionStorage.getItem('loginId'),
        mb_id_to: state.mb_id,
        alarm_content: `${window.sessionStorage.getItem('userName')}님이 ${state.name}님의 이력서를 출력하셨습니다.`
      })
      .then((res) => {
      })
      .catch(function (error) {
      });
    navigate('/resume/frame',
      { state: { resume: resume, graduation: graduation, career: career, certification: certification, prize: prize, military: military, skills:skills } })
  }

  // 자기소개서 컨택

  const [coverLetter, setCoverLetter] = useState({
    growth: "",
    pros_cons: "",
    goal_and_crisis: "",
    motivation: "",
  })

  const goToCoverLetterFrame = () => {
    //연결된 웹소켓서버에 정보를 전달
    if (socket) {
      console.log("웹소켓보내기")
      socket.send(JSON.stringify({
        alarm_num: 0,
        mb_id_from: window.sessionStorage.getItem("loginId"),
        mb_id_to: state.mb_id,
        alarm_content: `${window.sessionStorage.getItem('userName')}님이 ${state.name}님의 자기소개서를 출력하셨습니다.`,
        alarm_check: 'N',
        alarm_dt: '방금 전'
      }))

      socket.send(JSON.stringify({
        alarm_num: 0,
        mb_id_from: window.sessionStorage.getItem("loginId"),
        mb_id_to: teacher,
        alarm_content: `${window.sessionStorage.getItem('userName')}님이 ${state.name}님의 자기소개서를 출력하셨습니다.`,
        alarm_check: 'N',
        alarm_dt: '방금 전'
      }))
    }
    axios
      .post("/alarm/addSAlarm", {
        mb_id_from: window.sessionStorage.getItem('loginId'),
        mb_id_to: state.mb_id,
        alarm_content: `${window.sessionStorage.getItem('userName')}님이 ${state.name}님의 자기소개서를 출력하셨습니다.`
      })
      .then((res) => {
      })
      .catch(function (error) {
      });
    axios
      .post("/alarm/addTAlarm", {
        mb_id_from: window.sessionStorage.getItem('loginId'),
        mb_id_to: state.mb_id,
        alarm_content: `${window.sessionStorage.getItem('userName')}님이 ${state.name}님의 자기소개서를 출력하셨습니다.`
      })
      .then((res) => {
      })
      .catch(function (error) {
      });
    navigate('/cover_letter/frame',
      { state: { coverLetter: coverLetter, mb_name: state.name } })
  }


  const [btn_info_save, setBtn_info_save] = useState(1)
  const resume_info_view = () => {
    setBtn_info_save(1)

  }
  const coverLetter_info_view = () => {
    setBtn_info_save(2)


  }
  const portfolio_info_view = () => {
    setBtn_info_save(3)
  }

  const view = (btn_info_save) => {

    if (btn_info_save === 1) {

    }


  }

  if (btn_info_save === 1)
    return (
      <div className="topDiv_resume">
        <div>
          <span>
            <div className="btn_info" onClick={resume_info_view}>이력서</div>
            <div className="btn_info" onClick={coverLetter_info_view}>자기소개서</div>
            <div className="btn_info" onClick={portfolio_info_view}>포트폴리오</div>
          </span>
        </div>
        <div className="r_basic">
          <div>
            <img
              className="id_photo"
              src={`https://smhrd-portal.s3.ap-northeast-2.amazonaws.com/upload/photo/${state.mb_id}/${resume.photo}`}
            ></img>
          </div>
          <div className="e_detail_info">
            <div className="e_detail_name">
              <p>{resume.name}</p>
              <p>
                {resume.gender=='m'&&'남성'||'여성'} / {resume.birthday} / {ageCaculate(resume.birthday.substring(0, 4))}세
              </p>
              <div className="" onClick={onHandleBookmark} style={{ marginLeft: '0.5rem' }}>
                {window.sessionStorage.getItem('role') === 'e' && (isBookmark ? <RiStarFill /> : <RiStarLine />)}
              </div>
            </div>
            <div>
              <div>
                <p>연락처</p>
                <p>{resume.phone}</p>
              </div>
              <div>
                <p>이메일</p>
                <p>{resume.email}</p>
              </div>
              <div>
                <p>주소</p>
                <p>{resume.addr}</p>
              </div>
              <div>
                <p>전공</p>
                <p>{majorList.includes(resume.major)&&'전 공'||'비전공'}</p>
              </div>
              <div>
                <p>희망지역</p>
                <p>
                  {resume.wish_area1},{resume.wish_area2},{resume.wish_area3}
                </p>
              </div>
              <div>
                <p>희망분야</p>
                <p>{resume.wish_field.slice(0,-1)}</p>
              </div>
              <div>
                <p>희망연봉</p>
                <p>{resume.wish_salary}</p>
              </div>
            </div>
          </div>
        </div><div>
          <p>학력</p>
          <table>
            <thead>
              <tr>
                <th>학교명</th>
                <th>전공</th>
                <th>기간</th>
                <th>구분</th>
                <th>학점</th>
              </tr>
            </thead>
            <tbody>
              {graduation.map((graduation, idx) => (
                <tr key={idx}>
                  <td>
                    <p>{graduation.grad_school}</p>
                  </td>
                  <td>
                    <p>{graduation.school_type}</p>
                  </td>
                  <td>
                    <p>{graduation.grad_dt}</p>
                  </td>
                  <td>
                    <p>{graduation.grad_type}</p>
                  </td>
                  <td>
                    <p>{graduation.grad_score}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><div>
          <p>경력 · 교육</p>
          <table>
            <thead>
              <tr>
                <th>기관명</th>
                <th>직책</th>
                <th>기간</th>
                <th>직무/활동사항</th>
              </tr>
            </thead>
            <tbody>
              {career.map((career, idx) => (
                <tr key={idx}>
                  <td>
                    <p>{career.cr_organization}</p>
                  </td>
                  <td>
                    <p>{career.cr_position}</p>
                  </td>
                  <td>
                    <p>
                      {career.cr_s_dt}~{career.cr_e_dt}
                    </p>
                  </td>
                  <td>
                    <p>{career.activity}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><div>
          <p>자격증</p>
          <table>
            <thead>
              <tr>
                <th>자격증명</th>
                <th>발급기관</th>
                <th>발급일자</th>
              </tr>
            </thead>
            <tbody>
              {certification.map((certification, idx) => (
                <tr key={idx}>
                  <td>
                    <p>{certification.cert_name}</p>
                  </td>
                  <td>
                    <p>{certification.cert_org}</p>
                  </td>
                  <td>
                    <p>{certification.cert_dt} </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><div>
          <p>수상내역</p>
          <table>
            <thead>
              <tr>
                <th>수상명</th>
                <th>내용</th>
                <th>수상일자</th>
                <th>기관명</th>
              </tr>
            </thead>
            <tbody>
              {prize.map((prize, idx) => (
                <tr key={idx}>
                  <td>
                    <p>{prize.prize_name}</p>
                  </td>
                  <td>
                    <p>{prize.prize_dt} </p>
                  </td>
                  <td>
                    <p>{prize.prize_org}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><div>
          <p>병역</p>
          <table>
            <thead>
              <tr>
                <th>구분</th>
                <th>군별</th>
                <th>복무기간</th>
                <th>보훈대상</th>
              </tr>
            </thead>
            <tbody>
              {military.map((military, idx) => (
                <tr key={idx}>
                  <td>
                    <p>{military.mili_title}</p>
                  </td>
                  <td>
                    <p>{military.mili_army}</p>
                  </td>
                  <td>
                    <p>
                      {military.mili_s_dt}~{military.mili_e_dt}
                    </p>
                  </td>
                  <td>
                    <p>{military.veteran_yn}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><div>
          <p>기술스택</p>
          <div>{resume.skills&&resume.skills.slice(0,-1)}</div>
        </div><button className='headerBtn' onClick={goToResumeFrame}>이력서 출력하기</button>
      </div>
    )
  else if (btn_info_save == 2)
    return (
      <div className="topDiv_resume">
        <div>
          <span>
            <div className="btn_info" onClick={resume_info_view}>이력서</div>
            <div className="btn_info" onClick={coverLetter_info_view}>자기소개서</div>
            <div className="btn_info" onClick={portfolio_info_view}>포트폴리오</div>
          </span>
        </div>
        <div>
          <p>자기소개</p>
          <br></br>
          <div>
            <p>성장배경</p>
            <p className="cLview" dangerouslySetInnerHTML={{ __html: coverLetter.growth }} />
          </div>
          <div>
            <p>위기 극복</p>
            <p className="cLview" dangerouslySetInnerHTML={{ __html: coverLetter.goal_and_crisis }} />
          </div>
          <div>
            <p>장단점</p>
            <p className="cLview" dangerouslySetInnerHTML={{ __html: coverLetter.pros_cons }} />
          </div>
          <div>
            <p>지원동기</p>
            <p className="cLview" dangerouslySetInnerHTML={{ __html: coverLetter.motivation }} />
          </div>
        </div>
        <button className='headerBtn' onClick={goToCoverLetterFrame}>자기소개서 출력하기</button>
      </div>)
  else
    return (
      <div className="topDiv_resume">
        <div>
          <span>
            <div className="btn_info" onClick={resume_info_view}>이력서</div>
            <div className="btn_info" onClick={coverLetter_info_view}>자기소개서</div>
            <div className="btn_info" onClick={portfolio_info_view}>포트폴리오</div>
          </span>
        </div>
        <div>
          {portfolio_info.map((portfolio_info) => {
            return <S_portfolio_detail key={uuid()} portfolio_info={portfolio_info} />
          })
          }
        </div>
      </div>
    )
};
export default E_main_detail;
