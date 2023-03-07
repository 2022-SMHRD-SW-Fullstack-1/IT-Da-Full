import axios from 'axios';
const UploadBtn = ({ btn_text, selectedFile, resume, setResume }) => {

    //파일 업로드
    const uploadFile = () => {
        console.log(selectedFile)
        //업로드를 위한 파라미터 설정

        const formData = new FormData();
        formData.append('file', selectedFile)
        formData.append('id', sessionStorage.getItem("loginId"))
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        selectedFile
        &&axios
          .post('/file/upload',formData,config)
        .then((res)=>{
          console.log(res)
        })
        .catch((e)=>{console.error(e)}
        )
    }

    // 렌더와 동시에 실행이 되는 문제 발생 -> 조건문 써서 임시로 차단
    // 파일 삭제
    const deleteFile = () => {
      console.log("delete")
      const formData = new FormData();
      formData.append('id', sessionStorage.getItem("loginId"))
      formData.append('path', resume.photo)
      axios
      .post("/student/photo/delete",{
          photo:resume.photo,
          id: sessionStorage.getItem("loginId")
                })
      .then(res=>{
        console.log(res)        
        axios.post("/file/delete",formData)
      })
      .then(res => {
        console.log(res)
        setResume({
           ...resume,
          photo: '',
        })

      })
      .catch(e => console.error(e))
      console.log(resume.photo)
            

    }

  return (
    <div className='fileDiv'>
        <button onClick={selectedFile?(uploadFile):null}>{btn_text}</button>
        <button onClick={resume.photo?(deleteFile):null}>삭제</button>
    </div>
  )
}

export default UploadBtn