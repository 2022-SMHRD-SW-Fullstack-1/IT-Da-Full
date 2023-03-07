import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import '../../../css/Portfolio.css'
import GalleryList from './Portfolio/GalleryList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const S_portfolio_detail = ({portfolio_info}) => {

    const {state} = useLocation()

    const navigate = useNavigate()
    const goToWrite = () => {
        navigate('/portfolio/write', {state: {
            title: '수정',
            portfolio_num: state.portfolio_num,
            portfolio_title: state.portfolio_title,
            portfolio_period: state.portfolio_period,
            portfolio_etc: state.portfolio_etc,
            portfolio_img1: state.portfolio_img1,
            portfolio_img2: state.portfolio_img2,
            portfolio_img3: state.portfolio_img3,
            portfolio_content: state.portfolio_content,
            portfolio_stack_front: state.portfolio_stack_front,
            portfolio_stack_back: state.portfolio_stack_back,
            portfolio_stack_db: state.portfolio_stack_db,
            portfolio_url: state.portfolio_url,
            portfolio_file: state.portfolio_file,
            
        }})
    }
    const deletePost = () => {
        axios
        .post('/student/portfolio/delete', {
            portfolio_num: state.portfolio_num
        })
        .then((res)=> { // 파일 삭제
            console.log(res)
            state.portfolio_img1&&deleteFile(state.portfolio_img1)
            state.portfolio_img2&&deleteFile(state.portfolio_img2)
            state.portfolio_img3&&deleteFile(state.portfolio_img3)
        })
        .then(() => {// 디렉토리 삭제
            navigate('/portfolio')
            deleteFile("/"+state.portfolio_num)
        })
        .catch(e=>console.error(e))
    }

    const deleteFile = (path) => {
        const formData =new FormData();
        formData.append('id', sessionStorage.getItem("loginId"))
        formData.append('path',path)

        axios
        .post('/file/delete/portfolio',formData)
        .then((res)=>{
          console.log(res)
        })
        .catch((e)=>{console.log(e)})
    }
    const img = [
        (state.portfolio_img1!==null)&&{id:1, image:process.env.PUBLIC_URL+`/file/portfolio/${sessionStorage.getItem("loginId")}/${state.portfolio_img1}`}
        ||(portfolio_info!=undefined)&&{id:1, image:process.env.PUBLIC_URL+`/file/portfolio/${portfolio_info.mb_id}/${portfolio_info.portfolio_img1}`}||null,
        (state.portfolio_img2!==null)&&{id:2, image:process.env.PUBLIC_URL+`/file/portfolio/${sessionStorage.getItem("loginId")}/${state.portfolio_img2}`}
        ||(portfolio_info!==undefined)&&{id:2, image:process.env.PUBLIC_URL+`/file/portfolio/${portfolio_info.mb_id}/${portfolio_info.portfolio_img2}`}||null,
        (state.portfolio_img3!==null)&&{id:3, image:process.env.PUBLIC_URL+`/file/portfolio/${sessionStorage.getItem("loginId")}/${state.portfolio_img3}`}
        ||(portfolio_info!==undefined)&&{id:3, image:process.env.PUBLIC_URL+`/file/portfolio/${portfolio_info.mb_id}/${portfolio_info.portfolio_img3}`}||null,
    ]
    const [datas, setDatas] = useState(img) //사진 데이터
    const [currItem, setCurrItem] = useState(datas[0]) //선택한 사진 상태설정
    const onView = (id)=>{ //고유번호인 id를 받아서 해당 사진을 찾아라
        setCurrItem(datas.find(item => item&&item.id === id)) //배열함수중 해당값만 찾아주는 find함수를 쓴다
        console.log(img)
    }
    useEffect(()=>{
        console.log('화면')
    },[])


    return (
        <div>
            <div className='portfolioDiv'>
                <p>{state.portfolio_title||portfolio_info.portfolio_title}</p>
                <div>
                    <div>
                        <p>{state.portfolio_period||portfolio_info.portfolio_period}</p>
                        <p>{state.portfolio_etc||portfolio_info.portfolio_etc}</p>
                    </div>
                    <div>
                    <Container>
                        <Row>
                            <Col lg={12} xl={7}>
                        <div className='imgs'>
                            {currItem&&<GalleryList datas = {datas} onView={onView} currItem = {currItem}/>}
                        </div>
                        </Col>
                        <Col lg={12} xl={5}>
                        <table>
                            <thead>
                                <tr></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>내용</th>
                                </tr>
                                <tr>
                                    <td>{state.portfolio_content||portfolio_info.portfolio_content}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <th>front-ent</th>
                                </tr>
                                <tr>
                                    <td>{state.portfolio_stack_front||portfolio_info.portfolio_stack_front}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <th>back-end</th>
                                </tr>
                                <tr>
                                    <td>{state.portfolio_stack_back||portfolio_info.portfolio_stack_back}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <th>database</th>
                                </tr>
                                <tr>
                                    <td>{state.portfolio_stack_db||portfolio_info.portfolio_stack_db}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <th>Github</th>
                                </tr>
                                <tr>
                                    <td>{state.portfolio_url||portfolio_info.portfolio_url}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                {/* <tr>
                                    <th>첨부파일</th>
                                </tr>
                                <tr>
                                    <td>{state.portfolio_file||portfolio_info.portfolio_file}</td>
                                </tr> */}
                            </tbody>
                        </table>
                            </Col>
                        </Row>
                        </Container>
                    </div>
                </div>
                </div>
            {window.sessionStorage.getItem("role")==="s" ? <div className="content annViewButton">
                <button onClick={goToWrite}>수정</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={deletePost}>삭제</button>
            </div>:<></>}
            
        </div>
    )
}
export default S_portfolio_detail