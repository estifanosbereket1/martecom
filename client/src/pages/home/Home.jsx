import TestFilter from "../../components/Home/TestFilter";
import Promo from "../../components/Promo";
import Collection from "./Collection";

const Home = () => {
  return (
    <div>
      <Promo />
      <div className="mx-14">
        <TestFilter />
      </div>
    </div>
  );
};
export default Home;
