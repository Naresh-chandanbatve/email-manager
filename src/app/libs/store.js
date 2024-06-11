import {create} from 'zustand';


export const useLoadingStore = create((set)=>({
    isLoading: false,
    setIsLoading: () => set((state)=> ({isLoading: !state.isLoading}))
}));


