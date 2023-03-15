import {
  HeartTwoTone,
  MessageTwoTone,
  BranchesOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
const UserCard = () => (
  <div className="user-card">
    <Card
      style={{
        width: 360,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <HeartTwoTone twoToneColor="#eb2f96" />,
        <MessageTwoTone />,
        <BranchesOutlined />,
      ]}
    >
      <Meta
        className="flexr flex-cen"
        avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
        description="This is the description"
      />
    </Card>
  </div>
);
export default UserCard;
