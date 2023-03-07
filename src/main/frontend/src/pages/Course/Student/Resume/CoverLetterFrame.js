import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print'
import '../../../../css/ResumePrint.css'
const CoverLetterFrame = () => {
    /**부모 컴포넌트에서 아래 내용을 작성하여, 특정 id의 이력서 정보를 이곳(CoverLetterFrame)으로 보내준다 */
    // const navigate = useNavigate()
    // const goToCoverLetterFrame = () => {
    //   navigate('/cover_letter/frame', 
    //   {state:{ resume: resume, graduation: graduation, career: career, certification:certification, prize:prize, military:military }})
    // }

    const { state } = useLocation();
    const printRef = useRef()
    // 데이터 가져오기
    useEffect(() => {
        console.log(state)
    }, [state])

    return (
        <div className='resumePrintTopDiv'>
            <div id='coverLetter' className='resumePrintDiv coverLetterPrintDiv'
                ref={printRef}>
                <div id='coverLetterTitle'>
                    <span>자기소개서</span>
                </div>
                <div>지원자 : {sessionStorage.getItem("role")=='s'?sessionStorage.getItem("userName"):state.mb_name}</div>
                <table>
                    <thead>
                        <tr>
                            <th className='resumePrintTitle page-break'>성<br/>장<br/>과<br/>정</th>
                            <td><p dangerouslySetInnerHTML={ state.growth?{__html: state.growth}:{__html: state.coverLetter.growth} }></p></td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th className='resumePrintTitle page-break'>성격<br/>의<br/>장단점</th>
                            <td><p dangerouslySetInnerHTML={ state.pros_cons?{__html: state.pros_cons}:{__html: state.coverLetter.pros_cons} }></p></td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th className='resumePrintTitle page-break'>위기<br/>극복<br/>·<br/>목표<br/>달성</th>
                            <td><p dangerouslySetInnerHTML={ state.goal_and_crisis?{__html: state.goal_and_crisis}:{__html: state.coverLetter.goal_and_crisis} }></p></td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th className='resumePrintTitle page-break'>지원<br/>동기<br/>·<br/>포부</th>
                            <td><p dangerouslySetInnerHTML={ state.motivation?{__html: state.motivation}:{__html: state.coverLetter.motivation} }></p></td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <ReactToPrint
                trigger={() => <button className='printBtn'>출력하기</button>}
                content={() => printRef.current}
                pageStyle="print"

            />
        </div>
    )
}

export default CoverLetterFrame