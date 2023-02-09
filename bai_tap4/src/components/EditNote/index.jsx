import React from "react";
import { NoteContext } from "../../Contexts/NoteProvider";
import TakeNoteDetail from "../TakeNoteDetail";

class EditNote extends React.Component {
  state = {
    editModalClass: "take-note-detail-center",
    editModalWrapClass: "take-note-detail-center-wrap",
  };
  render() {
    return (
      <NoteContext.Consumer>
        {(noteProvider) => (
          <>
            <div className={this.state.editModalWrapClass}></div>
            <TakeNoteDetail
              editModalClass={this.state.editModalClass}
              noteProvider={noteProvider}
            />
          </>
        )}
      </NoteContext.Consumer>
    );
  }
}
export default EditNote;
