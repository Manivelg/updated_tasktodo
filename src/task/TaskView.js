import React, {useRef} from 'react';
import { GiCheckboxTree } from "react-icons/gi";
import { BsTrash, BsPencil, BsClock } from 'react-icons/bs';

function TaskView({TaskContent,DeleteTodo,EditTodo,completeHandle}) {

const nameRef = useRef();

let dateObj = new Date();
let days = ["Sun", "Mon" , "Tue", "Wed" , "Thu" , "Fri" , "Sat"];

let date = dateObj.getDate() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getFullYear();
let day = days[dateObj.getDay()];
let time = dateObj.getHours()+ ':' + dateObj.getMinutes();

// let storedtime = [day +' | ',time +' | ',date];
          
  return (
    <>
        <div className='task_name'>Tasks</div>
        {
            TaskContent && 
            TaskContent.map(TaskContent => (
                TaskContent !=="" ?  
                !TaskContent.ischecked && (
                    <div className='enter_task' key={TaskContent.id}>
                    <div className='enter_lists'>
                        <div className='task_sure'>
                            <input type='checkbox' 
                                   className='check_first' 
                                //    id={TaskContent.id} 
                                   checked={TaskContent.ischecked}
                                   value={TaskContent.id}
                                   ref={nameRef}
                                   onChange={(e) => {completeHandle(TaskContent.id)}}/>
                        </div>
                        <div className='show_data'>
                            <label className='task_names'>{TaskContent.Name}</label>

                            <div className='show_date'>
                            <div className='task_display'>
                                <GiCheckboxTree className='task_icon'/>
                                <span className='display_count'>0/{TaskContent.count}</span>
                            </div>

                            <div className='task_display today_task'>
                                <BsClock />
                                <span className='task_date'>
                                    <span className='sp'>{day}</span>
                                    <span className='sp'>{time}</span>
                                    <span className='sp'>{date}</span>
                                </span>
                            </div>
                            
                        </div>

                        </div>
                        
                        
                    </div>
                        <div className='task_status'>
                            <BsPencil className='status_act mr_right' onClick={(e) => {EditTodo(TaskContent.id)}}/>
                            {/* <BsTrash className='status_act' onClick={(e) => {DeleteTodo(TaskContent.id)}}/> */}
                            <BsTrash className='status_act' onClick={(e) => {DeleteTodo(TaskContent.id)}}/>

                        </div>
                </div>

                )
                :
                <div className='empty_task'><div className='enter_task'> No task added...</div></div>
            ))
        }
        
        <div className='task_name'>Completed</div>
        {
            TaskContent &&
            TaskContent.map(TaskContent => (
                TaskContent.ischecked && (
                    <div className='enter_task' key={TaskContent.id}>
                    <div className='enter_lists'>
                        <div className='task_sure'>
                            <input type='checkbox' 
                                   className='check_first' 
                                   id={TaskContent.id} 
                                   checked={TaskContent.ischecked}
                                   value={TaskContent.id}
                                   onChange={(e) => {completeHandle(TaskContent.id)}}/>
                        </div>

                        <div className='show_data'>
                            <label className='task_names'>{TaskContent.Name}</label>
                                <div className='show_date'>
                                    <div className='task_display today_task'>
                                        <BsClock />
                                        <span className='task_date'>
                                            <span className='sp'>{day}</span>
                                            <span className='sp'>{time}</span>
                                            <span className='sp'>{date}</span>
                                        </span>
                                    </div>
                                </div>
                        </div>
                        
                        
                    </div>
                        <div className='task_status'>
                            <BsPencil className='status_act mr_right' onClick={(e) => {EditTodo(TaskContent.id)}}/>
                            {/* <BsTrash className='status_act' onClick={(e) => {DeleteTodo(TaskContent.id)}}/> */}
                            <BsTrash className='status_act' onClick={(e) => {DeleteTodo(TaskContent.id)}}/>

                        </div>
                </div>


                )
            ))
        }
    
    </>
  )
}

export default TaskView