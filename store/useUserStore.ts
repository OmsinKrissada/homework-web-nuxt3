import { defineStore, skipHydrate } from "pinia";

export const useUserStore = defineStore('user', () => {
	const nickname = useLocalStorage('nickname', '');
	const bannerColor = '#ffffff';
	const avatarURL = '';
	// nickname.value = 'wow';

	return { nickname: skipHydrate(nickname), bannerColor, avatarURL };
});