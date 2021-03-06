import React, { Component } from 'react'
import { connect } from 'react-redux'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import moment from 'moment';
import 'moment/locale/zh-cn';

import Task from './Task.jsx'

import './Tasks.less'

moment.locale('zh-cn');
dayjs.extend(relativeTime)

class Tasks extends Component {
  render() {
    const { taskList } = this.props
    const userId = localStorage.getItem("id");
    return (
      <div className="tasks"
        style={{
          maxHeight: '480px',
          overflow: 'auto'
        }}
      >
        {
          taskList.map((item, index) => (
            <Task
              key={index}
              userId={userId}
              _id={item._id}
              taskId={item.id._id}
              title={item.id.title}
              publisherId={item.id.publisherId}
              publisher={item.id.publisher}
              content={item.id.content}
              publishTime={item.id.publishTime}
              endTime={item.id.endTime}
              restTime={dayjs(item.id.endTime).fromNow()}
              outOfDate={!dayjs(item.id.endTime).isAfter(dayjs())}
              committed={(item.wordCommitted && item.pptCommitted && item.videoCommitted) ? true : false}
              teacherGrade={item.teacherGrade}
              selfGrade={item.selfGrade}
              groupMember={item.groupMember}
              groupGrade={item.groupGrade}
              selfGradeDone={item.selfGradeDone}
              score={item.score}
              groupNumber={item.id.groupNumber}
            >
            </Task>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  taskList: state.getIn(['student', 'taskList']).toJS(),
  userId: state.getIn(['login', 'id'])
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
