import React from "react";
import { NoteContext } from "../../contexts/NoteProvider";
import TakeNoteDetail from "../TakeNoteDetail";

class AddNote extends React.Component {
  render() {
    return (
      <NoteContext.Consumer>
        {(noteProvider) => <TakeNoteDetail noteProvider={noteProvider} />}
      </NoteContext.Consumer>
    );
  }
}
export default AddNote;
