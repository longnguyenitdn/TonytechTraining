import React from "react";
import TakeNoteDetail from "../TakeNoteDetail";

class EditNote extends React.Component {
  state = {
    editModalClass: "take-note-detail-center",
    editModalWrapClass: "take-note-detail-center-wrap",
  };
  render() {
    return (
      <>
        <div className={this.state.editModalWrapClass}></div>
        <TakeNoteDetail
          noteList={this.props.noteList}
          setNoteList={this.props.setNoteList}
          handleShowHideOpenDetailModalFunc={
            this.props.handleShowHideOpenDetailModalFunc
          }
          handleEditNoteFunc={this.props.handleEditNoteFunc}
          editModalClass={this.state.editModalClass}
          handleEditNote={this.props.handleEditNote}
          editNote={this.props.editNote}
          isEdit={this.props.isEdit}
          setLoading={this.props.setLoading}
          handleIsEdit={this.props.handleIsEdit}
        />
      </>
    );
  }
}
export default EditNote;
