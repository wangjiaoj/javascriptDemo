function downloadFile() {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", "https://arxiv.org/ftp/arxiv/papers/2001/2001.09612.pdf");
    request.onload = function() {
        var url = window.URL.createObjectURL(this.response);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "your_download.pdf"
        a.click();
    }
    request.send();
}