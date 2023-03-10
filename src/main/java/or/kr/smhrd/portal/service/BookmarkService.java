package or.kr.smhrd.portal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import or.kr.smhrd.portal.domain.Bookmark;
import or.kr.smhrd.portal.domain.Bookmark_company;
import or.kr.smhrd.portal.mapper.BookmarkMapper;

@Service
public class BookmarkService {
    
    @Autowired
    BookmarkMapper bookmarkMapper;
    
    // 기업이 수료생 북마크
    public void addBookmark(Bookmark bookmark){
        System.out.println(bookmark);
        bookmarkMapper.addBookmark(bookmark);
    }

    public List<String> selectBookmark(String enter_id){
        return bookmarkMapper.selectBookmark(enter_id);
    }

    public void deleteBookmark(Bookmark bookmark){
        bookmarkMapper.deleteBookmark(bookmark);
    }

    //수료생이 기업 북마크
    public void addBookmarkCompany(Bookmark_company bookmark_company){
        bookmarkMapper.addBookmarkCompany(bookmark_company);
    }

    public List<String> selectBookmarkCompany(String mb_id){
        return bookmarkMapper.selectBookmarkCompany(mb_id);
    }

    public void deleteBookmarkCompany(Bookmark_company bookmark){
        bookmarkMapper.deleteBookmarkCompany(bookmark);
    }

    //북마크 개수

    public List<Bookmark_company> bookmarkCount(){
        return bookmarkMapper.bookmarkCount();
    }
}
