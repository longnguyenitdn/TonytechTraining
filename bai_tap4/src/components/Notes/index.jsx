import React from "react";
import Note from "../Note";
class Notes extends React.Component {
  render() {
    return (
      <>
        {this.props.noteList.map((item) => {
          return (
            <Note
              key={item.id}
              item={item}
              delayClass={this.props.delayClass}
              delayNote={this.props.delayNote}
              handleClickOpenNoteOptionFunc={this.handleClickOpenNoteOption}
              handleShowHideOpenDetailModalFunc={
                this.handleShowHideOpenDetailModal
              }
            />
          );
        })}
      </>
    );
  }
}
export default Notes;
