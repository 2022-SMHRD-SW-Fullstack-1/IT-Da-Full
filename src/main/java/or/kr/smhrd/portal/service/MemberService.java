package or.kr.smhrd.portal.service;

import or.kr.smhrd.portal.domain.Alarm;
import or.kr.smhrd.portal.domain.Member;
import or.kr.smhrd.portal.domain.StudentInfo;
import or.kr.smhrd.portal.mapper.MemberMapper;
import or.kr.smhrd.portal.mapper.StudentMapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {

   private final MemberMapper memberMapper;
   private final StudentMapper studentMapper;

   public int register(Map<String, String> data) {
      int i = memberMapper.register(new Member(
            data.get("id"),
            data.get("pw"),
            data.get("name"),
            "s",
            data.get("bd").replaceAll("-", ""),
            data.get("tel"),
            data.get("address"),
            data.get("gender"),
            data.get("expire"),
            data.get("key")));
      studentMapper.createResume(
            data.get("id"),
            data.get("name"),
            data.get("gender").replaceAll("m", "남성").replaceAll("f", "여성"),
            data.get("tel"),
            data.get("bd"),
            data.get("address"));
      studentMapper.createCoverLetter(data.get("id"));
      memberMapper.createStdInfo(data.get("id"));
      return i;
   }

   public Member login(Map<String, String> data) {
      return memberMapper.login(data.get("id"), data.get("pw"));
   }

   public List<StudentInfo> getStudentInfo(Map<String, String> data) {
      List<StudentInfo> st_List = memberMapper.getStudentInfo(data.get("course_key"));
      return st_List;
   }

   public void updateStdInfo(List<StudentInfo> data) {
      for (StudentInfo s : data) {
         memberMapper.updateStdInfo(s);
      }
   }

   public void stdAddAlarm(String course_key, String alarm_content) {
      memberMapper.stdAddAlarm(course_key, alarm_content);
   }

}
