package com.lp.model.vo;

import lombok.Data;

/**
 *  BI返回结果
 **/
@Data
public class BiResponse {
    /**
     * AI生成图表
     */
    String genChart;
    /**
     * AI生成分析结论
     */
    String genResult;
    /**
     * 新生成的图标id
     */
    private Long chartId;
}
