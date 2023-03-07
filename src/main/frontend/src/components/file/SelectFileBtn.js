import React, { useRef } from 'react'
/**input파일 컴포넌트
 * 1. 버튼에 넣을 텍스트
 * 2. 파일을 담을 변수를 수정해줄 setSelectedFile
 * 3. 파일 타입 리스트 예시) const fileTypes=['/image/jpeg', 'image/jpg']
 * 4. 파일 확장자 리스트 예시) const fileExts=['jpeg', 'jpg']
*/
const SelectFileBtn = ({ btnText, setFileImage, setSelectedFile, fileTypes, fileExts }) => {

  const imageInput = useRef();
  const onClickFileInput = () => {
    imageInput.current.click()
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log('파일선택', file)
    //확장자 확인을 위한 변수
    const fileExt = file.name.split('.').pop();
    //jpg만 받겠다
    if ((fileTypes.includes(file.type) || fileExts.includes(fileExt)) &&file.size<=5000000) {
      setSelectedFile(e.target.files[0]);
      setFileImage(URL.createObjectURL(e.target.files[0]));
    }
    else {
      alert('지원하지 않는 파일형식입니다.');
      return;
    }
  }
  return (
    <div className='imgSelBtn'>
      <input type='file' style={{ display: "none" }} onChange={handleFileInput} ref={imageInput} />
      <button onClick={onClickFileInput}>{btnText}</button>
    </div>
  )
}

export default SelectFileBtn