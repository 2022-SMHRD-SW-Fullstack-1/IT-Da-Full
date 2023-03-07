package or.kr.smhrd.portal.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import or.kr.smhrd.portal.domain.Extend;
import or.kr.smhrd.portal.domain.Portfolio;
import or.kr.smhrd.portal.domain.resume.Career;
import or.kr.smhrd.portal.domain.resume.Certification;
import or.kr.smhrd.portal.domain.resume.CoverLetter;
import or.kr.smhrd.portal.domain.resume.Graduation;
import or.kr.smhrd.portal.domain.resume.Military;
import or.kr.smhrd.portal.domain.resume.Prize;
import or.kr.smhrd.portal.domain.resume.Resume;

@Mapper
public interface StudentMapper {

    // 학생 전체 이력서 조회
    @Select("select m.mb_id, m.mb_name name, m.mb_gender gender, m.mb_birthdate birthday, r.major major, m.mb_phone phone, m.mb_id email, m.mb_addr addr, r.skills, r.wish_field, r.wish_area1, r.wish_area2, r.wish_area3, r.wish_salary, r.simple_comment, r.photo, r.project, r.project2, m.mb_update update_dt from t_member m left join t_resume r on m.mb_id = r.mb_id where m.mb_job ='s'and m.mb_update>'1900-01-01' order by  m.mb_update desc")
    List<Resume> selectAllResume();

    @Select("select * from t_graduation")
    List<Graduation> selectAllGraduation();

    @Select("select * from t_career")
    List<Career> selectAllCareer();

    @Select("select * from t_certification")
    List<Certification> selectAllCertification();

    @Select("select * from t_prize")
    List<Prize> selectAllPrize();

    @Select("select * from t_military")
    List<Military> selectAllMilitary();

    // 특정 학생 이력서 조회
    @Select("select m.mb_id, m.mb_name name, m.mb_gender gender, m.mb_birthdate birthday, r.major major, m.mb_phone phone, m.mb_id email, m.mb_addr addr, r.skills, r.wish_field, r.wish_area1, r.wish_area2, r.wish_area3, r.wish_salary, r.simple_comment, r.photo, r.project, r.project2, m.mb_update update_dt from t_member m left join t_resume r on m.mb_id = r.mb_id where m.mb_job ='s' and m.mb_id =#{id}")
    Resume selectResume(String id);

    @Select("select * from t_graduation where mb_id = #{id} order by grad_idx")
    List<Graduation> selectGraduation(String id);

    @Select("select * from t_career where mb_id = #{id} order by cr_idx")
    List<Career> selectCareer(String id);

    @Select("select * from t_certification where mb_id = #{id} order by cert_idx")
    List<Certification> selectCertification(String id);

    @Select("select * from t_prize where mb_id = #{id} order by prize_idx")
    List<Prize> selectPrize(String id);

    @Select("select * from t_military where mb_id = #{id} order by mili_idx")
    List<Military> selectMilitary(String id);

    // @Select("select mb_ from t_member where mb_update")

    // 초기 이력서, 자소서 입력하기 */
    @Insert("insert into t_resume(mb_id, name, gender, phone, birthday, addr) values(#{id}, #{name}, #{gender}, #{tel}, #{bd}, #{address})")
    public void createResume(String id, String name, String gender, String tel, String bd, String address);

    @Insert("insert into t_cover_letter(coverletter_num,mb_id) values(default,#{id})")
    public void createCoverLetter(String id);

    // 모든 이력서는 단방향으로 저장(초기 화면 select-> delete&insert)
    // 이력서 수정
    @Update("update t_resume set wish_salary=#{wish_salary}, wish_area1=#{wish_area1}, wish_area2=#{wish_area2}, wish_area3=#{wish_area3} where mb_id=#{id}")
    void updateResume(Map<String, String> data);

    // 학력 제거
    @Delete("delete from t_graduation where grad_type=#{grad_type} and grad_school=#{grad_school} and grad_dt=#{grad_dt} and school_type=#{school_type} and mb_id=#{id}")
    public void deleteGraduation(Map<String, String> data);

    // 경력 제거
    @Delete("delete from t_career where cr_organization=#{cr_organization} and cr_position=#{cr_position} and cr_s_dt=#{cr_s_dt} and cr_e_dt=#{cr_e_dt} and mb_id=#{id}")
    public void deleteCareer(Map<String, String> data);

    // 자격증 제거
    @Delete("delete from t_certification where cert_org=#{cert_org} and cert_name=#{cert_name} and cert_dt=#{cert_dt} and mb_id=#{id}")
    public void deleteCertification(Map<String, String> data);

    // 수상 제거
    @Delete("delete from t_prize where prize_name=#{prize_name} and prize_org=#{prize_org} and prize_dt=#{prize_dt} and mb_id=#{id}")
    public void deletePrize(Map<String, String> data);

    // 병역 제거
    @Delete("delete from t_military where mili_title=#{mili_title} and mili_army=#{mili_army} and mb_id=#{id}")
    public void deleteMilitary(Map<String, String> data);

    //업데이트 날짜 수정
    @Update("update t_member set mb_update=now() where mb_id=#{id}")   
    public void updateUpdate(String id);
    //업데이트 날짜 수정
    @Update("update t_resume set update_dt=now() where mb_id=#{id}")   
    public void updateUpdateR(String id);

    /** 학력추가 */
    @Insert("insert into t_graduation values(default, #{id}, #{grad_school}, #{school_type}, #{grad_dt}, #{grad_type}, #{grad_score}, default)")
    void addGraduation(Map<String, String> data);

    /** 경력추가 */
    @Insert("insert into t_career values(default, #{id}, #{cr_organization}, #{cr_position}, #{cr_s_dt}, #{cr_e_dt}, #{cr_activity}, default)")
    void addCareer(Map<String, String> data);

    /** 자격증추가 */
    @Insert("insert into t_certification values(default, #{id}, #{cert_org}, #{cert_name}, #{cert_dt}, default)")
    void addCertification(Map<String, String> data);

    /** 수상추가 */
    @Insert("insert into t_prize values(default, #{id}, #{prize_org}, #{prize_name}, #{prize_dt}, default)")
    void addPrize(Map<String, String> data);

    /** 병역추가 */
    @Insert("insert into t_military values(default, #{id}, #{mili_title}, #{mili_army}, #{mili_s_dt}, #{veteran_yn}, default)")
    void addMilitary(Map<String, String> data);

    @Select("select * from t_cover_letter")
    List<CoverLetter> selectAllCoverLetter();

    @Select("select * from t_cover_letter where mb_id=#{id}")
    CoverLetter selectCoverLetter(String id);

    @Update("update t_cover_letter set growth=#{growth}, pros_cons=#{pros_cons},goal_and_crisis=#{goal_and_crisis},motivation=#{motivation} where mb_id=#{id}")
    void updateCoverLetter(Map<String, String> data);

    @Update("update t_resume set photo=#{photo} where mb_id=#{id}")
    void updatePhoto(Map<String, String> data);

    @Update("update t_resume set photo='' where mb_id=#{id}")
    void deletePhoto(Map<String, String> data);

    @Select("select * from t_portfolio where mb_id=#{id}")
    List<Portfolio> selectPortfolio(String string);

    @Insert("insert into t_portfolio values(#{portfolio_num}, #{id}, #{portfolio_title}, #{portfolio_period}, #{portfolio_etc}, #{portfolio_img1}, #{portfolio_img2}, #{portfolio_img3}, #{portfolio_content}, #{portfolio_stack_front}, #{portfolio_stack_back}, #{portfolio_stack_db}, #{portfolio_url}, #{portfolio_file}, now())")
    void addPortfolio(Map<String, String> data);
    
    @Update("update t_portfolio set portfolio_title=#{portfolio_title}, portfolio_period=#{portfolio_period}, portfolio_etc=#{portfolio_etc}, portfolio_img1=#{portfolio_img1}, portfolio_img2=#{portfolio_img2}, portfolio_img3=#{portfolio_img3}, portfolio_content=#{portfolio_content}, portfolio_stack_front=#{portfolio_stack_front}, portfolio_stack_back=#{portfolio_stack_back}, portfolio_stack_db=#{portfolio_stack_db}, portfolio_url=#{portfolio_url}, portfolio_file=#{portfolio_file} where portfolio_num=#{portfolio_num}")
    void editPortfolio(Map<String, String> data);

    @Delete("delete from t_portfolio where portfolio_num=#{portfolio_num}")
    void deletePortfolio(Map<String, String> data);

    @Select("select * from t_portfolio where portfolio_num=#{portfolio_num}")
    Portfolio selectOnePortfolio(String string);

    @Insert("insert into t_extend values(default, UNHEX(concat(#{b_num},'000000000000000000000000')), #{mb_id}, #{extend_name}, #{extend_time})")
    void addExtend(Extend extend);

    @Select("select * from t_extend where b_num = UNHEX(concat(#{b_num},'000000000000000000000000'))")
    List<Extend> selectExtend(String b_num);

    @Update("update t_extend set extend_time=#{extend_time} where extend_num = #{extend_num}")
    void editExtend(Extend extend);

    @Delete("delete from t_extend where extend_num=#{extend_num}")
    void deleteExtend(Extend extend);

    @Select("select * from t_skill where mb_id=#{id}")
    List<Map<String,String>> selectSkill(String id);

    @Insert("insert into t_skill values(#{skill_num}, #{id},#{skill_name},#{skill_grade})")
    void addSkill(Map<String, String> data);

    @Delete("delete from t_skill where skill_num=#{skill_num}")
    void deleteSkill(Map<String, String> data);

    @Select("select * from t_wish_field where mb_id=#{id}")
    List<Map<String,String>> selectWishField(String id);

    @Insert("insert into t_wish_field values(#{field_num}, #{id},#{wish_field_name})")
    void addWishField(Map<String, String> data);

    @Delete("delete from t_wish_field where field_num=#{field_num}")
    void deleteWishField(Map<String, String> data);

    @Update("update t_career set cr_idx=#{idx} where mb_id = #{id} and cr_organization=#{data.cr_organization} and cr_position=#{data.cr_position} and cr_s_dt=#{data.cr_s_dt} and cr_e_dt=#{data.cr_e_dt}")
    void careerIdx(Map<String, String> data, int idx, String id);

    @Update("update t_certification set cert_idx=#{idx} where cert_org=#{data.cert_org} and cert_name=#{data.cert_name} and cert_dt=#{data.cert_dt} and mb_id=#{id}")
    void certificationIdx(Map<String, String> data, int idx, String id);

    @Update("update t_graduation set grad_idx=#{idx} where grad_type=#{data.grad_type} and grad_school=#{data.grad_school} and grad_dt=#{data.grad_dt} and school_type=#{data.school_type} and mb_id=#{id}")
    void graduationIdx(Map<String, String> data, int idx, String id);

    @Update("update t_military set mili_idx=#{idx} where mili_title=#{data.mili_title} and mili_army=#{data.mili_army} and mb_id=#{id}")
    void militaryIdx(Map<String, String> data, int idx, String id);

    @Update("update t_prize set prize_idx=#{idx} where prize_name=#{data.prize_name} and prize_org=#{data.prize_org} and prize_dt=#{data.prize_dt} and mb_id=#{id}")
    void prizeIdx(Map<String, String> data, int idx, String id);

    @Update("update t_resume set skills=#{skill} where mb_id=#{id}")
    void updateSkill(String id, String skill);

    @Update("update t_resume set wish_field=#{wish_field} where mb_id=#{id}")
    void updateWishField(String id, String wish_field);


}
