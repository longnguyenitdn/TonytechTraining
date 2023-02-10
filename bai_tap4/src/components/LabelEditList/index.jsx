import React from "react";
import { CiEraser, CiShoppingTag } from "react-icons/ci";
import { VscCheckAll } from "react-icons/vsc";
import { LabelContext } from "../../Contexts/LabelProvider";

class LabelEditList extends React.Component {
  state = {
    editLabel: {},
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
    this.props.showEditBtn();
    this.setState({
      editLabel: {
        id: id,
      },
    });
  };

  render() {
    return (
      <LabelContext.Consumer>
        {(provider) => (
          <>
            {provider.state.labelList.map((label) => {
              return (
                <div
                  key={label.id}
                  className="labels-row flex-row align-center flex-bet"
                >
                  <button
                    onClick={() =>
                      this.props.toggleShowHideDeleteConfirm(label.id)
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
                        <VscCheckAll fill="green" />
                      </button>
                    )}
                </div>
              );
            })}
          </>
        )}
      </LabelContext.Consumer>
    );
  }
}
export default LabelEditList;
