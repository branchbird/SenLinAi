package com.lp.manager;

import com.lp.common.ErrorCode;
import com.lp.config.YuCongMingClientHelper;
import com.lp.exception.BusinessException;
import com.yupi.yucongming.dev.common.BaseResponse;
import com.yupi.yucongming.dev.model.DevChatRequest;
import com.yupi.yucongming.dev.model.DevChatResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;

/**
 * 用于对接 AI 平台
 */
@Configuration
@AllArgsConstructor
public class AiHelpManager {

    private final YuCongMingClientHelper yuCongMingClientHelper;


    /**
     * AI 对话
     *
     * @param message
     * @return
     */
    public String YuCongMingChat(Long chartId, String message) {
        // 第三步，构造请求参数
        DevChatRequest devChatRequest = new DevChatRequest();
        // 模型id，尾后加L，转成long类型
        devChatRequest.setModelId(chartId);
        devChatRequest.setMessage(message);
        // 第四步，获取响应结果
        BaseResponse<DevChatResponse> response = yuCongMingClientHelper.doChat(devChatRequest);
        // 如果响应为null，就抛出系统异常，提示“AI 响应错误”
        if (response == null) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "AI 响应错误");
        }
        return response.getData().getContent();
    }
}