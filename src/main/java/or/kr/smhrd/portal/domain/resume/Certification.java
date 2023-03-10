package or.kr.smhrd.portal.domain.resume;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certification {
    String cert_num;
    String mb_id;
    String cert_org;
    String cert_name;
    String cert_dt;
}
