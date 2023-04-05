import { UserParams } from '@/types/user';
import { createContext, Dispatch, SetStateAction } from 'react';

type SharedComponentsMethods = {
  setIsProcessing: Dispatch<SetStateAction<boolean>>
  currentUser: UserParams | undefined
  setCurrentUser: Dispatch<SetStateAction<UserParams | undefined>>
}

const SharedComponents = createContext<SharedComponentsMethods>({
  setIsProcessing: () => {},
  currentUser: undefined,
  setCurrentUser: () => {}
});

export default SharedComponents
