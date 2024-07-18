import { useParams } from "react-router-dom";
import AddProductForm from "../../../AdminComponents/AddProductForm";

const AddProducts = () => {
  const { id } = useParams();

  return (
    <div>
      <AddProductForm id={id} />
    </div>
  );
};
export default AddProducts;
