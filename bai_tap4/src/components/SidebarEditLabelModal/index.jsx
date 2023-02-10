import React from "react";
import { HiXMark } from "react-icons/hi2";
import { FcCheckmark } from "react-icons/fc";
import LabelEditList from "../LabelEditList";
import { addNewLabel, editLabel, deleteLabel } from "../../api/label";
import DeleteModalConfirm from "../DeleteModalConfirm";
import { LoadingContext } from "../../Contexts/LoadingProvider";

class SidebarEditLabelModal extends React.Component {
  static contextType = LoadingContext;
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

  setInputLabelContent = (e) => {
    this.setState({
      label: {
        name: e.target.value,
      },
    });
  };

  toggleShowHideExistedLabel = () => {
    this.setState({
      isExistLabel: !this.state.isExistLabel,
    });
  };

  checkBeforeAddNewLabel = () => {
    let provider = this.props.labelProvider;
    let isExist = false;
    if (this.state.label.name !== "") {
      if (provider.labelList.length !== 0) {
        isExist = provider.labelList.some(
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
        this.toggleShowHideExistedLabel();
      }
    }
  };

  handleAddNewLabel = (label) => {
    let loadingProvider = this.context;
    loadingProvider.setLoading(true);
    addNewLabel(label)
      .then((data) => {
        this.props.labelProvider.setLabelList([
          data,
          ...this.props.labelProvider.labelList,
        ]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setLoading(false);
      });
  };

  handleDeleteLabel = (id) => {
    let loadingProvider = this.context;
    loadingProvider.setLoading(true);
    deleteLabel(id)
      .then(() => {
        let currentList = this.props.labelProvider.labelList;
        currentList = currentList.filter((item) => item.id !== id);
        this.props.labelProvider.setLabelList(currentList);
        this.setState({
          deleteConfirm: false,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setLoading(false);
      });
  };

  handleEditLabel = (label) => {
    let loadingProvider = this.context;
    let isExist = false;
    isExist = this.props.labelProvider.labelList.some((item) => {
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
      loadingProvider.setLoading(true);
      editLabel(label)
        .then(() => {
          let currentList = this.props.labelProvider.labelList;
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
          loadingProvider.setLoading(false);
        });
    }
  };

  toggleShowHideDeleteConfirm = (id) => {
    this.setState({
      deleteConfirm: !this.state.deleteConfirm,
      deleteLabelId: id,
    });
  };

  showEditBtn = () => {
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
            toggleShowHideDeleteConfirm={this.toggleShowHideDeleteConfirm}
            handleDeleteLabelFunc={this.handleDeleteLabel}
          />
        )}
        <div
          className="detail-edit-label-wrap"
          id="detail_edit_label_wrap"
          onClick={() => this.props.setShowHideEditLabelModal()}
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
                  onChange={(e) => this.setInputLabelContent(e)}
                  className="input text-black"
                  type="text"
                  placeholder="Create new label..."
                  value={this.state.label.name}
                />
                <button
                  onClick={() => this.checkBeforeAddNewLabel()}
                  className="btn-right-input-edit-label button-icon text-black cursor "
                >
                  <FcCheckmark />
                </button>
              </div>
              <div className="labels-list-edit align-center flex-around">
                <LabelEditList
                  isEditLabel={this.state.isEditLabel}
                  toggleShowHideDeleteConfirm={this.toggleShowHideDeleteConfirm}
                  showEditBtn={this.showEditBtn}
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
                onClick={() => this.props.setShowHideEditLabelModal()}
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
