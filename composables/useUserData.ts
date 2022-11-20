import { defineStore, skipHydrate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
const id = useLocalStorage("user/id", '');
const token = useLocalStorage("user/token", '');
const tag = useLocalStorage("user/tag", '');
const avatarURL = useStorageAsync("user/avatarURL", '');
const accentColor = useLocalStorage("user/accent", '#000000');
const bannerColor = useLocalStorage("user/banner", '#000000');
const nickname = useLocalStorage('nickname', '');
export default function () {
	return reactive({ id, token, tag, avatarURL, accentColor, bannerColor, nickname });
}
