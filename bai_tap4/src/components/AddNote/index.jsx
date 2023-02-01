import React from "react";
import TakeNoteDetail from "../TakeNoteDetail";

class AddNote extends React.Component {
  render() {
    return (
      <TakeNoteDetail
        handleShowHideOpenDetailModalFunc={
          this.props.handleShowHideOpenDetailModalFunc
        }
        noteList={this.props.noteList}
        setNoteList={this.props.setNoteList}
        handleIsAdd={this.props.handleIsAdd}
        setLoading={this.props.setLoading}
        handleDelayClass={this.props.handleDelayClass}
        handleDelayNote={this.props.handleDelayNote}
      />
    );
  }
}
export default AddNote;
