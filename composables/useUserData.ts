import { defineStore, skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
export default function () {
	const id = useLocalStorage("user/id",'')
	const token = useLocalStorage("user/token",'')
	return { id, token };
}
