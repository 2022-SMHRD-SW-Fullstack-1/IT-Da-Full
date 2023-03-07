import axios from 'axios'
import uuid from 'react-uuid'
import React, { useState } from 'react'
import btnAdd from '../../../../../asset/img/btn_add.png'
import btnDelete from '../../../../../asset/img/btn_delete.png'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

const PrizeWrite = ({ prize, setPrize }) => {
    const [inputs, setInputs] = useState({
        prize_num: uuid(),
        prize_org: '',
        prize_name: '',
        prize_dt: '',
    })
    //newCareer에 담을 수 있게 input값을 선언
    const { prize_num, prize_name, prize_dt, prize_org } = inputs

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const addPrize = () => {
        const newPrize = {
            prize_num,
            prize_org,
            prize_name,
            prize_dt,
        }

        if ((prize_name == '') || (prize_dt == '') || (prize_org == '')) {
            alert('입력란을 채워 주세요')
        } else if (window.confirm("데이터를 추가하시겠습니까?")) {
            axios
                .post('/student/prize/add', {
                    prize_num: inputs.prize_num,
                    prize_org: inputs.prize_org,
                    prize_name: inputs.prize_name,
                    prize_dt: inputs.prize_dt,
                    id: sessionStorage.getItem("loginId")
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((e) => console.log(e));
            setPrize(prize.concat(newPrize))
            setInputs({
                prize_num: uuid(),
                prize_org: '',
                prize_name: '',
                prize_dt: '',
            })
        }
    }
    const onRemove = (prize_num, prize_org, prize_name, prize_dt) => {
        // new.num 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = new.num 가 num 인 것을 제거함
        console.log(prize_org, prize_name, prize_dt)

        if (window.confirm("데이터를 삭제하시겠습니까? 되돌릴 수 없습니다")) {
            setPrize(prize.filter(newPrize => (newPrize.prize_num != prize_num)))
            axios
                .post('/student/prize/delete', {
                    prize_org: prize_org,
                    prize_name: prize_name,
                    prize_dt: prize_dt,
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
        setPrize(items => reorder(items, result.source.index, result.destination.index))
        axios
            .post('/student/prize/idx', {
                prize: reorder(prize, result.source.index, result.destination.index),
                id: sessionStorage.getItem("loginId")
            })
            .then((res) => {
                console.log(res)
            })
            .catch((e) => console.log(e));
        console.log(prize)
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
                    {prize.map((prize, index) => (
                        <Draggable key={prize.prize_num} draggableId={"item-" + prize.prize_num} index={index}>
                            {(provided, snapshot) => (
                                <tr onClick={(e) => console.log(index)}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <td><p>{prize.prize_name}</p></td>
                                    <td><p>{prize.prize_dt.replace(/-/g, '.')} </p></td>
                                    <td><p>{prize.prize_org}</p></td>
                                    <td>
                                        <div className='sRBtnDiv'>
                                        <button onClick={() => onRemove(prize.prize_num, prize.prize_org, prize.prize_name, prize.prize_dt)} className="resumeBtn">삭제</button>
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
            <p className='sRTitle'>수상내역</p>
            <table className='resumeTable'>
                <thead>
                    <tr>
                        <th>수상명</th>
                        <th>수상일자</th>
                        <th>기관명</th>
                        <th></th>
                    </tr>
                </thead>
                {dnd}
                <tbody>
                    <tr>
                        <td><input type='text' name='prize_name' onChange={onChange} value={inputs.prize_name} /></td>
                        <td><input type='date' className='dateInput' name='prize_dt' onChange={onChange} value={inputs.prize_dt} /></td>
                        <td><input type='text' name='prize_org' onChange={onChange} value={inputs.prize_org} /></td>
                        <td>
                        <div><button className="resumeBtn" onClick={addPrize}>추가</button></div></td>
                    </tr>
                </tbody>
            </table>
         
        </div>
    )
}

export default PrizeWrite