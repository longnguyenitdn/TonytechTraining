import React from "react";
import { FaRegLightbulb, FaPencilAlt } from "react-icons/fa";
import { BsBell, BsTrash } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import LabelSidebar from "../LabelSidebar";
import SidebarIcon from "../SidebarIcon";
import SidebarText from "../SidebarText";
import SidebarEditLabelModal from "../SidebarEditLabelModal";

class Sidebar extends React.Component {
  state = {
    isEditLabelModal: false,
  };
  handleShowHideEditLabelModal = (id) => {
    this.setState({
      isEditLabelModal: !this.state.isEditLabelModal,
    });
  };

  render() {
    return (
      <>
        {this.state.isEditLabelModal === true && (
          <SidebarEditLabelModal
            setLabelListFunc={this.props.setLabelListFunc}
            labelList={this.props.labelList}
            handleShowHideEditLabelModalFunc={this.handleShowHideEditLabelModal}
            setLoading={this.props.setLoading}
            statusLoading={this.props.statusLoading}
          />
        )}
        <div id="sidebar_wrap" className="sidebar-wrap">
          <div id="sidebar" className="sidebar flex-col">
            <div
              id="sidebar_btn_note"
              className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
                this.props.activeId === "sidebar_btn_note" ? "active" : ""
              }`}
              onClick={(e) => {
                this.props.handleActiveSidebarMenu(e);
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
                this.props.activeId === "sidebar_btn_reminder" ? "active" : ""
              }`}
              onClick={(e) => {
                this.props.handleActiveSidebarMenu(e);
              }}
            >
              <SidebarIcon>
                <BsBell />
              </SidebarIcon>
              <SidebarText>Reminders</SidebarText>
            </div>
            <div id="labels" className="sidebar-labels flex-col"></div>
            <div
              onClick={() => this.handleShowHideEditLabelModal()}
              className="flex-row sidebar-row align-center cursor active-menu"
            >
              <SidebarIcon>
                <FaPencilAlt />
              </SidebarIcon>
              <SidebarText>Edit labels</SidebarText>
            </div>
            <LabelSidebar
              labelList={this.props.labelList}
              activeId={this.props.activeId}
              handleActiveSidebarMenu={this.props.handleActiveSidebarMenu}
            />
            <div
              id="sidebar_btn_archive"
              className={`flex-row sidebar-row sidebar-row-top align-center cursor active-menu ${
                this.props.activeId === "sidebar_btn_archive" ? "active" : ""
              }`}
              onClick={(e) => {
                this.props.handleActiveSidebarMenu(e);
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
                this.props.activeId === "sidebar_btn_trash" ? "active" : ""
              }`}
              onClick={(e) => {
                this.props.handleActiveSidebarMenu(e);
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
  }
}
export default Sidebar;
