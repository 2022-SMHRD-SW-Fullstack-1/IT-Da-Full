package or.kr.smhrd.portal.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import or.kr.smhrd.portal.domain.Consulting;
import or.kr.smhrd.portal.domain.Member;

@Mapper
public interface TeacherMapper {
    
    @Select("select * from t_member where course_key = UNHEX(concat(#{key},'000000000000000000000000')) and mb_job = 's'")
    public List<Member> getStdList(String course_key);

    @Select("select * from t_consulting where student = #{mb_id}")
    public List<Consulting> getConsultingList(String mb_id);

    @Update("update t_consulting set title = #{title}, content = #{content}, date = #{date} where seq = #{seq}")
    public void updateConsulting(Consulting data);

    @Insert("insert into t_consulting values(default, #{teacher}, #{student}, #{content}, #{title}, #{date})")
    public void addConsulting(Map<String, String> data);

    @Select("select seq from t_consulting where teacher = #{teacher} and student = #{student} and content = #{content} and title = #{title} and date = #{date}")
    public String getSeq(Map<String, String> data);

    @Delete("delete from t_consulting where seq = #{seq}")
    public void deleteConsulting(String seq);
}
