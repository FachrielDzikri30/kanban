import React, { Suspense, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { taskFilterState, tasksState } from '../../TaskAtoms'
import TaskListItem from './TaskListItem'
import type { Task, CSSProperties } from '../../../../types'
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE } from '../../../../constants/app'
import TaskModal from '../shared/TaskModal'
import TaskFilter from '../shared/TaskFilter'

const TaskList = (): JSX.Element => {
  const tasks: Task[] = useRecoilValue(tasksState)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const setTaskFilter = useSetRecoilState(taskFilterState)

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Tasks</h1>
      <div style={styles.taskButtons}>
        <button 
          style={styles.button}
          onClick={(): void => {
            setIsModalOpen(true)
          }}>
          <span className="material-icons">add</span>Add task
        </button>
        <button style={styles.button}>
          <span 
            className="material-icons"
            onClick={(): void => {
              setIsFilterOpen(!isFilterOpen)
              setIsMenuOpen(!isMenuOpen)
            }}
          >sort</span>Filter tasks
        </button>
        
      </div>
      <div>
        <div style={styles.tableHead}>
          <div style={styles.tableHeaderTaskName}>Task Name</div>
          <div style={styles.tableHeaderDetail}>Detail</div>
          <div style={styles.tableHeaderDueDate}>Due Date</div>
          <div style={styles.tableHeaderProgress}>Progress</div>
        </div>
        {tasks.map((task: Task) => {
          return <TaskListItem task={task} key={task.id} />
        })}
        {isModalOpen && (
          <TaskModal
            headingTitle = "Add your task"
            type = {TASK_MODAL_TYPE.ADD}
            setIsModalOpen={setIsModalOpen}
            defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
          />
        )}
        {/* {isFilterOpen && <TaskFilter setIsFilterOpen={setIsFilterOpen}/>} */}
        {isFilterOpen && (
          <Suspense fallback={<div>Loading</div>}>
            <TaskFilter 
              setIsFilterOpen={setIsFilterOpen}
              setIsMenuOpen={setIsMenuOpen}
              setTaskfilter={setTaskFilter}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}

const styles: CSSProperties = {
  container: {
    padding: '20px',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
  },
  taskButtons: {
    display: 'flex',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    padding: '16px',
    fontSize: '16px',
    marginRight: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  tableHead: {
    display: 'flex',
    fontSize: '24px',
    borderBottom: '1px solid #D8D8D8',
  },
  tableHeaderTaskName: {
    padding: '16px',
    width: '15%',
  },
  tableHeaderDetail: {
    padding: '16px',
    width: '30%',
  },
  tableHeaderDueDate: {
    padding: '16px',
    width: '10%',
  },
  tableHeaderProgress: {
    padding: '16px',
    width: '15%',
  },
}

export default TaskList