package or.kr.smhrd.portal.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/")
@RestController
public class HomeController {

    @ResponseBody
    @RequestMapping(value = "/m_main", method = RequestMethod.GET, produces = "application/json; charset=utf8")
    public String name() {
        return "";
    }
}
