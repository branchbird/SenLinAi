package com.lp.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;
import top.hualuo.XhStreamClient;


@Configuration
@EnableWebSocket
public class WebSocketConfig {
    /**
     * 注入一个ServerEndpointExporter,
     * 该Bean会自动注册使用@ServerEndpoint注解申明的websocket endpoint
     */
//    @Bean
//    public ServerEndpointExporter serverEndpointExporter() {
//        return new ServerEndpointExporter();
//    }
    @Bean
    public XhStreamClient xhStreamClient (){
        return XhStreamClient.builder()
                .apiHost("spark-api.xf-yun.com")
                .apiPath("/v1.1/chat")
                .appId("017ef392")
                .apiKey("59c171376c6a80948eb5c3959bcf1d41")
                .apiSecret("N2Q0NDAzOGI3MGEyOTdiYzFiMTA3OTA2")
                .build();
    }

}