import React from "react"
import type { Dispatch, SetStateAction } from "react"
import type { CSSProperties } from "../../../../types"

interface TaskFilterProps {
    setIsFilterOpen : Dispatch<SetStateAction<boolean>>
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

const TaskFilter = ({setIsFilterOpen}: TaskFilterProps): JSX.Element => {
    return (
        <div style={styles.menu}>
            <div style={styles.menuItem}>
                <span className="material-icons">done</span>Completed Tasks
            </div>
            <div style={styles.menuItem}>
                <span className="material-icons">list</span>Uncompleted Tasks
            </div>
            <div style={styles.menuItem}>
                <span className="material-icons">clear-all</span>All Tasks
            </div>
            <span   
                className="material-icons"
                style={styles.closeIcon}
                onClick={(): void => {
                    setIsFilterOpen(false)
                }}
            >close</span>
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

export default TaskFilter