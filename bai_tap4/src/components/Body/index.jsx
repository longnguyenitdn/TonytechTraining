import React from "react";
import Notes from "../Notes";
import TakeNote from "../TakeNote";
import AddNote from "../AddNote";

import CheckboxAllLabel from "../CheckboxAllLabel";
import { NoteContext } from "../../contexts/NoteProvider";
import { LabelContext } from "../../contexts/LabelProvider";

class Body extends React.Component {
  render() {
    return (
      <NoteContext.Consumer>
        {(noteProvider) => {
          let { isAdd } = noteProvider;
          return (
            <>
              <div className="cover-body cover body-content-cover">
                <div className="flex-row">
                  <div
                    id="body_content"
                    className="body-content flex-row flex-center"
                  >
                    <div className="body-take-note flex-col skip">
                      <div className="detail-note">
                        {isAdd === false && <TakeNote />}
                        {isAdd === true && <AddNote />}
                        <div className="labelAll">
                          {noteProvider.isCheckboxAll === true && (
                            <LabelContext.Consumer>
                              {(labelProvider) => (
                                <CheckboxAllLabel
                                  labelProvider={{
                                    labelList: labelProvider.labelList,
                                  }}
                                  noteProvider={{
                                    noteList: noteProvider.noteList,
                                    checkboxListId: noteProvider.checkboxListId,
                                    clearCheckboxListId:
                                      noteProvider.clearCheckboxListId,
                                    setNoteList: noteProvider.setNoteList,
                                  }}
                                />
                              )}
                            </LabelContext.Consumer>
                          )}
                        </div>
                      </div>

                      <div className="display flex-row" id="display">
                        <Notes />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </NoteContext.Consumer>
    );
  }
}
export default Body;
