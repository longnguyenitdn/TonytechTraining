import React from "react";
import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import { getLabel } from "../api/label";
import { LoadingContext } from "./LoadingProvider";
import NoteProvider from "./NoteProvider";
export const LabelContext = createContext();
const LabelProvider = (props) => {
  const loadingProvider = useContext(LoadingContext);
  const [isExistLabel, setIsExistLabel] = useState(false);
  const [labelList, setLabelList] = useState([]);
  const [activeId, setactiveId] = useState(null);

  useEffect(() => {
    loadingProvider.setStatusLoading(true);
    getLabel()
      .then((data) => {
        setLabelList(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  }, []);

  return (
    <LabelContext.Provider
      value={{
        isExistLabel: isExistLabel,
        setIsExistLabel: setIsExistLabel,
        labelList: labelList,
        setLabelList: setLabelList,
        activeId: activeId,
        setactiveId: setactiveId,
      }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};
export default LabelProvider;
// import React from "react";
// import { getLabel } from "../api/label";
// import { LoadingContext } from "./LoadingProvider";
// export const LabelContext = React.createContext();

// class LabelProvider extends React.Component {
//   static contextType = LoadingContext;
//   state = {
//     isExistLabel: false,
//     labelList: [],
//     activeId: null,
//   };
//   componentDidMount() {
//     let provider = this.context;
//     provider.setLoading(true);
//     getLabel()
//       .then((data) => {
//         this.setState({
//           labelList: data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         provider.setLoading(false);
//       });
//   }

//   setLabelList = (newList) => {
//     this.setState({
//       labelList: newList,
//     });
//   };
//   setActiveSidebarMenu = (e) => {
//     this.setState({
//       activeId: e.target.id,
//     });
//   };
//   render() {
//     return (
//       <LabelContext.Provider
//         value={{
//           state: this.state,
//           setLabelList: this.setLabelList,
//           setActiveSidebarMenu: this.setActiveSidebarMenu,
//         }}
//       >
//         {this.props.children}
//       </LabelContext.Provider>
//     );
//   }
// }
// export default LabelProvider;
