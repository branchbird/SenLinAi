package com.lp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lp.model.entity.Chart;

import java.util.List;

/**
 * 帖子数据库操作
 */
public interface ChartMapper extends BaseMapper<Chart> {

    List<Chart> queryAll();
}




