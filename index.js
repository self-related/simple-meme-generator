/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const fileInput = document.getElementById("file-input");
const downloadBtn = document.getElementById("download-button");

const topTextInput = document.getElementById("top-text-input");
const bottomTextInput = document.getElementById("bottom-text-input");

/** @type {HTMLImageElement} глобальная переменная для <img> */
let uploadedImage = null; 

// сбросить текст при загрузке
window.onload = () => {
    topTextInput.value = "";
    bottomTextInput.value = "";
}


const renderCanvas = () => {
    if (uploadedImage === null)
        return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    // ToDo: ctx.measureText().width

    // настройка шрифтов
    ctx.textAlign = "center"
    ctx.font = "600 50px Impact";
    ctx.fillStyle = "white";

    ctx.strokeStyle = "black";
    ctx.lineWidth = "1.8";

    ctx.textBaseline = "middle"; // линия для выравнивания текста посередине

    // отступ сверху или снизу
    const heightPadding = Math.floor(canvas.height * 0.2);

    ctx.fillText(topTextInput.value, canvas.width / 2, heightPadding);
    ctx.strokeText(topTextInput.value, canvas.width / 2, heightPadding);

    ctx.fillText(bottomTextInput.value, canvas.width / 2, canvas.height - heightPadding);
    ctx.strokeText(bottomTextInput.value, canvas.width / 2, canvas.height - heightPadding);
};

// ивент при загрузке файла
fileInput.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

        // когда ридер готов, создать новый <img> и присвоить ему результат ридера
        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target.result;

            // когда локальный <img> готов, изменить глобальную переменную для <img>, изменить высоту канваса и вызвать рендер
            image.onload = () => {                
                uploadedImage = image;

                // изменить высоту канваса относительно загруженного изображения
                const heightRatio = uploadedImage.height / uploadedImage.width;
                canvas.height = Math.floor(canvas.width * heightRatio);

                renderCanvas();
            }
        }

    // прочитать загруженный файл
    reader.readAsDataURL(file);    

};

// создать анкор, вернуть изображение из канваса и скачать его с названием "meme.png"
downloadBtn.onclick = () => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "meme.png";
    link.click();
};


/** @param {Event} event */
const onTextChange = () => {
    renderCanvas();
};

topTextInput.addEventListener("input", onTextChange);
bottomTextInput.addEventListener("input", onTextChange);
