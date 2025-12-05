import { create } from "zustand";

interface LoginStore{
    loginInvalido: boolean;
    msg: string;
    isMessageSeen: boolean;

    setIsMessageSeen: (novoValorIsMessageSeen: boolean) => void;
    setLoginInvalido: (novoValorLoginInvalido: boolean) => void;
    setMsg: (novaMsg: string) => void;
}

const useLoginStore = create<LoginStore>((set) => ({
    loginInvalido: false,
    isMessageSeen: false,
    msg: "",
    
    setLoginInvalido: (novoValoLoginInvalido: boolean) => set(() => ({loginInvalido: novoValoLoginInvalido})),
    setIsMessageSeen: (novoValorIsMessageSeen: boolean) => set(() => ({isMessageSeen: novoValorIsMessageSeen})),
    setMsg: (novaMsg: string) => set(() => ({msg: novaMsg}))
}))
export default useLoginStore;