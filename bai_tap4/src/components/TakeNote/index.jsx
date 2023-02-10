import React from "react";
import { BiPaint } from "react-icons/bi";
import { BsCheck2Square, BsImages } from "react-icons/bs";
import { NoteContext } from "../../Contexts/NoteProvider";
import TakeNoteBtnIcon from "../TakeNoteBtnIcon";

class TakeNote extends React.Component {
  render() {
    return (
      <NoteContext.Consumer>
        {(provider) => (
          <div id="input_note_cover" className="take-note flex-row flex-bet">
            <input
              onClick={(e) => provider.setOpenDetailModal(e)}
              className="input-take-note skip"
              type="text"
              placeholder="Take a note..."
            />
            <div className="take-note-icon flex-row align-center">
              <TakeNoteBtnIcon>
                <BsCheck2Square />
              </TakeNoteBtnIcon>
              <TakeNoteBtnIcon>
                <BiPaint />
              </TakeNoteBtnIcon>
              <TakeNoteBtnIcon>
                <BsImages />
              </TakeNoteBtnIcon>
            </div>
          </div>
        )}
      </NoteContext.Consumer>
    );
  }
}
export default TakeNote;
