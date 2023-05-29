import { User } from '@/models';
import { APIName } from '@/types/types';
// import { UserParams } from '@/types/user';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type SharedComponentsMethods = {
  setIsProcessing: Dispatch<SetStateAction<boolean>>
  // currentUser: UserParams | undefined
  // setCurrentUser: Dispatch<SetStateAction<UserParams | undefined>>
  dataStoreUser: User | undefined
  setDataStoreUser: Dispatch<SetStateAction<User | undefined>>
  apiName: APIName
}

const SharedComponents = createContext<SharedComponentsMethods>({
  setIsProcessing: () => {},
  // currentUser: undefined,
  // setCurrentUser: () => {},
  dataStoreUser: undefined,
  setDataStoreUser: () => {},
  apiName: APIName.OpenAI
});

export const useSharedComponents = () => useContext(SharedComponents);

export default SharedComponents
