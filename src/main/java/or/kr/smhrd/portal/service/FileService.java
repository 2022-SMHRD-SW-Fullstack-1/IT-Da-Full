package or.kr.smhrd.portal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import or.kr.smhrd.portal.mapper.FileMapper;

@Service
public class FileService {

    @Autowired
    FileMapper fileMapper;

    public void uploadResume(String id, String path){
        fileMapper.uploadResume(id, path);
    }
    public void deleteResume(String id, String path){
        fileMapper.deleteResume(id, path);
    }
    public void uploadPortfolio(String id, String path, int idx, String num){
        fileMapper.uploadPortfolio(id, path, idx, num);
    }
    public void deletePortfolio(String id, String path){
        fileMapper.deletePortfolio(id, path);
    }
    public void uploadBoard(String id, String path, String num){
        fileMapper.uploadBoard(id, path, num);
    }
    public void deleteBoard(String id, String path){
        fileMapper.deleteBoard(id, path);
    }
}
