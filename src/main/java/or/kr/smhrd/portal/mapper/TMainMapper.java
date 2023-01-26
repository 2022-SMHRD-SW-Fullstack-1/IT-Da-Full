package or.kr.smhrd.portal.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import or.kr.smhrd.portal.domain.Board;
import or.kr.smhrd.portal.domain.Course;

@Mapper
public interface TMainMapper {
   
   @Insert("insert into t_board values(default, #{title}, #{content}, '', now(), #{id}, '공지사항', UNHEX(concat(#{key},'000000000000000000000000')))")
   public void addPost(String title, String content, String id, String key);

   @Update("update t_board set b_title = #{title}, b_content = #{content} where b_num = UNHEX(concat(#{b_num},'000000000000000000000000'))")
   public void editPost(String title, String content, String b_num);

   @Select("select LEFT(HEX(b_num),8) as b_num, b_title, b_content, b_file, DATE_FORMAT(b_dt,'%Y-%m-%d'), mb_id from t_board where course_key = UNHEX(concat(#{key},'000000000000000000000000')) and b_type = '공지사항' order by b_dt desc")
   public List<Board> getPost(String key);

   @Select("select LEFT(HEX(b_num),8) as b_num, b_title, b_content, b_file, DATE_FORMAT(b_dt,'%Y-%m-%d'), mb_id from t_board where b_num = UNHEX(concat(#{key},'000000000000000000000000'))")
   public Board getOnePost(String key);

   @Delete("delete from t_board where b_num = UNHEX(concat(#{b_num},'000000000000000000000000'))")
   public void deletePost(String key);

   
   @Insert("insert into t_board values(default, #{title}, #{content}, '', now(), #{id}, '자료실', UNHEX(concat(#{key},'000000000000000000000000')))")
   public void addArchive(String title, String content, String id, String key);

   @Update("update t_board set b_title = #{title}, b_content = #{content} where b_num = UNHEX(concat(#{b_num},'000000000000000000000000'))")
   public void editArchive(String title, String content, String b_num);

   @Select("select LEFT(HEX(b_num),8) as b_num, b_title, b_content, b_file, DATE_FORMAT(b_dt,'%Y-%m-%d'), mb_id from t_board where course_key = UNHEX(concat(#{key},'000000000000000000000000')) and b_type = '자료실' order by b_dt desc")
   public List<Board> getArchive(String key);

   @Select("select LEFT(HEX(b_num),8) as b_num, b_title, b_content, b_file, DATE_FORMAT(b_dt,'%Y-%m-%d'), mb_id from t_board where b_num = UNHEX(concat(#{key},'000000000000000000000000'))")
   public Board getOneArchive(String key);

   @Delete("delete from t_board where b_num = UNHEX(concat(#{b_num},'000000000000000000000000'))")
   public void deleteArchive(String key);


   @Select("select * from t_course where course_key = UNHEX(concat(#{key},'000000000000000000000000'))")
   public Course getCourseInfo(String key);
}
