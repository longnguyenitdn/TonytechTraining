import React from "react";
import { FaRegLightbulb, FaPencilAlt } from "react-icons/fa";
import { BsBell, BsTrash } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import LabelSidebar from "../LabelSidebar";
import SidebarIcon from "../SidebarIcon";
import SidebarText from "../SidebarText";
import SidebarEditLabelModal from "../SidebarEditLabelModal";
import DeleteModalConfirm from "../DeleteModalConfirm";

class Sidebar extends React.Component {
  state = {
    isEditLabel: false,
  };
  handleShowHideEditLabelModal = (id) => {
    this.setState({
      isEditLabel: !this.state.isEditLabel,
    });
  };

  render() {
    return (
      <>
        {this.props.deleteConfirm === true && (
          <DeleteModalConfirm
            deleteLabelId={this.props.deleteLabelId}
            handleShowHideDeleteConfirmFunc={
              this.props.handleShowHideDeleteConfirmFunc
            }
            handleDeleteLabelFunc={this.props.handleDeleteLabelFunc}
          />
        )}
        {this.state.isEditLabel === true && (
          <SidebarEditLabelModal
            handleShowHideDeleteConfirmFunc={
              this.props.handleShowHideDeleteConfirmFunc
            }
            deleteConfirm={this.props.deleteConfirm}
            isEditLabel={this.props.isEditLabel}
            handleShowEditBtnFunc={this.props.handleShowEditBtnFunc}
            isExistLabel={this.props.isExistLabel}
            handleEditLabelFunc={this.props.handleEditLabelFunc}
            labelList={this.props.labelList}
            handleShowHideEditLabelModalFunc={this.handleShowHideEditLabelModal}
            setLoading={this.props.setLoading}
            statusLoading={this.props.statusLoading}
            handleAddNewLabelFunc={this.props.handleAddNewLabelFunc}
            handleDeleteLabelFunc={this.props.handleDeleteLabelFunc}
          />
        )}
        <div id="sidebar_wrap" className="sidebar-wrap">
          <div id="sidebar" className="sidebar flex-col">
            <div
              id="sidebar_btn_note"
              className="flex-row sidebar-row sidebar-row-top align-center cursor active-menu active"
            >
              <SidebarIcon>
                <FaRegLightbulb />
              </SidebarIcon>
              <SidebarText>Notes</SidebarText>
            </div>
            <div
              id="sidebar_btn_reminder"
              className="flex-row sidebar-row align-center cursor active-menu"
            >
              <SidebarIcon>
                <BsBell />
              </SidebarIcon>
              <SidebarText>Reminders</SidebarText>
            </div>
            <div id="labels" className="sidebar-labels flex-col"></div>
            <div
              onClick={this.handleShowHideEditLabelModal}
              className="flex-row sidebar-row align-center cursor active-menu"
            >
              <SidebarIcon>
                <FaPencilAlt />
              </SidebarIcon>
              <SidebarText>Edit labels</SidebarText>
            </div>
            <LabelSidebar labelList={this.props.labelList} />
            <div
              id="sidebar_btn_archive"
              className="flex-row sidebar-row align-center cursor active-menu"
            >
              <SidebarIcon>
                <AiOutlineCloudDownload />
              </SidebarIcon>
              <SidebarText>Archive</SidebarText>
            </div>
            <div
              id="sidebar_btn_trash"
              className="flex-row sidebar-row align-center cursor active-menu"
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
