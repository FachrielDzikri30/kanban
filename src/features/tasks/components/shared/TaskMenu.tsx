import React, {useState} from "react"
import type { Dispatch, SetStateAction } from "react"
import type { CSSProperties } from "../../../../types"
import TaskModal from "./TaskModal"
import {
    TASK_MODAL_TYPE,
    TASK_PROGRESS_ID,
} from '../../../../constants/app'

interface TaskMenuProps {
    setIsMenuOpen : Dispatch<SetStateAction<boolean>>
    columnTitle: string
}

const getProgressOrder = (columnTitle: string): number => {
    switch (columnTitle){
      case TASK_PROGRESS_STATUS.IN_PROGRESS:
        return TASK_PROGRESS_ID.IN_PROGRESS
      case TASK_PROGRESS_STATUS.WAITING:
        return TASK_PROGRESS_ID.WAITING
      case TASK_PROGRESS_STATUS.COMPLETED:
        return TASK_PROGRESS_ID.COMPLETED
      default:
        return TASK_PROGRESS_ID.NOT_STARTED
    }
  }

const TaskMenu = ({setIsMenuOpen, columnTitle}: TaskMenuProps): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    return (
        <div style={styles.menu}>
            <div style={styles.menuItem}>
                <span 
                    className="material-icons"
                    onClick={():void => {
                        setIsModalOpen(true)
                    }}
                >edit</span>Edit
            </div>
            <div style={styles.menuItem}>
                <span className="material-icons">delete</span>Delete
            </div>
            <span   
                className="material-icons"
                style={styles.closeIcon}
                onClick={(): void => {
                    setIsMenuOpen(false)
                }}
            >close</span>
            {isModalOpen && (
                <TaskModal
                    headingTitle = "Add your task"
                    type = {TASK_MODAL_TYPE.ADD}
                    setIsModalOpen={setIsModalOpen}
                    defaultProgressOrder={getProgressOrder(columnTitle)}
               />
            )}
        </div>
    )
}

const styles: CSSProperties = {
    menu:{
        backgroundColor:'#fff',
        border:'1px solid gray',
        padding:'8px 16px',
        position:'absolute',
        top:'-10px',
        right:'4%',
        zIndex: 10,
    },
    menuItem:{
        display:'flex',
        marginBottom:'8px',
        cursor:'pointer',
    },
    closeIcon:{
        position:'absolute',
        top:'0px',
        right:'2px',
        cursor:'pointer',
    },
}

export default TaskMenu