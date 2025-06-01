import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useStorage from "@/hooks/useStorage";
import SharedComponents from "./SharedComponents";
import { DataStore } from "aws-amplify";
import { User } from "@/models";

interface pageProps {
  children: any;
  href?: string;
}

const WithAuth: React.FC<pageProps> = ({ children, href }) => {
  const router = useRouter();
  const { getItem } = useStorage();
  const isAuthenticated = getItem("isAuthenticated", "local") === "true";
  const { dataStoreUser, setDataStoreUser } = useContext(SharedComponents);

  useEffect(() => {
    if (!isAuthenticated) {
      if (href) router.push(href);
      else router.push("/intro");
    } else if (!dataStoreUser) {
      DataStore.query(User)
        .then((items) => {
          if (items.length === 0) {
            router.push("/");
          }
          setDataStoreUser(items[0]);
        })
        .catch((err) => {
          console.log(err);
          router.push("/");
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href, isAuthenticated, router]);

  return isAuthenticated && dataStoreUser && children;
};

export default WithAuth;
