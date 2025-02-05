import React from 'react';
import styles from './style.less';
import { observer,toJS } from "@chaoswise/cw-mobx";
import store from "../../model/index";
import { Form,Input,Select,Button,Row,Col,Icon,Popover,TreeSelect,message,Spin } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { getProjectsService,getTagsService,addComponentService, getListDataService,addTagService } from '../../services';

const { Option } = Select;
const { TextArea } = Input;

const AddComponent = observer((props)=>{
  const { getFieldDecorator,validateFields,getFieldValue } = props.form;

  const { setAddModalvisible,treeData,projectsData,tagsData,getListData,getTagsData,userInfo,selectedData } = store;

  // console.log(toJS(selectedData));
  const [addloading, setAddloading] = useState(false);

  const formItemLayout = {
    labelCol: { span:4 },
    wrapperCol: { span:18 }
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        const cateData = JSON.parse(values.category);
        values.category = cateData.one;
        values.subCategory = cateData.two;
        values.desc=values.desc?values.desc:undefined;
        if (values.tags) { 
          values.tags = values.tags.map(item=>({name:item}))
        }
        setAddloading(true)
        const res = await addComponentService(values);
        if (res && res.code==0) {
          setAddloading(false)
          message.success('添加成功！');
          props.form.resetFields()
          setAddModalvisible(false);
          getListData();
          //刷新标签库
          getTagsData();
        }else{
          setAddloading(false)
          message.error(res.msg)
        }
      }
    });
  }
  return <Form
    {...formItemLayout}  
    onSubmit={handleSubmit}
    style={{padding:20}}
  >
    <Form.Item label="组件名称">
      {getFieldDecorator('name', {
        rules: [
          {
            required: true,
            message: '组件名称不能为空！'
          }
        ]
      })(<Input />)}
    </Form.Item>
    {/* <Form.Item label="组件标识">
      {getFieldDecorator('logo', {
        rules: [
          {
            required: true,
            message: '组件标识不能为空！'
          }
        ]
      })(<Input />)}
    </Form.Item> */}
    <Form.Item label={<>
      <Popover 
        placement='left' 
        content={
          <>
            <p style={{width:200}}>
              组件类别用于区分项目组件或基础组件，默认选择"项目组件"，即特定项目可以使用的组件。
            </p>
            <p style={{width:200}}>
              基础组件默认所有项目都可以使用；只有管理员才能将组件修改为基础组件。
            </p>
          </>
        }>
        <Icon type="question-circle" style={{margin:'12px 5px'}}/>
      </Popover>
      <span>组件类别</span>
    </>}>
      {getFieldDecorator('type', {
        initialValue:'project',
        rules: [
          {
            required: true,
            message: '组件类别不能为空！'
          }
        ]
      })(<Select>
        <Option value='project'>项目组件</Option>
        {
          userInfo.isAdmin?<Option value='common'>基础组件</Option>:null
        }
      </Select>)}
    </Form.Item>
    {
      getFieldValue('type')=='common'?null:
      <Form.Item label="所属项目">
        {getFieldDecorator('projects', {
          rules: [
            {
              required: true,
              message: '所属项目不能为空！'
            }
          ]
        })(<Select
          mode="multiple"
          showSearch
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {
            projectsData.map((v,k)=>{
              return <Option value={v.id} key={v.id}>{v.name}</Option>
            })
          }
        </Select>)}
      </Form.Item>
    }
    <Form.Item label="组件分类">
      {getFieldDecorator('category', {
        rules: [
          {
            required: true,
            message: '组件分类不能为空！'
          }
        ],
        initialValue:selectedData.subCategory?JSON.stringify({one:selectedData.category,two:selectedData.subCategory}):undefined
      })(<TreeSelect
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={
          treeData.map((v,k)=>{
            return {
              title:v.name,
              value:v.id,
              key:k+'',
              disabled:true,
              children:v.children.map((v1,k1)=>{
                return {
                  title:v1.name,
                  value:JSON.stringify({one:v.id,two:v1.id}),
                  key:k+'-'+k1,
                }
              })
            }
          })
        }
        placeholder="请选择"
        treeDefaultExpandAll
      />)}
    </Form.Item>
    <Form.Item label="标签">
      {getFieldDecorator('tags', {
        rules: []
      })(<Select
        mode="tags"
      >
        {
          tagsData.map((v,k)=>{
          return <Option value={v.name} key={v.id}>{v.name}</Option>
          })
        }
      </Select>)}
    </Form.Item>
    {/* <Form.Item label="开发状态">
      {getFieldDecorator('status', {
        initialValue:'1',
        rules: []
      })(<Select
        disabled
      >
        <Option value='1'>开发中</Option>
      </Select>)}
    </Form.Item> */}
    <Form.Item label="描述">
      {getFieldDecorator('desc', {
        initialValue:'',
        rules: []
      })(<TextArea rows={4}/>)}
    </Form.Item>
    <Row className={styles.btnWrap}>
      <Col span={2} push={18}>
        <Button onClick={()=>{
          setAddModalvisible(false)
        }}>取消</Button>
      </Col>
      <Col span={2} push={18}>
        <Button type='primary' htmlType='submit' disabled={addloading}>
          <Spin spinning={addloading} size='small' style={{marginRight:10}}/> 
          <span>保存</span>
        </Button>
      </Col>
    </Row>
  </Form>
})

export default Form.create({name:'addComponent'})(AddComponent);