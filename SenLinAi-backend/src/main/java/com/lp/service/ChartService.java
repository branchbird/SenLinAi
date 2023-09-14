package com.lp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lp.model.entity.Chart;
import com.lp.model.enums.FileUploadBizEnum;
import org.springframework.web.multipart.MultipartFile;

/**
* @author bird
* @description 针对表【chart(图表信息表)】的数据库操作Service
* @createDate 2023-06-10 15:05:12
*/
public interface ChartService extends IService<Chart> {
    public void validFile(MultipartFile multipartFile);
}
