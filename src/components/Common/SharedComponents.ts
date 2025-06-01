import { User } from "@/models";
import { APIName } from "@/types/types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type SharedComponentsMethods = {
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
  dataStoreUser: User | undefined;
  setDataStoreUser: Dispatch<SetStateAction<User | undefined>>;
  isDataStoreReady: boolean;
  setIsDataStoreReady: Dispatch<SetStateAction<boolean>>;
  apiName: APIName;
};

const SharedComponents = createContext<SharedComponentsMethods>({
  setIsProcessing: () => {},
  dataStoreUser: undefined,
  setDataStoreUser: () => {},
  isDataStoreReady: false,
  setIsDataStoreReady: () => {},
  apiName: APIName.OpenAI,
});

export const useSharedComponents = () => useContext(SharedComponents);

export default SharedComponents;
