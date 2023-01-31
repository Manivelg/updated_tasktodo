import React, { useEffect, useState, useRef } from 'react';
import Header from '../bar/header';
import Modal from '../task/Modal';

import TaskView from '../task/TaskView';
import { TfiAngleLeft, TfiMoreAlt } from "react-icons/tfi";
import { TfiPlus } from "react-icons/tfi";
 

function School() {

  // const filteredTask = response => {
  //   const search = response.target.value.toLowerCase()
  //   const filterNames = TaskContent.filter(response => response.Name.toLowerCase().includes(search));
  //   SetName(filteredTask);

  // }

//   const Searchdata = (e) => {
//     console.log(e.target.value);

//     // if(e.target.value != '') {
//     //     Setsearchvalue(e.target.value);
//     //     console.log(searchvalue);
//     // }
// }

  let dateObj = new Date();
  let days = ["Sun", "Mon" , "Tue", "Wed" , "Thu" , "Fri" , "Sat"];
  
  let date = dateObj.getDate() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getFullYear();
  let day = days[dateObj.getDay()];
  let time = dateObj.getHours()+ ':' + dateObj.getMinutes();
      //Popup Modal Data
      const [dialogModal, setDialogModal] = useState (
        {
          modalstatus: false,
          modalDesc : '',
          onclick: ''
        }
      )

      //Popup Modal Data
      const DeleteTodo = (getData) => {
          //console.log(getData);
          setDialogModal({modalstatus: true, modalDesc: getData, onclick: ()=> {DeleteTask(getData.id)}})
      }

        //Confirm DeleteTask

        const DeleteTask = (modalData) => {
          // console.log(modalData);
          const filterTask = TaskContent.filter((e,i) => {
            return e.id !== modalData.id
            })
    
            SetTaskcontent(filterTask);
        }

        //CompleteHandle
        const completeHandle = (id)=>{
          // console.log(id);
          SetTaskcontent(
              TaskContent.map((TaskContent)=>{
                  if(TaskContent.id === id){
                      return {...TaskContent, ischecked: !TaskContent.ischecked}
                      
                  }
                  else{
                      return TaskContent;
                  }
              })
          )
        }

    //Todo Task value getting
    const SaveData = () => {
        const data = localStorage.getItem('TaskContent');
        //console.log(data);
        if(data) {
          return JSON.parse(data);
        }
        else {
          return []
        }
      }

    //Hooks
    const [Name, SetName] = useState([]);
    // const [Open, SetOpen] = useState(false);
    const [Count, SetCount] = useState(1);
    const [TaskContent, SetTaskcontent] = useState(SaveData());
    const [buttonText, SetbuttonText] = useState("Add");
    const addInputRef = useRef();
    const scrolltoinput = useRef();
    let idCounter = 1;
        //EditTodo List
          const EditTodo = (dataValue) => {

            SetbuttonText("Edit");

            console.log(dataValue);

            addInputRef.current.id = dataValue.id;
            addInputRef.current.value = dataValue.Name;

            

            SetName(dataValue.Name);
            addInputRef.current.focus();
            // console.log(addeditid,addeditName);
            scrolltoinput.current?.scrollIntoView(
              {
                top: 0,
                behaviour: "smooth"
              }
            )

          }

    //Add function
    const Task_submit = (e) => {
      let addeditid = addInputRef.current.id;
      let addeditName = addInputRef.current.value;
      // console.log(addeditid,addeditName);

      e.preventDefault(e);
        
      addeditid ? edit() : add();

    }

    function edit() {
      let addeditid = addInputRef.current.id;
      let addeditName =addInputRef.current.value;

      SetbuttonText("Add");


      if(Name !='') {        
        let result = TaskContent.map( (response) => response.id == addeditid ?
        {
          ...response,
          Name: addeditName,
          id: response.id,
          parent_id: "p1",
          date: date,
          day: day,
          time: time,
        }
        : response )

        SetTaskcontent(result);
        SetName('');
      }
    }

    function add() {
        SetCount (Count + 1);
        // if(Name !== '') {
          if(Name != '') {
          
            let TaskView = {
                id : Number(TaskContent.length+1),
                parent_id : "p1",
                Name,
                checked : false,
                count : Count,
                day: day,
                time: time,
                date : date,
            }
            console.log(TaskView);
            SetTaskcontent([...TaskContent,TaskView]);
            SetName('');
            
            // nameRef.current.value = "";
        
      }
    }

        //Save data localStorage
        useEffect(() => {
            localStorage.setItem('TaskContent', JSON.stringify(TaskContent));
        },[TaskContent])
        
        // const SubmitEvents = () => {
        //   document.getElementById('submit').style.display='block';
        // }

  return (
    <>
    <Header />

    <div className='view_data' ref={scrolltoinput}>

    <section className='list_data'>
      <div className='auto_scroll'>
          <div className='list_dashboard'>
              <div className='dashboard_view'>
                  <div className='dashboard_set'>
                      <div className='left_chevron'>
                      <TfiAngleLeft className='back_to_chevron'/>
                      </div>
                      <div className='dash_head'>School</div>
                  </div>
                  
                  <div className='list_view'>
                  <TfiMoreAlt className='show_view'/>
                  </div>
              </div>

            <div className='add_task' >
              <div className='task_plus'>
                <span className='circle_first'>
                  <TfiPlus className='plus_sign' />
                </span>
                  <input
                        type= 'text'
                        placeholder='Add a Task'
                        value={Name}
                        id=''
                        className='input_file'
                        onChange={(e) => {SetName(e.target.value)}}
                        // onClick={()=> SetOpen(!Open)}
                        // onClick={() => SubmitEvents()}
                        ref = {addInputRef}
                        required
                  />
                  {/* <button className={`submit ${Open ? "block" : "hidden"}`} onClick={Task_submit}>Add</button> */}
                  <button className='submit' onClick={Task_submit}>{buttonText}</button>
              </div>
            </div>


            <div className='view_status'>

            { 
            TaskContent.length > 0 && 
                <TaskView 
                        TaskContent={TaskContent} 
                        DeleteTodo = {DeleteTodo} 
                        EditTodo = {EditTodo} 
                        completeHandle = {completeHandle}
                />
            }

            {
            TaskContent.length < 1 && <div className='empty_task'><div className='enter_task'> No task added...</div></div>
            }


            </div>

          </div>
        </div>
    </section>

    {

dialogModal.modalstatus && (
    <Modal 
       modalDesc = {dialogModal.modalDesc}
       onDelete = {
        
        () => {
                DeleteTask(dialogModal.modalDesc);
                setDialogModal(!dialogModal.modalstatus);
              } 
              }
              
       onClose = { () => setDialogModal(!dialogModal.modalstatus) }
    />
)
}

    </div>
    </>
  )
}

export default School