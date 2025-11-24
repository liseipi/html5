import {defineStore} from 'pinia'
import type {userType} from "~/model/userType";

export const useUserInfoStore = defineStore(
    'userInfoStore',
    () => {
        let gender = ref<number>(0);
        let age = ref<number>(0);
        let userInfo = ref<userType>({
            wxname: '',
            wxheadpic: '',
            count: 0
        });

        function setUserInfo(value: userType) {
            userInfo.value = value
        }
        function setGender(value: number) {
            gender.value = value;
        }
        function setAge(value: number) {
            age.value = value;
        }

        return {setUserInfo, setGender, setAge, gender, age, userInfo};
    }, {
        persist: {
            storage: piniaPluginPersistedstate.localStorage(),
        },
    });