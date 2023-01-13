import React from "react";
import { CiEraser, CiShoppingTag } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";

class LabelEditList extends React.Component {
  state = {
    editLabel: {
      id: null,
      name: "",
    },
  };
  handleChangeLabelName = (e) => {
    this.setState({
      editLabel: {
        ...this.state.editLabel,
        name: e.target.value,
      },
    });
  };

  getEditLabelId = (id) => {
    this.props.handleShowEditBtnFunc();
    this.setState({
      editLabel: {
        id: id,
      },
    });
  };

  render() {
    return (
      <>
        {this.props.labelList.map((label) => {
          return (
            <div
              key={label.id}
              className="labels-row flex-row align-center flex-bet"
            >
              <button
                onClick={() =>
                  this.props.handleShowHideDeleteConfirmFunc(label.id)
                }
                className="button-icon cursor"
              >
                <CiShoppingTag className="fa-tag" />
                <CiEraser className="fa-eraser" />
              </button>
              <input
                onClick={() => this.getEditLabelId(label.id)}
                onChange={(e) => this.handleChangeLabelName(e)}
                className="label-name input"
                defaultValue={label.name}
              />
              {this.props.isEditLabel === true &&
                this.state.editLabel.id === label.id && (
                  <button
                    onClick={() =>
                      this.props.handleEditLabelFunc(this.state.editLabel)
                    }
                    className="edit-label-name button-icon cursor"
                  >
                    <GiCheckMark fill="red" />
                  </button>
                )}
            </div>
          );
        })}
      </>
    );
  }
}
export default LabelEditList;
