import axios from 'axios';
import React, { Component, useEffect, useState } from "react";
import uuid from 'react-uuid'
import btnAdd from '../../../../../asset/img/btn_add.png'
import btnDelete from '../../../../../asset/img/btn_delete.png'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// dnd code
// index를 실시간으로 변경, 
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

const CareerWrite = ({ career, setCareer }) => {
    const [inputs, setInputs] = useState({
        cr_num: uuid(),
        cr_organization: '',
        cr_position: '',
        cr_s_dt: '',
        cr_e_dt: '',
        cr_activity: '',
        cr_idx:0
    })
    //newCareer에 담을 수 있게 input값을 선언
    const { cr_num, cr_organization, cr_position, cr_s_dt, cr_e_dt, cr_activity, cr_idx } = inputs

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const addCareer = () => {
        const newCareer = {
            cr_num,
            cr_organization,
            cr_position,
            cr_s_dt,
            cr_e_dt,
            cr_activity,
            cr_idx
        }
        if ((cr_num == '') ||
            (cr_organization == '') ||
            (cr_position == '') ||
            (cr_s_dt == '') ||
            (cr_e_dt == '') ||
            (cr_activity == '')) {
            alert('입력란을 채워 주세요')
        }
        else {
            axios
                .post('/student/career/add', {
                    cr_organization: inputs.cr_organization,
                    cr_position: inputs.cr_position,
                    cr_s_dt: inputs.cr_s_dt,
                    cr_e_dt: inputs.cr_e_dt,
                    cr_activity: inputs.cr_activity,
                    cr_idx:inputs.cr_idx,
                    id: sessionStorage.getItem("loginId")
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((e) => console.log(e));
            setCareer(career.concat(newCareer))
            setInputs({
                cr_num: uuid(),
                cr_organization: '',
                cr_position: '',
                cr_s_dt: '',
                cr_e_dt: '',
                cr_activity: '',
                cr_idx:0
            })
        }
    }
    const onRemove = (cr_num, cr_organization, cr_position, cr_s_dt, cr_e_dt) => {
        if (window.confirm("데이터를 삭제하시겠습니까? 되돌릴 수 없습니다")) {
            // new.num 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
            // = new.num 가 num 인 것을 제거함
            setCareer(career.filter(newCareer => newCareer.cr_num !== cr_num))
            axios
                .post('/student/career/delete', {
                    cr_organization: cr_organization,
                    cr_position: cr_position,
                    cr_s_dt: cr_s_dt,
                    cr_e_dt: cr_e_dt,
                    id: sessionStorage.getItem("loginId")
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((e) => console.log(e));
        }
    }

    const onDragEnd = result => {
        if (!result.destination) {
            return
        }
        setCareer(items => reorder(items, result.source.index, result.destination.index))
        axios
            .post('/student/career/idx', {
                career: reorder(career,result.source.index, result.destination.index),
                id: sessionStorage.getItem("loginId")
            })
            .then((res) => {
                console.log(res)
            })
            .catch((e) => console.log(e));
            console.log(career)
    }
    const onDragUpdate = update => {
        if (!update.destination) {
            return
        }
    }

    const dnd = <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <tbody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {career.map((career, index) => (
                        <Draggable key={career.cr_num} draggableId={"item-" + career.cr_num} index={index}>
                            {(provided, snapshot) => (
                                <tr
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <td><p>{career.cr_organization}</p></td>
                                    <td><p>{career.cr_position}</p></td>
                                    <td><p>
                                        {career.cr_s_dt.replace(/-/g, '.')} ~ {career.cr_e_dt.replace(/-/g, '.')}
                                    </p></td>
                                    <td><p>{career.cr_activity}</p></td>
                                    <td>
                                        <div className='sRBtnDiv'>
                                        <button onClick={() => onRemove(career.cr_num, career.cr_organization, career.cr_position, career.cr_s_dt, career.cr_e_dt)} className="resumeBtn">삭제</button>
                                        </div></td>
                                </tr>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </tbody>
            )}
        </Droppable>
    </DragDropContext>

    return (
        <div className='resumeDiv'>
            <p className='sRTitle'>경력 · 교육</p>
            <table className='resumeTable'>
                <thead>
                    <tr>
                        <th>기관명</th>
                        <th>직책</th>
                        <th>기간</th>
                        <th>직무/활동사항</th>
                        <th></th>
                    </tr>
                </thead>
                {dnd}
                <tbody>
                    <tr>
                        <td><input type='text' name='cr_organization' onChange={onChange} value={inputs.cr_organization} /></td>
                        <td><input type='text' name='cr_position' className='crPosition' onChange={onChange} value={inputs.cr_position} /></td>
                        <td>
                            <input type='date' className='dateInput' name='cr_s_dt' onChange={onChange} value={inputs.cr_s_dt} />
                            &nbsp;~&nbsp;
                            <input type='date' className='dateInput' name='cr_e_dt' onChange={onChange} value={inputs.cr_e_dt} />
                        </td>
                        <td><input type='text' name='cr_activity' onChange={onChange} value={inputs.cr_activity} /></td>
                        <td>
                             <div><button className="resumeBtn" onClick={addCareer}>추가</button></div></td>
                    </tr>
                </tbody>
            </table>
          
        </div>
    )
}

export default CareerWrite