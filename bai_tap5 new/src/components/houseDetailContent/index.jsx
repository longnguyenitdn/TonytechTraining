import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ROUTER } from "../../config/routers";

const HouseDetailContent = (props) => {
  const [houseStatus, setHouseStatus] = useState(false);

  const handleRemoveInvoiceOfHouse = (houseId) => {
    let invoicesTemp = [];
    invoicesTemp = props.invoiceList.filter((item) => item.houseId === houseId);
    Promise.all(
      invoicesTemp.map((invoice) => props.handleRemoveInvoice(invoice.id))
    ).then((invoicesTemp = []));
  };
  const handleRemoveHouseAndInvoices = (houseId) => {
    handleRemoveInvoiceOfHouse(houseId);
    props.handleRemoveHouse(houseId);
  };
  const handleUpdateHouse = (house) => {
    props.handleEditHouse(house);
    setHouseStatus(false);
  };
  return (
    <div className="body-bar f-row f-cen f-around">
      <button
        onClick={() => handleRemoveHouseAndInvoices(props.editHouseTemp.id)}
      >
        <Link to={ROUTER.home}>
          <BsFillTrashFill fill="#446B50" />
        </Link>
      </button>
      <div className="body-house-name-cover">
        <div className="body-house-name f-row f-col f-cen">
          <label htmlFor="houseName"> House's Name</label>

          <input
            onClick={() => setHouseStatus(true)}
            onChange={(e) => props.setHouseTempBeforeEdit(e)}
            id="houseName"
            type="text"
            value={props.editHouseTemp ? props.editHouseTemp.name : "..."}
            className="t-cen"
          />
        </div>
      </div>
      <button>
        {houseStatus === false && <FaPencilAlt />}
        {houseStatus === true && (
          <GiCheckMark onClick={() => handleUpdateHouse(props.editHouseTemp)} />
        )}
      </button>
    </div>
  );
};
export default HouseDetailContent;
