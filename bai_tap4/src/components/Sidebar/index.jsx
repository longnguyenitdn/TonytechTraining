import React from "react";
import { FaRegLightbulb, FaPencilAlt } from "react-icons/fa";
import { BsBell, BsTrash } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import LabelSidebar from "../LabelSidebar";
import SidebarIcon from "../SidebarIcon";
import SidebarText from "../SidebarText";
import SidebarEditLabelModal from "../SidebarEditLabelModal";
import { LabelContext } from "../../contexts/LabelProvider";
import { useContext, useState } from "react";
const Sidebar = () => {
  const labelProvider = useContext(LabelContext);
  const [isEditLabelModal, setIsEditLabelModal] = useState(false);
  return (
    <>
      {isEditLabelModal === true && (
        <SidebarEditLabelModal
          setIsEditLabelModal={setIsEditLabelModal}
          labelList={labelProvider.labelList}
          setLabelList={labelProvider.setLabelList}
        />
      )}
      <div id="sidebar_wrap" className="sidebar-wrap">
        <div id="sidebar" className="sidebar flex-col">
          <div
            id="sidebar_btn_note"
            className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
              labelProvider.activeId === "sidebar_btn_note" ? "active" : ""
            }`}
            onClick={(e) => {
              labelProvider.setactiveId(e.target.id);
            }}
          >
            <SidebarIcon>
              <FaRegLightbulb />
            </SidebarIcon>
            <SidebarText>Notes</SidebarText>
          </div>
          <div
            id="sidebar_btn_reminder"
            className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
              labelProvider.activeId === "sidebar_btn_reminder" ? "active" : ""
            }`}
            onClick={(e) => {
              labelProvider.setactiveId(e.target.id);
            }}
          >
            <SidebarIcon>
              <BsBell />
            </SidebarIcon>
            <SidebarText>Reminders</SidebarText>
          </div>
          <div id="labels" className="sidebar-labels flex-col"></div>
          <div
            onClick={() => setIsEditLabelModal(true)}
            className="flex-row sidebar-row align-center cursor active-menu"
          >
            <SidebarIcon>
              <FaPencilAlt />
            </SidebarIcon>
            <SidebarText>Edit labels</SidebarText>
          </div>
          <LabelSidebar />
          <div
            id="sidebar_btn_archive"
            className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
              labelProvider.activeId === "sidebar_btn_archive" ? "active" : ""
            }`}
            onClick={(e) => {
              labelProvider.setactiveId(e.target.id);
            }}
          >
            <SidebarIcon>
              <AiOutlineCloudDownload />
            </SidebarIcon>
            <SidebarText>Archive</SidebarText>
          </div>
          <div
            id="sidebar_btn_trash"
            className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
              labelProvider.activeId === "sidebar_btn_trash" ? "active" : ""
            }`}
            onClick={(e) => {
              labelProvider.setactiveId(e.target.id);
            }}
          >
            <SidebarIcon>
              <BsTrash />
            </SidebarIcon>
            <SidebarText>Trash</SidebarText>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
// class Sidebar extends React.Component {
//   state = {
//     isEditLabelModal: false,
//   };
//   setShowHideEditLabelModal = (id) => {
//     this.setState({
//       isEditLabelModal: !this.state.isEditLabelModal,
//     });
//   };

//   render() {
//     return (
//       <LabelContext.Consumer>
//         {(labelProvider) => {
//           return (
//             <>
//               {this.state.isEditLabelModal === true && (
//                 <SidebarEditLabelModal
//                   setShowHideEditLabelModal={this.setShowHideEditLabelModal}
//                   labelProvider={{
//                     labelList: labelProvider.state.labelList,
//                     setLabelList: labelProvider.setLabelList,
//                   }}
//                 />
//               )}
//               <div id="sidebar_wrap" className="sidebar-wrap">
//                 <div id="sidebar" className="sidebar flex-col">
//                   <div
//                     id="sidebar_btn_note"
//                     className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
//                       labelProvider.state.activeId === "sidebar_btn_note"
//                         ? "active"
//                         : ""
//                     }`}
//                     onClick={(e) => {
//                       labelProvider.setactiveId(e.target.id);
//                     }}
//                   >
//                     <SidebarIcon>
//                       <FaRegLightbulb />
//                     </SidebarIcon>
//                     <SidebarText>Notes</SidebarText>
//                   </div>
//                   <div
//                     id="sidebar_btn_reminder"
//                     className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
//                       labelProvider.state.activeId === "sidebar_btn_reminder"
//                         ? "active"
//                         : ""
//                     }`}
//                     onClick={(e) => {
//                       labelProvider.setactiveId(e.target.id);
//                     }}
//                   >
//                     <SidebarIcon>
//                       <BsBell />
//                     </SidebarIcon>
//                     <SidebarText>Reminders</SidebarText>
//                   </div>
//                   <div id="labels" className="sidebar-labels flex-col"></div>
//                   <div
//                     onClick={() => this.setShowHideEditLabelModal()}
//                     className="flex-row sidebar-row align-center cursor active-menu"
//                   >
//                     <SidebarIcon>
//                       <FaPencilAlt />
//                     </SidebarIcon>
//                     <SidebarText>Edit labels</SidebarText>
//                   </div>
//                   <LabelSidebar />
//                   <div
//                     id="sidebar_btn_archive"
//                     className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
//                       labelProvider.state.activeId === "sidebar_btn_archive"
//                         ? "active"
//                         : ""
//                     }`}
//                     onClick={(e) => {
//                       labelProvider.setactiveId(e.target.id);
//                     }}
//                   >
//                     <SidebarIcon>
//                       <AiOutlineCloudDownload />
//                     </SidebarIcon>
//                     <SidebarText>Archive</SidebarText>
//                   </div>
//                   <div
//                     id="sidebar_btn_trash"
//                     className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
//                       labelProvider.state.activeId === "sidebar_btn_trash"
//                         ? "active"
//                         : ""
//                     }`}
//                     onClick={(e) => {
//                       labelProvider.setactiveId(e.target.id);
//                     }}
//                   >
//                     <SidebarIcon>
//                       <BsTrash />
//                     </SidebarIcon>
//                     <SidebarText>Trash</SidebarText>
//                   </div>
//                 </div>
//               </div>
//             </>
//           );
//         }}
//       </LabelContext.Consumer>
//     );
//   }
// }
// export default Sidebar;
