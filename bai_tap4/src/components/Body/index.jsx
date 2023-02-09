import React from "react";
import Notes from "../Notes";
import TakeNote from "../TakeNote";
import AddNote from "../AddNote";

import CheckboxAllLabel from "../CheckboxAllLabel";
import { NoteContext } from "../../Contexts/NoteProvider";
import { LabelContext } from "../../Contexts/LabelProvider";

class Body extends React.Component {
  handleShowData = () => {
    this.setState({
      isData: true,
    });
  };
  handleHideData = () => {
    this.setState({
      isData: false,
    });
  };
  render() {
    return (
      <NoteContext.Consumer>
        {(noteProvider) => {
          let { isAdd } = noteProvider.state;
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
                          {noteProvider.state.isCheckboxAll === true && (
                            <LabelContext.Consumer>
                              {(labelProvider) => (
                                <CheckboxAllLabel
                                  labelProvider={labelProvider}
                                  noteProvider={noteProvider}
                                />
                              )}
                            </LabelContext.Consumer>
                          )}
                        </div>
                      </div>

                      <div className="display flex-row" id="display">
                        <Notes
                          handleShowData={this.handleShowData}
                          handleHideData={this.handleHideData}
                        />
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
