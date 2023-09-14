import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import { FieldData } from 'rc-field-form/lib/interface';
import React, { useRef } from 'react';

export type FormValueType = Partial<API.DictAddRequest | API.DictUpdateRequest>;

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
  currentRow?: API.Dict;
  // table columns => form
  columns: ProColumns<API.Dict>[];
  // fatherIdSource
  fatherIdSource: API.Dict[];
};
const EditForm: React.FC<UpdateFormProps> = (props) => {
  const isAdd = props.isAdd;
  const onCancel = props.onCancel;
  const onSubmit = props.onSubmit;
  const currentRow = props.currentRow;
  const open = props.open;
  const columns = props.columns;
  const fatherIdSource = props.fatherIdSource;

  // // ProForm ref
  const ref = useRef<ProFormInstance>();

  return (
    <Modal
      open={open}
      title={isAdd ? '字典新增' : '字典修改'}
      onCancel={onCancel}
      footer={[]}
      width={600}
      destroyOnClose={true}
    >
      <ProTable<API.Dict, API.DictAddRequest | API.DictUpdateRequest>
        onSubmit={onSubmit}
        type={'form'}
        // 表单初始化值
        form={{
          initialValues: !isAdd ? currentRow : {},
          onFieldsChange(changedFields: FieldData[]) {
            console.log(changedFields);
            if (!changedFields || changedFields.length !== 1) return;
            const { name, value } = changedFields[0];
            if (name[0] === 'fid') {
              if (value) {
                fatherIdSource.forEach((e) => {
                  if (e.id == value) {
                    ref?.current?.setFieldValue('dictType', e.dictType);
                    ref?.current?.setFieldValue('dictName', e.dictName);
                  }
                });
              } else {
                ref?.current?.setFieldValue('dictType', '');
                ref?.current?.setFieldValue('dictName', '');
              }
            }
          },
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
