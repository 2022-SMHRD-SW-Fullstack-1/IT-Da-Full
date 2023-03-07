package or.kr.smhrd.portal.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import or.kr.smhrd.portal.domain.Alarm;
import or.kr.smhrd.portal.domain.Member;
import or.kr.smhrd.portal.domain.StudentInfo;
import or.kr.smhrd.portal.service.EnterpriseService;
import or.kr.smhrd.portal.service.MemberService;

@RequiredArgsConstructor
@RequestMapping("/member")
@RestController
public class MemberRestController {

   private final MemberService memberService;

   @Autowired
   EnterpriseService enterpriseService;

   @PostMapping("/register")
   public int register(@RequestBody Map<String, String> data) {
      return memberService.register(data);
   }

   @PostMapping("/login")
   public Member login(@RequestBody Map<String, String> data) {
      return memberService.login(data);
   }

   @PostMapping("/getStudentInfo")
   public List<StudentInfo> getStudentInfo(@RequestBody Map<String, String> data) {
      return memberService.getStudentInfo(data);
   }

   @PostMapping("/updateStdInfo")
   public void updateStdInfo(@RequestBody Map<String, List<StudentInfo>> data) {
      memberService.updateStdInfo(data.get("stdInfo"));
   }

   

//마이페이지 보안체크
@GetMapping("/memberEditCheck")
public String memberEditCheck(@RequestParam Map<String,String> data) {
 System.out.println(data);
 String pw = data.get("mb_pw");
 String db_pw = memberService.memberEditCheck(data.get("mb_id"));
  
 if(pw.equals(db_pw)){
   return "success";
 }else{
   return"fail";
 }
}

// 회원 정보 수정
@GetMapping("/memberEdit")
public Member memberEdit(@RequestParam Map<String,String> data) {
   System.out.println(data);
   return memberService.memberEdit(data.get("mb_id"));
}
@PostMapping("/memberEditUpdate")
public void memberEditUpdate(@RequestBody Map<String,String> data) {
   System.out.println(data);
   memberService.memberEditUpdate(data);
}


}
