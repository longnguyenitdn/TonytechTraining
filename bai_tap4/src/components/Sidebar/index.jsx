import React from "react"
import "../HomeHeader/Home.css"
import { FaRegLightbulb, FaPencilAlt } from 'react-icons/fa';
import { BsBell, BsTrash } from 'react-icons/bs';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import LabelSidebar from "../LabelSidebar";

class Sidebar extends React.Component {
   render() {
      return (
         <div id="sidebar_wrap" className="sidebar-wrap">
            <div id="sidebar" className="sidebar flex-col">
               <div id="sidebar_btn_note" className="flex-row sidebar-row sidebar-row-top align-center cursor active-menu active">
                  <button id="sidebar_btn_note" className="button-icon sidebar-btn sidebar-btn-note cursor void-clicks"><FaRegLightbulb /></button>
                  <p className="sidebar-text hiden avoid-clicks">Notes</p>
               </div>
               <div id="sidebar_btn_reminder" className="flex-row sidebar-row align-center cursor active-menu">
                  <button className="button-icon sidebar-btn cursor avoid-clicks"><BsBell /></button>
                  <p className="sidebar-text hiden avoid-clicks">Reminders</p>
               </div>
               <div id="labels" className="sidebar-labels flex-col"></div>
               <div id="editLabels" className="flex-row sidebar-row align-center cursor active-menu">
                  <button className="button-icon sidebar-btn cursor avoid-clicks"><FaPencilAlt /></button>
                  <p className="sidebar-text hiden avoid-clicks">Edit labels</p>
               </div>
               <LabelSidebar/>
               <div id="sidebar_btn_archive" className="flex-row sidebar-row align-center cursor active-menu">
                  <button className="button-icon sidebar-btn cursor avoid-clicks"><AiOutlineCloudDownload /></button>
                  <p className="sidebar-text hiden avoid-clicks">Archive</p>
               </div>
               <div id="sidebar_btn_trash" className="flex-row sidebar-row align-center cursor active-menu">
                  <button className="button-icon sidebar-btn cursor avoid-clicks"><BsTrash /></button>
                  <p className="sidebar-text hiden avoid-clicks">Trash</p>
               </div>
            </div>
         </div>
      )
   }
}
export default Sidebar