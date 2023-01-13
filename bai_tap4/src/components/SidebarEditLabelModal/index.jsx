import React from "react";
import { HiXMark } from "react-icons/hi2";
import { FcCheckmark } from "react-icons/fc";
import LabelEditList from "../LabelEditList";

class SidebarEditLabelModal extends React.Component {
  state = {
    isExistLabel: false,
    label: {
      name: "",
    },
  };

  clearInputLabelValue = () => {
    this.setState({
      label: {
        name: "",
      },
    });
  };

  handleChangeInputLabelContent = (e) => {
    this.setState({
      label: {
        name: e.target.value,
      },
    });
  };

  handleShowHideExistedLabel = () => {
    this.setState({
      isExistLabel: !this.state.isExistLabel,
    });
  };

  handleBeforeAddNewLabel = () => {
    let isExist = false;
    if (this.state.label.name !== "") {
      if (this.props.labelList.length !== 0) {
        isExist = this.props.labelList.some(
          (node) => node.name === this.state.label.name
        );
      }
      if (!isExist) {
        this.props.handleAddNewLabelFunc(this.state.label);
        this.handleShowHideExistedLabel();
      } else {
        this.handleShowHideExistedLabel();
      }
      this.clearInputLabelValue();
    }
  };

  render() {
    return (
      <>
        <div
          className="detail-edit-label-wrap"
          id="detail_edit_label_wrap"
        ></div>
        <div
          id="detail_edit_label_content"
          className="detail-edit-label-content"
        >
          <div className="label-edit-cover-top">
            <div className="label-edit-top">
              <p className="label-edit-header text-black">Edit labels</p>
              <div className="label-edit-top-row flex-row align-center flex-around">
                <button
                  onClick={() => this.clearInputLabelValue()}
                  className="btn-left-input-edit-label button-icon text-black cursor "
                >
                  <HiXMark fill="red" />
                </button>
                <input
                  onChange={(e) => this.handleChangeInputLabelContent(e)}
                  className="input text-black"
                  type="text"
                  placeholder="Create new label..."
                  value={this.state.label.name}
                />
                <button
                  onClick={() => this.handleBeforeAddNewLabel()}
                  className="btn-right-input-edit-label button-icon text-black cursor "
                >
                  <FcCheckmark />
                </button>
              </div>
              <div className="labels-list-edit align-center flex-around">
                <LabelEditList
                  handleShowHideDeleteConfirmFunc={
                    this.props.handleShowHideDeleteConfirmFunc
                  }
                  isEditLabel={this.props.isEditLabel}
                  handleShowEditBtnFunc={this.props.handleShowEditBtnFunc}
                  handleEditLabelFunc={this.props.handleEditLabelFunc}
                  labelList={this.props.labelList}
                  handleDeleteLabelFunc={this.props.handleDeleteLabelFunc}
                />
              </div>
            </div>
          </div>
          <div className="label-edit-cover-bot">
            <div className="label-edit-bot">
              {this.props.isExistLabel === true && (
                <p className="exist-label" id="exist_label">
                  Label Existed!
                </p>
              )}
              <button
                onClick={() => this.props.handleShowHideEditLabelModalFunc()}
                className="btn-close button-icon text-black cursor"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default SidebarEditLabelModal;
