import '../HomeHeader/Home.css'
import React from 'react'
import { BsPalette, BsImages, BsBoxArrowDown } from 'react-icons/bs';
import { CiBullhorn } from 'react-icons/ci';
import { TbUserPlus } from 'react-icons/tb';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { AiOutlineCheck } from 'react-icons/ai';
import TakeNoteDetail from '../TakeNoteDetail';
import TakeNote from '../TakeNote';
import NoteOption from '../NoteOption';
import Sidebar from '../Sidebar';
import { myFetch } from '../../utils'
import LoadingModal from '../LoadingModal';


class HomeSidebarBody extends React.Component {
   state = {
      editNote: null,
      isEdit: false,
      isOpen: false,
      noteList: [],
      isOpenNoteOption: false,
      position: {
         top: 0,
         left: 0
      },
      optionId: null,
      statusLoading: false
   }

   componentDidMount() {
      this.setLoading(true);
      myFetch('/notes', 'GET')
         .then(data => {
            this.setState({
               noteList: data
            })
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   setLoading = (status) => {
      this.setState({
         statusLoading: status
      })
   }

   handleShowHideOpenDetailModal = (item = null) => {
      this.setState({
         isOpen: !this.state.isOpen
      })
      if (item) {
         this.setState({
            isEdit: true,
            editNote: item
         })
      }

   }

   handleAddNewNote = (note) => {
      const link = '/notes';
      const option = 'POST';
      this.setLoading(true);
      myFetch(link, option, note)
         .then(data => {
            this.setState({
               // noteList: [note].concat(this.state.noteList)
               noteList: [data, ...this.state.noteList]
            })
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   handleDeleleNote = (id) => {
      const link = `/notes/${id}`;
      const option = 'DELETE';
      this.setLoading(true);

      myFetch(link, option)
         .then(() => {
            let currentList = this.state.noteList
            currentList = currentList.filter(item => item.id !== id)
            this.setState({
               noteList: currentList
            })
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   handleEditNote = (note) => {
      let link = `/notes/${note.id}`;
      let method = 'PUT';
      this.setLoading(true);

      myFetch(link, method, note)
         .then(() => {
            let currentList = this.state.noteList
            currentList = currentList.map(item => {
               if (item.id === note.id) {
                  item.title = note.title;
                  item.content = note.content;
               }
               return item;
            })
            this.setState({
               noteList: currentList,
               isEdit: false
            })

         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   handleClickOpenNoteOption = (id) => {
      this.setState({
         isOpenNoteOption: !this.state.isOpenNoteOption,
         position: {
            top: window.event.clientY + 10 + 'px',
            left: window.event.clientX - 20 + 'px'
         },
         optionId: id
      })
   }


   render() {
      let { isOpen } = this.state
      return (
         <>
            <div hidden={this.state.statusLoading === false}><LoadingModal /></div>
            {this.state.isOpenNoteOption === true && <NoteOption optionId={this.state.optionId} handleDeleleNoteFunc={this.handleDeleleNote} style={this.state.position} handleClickOpenNoteOptionFunc={this.handleClickOpenNoteOption} />}
            <div className="cover-body cover body-content-cover">
               <div className="flex-row">
                  <Sidebar />
                  <div id="body_content" className="body-content flex-row flex-center">
                     <div className="body-take-note flex-col skip">
                        {isOpen === false && <TakeNote isOpenFunc={this.handleShowHideOpenDetailModal} />}
                        {isOpen === true && <TakeNoteDetail handleEditNoteFunc={this.handleEditNote} editNote={this.state.editNote} isEdit={this.state.isEdit} addNewNote={this.handleAddNewNote} isOpen={this.state.isOpen} isOpenFunc={this.handleShowHideOpenDetailModal} noteState={this.state.noteList} />}
                        <div id="detail_note" className="detail-note"></div>
                        <div className="labelAll hiden" id="labelAllCheckbox"></div>
                        <div className="display flex-row" id="display">
                           {this.state.noteList.map(item => {
                              return (
                                 <div key={item.id} className="notes-cover flex-row" onClick={() => this.handleShowHideOpenDetailModal(item)}>
                                    <div className="note"  >
                                       <div className="note-wrap">
                                          <button className='btn-checkAll btn-bg cursor'><AiOutlineCheck fill='white' className='color-white' /></button>
                                          <div className="note-title-wrap">
                                             <div className="flex-row flex-bet">
                                                <span className="note_title pad10">{item.title}</span>
                                                <button className="button-icon cursor font-sz15 hiden display-note-icon note-pin-icon"><i className="fa-solid fa-thumbtack"></i></button>
                                             </div>
                                             <div className="note-content-cover">
                                                <p className="note_content pad10">{item.content}</p>
                                             </div>
                                          </div>
                                          <div className="note-icon flex-row flex-bet">
                                             <button className="button-icon cursor font-sz15 hiden display-note-icon"><CiBullhorn /></button>
                                             <button className="button-icon cursor font-sz15 hiden display-note-icon"><TbUserPlus /></button>
                                             <button className="button-icon cursor font-sz15 hiden display-note-icon"><BsPalette /></button>
                                             <button className="button-icon cursor font-sz15 hiden display-note-icon"><BsImages /></button>
                                             <button className="button-icon cursor font-sz15 hiden display-note-icon"><BsBoxArrowDown /></button>
                                             <button onClick={() => this.handleClickOpenNoteOption(item.id)} className="hiden btn-note-option button-icon cursor font-sz15 void-clicks display-note-icon"><HiOutlineEllipsisVertical /></button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )
                           })
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </>
      )
   }
}
export default HomeSidebarBody