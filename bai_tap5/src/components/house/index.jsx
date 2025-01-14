import { BsHouse } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getRouter, ROUTER } from "../../config/routers";

const House = (props) => {
  const house = props.item;

  const invoiceLink = getRouter(ROUTER.invoices, {
    houseId: house.id,
  });

  return (
    <div className="house-cover f-col f-cen">
      <button className="house-icon">
        <Link to={invoiceLink}>
          <BsHouse fill="black" />
        </Link>
      </button>
      <p className="house-name">{house.name}</p>
    </div>
  );
};
export default House;
