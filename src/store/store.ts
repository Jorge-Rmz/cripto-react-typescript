import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { Cryptocurrency, CryptoPrice, Pair } from '../types';
import { fetchCurrentCryptoPrice, getCryptos } from "../services/CryptoService";

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[],
    result: CryptoPrice,
    loading: boolean,
    fetchCriptos: () => Promise<void>,
    fetchData: (pair: Pair) => Promise<void>,
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {
        IMAGEURL:'',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR:'',
        LASTUPDATE: ''
    },
    loading: false,
    fetchCriptos: async () => {
        const cryptocurrencies = await getCryptos();
        set(() => ({
            cryptocurrencies,
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true,
        }))
        const response = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result: response,
            loading: false,
        }))
    }
})))