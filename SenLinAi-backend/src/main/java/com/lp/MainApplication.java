package com.lp;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import top.hualuo.XhStreamClient;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * 主类（项目启动入口）
 *
 */
// todo 如需开启 Redis，须移除 exclude 中的内容
//@SpringBootApplication(exclude = {RedisAutoConfiguration.class}
@SpringBootApplication(exclude = {})
@MapperScan("com.lp.mapper")
@EnableScheduling
@EnableWebSocket
@EnableAspectJAutoProxy(proxyTargetClass = true, exposeProxy = true)
@Slf4j
public class MainApplication {
    public static void main(String[] args) throws UnknownHostException {
        ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
        ConfigurableEnvironment environment = run.getEnvironment();
        String ip = InetAddress.getLocalHost().getHostAddress();
        String port = environment.getProperty("server.port");
        log.info("\n\n\n\t\t"+
                "╔══════════════════════════════════════════════════════════════╗\n\t\t"+
                "║ > Local:\t\t\thttp://localhost:"+port+"\t\t\t\t\t   ║\n\t\t"+
                "║ > Network:\t\thttp://"+ip+":"+port+"\t\t\t\t   ║\n\t\t"+
                "║ > Knife4j接口: \thttp://localhost:"+port+"/api/doc.html#/home"+"   ║\n\t\t"+
                "║ Now the backend server has successfully started↑\t\t\t   ║\n\t\t"+
                "╚══════════════════════════════════════════════════════════════╝");
    }

}
