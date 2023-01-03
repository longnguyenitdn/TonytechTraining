import '../HomeHeader/Home.css'
import React from 'react'
import { FaRegLightbulb, FaPencilAlt } from 'react-icons/fa';
import { BsBell, BsTrash, BsCheck2Square, BsImages } from 'react-icons/bs';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { BiPaint } from 'react-icons/bi';

class HomeSidebarBody extends React.Component {
   render() {
      return (
         <div className="cover-body cover body-content-cover">
            <div className="flex-row">
               <div id="sidebar_wrap" className="sidebar-wrap">
                  <div id="sidebar" className="sidebar flex-col">
                     <div id="sidebar_btn_note" className="flex-row sidebar-row sidebar-row-top align-center cursor active-menu active">
                        <button id="sidebar_btn_note" className="button-icon sidebar-btn sidebar-btn-note cursor void-clicks"><FaRegLightbulb/></button>
                        <p className="sidebar-text hiden avoid-clicks">Notes</p>
                     </div>
                     <div id="sidebar_btn_reminder" className="flex-row sidebar-row align-center cursor active-menu">
                        <button className="button-icon sidebar-btn cursor avoid-clicks"><BsBell/></button>
                        <p className="sidebar-text hiden avoid-clicks">Reminders</p>
                     </div>
                     <div id="labels" className="sidebar-labels flex-col"></div>
                     <div id="editLabels" className="flex-row sidebar-row align-center cursor active-menu">
                        <button className="button-icon sidebar-btn cursor avoid-clicks"><FaPencilAlt/></button>
                        <p className="sidebar-text hiden avoid-clicks">Edit labels</p>
                     </div>
                     <div id="sidebar_btn_archive" className="flex-row sidebar-row align-center cursor active-menu">
                        <button className="button-icon sidebar-btn cursor avoid-clicks"><AiOutlineCloudDownload/></button>
                        <p className="sidebar-text hiden avoid-clicks">Archive</p>
                     </div>
                     <div id="sidebar_btn_trash" className="flex-row sidebar-row align-center cursor active-menu">
                        <button className="button-icon sidebar-btn cursor avoid-clicks"><BsTrash/></button>
                        <p className="sidebar-text hiden avoid-clicks">Trash</p>
                     </div>
                  </div>
               </div>
               <div id="body_content" className="body-content flex-row flex-center">
                  <div className="body-take-note flex-col skip">
                     <div id="input_note_cover" className="take-note flex-row flex-bet">
                        <input id="input_note" className="input-take-note skip" type="text" placeholder="Take a note..." />
                        <div className="take-note-icon flex-row align-center">
                           <button className="button-icon cursor"><BsCheck2Square/></button>
                           <button className="button-icon cursor"><BiPaint/></button>
                           <button className="button-icon cursor"><BsImages/></button>
                        </div>
                     </div>
                     <div id="detail_note" className="detail-note"></div>
                     <div className="labelAll hiden" id="labelAllCheckbox"></div>
                     <div className="display flex-row" id="display"></div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
export default HomeSidebarBody