package com.lp.config;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import top.hualuo.XhStreamClient;
public class SparkDeskStreamClient {
    @Value("${sparkDesk.hostUrl}")
    public String hostUrl;
    @Value("${sparkDesk.APISecret}")
    public String APISecret;//从开放平台控制台中获取
    @Value("${sparkDesk.APIKEY}")
    public String APIKEY;//从开放平台控制台中获取
    @Value("${sparkDesk.APPID}")
    public String APPID;//从开放平台控制台中获取
    public final Gson json = new Gson();
    public String question = "你是谁";//可以修改question 内容，来向模型提问
    public String answer = "answer:";
    public String UID;//每个用户的id，用于区分不同用户
    public int status;
//    @Bean
    public XhStreamClient xhStreamClient (){
        return XhStreamClient.builder()
                .apiHost("spark-api.xf-yun.com")
                .appId("/v1.1/chat")
                .apiKey(APIKEY)
                .apiSecret(APISecret)
                .build();
    }
}
