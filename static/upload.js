function showPreview() {
    document.getElementById("tableBox").style.display = "block";
}


function trainModel() {

    // Show full-screen loader immediately
    document.getElementById("loader").style.display = "flex";

    let status = document.getElementById("trainStatus");

    status.innerText = "Initializing ML pipeline...";

    setTimeout(() => { status.innerText = "Processing Dataset..."; },    1500);
    setTimeout(() => { status.innerText = "Feature Encoding..."; },       3000);
    setTimeout(() => { status.innerText = "Training Random Forest & KNN..."; }, 4500);

    // Minimum 5.5s so all 3 messages are visible before loader hides
    let minWait = new Promise(resolve => setTimeout(resolve, 5500));

    let fetchResult = fetch("/train", { method: "POST" })
        .then(response => response.json());

    Promise.all([fetchResult, minWait])
        .then(([data]) => {

            document.getElementById("loader").style.display = "none";
            document.getElementById("resultBox").style.display = "block";

            document.getElementById("successText").innerText = "✅ Model Trained Successfully";
            document.getElementById("totalRows").innerText = "Total Dataset Rows : " + data.total;
            document.getElementById("trainRows").innerText = "Training Data : " + data.train;
            document.getElementById("testRows").innerText = "Testing Data : " + data.test;
            document.getElementById("algo").innerText = "Algorithm Used : Random Forest + KNN";

            sessionStorage.setItem("knn", data.knn_accuracy);
            sessionStorage.setItem("rf", data.rf_accuracy);
            sessionStorage.setItem("best_algo", data.best_algorithm);
            sessionStorage.setItem("best_acc", data.best_accuracy);

        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("loader").style.display = "none";
            alert("Training failed!");
        });

}


function clearPage() {
    window.location.href = "/upload";
}