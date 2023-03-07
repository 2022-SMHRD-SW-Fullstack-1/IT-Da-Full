import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print'
import uuid from 'react-uuid';
import '../../../../css/ResumePrint.css'
import logo from '../../../../asset/img/logo_resume.png'
const ResumeFrame = () => {
    /**부모 컴포넌트에서 아래 내용을 작성하여, 특정 id의 이력서 정보를 이곳(ResumeFrame)으로 보내준다 */
    // const navigate = useNavigate()
    // const goToResumeFrame = () => {
    //   navigate('/resume/frame', 
    //   {state:{ resume: resume, graduation: graduation, career: career, certification:certification, prize:prize, military:military }})
    // }

    const { state } = useLocation();
    const printRef = useRef()
    // 데이터 가져오기
    useEffect(() => {
        console.log(state)
    }, [state])

    /**학력map */
    const graduationList =
        state.graduation.map((graduation) => (
            <tr key={graduation.grad_num}>
                <td>{graduation.grad_dt.replace(/-/g, '.')} ~ {graduation.grad_dt.replace(/-/g, '.')}</td>
                <td>{graduation.grad_school}</td>
                <td>{graduation.school_type}</td>
                <td>{graduation.grad_type}</td>
                <td>{graduation.grad_score}</td>
            </tr>
        ))
    /**경력,교육map */
    const careerList =
        state.career.map((career) => (
            <tr key={career.cr_num}>
                <td>{career.cr_s_dt.replace(/-/g, '.')} ~ {career.cr_e_dt.replace(/-/g, '.')}</td>
                <td>{career.cr_organization}</td>
                <td>{career.cr_position}</td>
                <td>{career.cr_activity}</td>
            </tr>
        ))

    /**자격map */
    const certificationList =
        state.certification.map((certification, idx) => (
            <tr key={certification.cert_num}>
                <td>{certification.cert_name}</td>
                <td>{certification.cert_org}</td>
                <td>{certification.cert_dt.replace(/-/g, '.')}</td>
            </tr>
        ))

    /**수상map */
    const prizeList =
        state.prize.map((prize) => (
            <tr key={prize.prize_num}>
                <td>{prize.prize_name}</td>
                <td>{prize.prize_dt.replace(/-/g, '.')}</td>
                <td>{prize.prize_org}</td>
            </tr>
        ))
    /**병역map */
    const militaryList =
        state.military.map((military) => (
            <tr key={military.mili_num}>
                <td>{military.mili_title}</td>
                <td>{military.mili_army}</td>
                <td>{military.mili_s_dt}</td>
                <td>{military.veteran_yn}</td>
            </tr>
        ))

    // const skillList = state.resume.skills.split(",");

    const skillList =
        state.skills.map((skills, idx) => (
            <tr key={idx + skills.skill_num}>
                <td>{skills.skill_name}</td>
                <td>{skills.skill_grade}</td>
            </tr>
        ))
    return (
        <div className='resumePrintTopDiv'>
            <div className='resumePrintDiv print'
                ref={printRef}>
                <div>
                    <span></span><span>이 력 서</span><span><img src={logo} /></span>
                </div>
                <div></div>
                <table>
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id='resumePrintPhoto' rowSpan={4}>
                                {state.resume.photo ? (<img id='resumePrintPhoto' src={`https://smhrd-portal.s3.ap-northeast-2.amazonaws.com/upload/photo/${state.resume.mb_id}/photo`} />)
                                    : <img id='resumePrintPhoto' />}
                            </td>
                            <td className='resumePrintTitle resumePrintTitle1'>지원분야</td>
                            <td>{state.resume.wish_field.slice(0,-1)}</td>
                            <td className='resumePrintTitle resumePrintTitle1'>희망연봉</td>
                            <td>{state.resume.wish_salary}</td>
                        </tr>
                        <tr>
                            <td className='resumePrintTitle resumePrintTitle1'>성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명</td>
                            <td>{state.resume.name}</td>
                            <td className='resumePrintTitle resumePrintTitle1'>생년월일</td>
                            <td>{state.resume.birthday}</td>
                        </tr>
                        <tr>
                            <td className='resumePrintTitle resumePrintTitle1'>연&nbsp;&nbsp;락&nbsp;&nbsp;처</td>
                            <td>{state.resume.phone}</td>
                            <td className='resumePrintTitle resumePrintTitle1'>이&nbsp;&nbsp;메&nbsp;&nbsp;일</td>
                            <td>{state.resume.email}</td>
                        </tr>
                        <tr>
                            <td className='resumePrintTitle resumePrintTitle1'>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</td>
                            <td colSpan={3}>{state.resume.addr}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='resumePrintTitle' rowSpan={10}>학<br />력</th>
                            <th className='resumePrintTitle resumePrintDt2'>기간</th>
                            <th className='resumePrintTitle resumePrintName'>학교명</th>
                            <th className='resumePrintTitle '>전공</th>
                            <th className='resumePrintTitle'>구분</th>
                            <th className='resumePrintTitle'>학점</th>
                        </tr>
                        {graduationList}
                    </tbody>
                </table>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='resumePrintTitle printCareer' rowSpan={10}>경<br />력<br />·<br />교<br />육</th>
                            <th className='resumePrintTitle resumePrintDt2'>기간</th>
                            <th className='resumePrintTitle resumePrintName'>기관명</th>
                            <th className='resumePrintTitle'>직책</th>
                            <th className='resumePrintTitle'>직무/활동사항</th>
                        </tr>
                        {careerList}
                    </tbody>
                </table>
                <table>
                    <thead>

                    </thead>
                    <tbody>
                        <tr>
                            <th className='resumePrintTitle' rowSpan={10}>자<br />격</th>
                            <th className='resumePrintTitle'>자격증명</th>
                            <th className='resumePrintTitle resumePrintName'>기관명</th>
                            <th className='resumePrintTitle resumePrintDt1'>발행일자</th>
                        </tr>
                        {certificationList}
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='resumePrintTitle' rowSpan={10}>수<br />상</th>
                            <th className='resumePrintTitle'>수상명</th>
                            <th className='resumePrintTitle resumePrintDt1'>수상일자</th>
                            <th className='resumePrintTitle resumePrintName'>기관명</th>
                        </tr>
                        {prizeList}
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='resumePrintTitle' rowSpan={10}>병<br />역</th>
                            <th className='resumePrintTitle resumePrintName'>구분</th>
                            <th className='resumePrintTitle '>군별</th>
                            <th className='resumePrintTitle resumePrintDt2'>복무기간(면제사유)</th>
                            <th className='resumePrintTitle resumePrintName'>보훈대상</th>
                        </tr>
                        {militaryList}
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='resumePrintTitle' id='skill' rowSpan={10}>전<br />산<br />관<br />련</th>
                            <th className='resumePrintTitle resumeSkill'>구분</th>
                            <th className='resumePrintTitle resumeSkill'>활용수준</th>
                        </tr>
                        {skillList}
                    </tbody>
                </table>
                <div>
                    <div><p>상기 내용은 사실과 다름 없음을 확인합니다.</p></div>
                    <div><span>202&nbsp;&nbsp;년</span><span>월</span><span>일</span><span>작 성 자 :&nbsp;&nbsp; </span><span>(인)</span></div>
                </div>
            </div>
            <ReactToPrint
                trigger={() => <button className='printBtn'>출력하기</button>}
                content={() => printRef.current}
                documentTitle="none"
                pageStyle="print"

            />
        </div>
    )
}

export default ResumeFrame