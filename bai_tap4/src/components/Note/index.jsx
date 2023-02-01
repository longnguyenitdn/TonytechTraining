import React from "react";
import { BsPalette, BsImages, BsBoxArrowDown } from "react-icons/bs";
import { CiBullhorn } from "react-icons/ci";
import { TbUserPlus } from "react-icons/tb";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { AiOutlineCheck } from "react-icons/ai";
import { FaThumbtack } from "react-icons/fa";
import NoteBtnIcon from "../NoteBtnIcon";
import NoteOption from "../NoteOption";
import LabelAssignInNote from "../LabelAssignInNote";
import LabelNote from "../LabelNote";

class Note extends React.Component {
  state = {
    isOpenNoteOption: false,
    isOpenLabelNote: false,
  };

  handleShowHideLabelNote = (e) => {
    console.log("open");
    e.stopPropagation();
    this.setState({
      isOpenNoteOption: false,
      isOpenLabelNote: !this.state.isOpenLabelNote,
    });
  };

  handleClickOpenNoteOption = (e, id) => {
    e?.stopPropagation();
    this.setState({
      isOpenNoteOption: !this.state.isOpenNoteOption,
    });
    this.props.handleNoteOption(id);
  };
  render() {
    const item = this.props.item;

    return (
      <div
        className={`notes-cover flex-row  ${
          item.id === this.props.delayNote.id ? this.props.delayClass : ""
        }`}
        onClick={(e) => this.props.handleShowHideOpenDetailModalFunc(e, item)}
      >
        <div className="note">
          <div className="note-wrap">
            <button className="btn-checkAll btn-bg cursor">
              <AiOutlineCheck fill="white" className="color-white" />
            </button>
            <div className="note-title-wrap">
              <div className="flex-row flex-bet">
                <span className="note_title pad10">{item.title}</span>
                <button className="button-icon cursor font-sz15 hiden display-note-icon note-pin-icon">
                  <FaThumbtack />
                </button>
              </div>
              <div className="note-content-cover">
                <p className="note_content pad10">{item.content}</p>
              </div>
              {item.labelNoteId !== null && (
                <LabelAssignInNote
                  labelNoteId={item.labelNoteId}
                  labelList={this.props.labelList}
                />
              )}
            </div>
            <div className="note-icon flex-row flex-bet">
              <NoteBtnIcon>
                <CiBullhorn />
              </NoteBtnIcon>
              <NoteBtnIcon>
                <TbUserPlus />
              </NoteBtnIcon>
              <NoteBtnIcon>
                <BsPalette />
              </NoteBtnIcon>
              <NoteBtnIcon>
                <BsImages />
              </NoteBtnIcon>
              <NoteBtnIcon>
                <BsBoxArrowDown />
              </NoteBtnIcon>
              <button
                onClick={(e) => this.handleClickOpenNoteOption(e, item.id)}
                className="hiden btn-note-option button-icon cursor font-sz15 void-clicks display-note-icon"
              >
                <HiOutlineEllipsisVertical />
              </button>
            </div>
          </div>
          {this.state.isOpenNoteOption === true && (
            <NoteOption
              noteId={item.id}
              noteList={this.props.noteList}
              setNoteList={this.props.setNoteList}
              handleNoteOption={this.props.handleNoteOption}
              handleClickOpenNoteOptionFunc={this.handleClickOpenNoteOption}
              handleShowHideLabelNoteFunc={this.handleShowHideLabelNote}
              setLoading={this.props.setLoading}
            />
          )}
          {this.state.isOpenLabelNote === true && (
            <LabelNote
              labelList={this.props.labelList}
              style={this.state.position}
              handleShowHideLabelNoteFunc={this.handleShowHideLabelNote}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Note;
