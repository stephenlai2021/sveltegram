<script>
import { uploadCompleted } from './store'
import useStorage from './useStorage'
import Progressbar from './Progressbar.svelte'
	
let file = null
let error = ''
let percentage = null
let localUrl = null
let uploadStatus = false

const types = ['image/png', 'image/jpeg', 'image/jpg']

const changeHandler = e => {
	let selected = e.target.files[0]
	console.log(selected)
	
// 	if we select a file 
	if (selected && types.includes(selected.type)) {
		file = selected
		error = ''
		const { progress, url } = useStorage(file)
		percentage = progress
		uploadCompleted.subscribe(val => {
			uploadStatus = val
		})
	} else {
		file = null
		error = 'Please select an image file (png or jpeg)'
	}
}
console.log(file)
	
$: if (uploadStatus) {
			file = null
			uploadCompleted.set(false)
	}
</script>

<form>
	<label>
		<input type="file" on:change={changeHandler} />
		<span>Upload Image</span>
	</label>	
	<div class="output">
	{#if error}
		<div class="error">{error}</div>		
	{/if}
	{#if file}
		<div>{file.name}</div>		
		<div class="progress-bar" style={{ width: percentage + '%' }}></div>
	{/if}
	</div>
</form>

<style>
form{
  margin: 30px auto 10px;
  text-align: center;
}
input{
  height: 0;
  width: 0;
  opacity: 0;
}
label{
  display: flex;
	justify-content: cetner;
	padding: 5px;
  width: 185px;
  height: 30px;
  border: 1px solid var(--primary);
  border-radius: 6px;
  margin: 10px auto;
  line-height: 30px;
  color: var(--primary);
  font-weight: bold;
  font-size: 24px;
}
label:hover{
  background: var(--primary);
  color: white;
}
.output{
  height: 60px;
  font-size: 0.8rem;
}
.error{
  color: #ff4a4a;
}
.progress-bar{
  height: 5px;
  background: var(--primary);
  margin-top: 20px;
}
</style>