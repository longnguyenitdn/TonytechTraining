import React from "react";
import { HiXMark } from "react-icons/hi2";
import { FcCheckmark } from "react-icons/fc";
import LabelEditList from "../LabelEditList";
import { addNewLabel, editLabel, deleteLabel } from "../../api/label";
import DeleteModalConfirm from "../DeleteModalConfirm";

class SidebarEditLabelModal extends React.Component {
  state = {
    isEditLabel: false,
    isExistLabel: false,
    label: {
      name: "",
    },
    deleteLabelId: null,
    deleteConfirm: false,
  };

  clearInputLabelValue = () => {
    this.setState({
      label: {
        name: "",
      },
      isExistLabel: false,
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
        this.handleAddNewLabel(this.state.label);
        this.setState({
          isExistLabel: false,
        });
        this.clearInputLabelValue();
      } else {
        this.handleShowHideExistedLabel();
      }
    }
  };

  handleAddNewLabel = (label) => {
    this.props.setLoading(true);
    addNewLabel(label)
      .then((data) => {
        this.props.setLabelListFunc([data, ...this.props.labelList]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.props.setLoading(false);
      });
  };

  handleDeleteLabel = (id) => {
    this.props.setLoading(true);
    deleteLabel(id)
      .then(() => {
        let currentList = this.props.labelList;
        currentList = currentList.filter((item) => item.id !== id);
        this.props.setLabelListFunc(currentList);
        this.setState({
          deleteConfirm: false,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.props.setLoading(false);
      });
  };

  handleEditLabel = (label) => {
    let isExist = false;
    isExist = this.props.labelList.some((item) => {
      if (label.name === item.name) {
        if (item.id !== label.id) {
          this.setState({
            isExistLabel: true,
          });
          return true;
        }
        return true;
      }
      return false;
    });

    if (!isExist) {
      this.props.setLoading(true);
      editLabel(label)
        .then(() => {
          let currentList = this.props.labelList;
          currentList = currentList.map((item) => {
            if (item.id === label.id) {
              item.name = label.name;
            }
            return item;
          });
          this.setState({
            labelList: currentList,
            isExistLabel: false,
            isEditLabel: false,
          });
        })

        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.props.setLoading(false);
        });
    }
  };

  handleShowHideDeleteConfirm = (id) => {
    this.setState({
      deleteConfirm: !this.state.deleteConfirm,
      deleteLabelId: id,
    });
  };

  handleShowEditBtn = () => {
    this.setState({
      isEditLabel: true,
    });
  };

  render() {
    return (
      <>
        {this.state.deleteConfirm === true && (
          <DeleteModalConfirm
            deleteLabelId={this.state.deleteLabelId}
            setLabelListFunc={this.props.setLabelListFunc}
            handleShowHideDeleteConfirmFunc={this.handleShowHideDeleteConfirm}
            handleDeleteLabelFunc={this.handleDeleteLabel}
          />
        )}
        <div
          className="detail-edit-label-wrap"
          id="detail_edit_label_wrap"
          onClick={() => this.props.handleShowHideEditLabelModalFunc()}
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
                  isEditLabel={this.state.isEditLabel}
                  labelList={this.props.labelList}
                  handleShowHideDeleteConfirmFunc={
                    this.handleShowHideDeleteConfirm
                  }
                  handleShowEditBtnFunc={this.handleShowEditBtn}
                  handleEditLabelFunc={this.handleEditLabel}
                  handleDeleteLabelFunc={this.handleDeleteLabel}
                />
              </div>
            </div>
          </div>
          <div className="label-edit-cover-bot">
            <div className="label-edit-bot">
              {this.state.isExistLabel === true && (
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
