import React from "react";
import { FcCancel } from "react-icons/fc";
import { LabelContext } from "../../Contexts/LabelProvider";

class LabelAssignInNote extends React.Component {
  render() {
    let labelNoteId = this.props.item.labelNoteId;
    return (
      <LabelContext.Consumer>
        {(provider) => {
          const labelNote = provider.state.labelList.find(
            (item) => item.id === labelNoteId
          );
          return (
            <div className={`list-label ${labelNote ? "" : "hiden"} `}>
              <p>{labelNote?.name}</p>
              <FcCancel
                className="cancel font-sz20 hiden"
                onClick={(e) =>
                  this.props.handleRemoveLabelFromNote(e, this.props.item)
                }
              />
            </div>
          );
        }}
      </LabelContext.Consumer>
    );
  }
}
export default LabelAssignInNote;
