import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Layout, Menu, Icon, Dropdown,message } from 'antd';
import $ from 'jquery'

import {
  startGetTasks,
  startGetAskedTasks,
  startGetEvalRecords
} from '../../actions/student'
import {
  logOut
} from '../../actions/login.js';

const { Header, Sider, Content, Footer } = Layout;

class PageStudent extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  changeRouter = (router) => {
    browserHistory.push('/student/' + router)
  }

  componentDidMount = () => {
    $('.homework_student_route').trigger('click');
  }

  render() {
    const { onStartGetTasks, onLogOut, onStartGetAskedTasks, onStartGetEvalRecords } = this.props
    return (
      <Layout style={{ height: '100%', overflow: 'hidden' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <img src="/logo.png" alt="" />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"
              className="homework_student_route"
              onClick={(e) => {
                onStartGetTasks()
                this.changeRouter('task')
              }}
            >
              <Icon type="user" />
              <span>我的作业</span>
            </Menu.Item>
            <Menu.Item key="2"
              className="homework_groupEval"
              onClick={(e) => {
                onStartGetAskedTasks()
                onStartGetEvalRecords()
                this.changeRouter('groupEval')
              }}
            >
              <Icon type="solution" />
              <span>同学互评</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="hidden"></div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a style={{ color: '#1890FF' }}>
                      <Icon type="user" theme="outlined"
                        style={{ color: '#1890FF', marginRight: '8px' }}
                      />个人信息
                    </a>
                  </Menu.Item>
                  <Menu.Item
                    onClick={(e) => {
                      browserHistory.push('/')
                      message.success('登出成功')
                      onLogOut()
                    }}
                  >
                    <a style={{ color: '#1890FF' }}>
                      <Icon type="logout" theme="outlined"
                        style={{ color: '#1890FF', marginRight: '5px' }}
                      /> 退出登陆
                    </a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className="ant-dropdown-link" style={{ marginRight: '20px' }}>
                {localStorage.getItem("name")}<Icon type="down" />
              </a>
            </Dropdown>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 520, height: '100%' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            © 2018 杭州师范大学 版权所有
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  onStartGetTasks: (e) => {
    return dispatch(startGetTasks())
  },
  onStartGetAskedTasks: (e) => {
    return dispatch(startGetAskedTasks())
  },
  onStartGetEvalRecords: (e) => {
    return dispatch(startGetEvalRecords())
  },
  onLogOut: () => {
    dispatch(logOut());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PageStudent)