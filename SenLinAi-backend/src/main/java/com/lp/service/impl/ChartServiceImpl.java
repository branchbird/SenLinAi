package com.lp.service.impl;


import cn.hutool.core.io.FileUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lp.common.ErrorCode;
import com.lp.exception.BusinessException;
import com.lp.exception.ThrowUtils;
import com.lp.mapper.ChartMapper;
import com.lp.model.entity.Chart;
import com.lp.model.enums.FileUploadBizEnum;
import com.lp.service.ChartService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@Service
public class ChartServiceImpl extends ServiceImpl<ChartMapper, Chart> implements ChartService {
    /**
     * 校验文件
     *
     * @param multipartFile
     */
    public void validFile(MultipartFile multipartFile) {
        /**
         * 校验文件
         *
         * 首先,拿到用户请求的文件;
         * 取到原始文件大小
         */
        long size = multipartFile.getSize();
        // 取到原始文件名
        String originalFilename = multipartFile.getOriginalFilename();

        /**
         * 校验文件大小
         *
         * 定义一个常量表示1MB = 1024*1024(Byte)
         */
        final long ONE_MB = 1024 * 1024L;
        // 如果文件大小,大于一兆,就抛出异常,并提示文件超过1M
        ThrowUtils.throwIf(size > ONE_MB, ErrorCode.PARAMS_ERROR, "文件超过 1M");

        /**
         * 校验文件后缀
         *
         * 利用FileUtil工具类中的getSuffix方法获取文件后缀名
         */
        String suffix = FileUtil.getSuffix(originalFilename);
        // 定义合法的后缀列表
        final List<String> validFileSuffixList = Arrays.asList("xlsx","xls");
        // 如果suffix的后缀不在List的范围内,抛出异常,并提示'文件后缀非法'
        ThrowUtils.throwIf(!validFileSuffixList.contains(suffix), ErrorCode.PARAMS_ERROR, "文件后缀非法");
        return;
    }

}
