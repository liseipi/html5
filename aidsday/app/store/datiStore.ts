import {defineStore} from 'pinia'
import type {datiType} from "~/model/datiType";

export const useDatiStore = defineStore(
    'datiStore',
    () => {

        let dati = ref<datiType>({
            rightnum: 0,
            msg: '',
            can_prize: 0,
            prize_status: 0
        });

        function setDati(value: datiType) {
            dati.value = value
        }
        return {setDati, dati};
    }, {
        persist: {
            storage: piniaPluginPersistedstate.localStorage(),
        },
    });