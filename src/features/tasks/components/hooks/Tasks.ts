import { useRecoilState } from "recoil"
import { tasksState } from "../../TaskAtoms"
import type { Task } from "../../../../types"
import { TASK_PROGRESS_ID } from "../../../../constants/app"

interface useTaskActionType {
    completeTask: (taskId: number) => void
    moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void
    addTask: (
        title: string,
        detail: string,
        dueDate: string,
        progressOrder: number,
    ) => void
    deleteTask: (taskId:number) => void
}

export const useTaskAction = (): useTaskActionType => {
    const [tasks, setTasks] = useRecoilState<Task[]> (tasksState)

    const completeTask = (taskId: number): void => {
        const updatedTasks: Task[] = tasks.map((task) =>
            task.id === taskId ? {...task, progressOrder: TASK_PROGRESS_ID.COMPLETED}: task,
    )
    setTasks(updatedTasks)
    }

    //pertama baca dulu task idnya, abis itu buat kondisi di id no 1
        // atau not started dia batasi supaya nilai direction numbernya ga bisa -1, buat di id 4
        // atau completed juga dibatasi supaya nanti dia direction numbernya ga bisa 1,
        // abis itu nanti function useActionnya bisa di pake di task card bagian klik arrow kiri sama kanannya.
         

    const moveTaskCard = (taskId: number, directionNumber: 1 | -1): void => {
        const movedTask: Task | undefined = tasks.find(
            (task): boolean => task.id === taskId,
          )
          if (!movedTask) return
          const readId:boolean = movedTask.progressOrder + directionNumber < 1 || movedTask.progressOrder + directionNumber > 4
          if (readId) return 
          const updateOrder: number = movedTask.progressOrder + directionNumber
          const updateTasks = tasks.map((task)=>
            task.id === taskId ? {...task, progressOrder:updateOrder} : task,
          )  
          setTasks(updateTasks)
          console.log(updateTasks)
    }

        
    const addTask = (
        title: string,
        detail: string,
        dueDate: string,
        progressOrder: number,
    ): void => {
        const newTask: Task = {
            id: tasks.length + 1,
            title,
            detail,
            dueDate,
            progressOrder,
        }
        setTasks([...tasks, newTask])
    }
    
    //perlu ditanyain 
    const deleteTask = (taskId: number): void => {
        setTasks(tasks.filter((task): boolean => task.id !== taskId))
    }

    return {
        completeTask,
        moveTaskCard,
        addTask,
        deleteTask,
    }
}