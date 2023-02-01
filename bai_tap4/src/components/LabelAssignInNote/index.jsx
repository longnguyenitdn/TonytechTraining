import React from "react";
import { FcCancel } from "react-icons/fc";

class LabelAssignInNote extends React.Component {
  render() {
    const labelNote = this.props.labelList.find(
      (item) => item.id === this.props.labelNoteId
    );
    return (
      <>
        <div className="list-label ">
          <p>{labelNote ? labelNote.name : ""}</p>
          <FcCancel className="cancel font-sz20 hiden" />
        </div>
      </>
    );
  }
}
export default LabelAssignInNote;
