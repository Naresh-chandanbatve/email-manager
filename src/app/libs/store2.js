import {create} from 'zustand';


export const useThreadStore = create((set)=>({
    isThreadOpened: true,
    setThreadOpened: () => set((state)=> ({isThreadOpened: !state.isThreadOpened}))
}));