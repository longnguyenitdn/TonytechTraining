import React from "react";
import { BsPalette, BsImages, BsBoxArrowDown } from "react-icons/bs";
import { CiBullhorn } from "react-icons/ci";
import { TbUserPlus } from "react-icons/tb";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { AiOutlineCheck } from "react-icons/ai";
import { FaThumbtack } from "react-icons/fa";
import NoteBtnIcon from "../NoteBtnIcon";
class Note extends React.Component {
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
                onClick={(e) =>
                  this.props.handleClickOpenNoteOptionFunc(item.id, e)
                }
                className="hiden btn-note-option button-icon cursor font-sz15 void-clicks display-note-icon"
              >
                <HiOutlineEllipsisVertical />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Note;
