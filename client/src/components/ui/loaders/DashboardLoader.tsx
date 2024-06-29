import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const DashboardLoader = () => {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      className="w-full h-full flex items-center justify-center"
    />
  );
};

export default DashboardLoader;
