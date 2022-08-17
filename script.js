const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault();//preventing form from submitting
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    //fetching file & returning response as blob
    fetch(url).then(res => res.blob()).then(file => {

        //URL.createObjURL create a url of passed object
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");

        aTag.href = tempUrl;//passing tempUrl as href value of <a> tag
        //passing file last name & extension as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');

        document.body.appendChild(aTag);//adding <a> tag inside body
        aTag.click();//clicking <a> tag so the file downloaded

        downloadBtn.innerText = "Download File";
        URL.revokeObjectURL(tempUrl);//removing tempURL from the document
        
        aTag.remove();//removing <a> tag once file downloaded
    }).catch(() => {
        //catch method will call if any errors comes during downloading
        alert("Failed to download file!");
        downloadBtn.innerText = "Download File";
    });
}