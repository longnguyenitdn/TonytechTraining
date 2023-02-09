import React from "react";
import { LabelContext } from "../../Contexts/LabelProvider";
import LabelInNote from "../LabelInNote";
class LabelNote extends React.Component {
  state = {
    labelId: null,
  };
  wrapperRef = React.createRef();
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutsideLabelNote);
  }

  componentWillUnmount() {
    // important
    document.removeEventListener("click", this.handleClickOutsideLabelNote);
  }

  handleLabelId = (id) => {
    this.setState({
      labelId: id,
    });
  };
  handleClickOutsideLabelNote = (e) => {
    if (!this.wrapperRef.current.contains(e.target)) {
      this.props.handleShowHideLabelNoteFunc(e);
    }
  };
  stopClick = (e) => {
    e.stopPropagation();
  };
  render() {
    return (
      <LabelContext.Consumer>
        {(labelProvider) => (
          <div
            className="handle-label"
            ref={this.wrapperRef}
            onClick={(e) => this.stopClick(e)}
          >
            <div className="handle-label-cover">
              <h5 className="text-black">Label note</h5>
              <input
                className="input text-black"
                type="text"
                placeholder="Enter label name"
              />
            </div>
            <div className="handle-label-list flex-col">
              {labelProvider.state.labelList.map((item) => {
                return (
                  <LabelInNote
                    noteProvider={this.props.noteProvider}
                    key={item.id}
                    label={item}
                    note={this.props.note}
                    handleRemoveLabelFromNote={
                      this.props.handleRemoveLabelFromNote
                    }
                    handleLabelId={this.handleLabelId}
                    labelId={this.state.labelId}
                  />
                );
              })}
            </div>
          </div>
        )}
      </LabelContext.Consumer>
    );
  }
}
export default LabelNote;
