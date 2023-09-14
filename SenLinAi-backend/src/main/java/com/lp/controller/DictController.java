package com.lp.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lp.annotation.AuthCheck;
import com.lp.common.BaseResponse;
import com.lp.common.DeleteRequest;
import com.lp.common.ErrorCode;
import com.lp.common.ResultUtils;
import com.lp.constant.CommonConstant;
import com.lp.constant.UserConstant;
import com.lp.exception.BusinessException;
import com.lp.exception.ThrowUtils;
import com.lp.model.dto.dict.DictAddRequest;
import com.lp.model.dto.dict.DictEditRequest;
import com.lp.model.dto.dict.DictQueryRequest;
import com.lp.model.dto.dict.DictUpdateRequest;
import com.lp.model.entity.Dict;
import com.lp.model.entity.User;
import com.lp.service.DictService;
import com.lp.service.UserService;
import com.lp.utils.SqlUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("dict")
@AllArgsConstructor
@Slf4j
public class DictController {

    @Resource
    private DictService dictService;
    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建
     *
     * @param dictAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Long> addDict(@RequestBody DictAddRequest dictAddRequest, HttpServletRequest request) {
        if (dictAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String dictType = dictAddRequest.getDictType();
        String dictName = dictAddRequest.getDictName();

        if (StringUtils.isAnyBlank(dictType, dictName)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        Dict dict = new Dict();
        BeanUtils.copyProperties(dictAddRequest, dict);
        User loginUser = userService.getLoginUser(request);
        dict.setUserId(loginUser.getId());
        boolean result = dictService.save(dict);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        long newDictId = dict.getId();
        return ResultUtils.success(newDictId);
    }

    /**
     * 删除
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteDict(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // 判断是否存在
        Dict oldDict = dictService.getById(id);
        ThrowUtils.throwIf(oldDict == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可删除
        if (!oldDict.getUserId().equals(user.getId()) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean b = dictService.removeById(id);
        return ResultUtils.success(b);
    }

    /**
     * 更新（仅管理员）
     *
     * @param dictUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateDict(@RequestBody DictUpdateRequest dictUpdateRequest) {
        if (dictUpdateRequest == null || dictUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Dict dict = new Dict();
        BeanUtils.copyProperties(dictUpdateRequest, dict);
        long id = dictUpdateRequest.getId();
        // 判断是否存在
        Dict oldDict = dictService.getById(id);
        ThrowUtils.throwIf(oldDict == null, ErrorCode.NOT_FOUND_ERROR);

        // if fid update sub status
        if (oldDict.getFid() == 0) {
            String status = dictUpdateRequest.getStatus();
            UpdateWrapper<Dict> updateWrapper = new UpdateWrapper<>();
            updateWrapper.set("status",status);
            updateWrapper.eq("fid", oldDict.getId());
            dictService.update(updateWrapper);
        }

        boolean result = dictService.updateById(dict);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<Dict> getDictById(long id, HttpServletRequest request) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Dict dict = dictService.getById(id);
        if (dict == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        return ResultUtils.success(dict);
    }

    /**
     * 分页获取列表（封装类）
     *
     * @param dictQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page")
    public BaseResponse<Page<Dict>> listDictByPage(@RequestBody DictQueryRequest dictQueryRequest,
                                                   HttpServletRequest request) {
        long current = dictQueryRequest.getCurrent();
        long size = dictQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Dict> dictPage = dictService.page(new Page<>(current, size),
                getQueryWrapper(dictQueryRequest));
        return ResultUtils.success(dictPage);
    }

    /**
     * 分页获取当前用户创建的资源列表
     *
     * @param dictQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page")
    public BaseResponse<Page<Dict>> listMyDictByPage(@RequestBody DictQueryRequest dictQueryRequest,
                                                     HttpServletRequest request) {
        if (dictQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        dictQueryRequest.setUserId(loginUser.getId());
        long current = dictQueryRequest.getCurrent();
        long size = dictQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Dict> dictPage = dictService.page(new Page<>(current, size),
                getQueryWrapper(dictQueryRequest));
        return ResultUtils.success(dictPage);
    }

    /**
     * 编辑（用户）
     *
     * @param dictEditRequest
     * @param request
     * @return
     */
    @PostMapping("/edit")
    public BaseResponse<Boolean> editDict(@RequestBody DictEditRequest dictEditRequest, HttpServletRequest request) {
        if (dictEditRequest == null || dictEditRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Dict dict = new Dict();
        BeanUtils.copyProperties(dictEditRequest, dict);
        User loginUser = userService.getLoginUser(request);
        long id = dictEditRequest.getId();
        // 判断是否存在
        Dict oldDict = dictService.getById(id);
        ThrowUtils.throwIf(oldDict == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可编辑
        if (!oldDict.getUserId().equals(loginUser.getId()) && !userService.isAdmin(loginUser)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean result = dictService.updateById(dict);
        return ResultUtils.success(result);
    }

    /**
     * 获取查询包装类
     *
     * @param dictQueryRequest
     * @return
     */
    private QueryWrapper<Dict> getQueryWrapper(DictQueryRequest dictQueryRequest) {
        QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
        if (dictQueryRequest == null) {
            return queryWrapper;
        }
        Long id = dictQueryRequest.getId();
        String dictType = dictQueryRequest.getDictType();
        String dictName = dictQueryRequest.getDictName();
        String dictLabel = dictQueryRequest.getDictLabel();
        String dictValue = dictQueryRequest.getDictValue();
        Integer dictSort = dictQueryRequest.getDictSort();
        String remark = dictQueryRequest.getRemark();
        Long fid = dictQueryRequest.getFid();
        String status = dictQueryRequest.getStatus();
        Long userId = dictQueryRequest.getUserId();
        String sortField = dictQueryRequest.getSortField();
        String sortOrder = dictQueryRequest.getSortOrder();

        queryWrapper.eq(id != null && id > 0, "id", id);
        queryWrapper.eq(StringUtils.isNotBlank(dictType), "dictType", dictType);
        queryWrapper.like(StringUtils.isNotBlank(dictName), "dictName", dictName);
        queryWrapper.like(ObjectUtils.isNotEmpty(dictLabel), "dictLabel", dictLabel);
        queryWrapper.eq(ObjectUtils.isNotEmpty(dictValue), "dictValue", dictValue);
        queryWrapper.eq(ObjectUtils.isNotEmpty(userId), "userId", userId);
        queryWrapper.eq(ObjectUtils.isNotEmpty(fid), "fid", fid);
        queryWrapper.eq(ObjectUtils.isNotEmpty(status), "status", status);
        queryWrapper.eq("isDelete", false);
        queryWrapper.orderBy(SqlUtils.validSortField(sortField), sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    // endregion

    // region 扩展

    /**
     * 获取所有父级
     *
     * @return
     */
    @GetMapping("/findFathers")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<List<Dict>> findFathers(HttpServletRequest request) {
        QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("fid", 0);
        return ResultUtils.success(dictService.list(queryWrapper));
    }

    /**
     * 根据类型获取所有有效数据
     *
     * @return
     */
    @GetMapping("/getDictByDictType")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<List<Dict>> getDictByDictType(@RequestParam String dictType, HttpServletRequest request) {
        QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("dictType", "tech_types");
        queryWrapper.eq("status", "enable");
        queryWrapper.ne("fid", "0");
        queryWrapper.orderBy(true, true, "dictSort");

        return ResultUtils.success(dictService.list(queryWrapper));
    }

    // endregion
}
