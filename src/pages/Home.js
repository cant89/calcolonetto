import React from "react";
import { useQuery } from "../hooks";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../constants";

function Home() {
  const history = useHistory();

  return (
    <section>
      <Button onClick={() => history.push(ROUTES.GUIDED_STEPS)}>
        Guided Step
      </Button>
      <Button onClick={() => history.push(ROUTES.ADVANCED_CONFIGURATOR)}>
        Advanced configurator (expert user)
      </Button>
    </section>
  );
}

export default Home;
