import React, { useState } from 'react';
import SidemenuData from './json/sidemenu.json';

function Sidemenu() {

    const [sideMenuActive, SetSideMenuActive] = useState(1);
    const SidemenuCheck = ((item) => {
        SetSideMenuActive(item.id);
        console.log(item.parentId);
    })

  return (
   
    <>
        <nav className='sidemenu'>
            
            <div className='side_header'>
                <p className='side_para'>Collections</p>
            </div>

            
            <ul className='sidemenu_list'>
            {
                
                SidemenuData.map((item,pos) => {
                    return (
                        <li 
                            key={item.parentId} 
                            
                        >
                            <div 
                                className= { sideMenuActive == item.id ? 'side_menu side_menu--active' : 'side_menu' }
                                onClick = { () => {SidemenuCheck(item)}}
                                >
                                <img src={item.image} className='sidemenu_img' alt='School' />
                                <p className='sidemenu_para'>{item.header}</p>
                            </div>
                        </li>
                )}
                )
            }
            </ul>
        </nav>
    </>
   
  )
}

export default Sidemenu