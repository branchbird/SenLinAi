package com.lp.manager;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;

import javax.websocket.server.ServerEndpoint;
import java.util.concurrent.TimeUnit;

@SpringBootTest
@Component
@ServerEndpoint(value = "/websocket")
class AiHelpManagerTest {

//    @Resource
//    private AiHelpManager yuCongMingManager;
//    @Autowired
//    private static SparkDeskListenerManager sparkDeskListenerManager;
////     注入的时候，给类的 service 注入
//    @Autowired
//    public void setSparkDeskManager(SparkDeskListenerManager sparkDeskListenerManager) {
//        AiHelpManagerTest.sparkDeskListenerManager = sparkDeskListenerManager;
//    }
//
//    @Test
//    void doChat() {
//        long  UId = 1669243969885712385L;
////        String answer = yuCongMingManager.YuCongMingChat(UId,"怎么样做回锅肉");
////        sparkDeskListenerManager.SparkDeskChat(Long.toString(UId),"怎么样做回锅肉");
//        //https://blog.csdn.net/weixin_47872288/article/details/119579703
//        while (sparkDeskListenerManager.status != 2) {
//            try {
//                TimeUnit.MILLISECONDS.sleep(250);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//        }
//        String answer = sparkDeskListenerManager.answer;
//        System.out.println("----------------------------------------------------\nTest answer:"+answer);
//    }
}