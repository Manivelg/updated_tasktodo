import React from 'react'

function Modal(props) {
  // console.log("DeleteTodo" , props);
  
  const {modalDesc, onDelete, onClose} = props;
  const {Name, id} = modalDesc;

  return (
    <>
      <div className='modal' key={id}>
        <div className='modal_content'>

          <div className='modal_close'><span className='close_button' onClick={onClose}>&times;</span></div>
            <div className='modal_header'>
              <span className='modal_title'>Do you want to Delete?</span>
            </div>

            <div className='modal_container'>
                <p className='modal_body'>{Name}</p>
            </div>

            <div className='modal_footer'>
              <button className='btn btn_confirm btn_right' datavalue={id} onClick={onDelete}>Confirm</button>
              <button className='btn btn_close' onClick={onClose}>Cancel</button>
            </div>

        </div>
      </div>
    </>
    
  )
}

export default Modal