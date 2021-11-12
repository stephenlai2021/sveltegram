<script>
import Title from './Title.svelte'
import UploadForm from './UploadForm.svelte'	
import ImageGrid from './ImageGrid.svelte'
import Modal from './Modal.svelte'	
	
let selectedImage = null

const setSelectedImage = (e) => {
	selectedImage = e.detail
	console.log('url: ', selectedImage)
}

const closeModal = e => {
	selectedImage = e.detail
}
</script>

<div class="App">
	<Title />	
	<UploadForm />
	<ImageGrid on:setSelectedImage={setSelectedImage} />
	{#if selectedImage}
		<Modal {selectedImage} on:closeModal={closeModal} />
	{/if}
</div>

<style>
:root{
  --primary: #efb6b2;
  --secondary: #4e4e4e;
  --error: #ff4a4a;
}
.App {
	font-family: "Noto Serif";
  color: var(--secondary);
	max-width: 960px;
  margin: 0 auto;
}
</style>
