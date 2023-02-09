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
import { editNote } from "../../api/note";
import { NoteContext } from "../../Contexts/NoteProvider";
import { LoadingContext } from "../../Contexts/LoadingProvider";

class Note extends React.Component {
  static contextType = LoadingContext;
  state = {
    isOpenNoteOption: false,
    isOpenLabelNote: false,
  };

  handleRemoveLabelFromNote = (e, note) => {
    let loadingProvider = this.context;
    e.stopPropagation();
    let obj = {
      ...note,
      labelNoteId: null,
    };

    loadingProvider.setLoading(true);

    editNote(obj)
      .then((data) => {
        let currentList = this.props.noteProvider.state.noteList;
        currentList = currentList.map((item) => {
          if (item.id === data.id) {
            item.labelNoteId = data.labelNoteId;
          }
          return item;
        });
        this.props.noteProvider.setNoteList(currentList);
      })

      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setLoading(false);
      });
  };

  handleShowHideLabelNote = (e) => {
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
    this.props.noteProvider.handleNoteOption(id);
  };
  handleBtnCheckAll = (e, noteId) => {
    e.stopPropagation();
    let currentList = this.props.noteProvider.state.checkboxListId;

    let isExist = currentList.some((item) => item === noteId);

    if (isExist) {
      currentList = currentList.filter((item) => item !== noteId);
    } else {
      currentList.push(noteId);
    }

    if (currentList.length !== 0) {
      this.props.noteProvider.showCheckboxAll();
    } else {
      this.props.noteProvider.hideCheckboxAll();
    }
    this.props.noteProvider.handleCheckboxListId(currentList);
  };
  render() {
    const item = this.props.item;
    return (
      <NoteContext.Consumer>
        {(provider) => {
          return (
            <div
              className={`notes-cover flex-row  ${
                item.id === provider.state.delayNote.id
                  ? provider.state.delayClass
                  : ""
              }`}
              onClick={(e) => provider.handleShowHideOpenDetailModal(e, item)}
            >
              <div
                className={`note ${
                  provider.state.checkboxListId.includes(item.id)
                    ? "checked"
                    : ""
                }`}
              >
                <div className="note-wrap">
                  <button
                    className="btn-checkAll btn-bg cursor"
                    id={item.id}
                    onClick={(e) => this.handleBtnCheckAll(e, item.id)}
                  >
                    <AiOutlineCheck
                      fill="white"
                      className="color-white avoid-clicks"
                    />
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
                        item={item}
                        handleRemoveLabelFromNote={
                          this.handleRemoveLabelFromNote
                        }
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
                      onClick={(e) =>
                        this.handleClickOpenNoteOption(e, item.id)
                      }
                      className="hiden btn-note-option button-icon cursor font-sz15 void-clicks display-note-icon"
                    >
                      <HiOutlineEllipsisVertical />
                    </button>
                  </div>
                </div>
                {this.state.isOpenNoteOption === true && (
                  <NoteOption
                    provider={provider}
                    noteId={item.id}
                    handleClickOpenNoteOptionFunc={
                      this.handleClickOpenNoteOption
                    }
                    handleShowHideLabelNoteFunc={this.handleShowHideLabelNote}
                  />
                )}
                {this.state.isOpenLabelNote === true && (
                  <LabelNote
                    noteProvider={provider}
                    handleShowHideLabelNoteFunc={this.handleShowHideLabelNote}
                    note={item}
                    handleRemoveLabelFromNote={this.handleRemoveLabelFromNote}
                    isChecked={this.state.isChecked}
                  />
                )}
              </div>
            </div>
          );
        }}
      </NoteContext.Consumer>
    );
  }
}
export default Note;
