import React from "react";
import LabelInNote from "../LabelInNote";
class LabelNote extends React.Component {
  wrapperRef = React.createRef();
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutsideLabelNote);
  }

  componentWillUnmount() {
    // important
    document.removeEventListener("click", this.handleClickOutsideLabelNote);
  }
  handleClickOutsideLabelNote = (e) => {
    if (!this.wrapperRef.current.contains(e.target)) {
      this.props.handleShowHideLabelNoteFunc(e);
    }
  };
  handleAddLabelToNote = () => {};
  render() {
    return (
      <>
        <div
          className="handle-label"
          style={this.props.style}
          ref={this.wrapperRef}
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
            {this.props.labelList.map((item) => {
              return <LabelInNote key={item.id} item={item} />;
            })}
          </div>
        </div>
      </>
    );
  }
}
export default LabelNote;
