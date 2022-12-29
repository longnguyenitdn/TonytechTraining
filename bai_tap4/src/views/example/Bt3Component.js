import React from "react";
import './Bt3Component.css';
class Bt3Component extends React.Component {
   render() {
      return (
         <div className="cover-header cover">
            <div className="header-content flex-row flex-bet align-center max-width99">
               <div className="flex-row header-left align-center">
                  <div className="flex-row flex-around align-center">
                     <button id="header_menu_icon" className="header-icon cursor btn-bg"><i className="fa-solid fa-bars"></i></button>
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Google_Keep_icon_%282020%29.svg/768px-Google_Keep_icon_%282020%29.svg.png" alt="Fail" className="cursor bg-trans" />
                     <p className="cursor bg-trans">Keep</p>
                  </div>
               </div>
               <div className="header-mid flex-row align-center flex-bet">
                  <div className="search flex-row align-center flex-around">
                     <div className="search-icon">
                        <button className=" input bg-trans marg10 cursor btn-bg"><i className="fa-solid fa-magnifying-glass  font-sz17 "></i></button>
                     </div>
                     <div className="input-search-wrap flex-row">
                        <input className="input-search input bg-trans font-sz17" type="text" placeholder="Search..." />
                        <button className="btn-bg"><i className="fa-solid fa-xmark cursor "></i></button>
                     </div>
                  </div>
                  <div className="header-tool flex-row">
                     <button className="cursor btn-bg"><i className="fa-sharp fa-solid fa-rotate-right"></i></button>
                     <button className="cursor btn-bg"><i className="fa-regular fa-rectangle-list"></i></button>
                     <button className="cursor btn-bg"><i className="fa-solid fa-gear"></i></button>
                  </div>
               </div>
               <div>
                  <div className="header-gg flex-row">
                     <button className="cursor btn-bg"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                     <button className="cursor btn-bg"><i className="fa-solid fa-user-tie"></i></button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
export default Bt3Component;
