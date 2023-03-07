import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import uuid from 'react-uuid'

const S_portfolio_write = () => {
    const [selectedFile1, setSelectedFile1] = useState(null)
    const [selectedFile2, setSelectedFile2] = useState(null)
    const [selectedFile3, setSelectedFile3] = useState(null)
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    const fileExts = ['jpeg', 'jpg', 'png']
    const fileTypes2 = ['application/x-zip-compressed']
    const fileExts2 = ['zip']
    const [selectedFile, setSelectedFile] = useState(null)
    const navigate = useNavigate()
    // navigate를 이용하여 전달한 값 가져오기
    const { state } = useLocation()

    //input value 가져오기
    
    const [title, setTitle] = useState('');
    const [inputs, setInputs] = useState({
        portfolio_num: uuid().replace(/-/g, '').toUpperCase(),
        portfolio_title: state.portfolio_title||'',
        portfolio_period: state.portfolio_period||'',
        portfolio_etc: state.portfolio_etc||'',
        portfolio_img1: state.portfolio_img1,
        portfolio_img2: state.portfolio_img2,
        portfolio_img3: state.portfolio_img3,
        portfolio_content: state.portfolio_content||'',
        portfolio_stack_front: state.portfolio_stack_front||'',
        portfolio_stack_back: state.portfolio_stack_back||'',
        portfolio_stack_db: state.portfolio_stack_db||'',
        portfolio_url: state.portfolio_url||'',
        portfolio_file: state.portfolio_file
    })

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }


    const uploadFile = (file, num, idx) => {
      const formData =new FormData();
      formData.append('file', file)
      formData.append('id', sessionStorage.getItem("loginId"))
      formData.append('num',num)
      formData.append('idx',idx)
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      file
      &&axios
      .post('/file/upload/portfolio',formData,config)
      .then((res)=>{
        console.log(res)
      })
      .catch((e)=>{console.log(e)})
    }


    useEffect(()=>{
            console.log('이미지 선택!', inputs)
    },[inputs.portfolio_img3])

    useEffect(()=>{
        if (state.title == '수정'){
            console.log('수정하기', state)
            setTitle(state.title)
            setInputs(
                {
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
                    portfolio_file: state.portfolio_file
                }
            )
        }
    },[])

    //글 작성 버튼 누르면 작성된 내용 가져오기
    const clickWriteBtn = () => {
        console.log(title)
        console.log('저장하기',inputs)
        if(state.title == '수정') {
            axios
            .post('/student/portfolio/edit',{
                portfolio_num: state.portfolio_num,
                portfolio_title: inputs.portfolio_title,
                portfolio_period: inputs.portfolio_period,
                portfolio_etc: inputs.portfolio_etc,
                portfolio_img1: inputs.portfolio_img1,
                portfolio_img2: inputs.portfolio_img2,
                portfolio_img3: inputs.portfolio_img3,
                portfolio_content: inputs.portfolio_content,
                portfolio_stack_front: inputs.portfolio_stack_front,
                portfolio_stack_back: inputs.portfolio_stack_back,
                portfolio_stack_db: inputs.portfolio_stack_db,
                portfolio_url: inputs.portfolio_url||'',
                portfolio_file: inputs.portfolio_file
            })
            .then(() => {
              selectedFile&&(uploadFile(selectedFile,state.portfolio_num,0))
              selectedFile1&&(uploadFile(selectedFile1,state.portfolio_num,1))
              selectedFile2&&(uploadFile(selectedFile2,state.portfolio_num,2))
              selectedFile3&&(uploadFile(selectedFile3,state.portfolio_num,3))}
            )
            .then((res)=>{
                console.log(res)
                navigate('/portfolio', {state: {state: title
                }})
            })
            .catch((e) => console.error(e));
        } else {
            axios
            .post('/student/portfolio/add', {
                portfolio_num: inputs.portfolio_num,
                portfolio_title: inputs.portfolio_title,
                portfolio_period: inputs.portfolio_period,
                portfolio_etc: inputs.portfolio_etc,
                portfolio_img1: inputs.portfolio_img1,
                portfolio_img2: inputs.portfolio_img2,
                portfolio_img3: inputs.portfolio_img3,
                portfolio_content: inputs.portfolio_content,
                portfolio_stack_front: inputs.portfolio_stack_front,
                portfolio_stack_back: inputs.portfolio_stack_back,
                portfolio_stack_db: inputs.portfolio_stack_db,
                portfolio_url: inputs.portfolio_url||' ',
                portfolio_file: inputs.portfolio_file,
                id: window.sessionStorage.getItem("loginId")
            })
            .then((res) => {
               console.log(res)
               selectedFile&&(uploadFile(selectedFile,inputs.portfolio_num,0))
               selectedFile1&&(uploadFile(selectedFile1,inputs.portfolio_num,1))
               selectedFile2&&(uploadFile(selectedFile2,inputs.portfolio_num,2))
               selectedFile3&&(uploadFile(selectedFile3,inputs.portfolio_num,3))
            })
            .then(()=>
              {navigate('/portfolio', { state: { state: title } })
              })
            .catch((e) => console.log(e));
        }
    }

    // 문제
    // selectedFile 이 변경됨과 동시에 input의 text가 바뀌지만, onChange가 발동하지 않음

    const handleFileInput1 = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        console.log('파일선택', file)
        //확장자 확인을 위한 변수
        const fileExt = file.name.split('.').pop();
        //jpg만 받겠다
        if ((fileTypes.includes(file.type) || fileExts.includes(fileExt)) &&file.size<=5000000) {
          setSelectedFile1(e.target.files[0]);
          setInputs({
              ...inputs,
              [name]: "/"+inputs.portfolio_num+"/"+1+"."+fileExt
          })
        }
        else {
          alert('지원하지 않는 파일형식입니다.');
          return;
        }
      }

      const handleFileInput2 = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        console.log('파일선택', file)
        //확장자 확인을 위한 변수
        const fileExt = file.name.split('.').pop();
        //jpg만 받겠다
        if ((fileTypes.includes(file.type) || fileExts.includes(fileExt)) &&file.size<=5000000) {
          setSelectedFile2(e.target.files[0]);
          setInputs({
              ...inputs,
              [name]: "/"+inputs.portfolio_num+"/"+2+"."+fileExt
          })
        }
        else {
          alert('지원하지 않는 파일형식입니다.');
          return;
        }
      }

      const handleFileInput3 = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        console.log('파일선택', file)
        //확장자 확인을 위한 변수
        const fileExt = file.name.split('.').pop();
        //jpg만 받겠다
        if ((fileTypes.includes(file.type) || fileExts.includes(fileExt)) &&file.size<=5000000) {
          setSelectedFile3(e.target.files[0]);
          setInputs({
              ...inputs,
              [name]: "/"+inputs.portfolio_num+"/"+3+"."+fileExt
          })
        }
        else {
          alert('지원하지 않는 파일형식입니다.');
          return;
        }
      }

      const handleFileInput = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        console.log('파일선택', file)
        //확장자 확인을 위한 변수
        const fileExt = file.name.split('.').pop();
        //jpg만 받겠다
        if ((fileTypes2.includes(file.type) || fileExts2.includes(fileExt)) &&file.size<=5000000) {
          setSelectedFile(e.target.files[0]);
          setInputs({
              ...inputs,
              [name]: file.name
          })
        }
        else {
          alert('지원하지 않는 파일형식입니다.');
          return;
        }
      }

      const fileInput1 = useRef();
      const onClickFileInput1 = () => {
        fileInput1.current.click()
      }
      const fileInput2 = useRef();
      const onClickFileInput2 = () => {
        fileInput2.current.click()
      }
      const fileInput3 = useRef();
      const onClickFileInput3= () => {
        fileInput3.current.click()
      }
      const fileInput = useRef();
      const onClickFileInput= () => {
        fileInput.current.click()
      }

  return (
    <div className='container annContainer'>
    <p>포트폴리오 {state.title}</p>
    <div className='content annContent'>
       <p>제목</p>
       <input name='portfolio_title' value={inputs.portfolio_title} type='text' onChange={onChange} />
       <p>기간</p>
       <input name='portfolio_period' value={inputs.portfolio_period} type='text' onChange={onChange} />
       <p>팀 프로젝트 / 개인 프로젝트</p>
       <input name='portfolio_etc' value={inputs.portfolio_etc} type='text' onChange={onChange} />
       <p>사진 선택 ( jpeg, jpg 파일만 지원)</p>

       <input name='portfolio_img1' style={{ display: "none" }} type='file' onChange={handleFileInput1} ref={fileInput1} />
       <button onClick={onClickFileInput1}>{'사진첨부'}</button>
       <input name='portfolio_img1' value={selectedFile1?("사진1"):''} type='text' readOnly/>
       <input name='portfolio_img2' style={{ display: "none" }} type='file' onChange={handleFileInput2} ref={fileInput2} />
       <button onClick={onClickFileInput2}>{'사진첨부'}</button>
       <input name='portfolio_img2' value={selectedFile2?("사진2"):''} type='text' readOnly/>
       <input name='portfolio_img3' style={{ display: "none" }} type='file' onChange={handleFileInput3} ref={fileInput3} />
       <button onClick={onClickFileInput3}>{'사진첨부'}</button>
       <input name='portfolio_img3' value={selectedFile3?("사진3"):''} type='text' readOnly/>
       <p>내용</p>
       <input name='portfolio_content' value={inputs.portfolio_content} type='text' onChange={onChange} />
       <p>기술스택 - 프론트</p>
       <input name='portfolio_stack_front' value={inputs.portfolio_stack_front} type='text' onChange={onChange} />
       <p>기술스택 - 백</p>
       <input name='portfolio_stack_back' value={inputs.portfolio_stack_back} type='text' onChange={onChange} />
       <p>기술스택 - 데이터베이스</p>
       <input name='portfolio_stack_db' value={inputs.portfolio_stack_db} type='text' onChange={onChange} />
       <p>관련 링크</p>
       <input name='portfolio_url' value={inputs.portfolio_url} type='text' onChange={onChange} />
       {/* <p>파일 (최대 5MB)</p>
       <input name='portfolio_file' style={{ display: "none" }} type='file' onChange={handleFileInput} ref={fileInput} />
       <input name='portfolio_file' value={selectedFile?(selectedFile.name):(inputs.portfolio_file)} type='text' readOnly/>
       <button onClick={onClickFileInput}>{'파일첨부'}</button> */}
       <div className='annWriteButton'>
          <button onClick={clickWriteBtn}>저장하기</button>
       </div>
    </div>

 </div>
  )
}

export default S_portfolio_write