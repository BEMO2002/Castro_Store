// import ProductList from "./products";
import Slider from "./Slider";
import UseTitle from "../../Hook/UseTitle";
import Categories from "./Categories";
import MensSuits from "./MensSuits";
import Show from "./Show";
import Casual from "./Casual";
import LuckySpin from "../LuckeySpin";
const Home = () => {
  UseTitle("Home");
  return (
    <>
      <Slider />
      <Categories />
      <MensSuits />
      <Show />
      <Casual />
      {/* <ProductList /> */}
    </>
  );
};

export default Home;
