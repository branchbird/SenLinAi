package com.lp.manager;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.Getter;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.websocket.server.ServerEndpoint;
import java.net.URL;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class SparkDeskListenerManager extends WebSocketListener{
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

    public void SparkDeskChat(String uid, String question){
        this.question = question;
        this.UID = uid;
        try {
            //构建鉴权httpurl
            String authUrl = getAuthorizationUrl(hostUrl,APIKEY,APISecret);
            OkHttpClient okHttpClient = new OkHttpClient.Builder().build();
            String url = authUrl.replace("https://","wss://").replace("http://","ws://");
            Request request = new Request.Builder().url(url).build();
            WebSocket webSocket = okHttpClient.newWebSocket(request,new SparkDeskListenerManager());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getAnswer(){
        return  answer;
    }
    //鉴权url
    public String getAuthorizationUrl(String hostUrl , String apikey ,String apisecret) throws Exception {
        //获取host
        URL url;
        if(hostUrl != null){
            url = new URL(hostUrl);
        }else {
            return null;
        }
        //获取鉴权时间 date
        SimpleDateFormat format = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z", Locale.US);
//       System.out.println("format:\n" + format );
        format.setTimeZone(TimeZone.getTimeZone("GMT"));
        String date = format.format(new Date());
        //获取signature_origin字段
        StringBuilder builder = new StringBuilder("host: ").append(url.getHost()).append("\n").
                append("date: ").append(date).append("\n").
                append("GET ").append(url.getPath()).append(" HTTP/1.1");
//       System.out.println("signature_origin:\n" + builder);
        //获得signatue
        Charset charset = Charset.forName("UTF-8");
        Mac mac = Mac.getInstance("hmacsha256");
        SecretKeySpec sp = new SecretKeySpec(apisecret.getBytes(charset),"hmacsha256");
        mac.init(sp);
        byte[] basebefore = mac.doFinal(builder.toString().getBytes(charset));
        String signature = Base64.getEncoder().encodeToString(basebefore);
        //获得 authorization_origin
        String authorization_origin = String.format("api_key=\"%s\",algorithm=\"%s\",headers=\"%s\",signature=\"%s\"",apikey,"hmac-sha256","host date request-line",signature);
        //获得authorization
        String authorization = Base64.getEncoder().encodeToString(authorization_origin.getBytes(charset));
        //获取httpurl
        HttpUrl httpUrl = HttpUrl.parse("https://" + url.getHost() + url.getPath()).newBuilder().
                addQueryParameter("authorization", authorization).
                addQueryParameter("date", date).
                addQueryParameter("host", url.getHost()).
                build();
        return httpUrl.toString();
    }
    //重写onopen
   @Override
   public void onOpen(WebSocket webSocket, Response response) {
        super.onOpen(webSocket, response);
        new Thread(()->{
            JsonObject frame = new JsonObject();
            JsonObject header = new JsonObject();
            JsonObject chat = new JsonObject();
            JsonObject parameter = new JsonObject();
            JsonObject payload = new JsonObject();
            JsonObject message = new JsonObject();
            JsonObject text = new JsonObject();
            JsonArray ja = new JsonArray();

            //填充header
            String app_id = "017ef392";
            header.addProperty("app_id",app_id);

            String uid = this.UID;
            if(uid == null){
                uid = "1509298270L";
            }
            header.addProperty("uid",uid);

            //填充parameter
            //domain string 取值为 general 指定访问的领域
            chat.addProperty("domain","general");
            //temperature float 取值为[0,1],默认为0.5 核采样阈值。用于决定结果随机性，取值越高随机性越强即相同的问题得到的不同答案的可能性越高
            chat.addProperty("temperature",0.5);
            //max_tokens int 取值为[1,4096]，默认为2048 模型回答的tokens的最大长度
            chat.addProperty("max_tokens",2048);
            chat.addProperty("auditing","default");
            //top_k	int 取值为[1，6],默认为4 从k个候选中随机选择⼀个（⾮等概率）
            chat.addProperty("top_k",3);
            parameter.add("chat",chat);

            //填充payload
            //role string 取值为[user,assistant] user表示是用户的问题，assistant表示AI的回复
            text.addProperty("role","user");
            //content string 所有content的累计tokens需控制8192以内 用户和AI的对话内容
            text.addProperty("content",question);
            ja.add(text);
    //            message.addProperty("text",ja.getAsString());
            message.add("text",ja);
            payload.add("message",message);
            frame.add("header",header);
            frame.add("parameter",parameter);
            frame.add("payload",payload);
//            System.out.println("frame:\n" + frame.toString());
            webSocket.send(frame.toString());
        }
        ).start();
   }

    //重写onmessage
    @Override
    public void onMessage(WebSocket webSocket, String text) {
        super.onMessage(webSocket, text);
        ResponseData responseData = json.fromJson(text,ResponseData.class);
        //status int 文本响应状态，取值为[0,1,2]; 0代表首个文本结果；1代表中间文本结果；2代表最后一个文本结果
        status = -1;
        if(0 == responseData.getHeader().get("code").getAsInt()){
            if(2 != responseData.getHeader().get("status").getAsInt()){
                Payload pl = json.fromJson(responseData.getPayload(),Payload.class);
                JsonArray temp = (JsonArray) pl.getChoices().get("text");
                JsonObject jo = (JsonObject) temp.get(0);
                answer += jo.get("content").getAsString();
                System.out.println(answer);
            }else {
                status = responseData.getHeader().get("status").getAsInt();
                System.out.println(responseData.getHeader().get("status").getAsInt());
                System.out.println("status:"+status);

                Payload pl1 = json.fromJson(responseData.getPayload(),Payload.class);
                JsonObject jsonObject = (JsonObject) pl1.getUsage().get("text");
                //prompt_tokens	int	包含历史问题的总tokens大小
                int prompt_tokens = jsonObject.get("prompt_tokens").getAsInt();
                JsonArray temp1 = (JsonArray) pl1.getChoices().get("text");
                JsonObject jo = (JsonObject) temp1.get(0);
                answer += jo.get("content").getAsString();
                System.out.println(answer);
                webSocket.close(3,"客户端主动断开链接");
            }
        }else{
            System.out.println("返回结果错误：\n" + responseData.getHeader().get("code") +  responseData.getHeader().get("message") );
        }
    }

    //重写onFailure
    @Override
    public void onFailure(WebSocket webSocket, Throwable t, Response response) {
        super.onFailure(webSocket, t, response);
//        System.out.println(response);
    }

    @Getter
    class ResponseData{
        private  JsonObject header;
        private  JsonObject payload;
    }
    @Getter
    class Header{
        private int code ;
        private String message;
        private String sid;
        private String status;
    }
    @Getter
    class Payload{
        private JsonObject choices;
        private JsonObject usage;
    }
    @Getter
    class Choices{
        private int status;
        private int seq;
        private JsonArray text;
    }
}
