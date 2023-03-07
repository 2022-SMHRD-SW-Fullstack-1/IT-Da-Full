import axios from 'axios';
import React, { useState } from "react";
import uuid from 'react-uuid'

const SkillsWrite = ({ skills, setSkill }) => {
    const gradeList = ['선택', '상', '중', '하']
    const [inputSkill, setSkillInput] = useState({
        skill_num: uuid().replace(/-/g, '/').toUpperCase(),
        skill_name: '',
        skill_grade: ''
    })
    const { skill_num, skill_name, skill_grade } = inputSkill

    const addSkill = () => {
        const newSkill = {
            skill_num,
            skill_name,
            skill_grade,
        }

        if ((skill_name == '') || (skill_grade == '') || (skill_grade == '선택')) {
            alert('입력란을 채워 주세요')
        } else if (window.confirm("데이터를 추가하시겠습니까?")) {
            axios
                .post('/student/skill/add', {
                    skill_num: inputSkill.skill_num,
                    skill_name: inputSkill.skill_name,
                    skill_grade: inputSkill.skill_grade,
                    id: sessionStorage.getItem("loginId")
                })
                .then((res) => {
                    console.log(res)
                    axios
                    .post('/student/skill/update',{
                        skill:skills.concat(newSkill),
                        id: sessionStorage.getItem("loginId")
                    })
                })
                .catch((e) => console.log(e));
            setSkill(skills.concat(newSkill))
            setSkillInput(...inputSkill,{
                skill_num: uuid().replace(/-/g, '/').toUpperCase(),
                skill_name: ''
            })
        }
    }
    const onRemoveSkill = (skill_num, skill_name) => {
        // new.num 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = new.num 가 num 인 것을 제거함
        console.log(skill_name)

        if (window.confirm("데이터를 삭제하시겠습니까? 되돌릴 수 없습니다")) {
            setSkill(skills.filter(newSkill => (newSkill.skill_num != skill_num)))
            axios
                .post('/student/skill/delete', {
                    skill_num: skill_num,
                    skill_name: skill_name,
                    id: sessionStorage.getItem("loginId")
                })
                .then((res) => {
                    axios
                    .post('/student/skill/update',{
                        skill:skills.filter(newSkill => (newSkill.skill_num != skill_num)),
                        id: sessionStorage.getItem("loginId")
                    })
                    .then((res)=>{
                        console.log(res)
                    })
                    .catch((e)=> console.log(e))
                })
                .catch((e) => console.log(e));
        }
    }

    return (
        <div className='resumeDiv' id='smallTable'>
            <p className='sRTitle'>기술스택</p>
            <table className='resumeTable'>
                <thead>
                    <tr>
                        <td>
                            {skills.map((skills, idx) => (
                                <button key={idx} className='textBtn' onClick={() => onRemoveSkill(skills.skill_num, skills.wish_field_name)}>
                                    <span>{skills.skill_name} ({skills.skill_grade})</span>
                                    <span> X</span>
                                </button>
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type='text' name='skill_name' onChange={(e) => setSkillInput({ ...inputSkill, skill_name: e.target.value })}
                                value={inputSkill.skill_name} />
                                <span>&nbsp;</span>
                            <select name='skill_grade' onChange={(e) => setSkillInput({ ...inputSkill, skill_grade: e.target.value })}>
                                {gradeList.map((grade, idx) => (
                                    <option value={grade} key={idx + grade}>
                                        {grade}
                                    </option>
                                ))}
                            </select>
                            <button className="resumeBtn" onClick={addSkill}>추가</button>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default SkillsWrite