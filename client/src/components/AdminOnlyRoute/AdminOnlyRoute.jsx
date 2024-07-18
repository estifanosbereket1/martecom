import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import PermissionDenied from "./PermissionDenied";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail == process.env.ADMIN_EMAIL) {
    return children;
  } else {
    return <PermissionDenied />;
  }
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail == process.env.ADMIN_EMAIL) {
    return children;
  } else {
    return null;
  }
};

export default AdminOnlyRoute;
