import {create} from 'zustand';


export const useThreadStore = create((set)=>({
    isThreadOpened: false,
    setThreadOpened: () => set((state)=> ({isThreadOpened: !state.isThreadOpened}))
}));