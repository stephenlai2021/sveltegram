<script>
import { createEventDispatcher } from 'svelte'
import { uploadCompleted } from './store'
import useStorage from './useStorage'
	
export let file
let uploadStatus = false

const dispatch = createEventDispatcher()

const { progress, url } = useStorage(file)
setTimeout(() => {
	console.log('progress: ', progress, 'url: ', url)	
})
	
uploadCompleted.subscribe(val => {
	uploadStatus = val
})
	
$: if(url) { 
	if (uploadStatus) {
		// 	file = null
		dispatch('resetFile')
	}
}
</script>

<div class="progress-bar" style={{ width: progress + '%' }}></div>

<style>
.progress-bar{
  height: 5px;
  background: var(--primary);
  margin-top: 20px;
}
</style>