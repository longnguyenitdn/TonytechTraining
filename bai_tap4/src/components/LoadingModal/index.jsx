import React from "react";
import '../HomeHeader/Home.css'
class LoadingModal extends React.Component {
   render() {
      return (
         <div  className="loading-modal">
            <div  className="loading-wrap "></div>
            <div  className="loading"><img src="/1957-maneki-cat-outline.gif" alt="loading"/></div>
         </div>
      )
   }
}
export default LoadingModal