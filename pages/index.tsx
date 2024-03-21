import type { NextPage } from "next";
import Tasks from "./crud";

const Home: NextPage = () => {
  return (
    <div>
      <Tasks />
    </div>
  );
};

export default Home;
