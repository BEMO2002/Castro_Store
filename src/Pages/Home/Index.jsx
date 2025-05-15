// import ProductList from "./products";
import Slider from "./Slider";
import UseTitle from "../../Hook/UseTitle";
import Categories from "./Categories";
import MensSuits from "./MensSuits";
import Show from "./Show";
import Casual from "./Casual";
import { CommingSoon } from "./CommingSoon";
const Home = () => {
  UseTitle("Home");
  return (
    <>
      <Slider />
      <Categories />
      <MensSuits />
      <Show />
      <Casual />
      <CommingSoon />
    </>
  );
};

export default Home;
