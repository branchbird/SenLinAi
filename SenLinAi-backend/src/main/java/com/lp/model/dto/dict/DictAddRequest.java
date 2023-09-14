package com.lp.model.dto.dict;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class DictAddRequest implements Serializable {

    /**
     * 字典类型
     */
    private String dictType;

    /**
     * 字典名称
     */
    private String dictName;

    /**
     * 字典label（中文）
     */
    private String dictLabel;

    /**
     * 字典值
     */
    private String dictValue;

    /**
     * 排序号
     */
    private Integer dictSort;

    /**
     * 备注
     */
    private String remark;

    /**
     * 父类id
     */
    private Long fid;

    /**
     * 创建用户 id
     */
    private Long userId;

    private static final long serialVersionUID = 1L;
}

