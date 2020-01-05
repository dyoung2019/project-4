const fileSystemsInput = document.querySelector('.file-systems-input')
const dropzone = document.querySelector("#dropzone")
const listing = document.querySelector("#listing")

const handleChange = (event) => {
  console.log('hello')
  const target = event.target
  target.webkitEntries.forEach(entry => {
    /* do stuff with the entry */
    console.log(entry)
  })

  const files = target.files;
  for (let i=0; i<files.length; i++) {
    const file = files[i]
    console.log(file)
  }
}

const scanFiles = (item, container) => {
  let elem = document.createElement("li");
  elem.innerHTML = item.name;
  container.appendChild(elem);

  console.log(item)
 
 if (item.isDirectory) {
    let directoryReader = item.createReader();
    let directoryContainer = document.createElement("ul")
    container.appendChild(directoryContainer)

    debugger;
    directoryReader.readEntries(
      function(entries) {
        console.log('Entries' + entries.length)

        // console.log(entries)
        entries.forEach(function(entry) {
          scanFiles(entry, directoryContainer)
       })
      },
      function(e) { 
        console.log('eror' + e)
      }
    )
  }
}

const handleDrop = event => {
  let items = event.dataTransfer.items;

  event.preventDefault()
  listing.innerHTML = ""
 
  for (let i = 0; i< items.length; i++) {
    let item = items[i].webkitGetAsEntry()
    
    if (item !== null) {
        scanFiles(item, listing)
    }
  }
}

const preventDefaultEvent = event => {
  event.preventDefault()
}

fileSystemsInput.addEventListener("change", handleChange)

dropzone.addEventListener("drop", handleDrop, false)
dropzone.addEventListener("dragover", preventDefaultEvent, false)

const requestFS = window.requestFileSystem || window.webkitRequestFileSystem
const localDirectoryEntry = window.directoryEntry || window.webkitDirectoryEntry

const handleOnError = (err) => {
  console.log('handleOnError' +  err)
}


const initFileSystem = (storageMode) => {
  const wantsPersistent = storageMode === window.PERSISTENT
  const wantsTemporary = storageMode === window.TEMPORARY
  const isValidStorageMode = (wantsPersistent || wantsTemporary)

  if (!isValidStorageMode) {
    throw new Error('storage mode not found')
  }

  const webkitImplementation = wantsPersistent
    ? navigator.webkitPersistentStorage
    : navigator.webkitTemporaryStorage

  const initFSOnChromeBrowser = (impl, requestedSize, onSuccess, onError) => {
    const handleGrantedBytes = grantedBytes => {
      requestFS(storageMode, grantedBytes, onSuccess, onError)
    }
    console.log('chrome browser')
    impl.requestQuota(requestedSize, handleGrantedBytes, onError)
  }

  const initFSOnOtherBrowser = (storageMode, requestedSize, onSuccess, onError) => {
    console.log('other browser')
    window.requestFileSystem(storageMode, requestedSize, onSuccess, onError)
  } 

  if (webkitImplementation !== undefined) {
    return (size, onSuccess, onError) => { initFSOnChromeBrowser(webkitImplementation, size, onSuccess, onError) }
  } else {
    return (size, onSuccess, onError) => { initFSOnOtherBrowser(storageMode, size, onSuccess, onError) }
  }
}

// // Opening a file system with temporary storage
// requestFS(storageMode, 1024*1024 /*1MB*/, onFs, handleOnError)

// // CHROME ONLY 
// const runOnChrome = () => {
//   var requestedBytes = 1024*1024*10; // 10MB

//   const handleQuotaError = e => { 
//     console.log('Error', e); 
//   }

//   const handleOnInitFS = () => {

//   }

//   const handleGrantedBytes = grantedBytes => {
//     requestFS(storageMode, grantedBytes, handleOnInitFS, handleOnError)
//   }
  
//   // Request Quota (only for File System API) 
//   navigator.webkitPersistentStorage.requestQuota (
//     requestedBytes, handleGrantedBytes, handleQuotaError
//   )

//   const handleQueryUsage =  (usedBytes, grantedBytes) => {
//     console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
//   }
  
//   // Request storage usage and capacity left
//   navigator.webkitTemporaryStorage.queryUsageAndQuota(handleQueryUsage, handleQuotaError)
//   navigator.webkitPersistentStorage.queryUsageAndQuota(handleQueryUsage, handleQuotaError)
// }

function handleOnInitFS(fs){
  console.log('hello')
  fs.root.getDirectory('Documents', { create: true }, function(directoryEntry){
    //directoryEntry.isFile === false
    //directoryEntry.isDirectory === true
    //directoryEntry.name === 'Documents'
    //directoryEntry.fullPath === '/Documents'
      console.log(directoryEntry)
    }, onError)

}


var requestedBytes = 1024*1024*10; // 10MB
// Choose either Temporary or Persistent
const storageMode = window.PERSISTENT
const allocateFS = initFileSystem(storageMode)
allocateFS(requestedBytes, handleOnInitFS, handleOnError)

// const onInitFs = () => {
//   console.log('success')
// }

// const errorHandler = (error) => {
//   console.log(error)
// }

// navigator.webkitPersistentStorage.requestQuota (
//   requestedBytes, function(grantedBytes) {
//       window.webkitRequestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);

//   }, errorHandler
// )