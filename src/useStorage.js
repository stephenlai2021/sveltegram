import { uploadCompleted } from './store'
import { storage, db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const useStorage = (file) => {
	let progress = 0
	let error = null
	let url = null
	let uploadStatus = false
	
	// storage reference 	
	const path = ref(storage, `firegram/${file.name}`)
	
	/***** Upload from a file *****/	
	// uploadBytes(path, file).then(snapshot => {
  //	console.log('Uploaded a file')
	// })
	
	const saveImageUrl = async (c, url) => {
		let ref = collection(db, c)
		
		await addDoc(ref, {
			url,
			createdAt: new Date().toLocaleString()
		})
	}
	
	/*** Monitor Upload Progress ***/
	const uploadTask = uploadBytesResumable(path, file)
	
	uploadTask.on('state_changed', snapshot => {
		progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
		console.log('upload is ' + progress + '% done')
		
		if (progress >= 100) {
			uploadCompleted.set(true)
			uploadCompleted.subscribe(val => uploadStatus = val)
			console.log('image upload completed', uploadStatus)
		}
	},
	err => {
		error = err
	},
	() => {
		// handle successful uploads on complete
		getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
			console.log('File available at', downloadURL)
			url = downloadURL
			console.log('File available at', url);
			
// 			let ref = collection(db, 'sveltegram')
			saveImageUrl('firegram', url)			
		})
	})
	return {  
		progress, error, url
	}
}

export default useStorage