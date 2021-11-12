<script>
import { createEventDispatcher } from 'svelte'
import { fade } from 'svelte/transition'
	
export let selectedImage

const dispatch = createEventDispatcher()

const closeModal = () => {
	selectedImage = null
	dispatch('closeModal', selectedImage)
}
</script>

{#if selectedImage}
<div class="backdrop" on:click|self={closeModal} transition:fade>
	<img src={selectedImage} alt="enlarged pic" />
</div>
{/if}

<style>
.backdrop{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}
.backdrop img{
  display: block;
  max-width: 60%;
  max-height: 80%;
  margin: 60px auto;
  box-shadow: 3px 5px 7px rgba(0,0,0,0.5);
  border: 3px solid white;
}
</style>