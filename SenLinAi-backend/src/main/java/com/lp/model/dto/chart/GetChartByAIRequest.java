package com.lp.model.dto.chart;

import lombok.Data;

import java.io.Serializable;

/**
 * 创建请求
 */
@Data
public class GetChartByAIRequest implements Serializable {

    /**
     * 分析目标
     */
    private String goal;

    /**
     * 图表名称
     */
    private String chartName;
    /**
     * 图表类型
     */
    private String chartType;

    /**
     * dictId
     */
    private Long dictId;

    private static final long serialVersionUID = 1L;
}