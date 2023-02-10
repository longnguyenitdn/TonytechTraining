import React from "react";
import { deleteNote } from "../../api/note";
import { LoadingContext } from "../../contexts/LoadingProvider";

class NoteOption extends React.Component {
  static contextType = LoadingContext;
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
      this.props.onClickOpenNoteOption(e);
    }
  };

  handleDeleleNote = (id, e) => {
    let loadingProvider = this.context;
    e?.stopPropagation();
    loadingProvider.setLoading(true);

    deleteNote(id)
      .then(() => {
        let currentList = this.props.provider.state.noteList;
        currentList = currentList.filter((item) => item.id !== id);
        this.props.provider.setNoteList(currentList);
        this.props.provider.setNoteOption(null);
        this.props.toggleShowHideLabelNote(e);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setLoading(false);
      });
  };
  render() {
    return (
      <div className="note-option-cover" ref={this.wrapperRef}>
        <div className="note-option  bg-white ">
          <p
            onClick={(e) =>
              this.handleDeleleNote(this.props.provider.state.optionId, e)
            }
          >
            Delete note
          </p>
          <p
            id="handle_label"
            onClick={(e) => this.props.toggleShowHideLabelNote(e)}
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
