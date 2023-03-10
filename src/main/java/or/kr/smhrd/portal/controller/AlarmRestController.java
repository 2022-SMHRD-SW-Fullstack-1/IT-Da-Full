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

import or.kr.smhrd.portal.domain.Alarm;
import or.kr.smhrd.portal.service.AlarmService;

@RequestMapping("alarm")
@RestController
public class AlarmRestController {

    @Autowired
    AlarmService alarmService;

    @GetMapping("/selectNewAlarm")
    public List<Alarm> selectNewAlarm(@RequestParam String mb_id_to) {
        return alarmService.selectNewAlarm(mb_id_to);
    }

    @GetMapping("/selectAllAlarm")
    public List<Alarm> selectAllAlarm(@RequestParam String mb_id_to) {
        return alarmService.selectAllAlarm(mb_id_to);
    }

    @PostMapping("/checkAlarm")
    public void checkAlarm(@RequestBody Alarm alarm_num) {
        alarmService.checkAlarm(alarm_num);
    }

    @PostMapping("/deleteAlarm")
    public void deleteAlarm(@RequestBody Alarm alarm_num) {
        System.out.println("받아온 값" + alarm_num);
        alarmService.deleteAlarm(alarm_num);
    }

    @GetMapping("/alarmCount")
    public String alarmCount(@RequestParam String mb_id_to) {
        return alarmService.alarmCount(mb_id_to);
    }

    @PostMapping("/clearNewAlarm")
    public void clearNewAlarm(@RequestBody String mb_id_to) {
        alarmService.clearNewAlarm(mb_id_to);
    }

    @PostMapping("/addSAlarm")
    public void addSAlarm(@RequestBody Alarm alarm) {
        alarmService.addSAlarm(alarm);
    }

    @PostMapping("/addTAlarm")
    public void addTAlarm(@RequestBody Alarm alarm) {
        alarmService.addTAlarm(alarm);
    }

    @PostMapping("/stdRegisterAlarm")
    public void stdAddAlarm(@RequestBody Map<String, String> data) {
        alarmService.stdAddAlarm(data.get("mb_id_from"), data.get("course_key"), data.get("alarm_content"));
    }

    // 기업 알림
    @PostMapping("/enterRegisterAlarm")
    public void enterAddAlarm(@RequestBody Alarm alarm) {
        alarmService.enterAddAlarm(alarm);
    }

    // 연구원 찹기
    @GetMapping("/selectTeacher")
    public String selectTeacher(@RequestParam String mb_id_to) {
        return alarmService.selectTeacher(mb_id_to);
    }

    @GetMapping("/selectTeacher2")
    public String selectTeacher2(@RequestParam String course_key) {
        return alarmService.selectTeacher2(course_key);
    }

}
