addEventListener("load", () => {
    fetch("./data/provinces.txt")
    .then(response => response.text())
    .then(text => {
        const provices = text.split('\n').sort();
        const selectionProvince = document.getElementById("province");
        provices.forEach(province => {
            const option = document.createElement("option");
            option.value = province;
            option.text = province;
            selectionProvince.appendChild(option);
        });
        drawCanvas();
    });
});

const textInput = document.getElementById("text");
const numberInput = document.getElementById("number");
const provinceInput = document.getElementById("province");
const downloadButton = document.getElementById("download");

textInput.addEventListener("input", () => {
    drawCanvas();
});

numberInput.addEventListener("input", () => {
    drawCanvas();
});

provinceInput.addEventListener("change", () => {
    drawCanvas();
});

downloadButton.addEventListener("click", () => {
    const canvas = document.getElementById("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    if (textInput.value === "" || numberInput.value === "" || provinceInput.value === "") {
        alert("Please fill all the fields.");
        return;
    }

    link.href = image;
    link.download = "generated-license-plate.png";
    link.click();
});

function drawRoundedRectangle(ctx, x, y, width, height, radius, color = "red") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

function drawCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    console.log(canvasWidth, canvasHeight);
    drawRoundedRectangle(ctx, 0, 0, canvasWidth, canvasHeight, 15, "silver");
    drawRoundedRectangle(ctx, 5, 5, canvasWidth-10, canvasHeight-10, 15, "black");
    drawRoundedRectangle(ctx, 10, 10, canvasWidth-20, canvasHeight-20, 15, "silver");
    drawRoundedRectangle(ctx, 15, 15, canvasWidth-30, canvasHeight-30, 15, "gainsboro");

    const text = textInput.value + " " + numberInput.value;
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(text, 300, 90);

    const province = provinceInput.value;
    ctx.font = "25px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(province, 300, 140);
}