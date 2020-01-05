# LocalStorage

Reading and writing files to offline storage

## TL:DNR 

Chrome has better offline storage; Firefox has partial support.

Must host on server (instead of load HTML from file) to remove warnings on Chrome.

Look into [IndexedDB](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Working_with_files)

### Links

[File and Directory Entries API support in Firefox](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API/Firefox_support)

[Local Storage MDN](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem#requestFileSystem)

Chrome will raise an error message if running as a file

[Solution #1](https://stackoverflow.com/questions/12748920/simple-example-with-window-requestfilesystem-function/19096538)
open chrome from command line using below command

[More info from MDN](https://developer.mozilla.org/en-US/docs/Web/API/FileError)

``chrome --allow-file-access-from-files``

[From htmlrocks](https://www.html5rocks.com/en/tutorials/file/filesystem/)

> In April 2014, it was announced on public-webapps that the Filesystem API spec is not being considered by other browsers. For now, the API is Chrome-specific and it's unlikely to be implemented by other browsers and is no longer being standardized with the W3C.

[window.requestFileSystem](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestFileSystem)

Only really implemented in Chrome; 

[Using drop zone to use local file system](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry)

[Offline storage methods for Chrome](https://developer.chrome.com/apps/offline_storage#persistent)

[FileSystemDirectoryEntry.getDirectory()](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry/getDirectory)

[HTMLInputElement.webkitEntries](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitEntries)

- non standard

[FileSystemDirectoryEntry](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry)

