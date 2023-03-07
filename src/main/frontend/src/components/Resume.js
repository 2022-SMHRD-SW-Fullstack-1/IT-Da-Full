import React from 'react'

import '../css/Resume.css'

const Resume = () => {

   

   return (
      <div className='topDiv_resume'>
         <div className='r_basic'>
            <div>
               <img style={{ width: '6rem', height: '8rem', backgroundColor: 'black' }} />
            </div>
            <div>
               <div>
                  <p>유성용</p>
                  <p>남자 / 1995년생</p>
               </div>
               <div>
                  <div>
                     <p>연락처</p>
                     <p>010-5497-1234</p>
                  </div>
                  <div>
                     <p>이메일</p>
                     <p>suseong77@naver.com</p>
                  </div>
                  <div>
                     <p>주소</p>
                     <p>광주광역시 광산구 풍영로170번길 39-25 (광주 수완대주피오레 아파트)</p>
                  </div>
                  <div>
                     <p>희망지역</p>
                     <p>서울, 광주, 경기</p>
                  </div>
               </div>
            </div>
         </div>
         <div>
            <p>학력</p>
            <table>
               <thead>
                  <tr>
                     <th>학교명</th>
                     <th>전공</th>
                     <th>기간</th>
                     <th>구분</th>
                     <th>학점</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>전남대학교</td>
                     <td>소프트웨어전공</td>
                     <td>2022-02-02 ~ 2026-02-02</td>
                     <td>졸업</td>
                     <td>4.4/4.5</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div>
            <p>경력 · 교육</p>
            <table>
               <thead>
                  <tr>
                     <th>기관명</th>
                     <th>직책</th>
                     <th>기간</th>
                     <th>직무/활동사항</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>스마트인재개발원</td>
                     <td>훈련생</td>
                     <td>2022-02-02 ~ 2026-02-02</td>
                     <td>Full Stack SW융합 실무 부트캠프</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div>
            <p>자격증</p>
            <table>
               <thead>
                  <tr>
                     <th>자격증명</th>
                     <th>발급기관</th>
                     <th>발급일자</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>SQLD</td>
                     <td>한국데이터산업진흥원</td>
                     <td>2022-02-02</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div>
            <p>수상내역</p>
            <table>
               <thead>
                  <tr>
                     <th>수상명</th>
                     <th>내용</th>
                     <th>수상일자</th>
                     <th>기관명</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>최우수상</td>
                     <td>캡스톤대회</td>
                     <td>2022-02-02</td>
                     <td>스마트인재개발원</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div>
            <p>병역</p>
            <table>
               <thead>
                  <tr>
                     <th>구분</th>
                     <th>군별</th>
                     <th>복무기간</th>
                     <th>보훈대상</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>필</td>
                     <td>육군</td>
                     <td>2015-07-25 ~ 2017-10-26</td>
                     <td>없음</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div>
            <p>기술스택</p>
            <div>
               블라블라~
            </div>
         </div>
      </div>
   )
}

export default Resume