import { atom } from "recoil";

type SettingsModalState = {
    fontSize: string,
    settingsModalIsOpen: boolean,
    dropdownIsOpen: boolean
};

const initialSettingsModalState: SettingsModalState = {
    fontSize: "16px",
    settingsModalIsOpen: false,
    dropdownIsOpen: false
};

export const settingsModalState = atom<SettingsModalState>({
    key: 'settingsModalState',
    default: initialSettingsModalState
});
