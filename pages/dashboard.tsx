import { GetServerSideProps } from "next";
import { destroyCookie } from "nookies";
import { useContext, useEffect } from "react";
import { Can } from "../components/Can";

import { AuthContext } from "../context/AuthContext";
import { useCan } from "../hooks/useCan";

import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";

import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("me").then((response) => console.log(response));
  }, []);

  return (
    <>
      <h1>dashboard {user?.email}</h1>
      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("me");

    return {
      props: {},
    };
  }
);
