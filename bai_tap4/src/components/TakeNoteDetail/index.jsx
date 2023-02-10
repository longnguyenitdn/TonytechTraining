import React from "react";
import { CiBullhorn } from "react-icons/ci";
import {
  HiOutlineUserPlus,
  HiOutlineFolderArrowDown,
  HiOutlineEllipsisHorizontalCircle,
} from "react-icons/hi2";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { BsImages } from "react-icons/bs";
import { FaThumbtack } from "react-icons/fa";
import { IoColorPaletteOutline } from "react-icons/io5";
import TakeNoteDetailIcon from "../TakeNoteDetailIcon";
import { addNewNote, editNote } from "../../api/note";
import { LoadingContext } from "../../Contexts/LoadingProvider";
class TakeNoteDetail extends React.Component {
  static contextType = LoadingContext;
  state = {
    id: null,
    title: "",
    content: "",
    labelNoteId: null,
  };
  wrapperRef = React.createRef();
  componentDidMount() {
    let newState = this.props.noteProvider.state;
    if (newState.isEdit) {
      this.setState({
        id: newState.editNote.id,
        title: newState.editNote.title,
        content: newState.editNote.content,
        labelNoteId: newState.editNote.labelNoteId,
      });
    }
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    // important
    document.removeEventListener("click", this.handleClickOutside);
  }
  handleChangeInputNoteTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleChangeInputNoteContent = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleAddNewNote = (note) => {
    let loadingProvider = this.context;
    loadingProvider.setLoading(true);
    addNewNote(note)
      .then((data) => {
        this.props.noteProvider.setNoteList([
          data,
          ...this.props.noteProvider.state.noteList,
        ]);
        // noteList: [note].concat(this.state.noteList)
        this.props.noteProvider.setDelayNote(data);
        this.props.noteProvider.toggleIsAdd();

        setTimeout(() => {
          this.props.noteProvider.setDelayClass("delay");
          setTimeout(() => {
            this.props.noteProvider.setDelayClass("");
          }, 300);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setLoading(false);
      });
  };

  handleEditNote = (note) => {
    let loadingProvider = this.context;
    loadingProvider.setLoading(true);
    editNote(note)
      .then((note) => {
        let currentList = this.props.noteProvider.state.noteList;
        currentList = currentList.map((item) => {
          if (item.id === note.id) {
            item.title = note.title;
            item.content = note.content;
            item.labelNoteId = note.labelNoteId;
          }
          return item;
        });
        this.props.noteProvider.setNoteList(currentList);

        this.props.noteProvider.toggleIsEdit();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setLoading(false);
      });
  };

  handleClickOutside = (e) => {
    if (!this.wrapperRef.current.contains(e.target)) {
      if (!this.state.title || !this.state.content) {
        alert("Missing Input Infomation!");
        return;
      } else {
        let { id, title, content, labelNoteId } = this.state;
        if (this.props.noteProvider.state.isEdit) {
          this.handleEditNote({
            id,
            title,
            content,
            labelNoteId,
          });
        } else {
          this.handleAddNewNote({
            title,
            content,
            labelNoteId,
          });
        }

        this.setState({
          title: "",
          content: "",
        });
      }
    }
  };

  render() {
    return (
      <>
        <div
          ref={this.wrapperRef}
          id="input_note_detail"
          className={`take-note-detail ${
            this.props.noteProvider.state.isEdit
              ? this.props.editModalClass
              : ""
          }`}
        >
          <div className="flex-row flex-bet align-center">
            <input
              onChange={(e) => this.handleChangeInputNoteTitle(e)}
              id="input_note_title"
              className="input-note-title input skip"
              type="text"
              placeholder="Title"
              value={this.state.title}
            />
            <button className="pin-icon button-icon cursor font-sz17">
              <FaThumbtack />
            </button>
          </div>
          <div>
            <input
              onChange={(e) => this.handleChangeInputNoteContent(e)}
              className="input-note-content input skip"
              type="text"
              placeholder="Take a note..."
              value={this.state.content}
            />
            <input
              type="hidden"
              id="input_note_label"
              className="input-note-content input skip"
              value=""
            />
          </div>
          <div className="flex-row flex-bet align-center">
            <div className="button-icon-wrap flex-row flex-bet align-center">
              <TakeNoteDetailIcon>
                <CiBullhorn />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <HiOutlineUserPlus />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <IoColorPaletteOutline />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <BsImages />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <HiOutlineFolderArrowDown />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <HiOutlineEllipsisHorizontalCircle />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <FiChevronsLeft />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <FiChevronsRight />
              </TakeNoteDetailIcon>
            </div>
            <div>
              <button
                onClick={(e) =>
                  this.props.noteProvider.setOpenDetailModal(
                    e,
                    this.props.noteProvider.state.editNote
                  )
                }
                id="close_detail_modal"
                className="btn-close button-icon cursor font-sz15"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default TakeNoteDetail;
