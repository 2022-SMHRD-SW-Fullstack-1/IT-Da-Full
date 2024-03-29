package or.kr.smhrd.portal.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.Delete;

import or.kr.smhrd.portal.domain.Member;
import or.kr.smhrd.portal.domain.StudentInfo;

@Mapper
public interface MemberMapper {

   // 회원가입 수정
   @Insert("insert into t_member values(#{mb_id}, #{mb_pw}, #{mb_name}, #{mb_job}, #{mb_birthdate},  #{mb_phone}, #{mb_addr}, #{mb_gender},  '19000101', UNHEX(concat(#{course_key},'000000000000000000000000')), '1900-01-01')")
   public int register(Member member);

   // 선생님 승인
   @Select("select mb_id, mb_name from t_member where mb_job='u'")
   public List<Map<String, String>> t_approve_list();

   @Update("update t_member set mb_job = 't' where mb_id = #{mb_id}")
   public int t_approve(String mb_id);

   // 아이디 중복 확인
   @Select("select mb_id from t_member where mb_id=#{mb_id}")
   public String id_check(String mb_id);
   
   // 선생님 승인 취소
   @Delete("delete from t_member where mb_id=#{mb_id}")
   public void t_approve_cancel(String mb_id);

   @Select("select mb_id, mb_pw, mb_name, mb_job, mb_birthdate, mb_phone, mb_addr, mb_gender, mb_expire_dt, LEFT(HEX(course_key),8) as course_key from t_member where mb_id = #{id} and mb_pw = #{pw}")
   public Member login(String id, String pw);

   @Select("select tm.mb_id as id, tm.mb_name as name, tm.mb_phone as phone, tm.mb_gender  as gender, tm.mb_birthdate as birthdate, MAX(tg.grad_school) as school, MAX(tg.school_type) as major ,GROUP_CONCAT(tc.cert_name) as certification, tr.wish_field as hope_jop, GROUP_CONCAT(tr.wish_area1 , ' ', tr.wish_area2, ' ', tr.wish_area3) as hope_city, tsi.perfect_att as example, tsi.division as division, tsi.uniqueness as special, tm.mb_addr as address from t_member tm left join t_graduation tg on tm.mb_id = tg.mb_id left join t_resume tr on tm.mb_id = tr.mb_id left join t_certification tc on tm.mb_id = tc.mb_id left join t_std_info tsi on tm.mb_id = tsi.mb_id where course_key = UNHEX(concat(#{course_key},'000000000000000000000000')) and not tm.mb_job in ('t') and tm.mb_update>'2015-01-01' group by tm.mb_id order by name")
   public List<StudentInfo> getStudentInfo(String course_key);

   @Insert("insert into t_std_info values(#{id}, '', '', '')")
   public void createStdInfo(String id);

   @Update("update t_std_info set perfect_att = #{example}, division = #{division}, uniqueness = #{special} where mb_id = #{id}")
   public void updateStdInfo(StudentInfo data);

   @Select("select tm.mb_id as id, tm.mb_name as name, tm.mb_phone as phone, tm.mb_gender  as gender, tm.mb_birthdate as birthdate, MAX(tg.grad_school) as school, MAX(tg.school_type) as major ,GROUP_CONCAT(tc.cert_name) as certification, tr.wish_field as hope_jop, GROUP_CONCAT(tr.wish_area1 , ' ', tr.wish_area2, ' ', tr.wish_area3) as hope_city, tsi.perfect_att as example, tsi.division as division, tsi.uniqueness as special, tm.mb_addr as address from t_member tm left join t_graduation tg on tm.mb_id = tg.mb_id left join t_resume tr on tm.mb_id = tr.mb_id left join t_certification tc on tm.mb_id = tc.mb_id left join t_std_info tsi on tm.mb_id = tsi.mb_id where course_key = UNHEX(concat(#{course_key},'000000000000000000000000')) and tm.mb_id = #{id} and not tm.mb_job in ('t') and tm.mb_update>'2015-01-01' group by tm.mb_id order by name")
   public StudentInfo getOneStudentInfo(String id, String course_key);

   // 회원 수정
   @Select("select mb_pw from t_member where mb_id=#{mb_id}")
   public String memberEditCheck(String mb_id);

   @Select("select * from t_member where mb_id=#{mb_id}")
   public Member memberEdit(String mb_id);

   @Update("update t_member set mb_pw=#{mb_pw}, mb_name=#{mb_name}, mb_phone=#{mb_phone}, mb_addr=#{mb_addr} where mb_id=#{mb_id}")
   public void memberEditUpdate(Map<String, String> data);

   // 회원 탈퇴
   @Update("update t_member set mb_job='d', mb_update='1900-01-01' where mb_id=#{mb_id}")
   public void memberWithdrawal(String mb_id);

   // 아이디 찾기, 비밀번호 찾기
   @Select("select mb_id from t_member where mb_name=#{name} and mb_phone=#{phone}")
   public String idInquiry(Map<String, String> data);

   @Select("select mb_id, mb_pw, mb_name, mb_job, mb_birthdate, mb_phone, mb_addr, mb_gender, mb_expire_dt, LEFT(HEX(course_key),8) as course_key from t_member where mb_id=#{id} and mb_name=#{name} and mb_phone=#{phone}")
   public Member pwInquiry(String id, String name, String phone);

}
