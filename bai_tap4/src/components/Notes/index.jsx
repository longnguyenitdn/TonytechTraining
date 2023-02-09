import React from "react";
import { NoteContext } from "../../Contexts/NoteProvider";
import { LabelContext } from "../../Contexts/LabelProvider";

import Note from "../Note";
import NothingToShow from "../NothingToShow";
class Notes extends React.Component {
  render() {
    return (
      <LabelContext.Consumer>
        {(labelProvider) => (
          <NoteContext.Consumer>
            {(noteProvider) => {
              let filterNoteList = noteProvider.state.noteList;
              if (labelProvider.state.activeId !== null) {
                filterNoteList = filterNoteList.filter(
                  (item) =>
                    String(item.labelNoteId) ===
                    String(labelProvider.state.activeId)
                );
                if (labelProvider.state.activeId === "sidebar_btn_note") {
                  filterNoteList = noteProvider.state.noteList;
                }
              }
              return filterNoteList.length > 0 ? (
                filterNoteList.map((item) => {
                  return (
                    <Note
                      key={item.id}
                      item={item}
                      noteProvider={noteProvider}
                    />
                  );
                })
              ) : (
                <NothingToShow />
              );
            }}
          </NoteContext.Consumer>
        )}
      </LabelContext.Consumer>
    );
  }
}
export default Notes;
