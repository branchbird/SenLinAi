import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useRef } from 'react';

export type FormValueType = Partial<API.UserAddRequest | API.UserUpdateRequest>;

export type UpdateFormProps = {
  // 是否新增
  isAdd: boolean;
  // open?
  open: boolean;
  // 关闭modal
  onCancel: () => void;
  // 提交modal
  onSubmit: (values: FormValueType) => Promise<void>;
  // edit row
  currentRow?: API.User;
  // table columns => form
  columns: ProColumns<API.User>[];
};
const EditForm: React.FC<UpdateFormProps> = (props) => {
  const isAdd = props.isAdd;
  const onCancel = props.onCancel;
  const onSubmit = props.onSubmit;
  const currentRow = props.currentRow;
  const open = props.open;
  const columns = props.columns;

  // // ProForm ref
  const ref = useRef<ProFormInstance>();

  return (
    <Modal
      open={open}
      title='修改信息'
      onCancel={onCancel}
      footer={[]}
      width={600}
      destroyOnClose={true}
    >
      <ProTable<API.User, API.UserUpdateRequest>
        onSubmit={onSubmit}
        type={'form'}
        // 表单初始化值
        form={{
          initialValues: !isAdd ? currentRow : {},
        }}
        formRef={ref}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        columns={columns}
      />
    </Modal>
  );
};
export default EditForm;
