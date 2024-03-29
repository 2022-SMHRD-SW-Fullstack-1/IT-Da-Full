package or.kr.smhrd.portal.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import or.kr.smhrd.portal.domain.Company;
import or.kr.smhrd.portal.domain.Enterprise;

@Mapper
public interface EnterpriseMapper {

    // 기업 리스트 불러오기
    @Select("select * from t_enterprise")
    public List<Enterprise> selectAllEnterprise();

    // 기업정보 수정
    @Update("update t_enterprise set enter_pw=#{enter_pw}, enter_manager=#{enter_manager}, enter_tel=#{enter_tel}, enter_address=#{enter_address} where enter_id= #{enter_id}")
    public void editEnterprise(Enterprise enterprise);

    // 기업삭제
    @Delete("delete from t_enterprise where enter_id=#{enter_id}")
    public void deleteEnterprise(Enterprise enterprise);

    // 기업공고 생성
    @Insert("insert into t_company value(null, default, #{company_name}, #{company_deadline}, #{company_area}, #{company_employ}, #{company_grade}, #{company_position}, #{company_qual}, #{company_essential}, #{company_advantage}, #{company_etc}, #{company_salary}, #{company_apply})")
    public void makeCompany(Company company);

    // 공고 리스트 불러오기
    @Select("SELECT  tc.company_num,tc.company_register, tc.company_name, tc.company_deadline,tc.company_area,tc.company_employ,tc.company_grade,tc.company_position ,tc.company_qual,tc.company_essential,tc.company_advantage,tc.company_etc,tc.company_salary,tc.company_apply,COUNT(tb.company_num) company_count FROM t_company tc left outer join t_bookmark_company tb on tb.company_num = tc.company_num group by tc.company_num , tb.company_num,tc.company_register, tc.company_deadline,tc.company_area,tc.company_employ,tc.company_grade,tc.company_position,tc.company_qual,tc.company_essential,tc.company_advantage,tc.company_etc,tc.company_salary,tc.company_apply order by tc.company_deadline")
    public List<Map<String, Object>> selectCompany();

    // 공고 수정
    @Update("update t_company set company_deadline=#{company_deadline}, company_area=#{company_area}, company_employ=#{company_employ}, company_grade=#{company_grade}, company_position=#{company_position}, company_qual=#{company_qual}, company_essential=#{company_essential}, company_advantage=#{company_advantage}, company_etc=#{company_etc}, company_salary=#{company_salary}, company_apply=#{company_apply} where company_num=#{company_num}")
    public void editCompany(Company company);

    // 공고 삭제
    @Delete("delete from t_company where company_num=#{company_num}")
    public void deleteCompany(Company company);

    // 해당 기업 공고 가져오기
    @Select("select * from t_company where company_name=#{company_name} order by company_deadline")
    public List<Company> selectOneCompany(String company_name);

    // 기업 회원가입
    @Insert("insert into t_enterprise value(#{enter_id}, #{enter_pw}, #{enter_name}, #{enter_manager}, #{enter_tel}, 'N', #{enter_address}, #{enter_num} )")
    public void register(Enterprise enterprise);

    // 기업 로그인
    @Select("select * from t_enterprise where enter_id = #{id} and enter_pw = #{pw}")
    public Enterprise login(String id, String pw);

    // 위젯 기업리스트
    @Select("select enter_name, enter_id from t_enterprise where enter_approve='N'")
    public List<Enterprise> enterApproveList(String enter_name, String enter_id);

    // 관리자 기업 승인
    @Update("update t_enterprise set enter_approve='Y' where enter_id=#{enter_id}")
    public void enterApprove(String enter_id);

    
}
