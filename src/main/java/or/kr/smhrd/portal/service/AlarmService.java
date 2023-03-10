package or.kr.smhrd.portal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import or.kr.smhrd.portal.domain.Alarm;
import or.kr.smhrd.portal.mapper.AlarmMapper;

@Service
public class AlarmService {

    @Autowired
    AlarmMapper alarmMapper;

    public List<Alarm> selectNewAlarm(String mb_id_to) {
        return alarmMapper.selectNewAlarm(mb_id_to);
    }

    public List<Alarm> selectAllAlarm(String mb_id_to) {
        return alarmMapper.selectAllAlarm(mb_id_to);
    }

    public void checkAlarm(Alarm alarm_num) {
        alarmMapper.checkAlarm(alarm_num);
    }

    public void deleteAlarm(Alarm alarm_num) {
        System.out.println("받아온 값" + alarm_num);
        alarmMapper.deleteAlarm(alarm_num);
    }

    public String alarmCount(String mb_id_to) {
        return alarmMapper.alarmCount(mb_id_to);
    }

    public void clearNewAlarm(String mb_id_to) {
        alarmMapper.clearNewAlarm(mb_id_to);
    }

    public void addSAlarm(Alarm alarm) {
        alarmMapper.addSAlarm(alarm);
    }

    public void addTAlarm(Alarm alarm) {
        alarmMapper.addTAlarm(alarm);
    }

    public void stdAddAlarm(String mb_id_from, String course_key, String alarm_content) {
        alarmMapper.stdAddAlarm(mb_id_from, course_key, alarm_content);
    }

    // 기업 알림
    public void enterAddAlarm(Alarm alarm) {
        alarmMapper.enterAddAlarm(alarm);
    }

    // 연구원 찾기
    public String selectTeacher(String mb_id_to) {
        return alarmMapper.selectTeacher(mb_id_to);
    }

    public String selectTeacher2(String course_key) {
        return alarmMapper.selectTeacher2(course_key);
    }
}
