import {defineStore} from 'pinia'
import type {userType} from "~/model/userType";

export const useUserInfoStore = defineStore(
    'userInfoStore',
    () => {
        let gender = ref<number>(0);
        let age = ref<number>(0);
        let infoDone = ref(false);
        let qsDone = ref(false);
        let userInfo = ref<userType>({
            age: -1,
            count: 1,
            sex: -1,
            wxheadpic: "",
            wxname: ""
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
        function setQs(value: boolean) {
            qsDone.value = value;
        }
        function setInfoDone(value: boolean) {
            infoDone.value = value;
        }

        return {
            setUserInfo, setGender, setAge, setQs, setInfoDone,
            gender, age, userInfo, qsDone, infoDone};
    }, {
        persist: {
            storage: piniaPluginPersistedstate.localStorage(),
        },
    });