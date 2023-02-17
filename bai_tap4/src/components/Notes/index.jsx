import React from "react";
import { NoteContext } from "../../contexts/NoteProvider";
import { LabelContext } from "../../contexts/LabelProvider";

import Note from "../Note";
import NothingToShow from "../NothingToShow";
class Notes extends React.Component {
  render() {
    return (
      <LabelContext.Consumer>
        {(labelProvider) => (
          <NoteContext.Consumer>
            {(noteProvider) => {
              let filterNoteList = noteProvider.noteList;
              if (labelProvider.activeId !== null) {
                filterNoteList = filterNoteList.filter(
                  (item) =>
                    String(item.labelNoteId) === String(labelProvider.activeId)
                );
                if (labelProvider.activeId === "sidebar_btn_note") {
                  filterNoteList = noteProvider.noteList;
                }
              }
              return filterNoteList.length > 0 ? (
                filterNoteList.map((item) => {
                  return (
                    <Note
                      key={item.id}
                      item={item}
                      checkboxListId={this.props.checkboxListId}
                      setCheckboxListId={this.props.setCheckboxListId}
                      noteProvider={{
                        noteList: noteProvider.noteList,
                        setNoteList: noteProvider.setNoteList,
                        setOptionId: noteProvider.setOptionId,
                        setIsCheckboxAll: noteProvider.setIsCheckboxAll,
                      }}
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
