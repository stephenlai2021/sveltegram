<script>
import { db } from './firebase'
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore'
import { createEventDispatcher } from 'svelte'
import { onDestroy } from 'svelte'
import Loading from './Loading.svelte'
	
let imageUrl = []
let ref = collection(db, 'firegram')

const dispatch = createEventDispatcher()

const q = query(ref, orderBy("createdAt", "desc"))

const unsub = onSnapshot(q, snapshot => {
	let results = []
	snapshot.docs.forEach(doc => {
		results.push({ ...doc.data(), id: doc.id })
	})
	imageUrl = results
	console.log(imageUrl)
})

const setSelectedImage = (url) => {
	console.log('selectedImageUrl: ', url)
	dispatch('setSelectedImage', url)
}

onDestroy(() => {
	unsub()
})
</script>


{#if imageUrl.length}	
<div class="img-grid">
	{#each imageUrl as item (item.id)}
	<div 
		class="img-wrap" 
		on:click={setSelectedImage(item.url)}
	>
		<img src={item.url} alt="" />
	</div>
	{/each}
</div>
{:else}
	<Loading />
{/if}


<style>
	.img-grid{
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 40px;
}	
.img-wrap{
  overflow: hidden;
  height: 0;
  padding: 50% 0;
  /* padding controls height, will always be perfectly square regardless of width */
  position: relative;
  opacity: 0.8;
}
.img-wrap img{
  min-width: 100%;
  min-height: 100%;
  max-width: 150%;
  position: absolute;
  top: 0;
  left: 0;
}
	.img-wrap img:hover {
/* 		opacity: 1; */
		transform: translateY(-10px);
	}
</style>