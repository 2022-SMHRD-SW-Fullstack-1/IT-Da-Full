import axios from 'axios'
import uuid from 'react-uuid'
import React, { useEffect, useState } from 'react'
import SelectFileBtn from '../../../../../components/file/SelectFileBtn'
import UploadBtn from '../../../../../components/file/UploadBtn'
import ageCaculate from '../../../../../utils/ageCaculate'
import MajorList from "../../../../../asset/list/Major"
import areaList from "../../../../../asset/list/Area"

const ResumeWrite = ({ resume, setResume }) => {
    /**지역 전체 리스트 */
    const areaList = ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '해외']
    // simple_comment:'',
    // photo:'',
    // project1:'1',
    // project2:'2',

    const [edit_style_po, setEdit_style_po] = useState({ display: "" })
    const [edit_style_op, setEdit_style_op] = useState({ display: "none" })

    // 수정 클릭 시
    const edit_e_button = () => {
        setEdit_style_po({ display: "none" })
        setEdit_style_op({ display: "" })
    }
    /**저장하기 버튼 */
    const edit_e_button_quit = () => {
        setEdit_style_po({ display: "" })
        setEdit_style_op({ display: "none" })
        axios
            .post("/student/resume/update", {
                wish_salary: resume.wish_salary,
                wish_area1: resume.wish_area1,
                wish_area2: resume.wish_area2,
                wish_area3: resume.wish_area3,
                // simple_comment: resume.simple_comment,
                // photo: resume.photo,
                // project1: resume.project1,
                // project2: resume.project2,
                id: sessionStorage.getItem("loginId")
            })
            .then(res => console.log(res))
            .catch(e => console.error(e))
        console.log(resume)
    }
    const [selectedFile, setSelectedFile] = useState(null)
    const fileTypes = ['image/jpeg', 'image/jpg']
    const fileExts = ['jpeg', 'jpg']
    const [fileImage, setFileImage] = useState();
    const mList=MajorList
    let phone = resume.phone.substr(0,3)+"-"+resume.phone.substr(3,4)+"-"+resume.phone.substr(7,4)
    return (

        <div>
            <p>기본정보
                <button style={edit_style_po} className='resume_Difault_Btn' onClick={edit_e_button} >수정하기</button>
                <button style={edit_style_op} className='resume_Difault_Btn2' onClick={edit_e_button_quit} >적용하기</button>
            </p>
            <div className='r_basic'>
                <div className='photoDiv'>
                    {fileImage
                        ? (
                            <img className='r_photo'
                                src={fileImage}
                            />
                        )
                        :(<img className='r_photo' src={process.env.PUBLIC_URL+resume.photo} />)
                    }
                    <SelectFileBtn btnText={"사진선택"} setFileImage={setFileImage} setSelectedFile={setSelectedFile} fileTypes={fileTypes} fileExts={fileExts} />
                <UploadBtn btn_text={"저장"} selectedFile={selectedFile} resume={resume} setResume={setResume} />
                </div>
                <div>
                        <span/>
                    <div>
                    </div>
                    <div>
                        <div><p className='resume_name'>{resume.name}</p></div>
                        <div><p>성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;별</p> <span>{resume.gender === 'm' ? '남성' : '여성'} </span></div>
                        <div><p>나&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이</p><span>{ageCaculate(resume.birthday.substring(0, 4))}세</span></div>
                        <div>
                            <p>이 메 일</p>
                            <p><span>{resume.email}</span>
                            </p>
                        </div>
                        <div>
                            <p>연 락 처</p>
                            <p><span>{phone}</span>
                            </p>
                        </div>

                        <div>
                            <p>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</p>
                            <p><span>{resume.addr}</span>
                            </p>
                        </div>
                        <div>
                            <p>전공여부</p>
                            <p><span>{(mList.includes(resume.major))&&'전 공'||'비전공'}</span>
                            </p>
                        </div>

                        <div>
                            <p>희망지역</p>
                            <p><select style={edit_style_op} name='wish_area1' onChange={(e) => { setResume({ ...resume, wish_area1: e.target.value }) }} >
                                {areaList.map((area) => (
                                    <option value={area} key={1 + area}>
                                       {area}
                                    </option>
                                ))}
                            </select>
                                <span style={edit_style_po}>{resume.wish_area1}&nbsp;</span>
                                <select style={edit_style_op} name='wish_area2' onChange={(e) => { setResume({ ...resume, wish_area2: e.target.value }) }} >
                                    {areaList.map((area) => (
                                        <option value={area} key={2 + area}>
                                           {area}
                                        </option>
                                    ))}
                                </select>
                                <span style={edit_style_po}>{resume.wish_area2}&nbsp;</span>
                                <select style={edit_style_op} name='wish_area3' onChange={(e) => { setResume({ ...resume, wish_area3: e.target.value }) }} >
                                    {areaList.map((area) => (
                                        <option value={area} key={3 + area}>
                                      {area}
                                        </option>
                                    ))}
                                </select>
                                <span style={edit_style_po}>{resume.wish_area3}</span>
                            </p>
                        </div>
                        <div>
                            <p>희망연봉</p>
                            <p><input style={edit_style_op} type='text' name='wish_salary' onChange={(e) => { setResume({ ...resume, wish_salary: e.target.value }); }}
                                value={resume.wish_salary} />
                                <span style={edit_style_po}>{resume.wish_salary}</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ResumeWrite