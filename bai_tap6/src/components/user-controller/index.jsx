import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../config/routers";

const UserController = (props) => {
  const navigate = useNavigate();

  const onMenuClick = (e) => {
    window.localStorage.clear();
    navigate(ROUTER.userLogin);
  };
  const items = [
    {
      label: "Đăng Xuất",
      key: "1",
      icon: <LogoutOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: onMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown.Button
        menu={menuProps}
        placement="bottom"
        icon={<UserOutlined />}
      >
        {props.user?.name}
      </Dropdown.Button>
    </Space>
  );
};
export default UserController;
