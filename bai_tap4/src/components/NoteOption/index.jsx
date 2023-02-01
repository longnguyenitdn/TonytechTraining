import React from "react";
import { deleteNote } from "../../api/note";

class NoteOption extends React.Component {
  wrapperRef = React.createRef();
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutsideNoteOption);
  }

  componentWillUnmount() {
    // important
    document.removeEventListener("click", this.handleClickOutsideNoteOption);
  }
  handleClickOutsideNoteOption = (e) => {
    if (!this.wrapperRef.current.contains(e.target)) {
      this.props.handleClickOpenNoteOptionFunc(e);
    }
  };

  handleDeleleNote = (id, e) => {
    e?.stopPropagation();
    deleteNote(id)
      .then(() => {
        let currentList = this.props.noteList;
        currentList = currentList.filter((item) => item.id !== id);
        this.props.setNoteList(currentList);
        this.props.handleNoteOption(null);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.props.setLoading(false);
      });
  };
  render() {
    return (
      <div className="note-option-cover" ref={this.wrapperRef}>
        <div className="note-option  bg-white " style={this.props.style}>
          <p onClick={(e) => this.handleDeleleNote(this.props.noteId, e)}>
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
