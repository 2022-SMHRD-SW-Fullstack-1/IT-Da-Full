import axios from 'axios'
import React, { useRef, useState } from 'react'
import uuid from 'react-uuid'
import btnAdd from '../../../../../asset/img/btn_add.png'
import btnDelete from '../../../../../asset/img/btn_delete.png'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

const MilitaryWrite = ({ military, setMilitary }) => {
    // const miliTitleList = [
    //     {value:'선택', label:'선택'},
    //     {value:'필', label:'필'},
    //     {value:'미필', label:'미필'},
    //     {value:'면제', label:'면제'}
    // ]
    const [inputs, setInputs] = useState({
        mili_num: uuid(),
        mili_title: '',
        mili_army: '',
        mili_s_dt: '',
        veteran_yn: '',
    })
    //newCareer에 담을 수 있게 input값을 선언
    const { mili_num, mili_title, mili_army, mili_s_dt, veteran_yn } = inputs

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const selectRef = useRef(null)
    const addMilitary = () => {
        const newMilitary = {
            mili_num,
            mili_title,
            mili_army,
            mili_s_dt,
            veteran_yn,
        }
        if ((mili_title == '') ||
            (mili_title == '선택') ||
            (mili_s_dt == '')) {
            alert('입력란을 채워 주세요')
        } else if (window.confirm("데이터를 추가하시겠습니까?")) {
            axios
                .post('/student/military/add', {
                    mili_title: inputs.mili_title,
                    mili_army: inputs.mili_army,
                    mili_s_dt: inputs.mili_s_dt,
                    veteran_yn: inputs.veteran_yn,
                    id: sessionStorage.getItem("loginId")
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((e) => console.log(e));
            setMilitary(military.concat(newMilitary))
            setInputs({
                mili_num: uuid(),
                mili_title: '선택',//
                mili_army: '',
                mili_s_dt: '',
                veteran_yn: '',
            })
        }
    }
    const onRemove = (mili_num, mili_title, mili_army) => {
        if (window.confirm("데이터를 삭제하시겠습니까? 되돌릴 수 없습니다")) {
            // new.num 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
            // = new.num 가 num 인 것을 제거함
            setMilitary(military.filter(newMilitary =>
                (newMilitary.mili_num !== mili_num)))
            axios
                .post('/student/military/delete', {
                    mili_title: mili_title,
                    mili_army: mili_army,
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
        setMilitary(items => reorder(items, result.source.index, result.destination.index))
        axios
            .post('/student/military/idx', {
                military: reorder(military, result.source.index, result.destination.index),
                id: sessionStorage.getItem("loginId")
            })
            .then((res) => {
                console.log(res)
                document.getElementById("select").reset();
            })
            .catch((e) => console.log(e));
        console.log(military)
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
                    {military.map((military, index) => (
                        <Draggable key={military.mili_num} draggableId={"item-" + military.mili_num} index={index}>
                            {(provided, snapshot) => (
                                <tr onClick={(e) => console.log(index)}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <td><p>{military.mili_title}</p></td>
                                    <td><p>{military.mili_army}</p></td>
                                    <td><p>{military.mili_s_dt}</p></td>
                                    <td><p>{military.veteran_yn}</p></td>
                                    <td>
                                        <div id='sRBtnDiv'>
                                        <button onClick={() => onRemove(military.mili_num, military.mili_title, military.mili_army)} className="resumeBtn">삭제</button>
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
            <p className='sRTitle'>병역</p>
            <table className='resumeTable'>
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>군별</th>
                        <th>복무기간(면제사유)</th>
                        <th>보훈대상</th>
                        <th></th>
                    </tr>
                </thead>
                {dnd}
                <tbody>
                    <tr>
                        <td><select defaultValue='선택' id='select' name='mili_title' onChange={onChange} >
                                <option>선택</option>
                                <option>필</option>
                                <option>미필</option>
                                <option>면제</option>
                        </select></td>
                        <td><input type='text' name='mili_army' className='miliArmy' onChange={onChange} value={inputs.mili_army} /></td>
                        <td><input type='text' className='dateInput' name='mili_s_dt' onChange={onChange} value={inputs.mili_s_dt} /></td>
                        <td><input type='text' name='veteran_yn' onChange={onChange} value={inputs.veteran_yn} /></td>
                        <td>
                        <div><button className="resumeBtn" onClick={addMilitary}>추가</button></div></td>
                    </tr>
                </tbody>
            </table>
    
        </div>
    )
}
export default MilitaryWrite