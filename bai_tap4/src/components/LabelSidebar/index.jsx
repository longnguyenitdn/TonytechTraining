import React from "react";
import { LabelContext } from "../../Contexts/LabelProvider";
import Label from "../Label";
class LabelSidebar extends React.Component {
  render() {
    return (
      <LabelContext.Consumer>
        {(provider) =>
          provider.labelList.map((item) => {
            return <Label key={item.id} item={item} />;
          })
        }
      </LabelContext.Consumer>
    );
  }
}
export default LabelSidebar;
