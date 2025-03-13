


function goToDay(day) {
    window.location.href = `day.html?day=${day}`;
}

function goBack() {
    window.location.href = "index.html";
}

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const day = params.get("day");

    console.log("Selected day:", day);
    console.log("Workout Data:", workoutData);  // Debugging

    const dayTitle = document.getElementById("day-title");
    const effortMeter = document.getElementById("effort-meter");
    const effortNote = document.getElementById("effort-note");

    if (day && workoutData[day]) {
        dayTitle.innerText = `${day}. WORKOUT`;

        // Set the effort meter image
        effortMeter.src = `images/${day.toLowerCase()}_meter.svg`;
        effortMeter.style.display = "block"; // Make it visible

        // Set the effort note
        effortNote.innerHTML = workoutData[day].effortNote || "No effort note recorded.";
    } else {
        dayTitle.innerText = "REST DAY!";
        effortMeter.style.display = "none"; // Hide meter
        effortNote.innerHTML = ""; // Clear note
    }

    // Add event listeners for clickable muscle areas
    document.querySelectorAll(".click-zone").forEach(zone => {
        zone.addEventListener("click", function () {
            showDetails(this.getAttribute("data-muscle"));
        });
    });
};

function showDetails(muscle) {
    const titleText = document.getElementById("day-title").textContent;
    const selectedDay = titleText.includes(".") ? titleText.split(".")[0].trim() : titleText.trim();
    const exerciseDetails = document.getElementById("exercise-details");
    const exerciseIcons = document.getElementById("exercise-icons");

    // Clear previous content
    exerciseDetails.innerHTML = ""; 
    exerciseIcons.innerHTML = ""; 

    // Create and add the muscle name element
    const muscleHeader = document.createElement("h2");
    muscleHeader.textContent = muscle;
    muscleHeader.classList.add("muscle-name");

    exerciseDetails.appendChild(muscleHeader);

    // Append exercises or "No exercises logged" message
    if (workoutData[selectedDay] && workoutData[selectedDay][muscle]) {
        workoutData[selectedDay][muscle].forEach(exercise => {
            const exerciseItem = document.createElement("div");
            exerciseItem.textContent = exercise;
            exerciseItem.classList.add("exercise-icon"); // You can rename this if needed
            exerciseDetails.appendChild(exerciseItem);

          
        });
    } else {
        const noExerciseMsg = document.createElement("p");
        noExerciseMsg.textContent = "No exercises logged for this muscle.";
        noExerciseMsg.classList.add("no-exercise-msg");
        exerciseDetails.appendChild(noExerciseMsg);
    }
}