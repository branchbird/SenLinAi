package com.lp.model.dto.assistant;
import lombok.Data;

import java.io.Serializable;

@Data
public class AssistantAddRequest implements Serializable {

    /**
     * 问题名称
     */
    private String name;

    /**
     * 问题概述
     */
    private String goal;

    /**
     * 问答结果
     */
    private String questionRes;

    /**
     * 执行信息
     */
    private String execMessage;

    /**
     * 问题类型, 见dict
     */
    private Long dictId;

    /**
     * 创建用户 id
     */
    private Long userId;
    private static final long serialVersionUID = 1L;
}

