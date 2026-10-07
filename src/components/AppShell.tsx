import type { FC } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router";
import Layout from "./Layout.tsx";
import Loader from "./Loader.tsx";

const AppShell: FC = () => (
  <Layout>
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  </Layout>
);

export default AppShell;
