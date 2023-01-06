import React from "react"
import '../HomeHeader/Home.css'
import { CiBullhorn } from 'react-icons/ci';
import { HiOutlineUserPlus, HiOutlineFolderArrowDown, HiOutlineEllipsisHorizontalCircle } from 'react-icons/hi2';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { BsImages } from 'react-icons/bs';
import { IoColorPaletteOutline } from 'react-icons/io5';

class TakeNoteDetail extends React.Component {
   state = {
      id: null,
      title: '',
      content: ''
   }
   handleChangeInputNoteTitle = (e) => {
      this.setState({
         title: e.target.value
      })
   }
   handleChangeInputNoteContent = (e) => {
      this.setState({
         content: e.target.value
      })
   }
   handleClickOutside = () => {
      if (!this.state.title || !this.state.content) {
         alert("Missing Input Infomation!")
         return;
      } else {
         let {id,title,content}=this.state
         if (this.props.isEdit) {
            
            this.props.handleEditNoteFunc({
               id,
               title,
               content
            })
         } else {
            this.props.addNewNote({              
               title,
               content
            })
         }
         this.setState({
            title: '',
            content: ''
         })
         this.props.isOpenFunc();
      }
   }
   componentDidMount() {
      if (this.props.isEdit) {
         this.setState({
            id:this.props.editNote.id,
            title: this.props.editNote.title,
            content: this.props.editNote.content
         })
      }
   }
   render() {

      return (
         <>
            {this.props.isOpen === true && <div onClick={this.handleClickOutside} className="take-note-detail-modal"></div>}
            <div id="input_note_detail" className="take-note-detail">
               <div className="flex-row flex-bet align-center">
                  <input onChange={(e) => this.handleChangeInputNoteTitle(e)} id="input_note_title" className="input-note-title input skip" type="text" placeholder="Title" value={this.state.title} />
                  <button className="pin-icon button-icon cursor font-sz17"><i className="fa-solid fa-thumbtack"></i></button>
               </div>
               <div>
                  <input onChange={(e) => this.handleChangeInputNoteContent(e)} className="input-note-content input skip" type="text" placeholder="Take a note..." value={this.state.content} />
                  <input type="hidden" id="input_note_label" className="input-note-content input skip" value="" />
               </div>
               <div className="flex-row flex-bet align-center">
                  <div className="button-icon-wrap flex-row flex-bet align-center">
                     <button className="button-icon cursor font-sz15"><CiBullhorn className="font-sz20" /></button>
                     <button className="button-icon cursor font-sz15"><HiOutlineUserPlus className="font-sz20" /></button>
                     <button className="button-icon cursor font-sz15"><IoColorPaletteOutline className="font-sz20" /></button>
                     <button className="button-icon cursor font-sz15"><BsImages className="font-sz20" /></button>
                     <button className="button-icon cursor font-sz15"><HiOutlineFolderArrowDown className="font-sz20" /></button>
                     <button className="option-btn button-icon cursor font-sz15"><HiOutlineEllipsisHorizontalCircle className="font-sz20" /></button>
                     <button className="button-icon cursor font-sz15"><FiChevronsLeft className="font-sz20" /></button>
                     <button className="button-icon cursor font-sz15"><FiChevronsRight className="font-sz20" /></button>
                  </div>
                  <div><button onClick={this.props.isOpenFunc} id="close_detail_modal" className="btn-close button-icon cursor font-sz15">Close</button></div>
               </div>
            </div>

         </>
      )
   }
}
export default TakeNoteDetail