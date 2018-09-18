import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Select, Input, Button } from 'antd';
import $ from 'jquery'

import { startAddUser,roleChange } from '../../actions/admin.js'

import AddAlter from './AddAlter.jsx'

const FormItem = Form.Item;
const Option = Select.Option;

class Add extends Component {



  // onHandleSelectChange = (value) => {
  //   console.log(value);
  // }

  render() {
    const { onStartAddUser,onHandleSelectChange } = this.props
    const { status, message } = this.props
    console.log(status)
    console.log(message)
    return (
      <Form>
        <FormItem
          label="用户名"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Input
          className="add_userName"
          />
        </FormItem>
        <FormItem
          label="密码"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Input 
          className="add_password"
          />
        </FormItem>
        <FormItem
          label="重复密码"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Input 
          className="add_repass"
          />
        </FormItem>
        <FormItem
          label="身份"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Select
            placeholder="请选择该账号的身份"
            onChange={onHandleSelectChange}
          >
            <Option value="teacher">老师</Option>
            <Option value="student">学生</Option>
          </Select>
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 8 }}
        >
          <Button 
          type="primary" 
          block
          onClick = {onStartAddUser}
          >添加</Button>
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 8 }}
        >
        <AddAlter
          status={status}
          message={message}
        />
        </FormItem>

      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.getIn(['admin', 'status']),
  message: state.getIn(['admin', 'message'])
})

const mapDispatchToProps = (dispatch) => ({
  onHandleSelectChange: (value) => {
    console.log(value);
    return dispatch(roleChange(value))
  },
  onStartAddUser: e => {
    var userName = $('.add_userName').val();
    var password = $('.add_password').val();
    var repass = $('.add_repass').val();
    return dispatch(startAddUser(userName,password,repass))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Add);