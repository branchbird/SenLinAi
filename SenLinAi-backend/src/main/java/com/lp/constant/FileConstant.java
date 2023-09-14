package com.lp.constant;

import org.springframework.beans.factory.annotation.Value;

/**
 * 文件常量
 */
public interface FileConstant {

    /**
     * COS 访问地址
     */
    @Value("${cos.client.host}")
    String COS_HOST = null;
}
