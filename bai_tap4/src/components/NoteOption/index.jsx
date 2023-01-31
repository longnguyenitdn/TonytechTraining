import React from "react";

class NoteOption extends React.Component {
  render() {
    return (
      <div className="note-option-cover ">
        <div className="note-option  bg-white " style={this.props.style}>
          <p
            onClick={(e) =>
              this.props.handleDeleleNoteFunc(this.props.optionId, e)
            }
          >
            Delete note
          </p>
          <p
            id="handle_label"
            onClick={(e) => this.props.handleShowHideLabelNoteFunc(e)}
          >
            Add label
          </p>
          <p>Add drawing</p>
          <p>Make a copy</p>
          <p>Show checkboxes</p>
          <p>Copy to Google Docs</p>
          <input type="hidden" id="optionId" />
        </div>
        <div id="note_option_label"></div>
      </div>
    );
  }
}
export default NoteOption;
