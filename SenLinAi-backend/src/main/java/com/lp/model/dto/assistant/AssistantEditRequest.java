package com.lp.model.dto.assistant;

import lombok.Data;

import java.io.Serializable;

@Data
public class AssistantEditRequest implements Serializable {

    /**
     * id
     */
    private Long id;

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
     * wait,running,succeed,failed
     */
    private String status;

    /**
     * 执行信息
     */
    private String execMessage;

    /**
     * 问题类型, 见dict
     */
    private Long dictId;

    private static final long serialVersionUID = 1L;
}
