declare namespace API {
  type Assistant = {
    createTime?: string;
    dictId?: number;
    execMessage?: string;
    goal?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    questionRes?: string;
    status?: string;
    updateTime?: string;
    userId?: number;
  };

  type AssistantAddRequest = {
    dictId?: number;
    execMessage?: string;
    goal?: string;
    name?: string;
    questionRes?: string;
    userId?: number;
  };

  type AssistantEditRequest = {
    dictId?: number;
    execMessage?: string;
    goal?: string;
    id?: number;
    name?: string;
    questionRes?: string;
    status?: string;
  };

  type AssistantQueryRequest = {
    current?: number;
    dictId?: number;
    execMessage?: string;
    goal?: string;
    id?: number;
    name?: string;
    pageSize?: number;
    questionRes?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    userId?: number;
  };

  type AssistantUpdateRequest = {
    dictId?: number;
    execMessage?: string;
    goal?: string;
    id?: number;
    name?: string;
    questionRes?: string;
    status?: string;
    userId?: number;
  };

  type BaseResponseAssistant_ = {
    code?: number;
    data?: Assistant;
    message?: string;
  };

  type BaseResponseBiResponse_ = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart_ = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseDict_ = {
    code?: number;
    data?: Dict;
    message?: string;
  };

  type BaseResponseListDict_ = {
    code?: number;
    data?: Dict[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseObject_ = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageAssistant_ = {
    code?: number;
    data?: PageAssistant_;
    message?: string;
  };

  type BaseResponsePageChart_ = {
    code?: number;
    data?: PageChart_;
    message?: string;
  };

  type BaseResponsePageDict_ = {
    code?: number;
    data?: PageDict_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiResponse = {
    chartId?: number;
    genChart?: string;
    genResult?: string;
  };

  type Chart = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: number;
    isDelete?: number;
    status?: string;
    updateTime?: string;
    userId?: number;
  };

  type ChartAddRequest = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    goal?: string;
  };

  type ChartEditRequest = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    goal?: string;
    id?: number;
  };

  type ChartQueryRequest = {
    chartName?: string;
    chartType?: string;
    current?: number;
    goal?: string;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type ChartUpdateRequest = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: number;
    isDelete?: number;
    userId?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type Dict = {
    createTime?: string;
    dictLabel?: string;
    dictName?: string;
    dictSort?: number;
    dictType?: string;
    dictValue?: string;
    fid?: number;
    id?: number;
    isDelete?: number;
    remark?: string;
    status?: string;
    updateTime?: string;
    userId?: number;
  };

  type DictAddRequest = {
    dictLabel?: string;
    dictName?: string;
    dictSort?: number;
    dictType?: string;
    dictValue?: string;
    fid?: number;
    remark?: string;
    userId?: number;
  };

  type DictEditRequest = {
    dictLabel?: string;
    dictName?: string;
    dictSort?: number;
    dictType?: string;
    dictValue?: string;
    fid?: number;
    id?: number;
    remark?: string;
    status?: string;
  };

  type DictQueryRequest = {
    current?: number;
    dictLabel?: string;
    dictName?: string;
    dictSort?: number;
    dictType?: string;
    dictValue?: string;
    fid?: number;
    id?: number;
    pageSize?: number;
    remark?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    userId?: number;
  };

  type DictUpdateRequest = {
    dictLabel?: string;
    dictName?: string;
    dictSort?: number;
    dictType?: string;
    dictValue?: string;
    fid?: number;
    id?: number;
    remark?: string;
    status?: string;
    userId?: number;
  };

  type genChartByAIAsyncMQUsingPOSTParams = {
    chartName?: string;
    chartType?: string;
    dictId?: number;
    goal?: string;
  };

  type genChartByAIAsyncUsingPOSTParams = {
    chartName?: string;
    chartType?: string;
    dictId?: number;
    goal?: string;
  };

  type getAssistantByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type GetChartByAIRequest = {
    chartName?: string;
    chartType?: string;
    dictId?: number;
    goal?: string;
  };

  type getChartByAiUsingPOSTParams = {
    chartName?: string;
    chartType?: string;
    dictId?: number;
    goal?: string;
  };

  type getChartVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getDictByDictTypeUsingGETParams = {
    /** dictType */
    dictType: string;
  };

  type getDictByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageAssistant_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Assistant[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageChart_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Chart[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageDict_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Dict[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type User = {
    createTime?: string;
    email?: string;
    gender?: string;
    id?: number;
    isDelete?: number;
    phone?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
