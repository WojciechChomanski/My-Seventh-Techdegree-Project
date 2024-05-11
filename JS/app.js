// Function to toggle the visibility of the notification popup
function togglePopup() {
    var popup = document.getElementById('popupWindow');
    var badge = document.getElementById('notificationBadge');
    
    // Check if popup is currently hidden; show it if true, hide it otherwise
    if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        badge.style.display = 'inline'; // Show the notification badge when popup is visible
    } else {
        popup.classList.add('hidden');
    }
}

// Function to close the notification popup
function closePopup() {
    var popup = document.getElementById('popupWindow');
    var badge = document.getElementById('notificationBadge');

    popup.classList.add('hidden'); // Hide the popup
    badge.style.display = 'none';  // Hide the notification badge
}

// Function to hide the alert banner
function closeAlertBanner() {
    var alertBanner = document.getElementById("alertBanner");
    alertBanner.style.display = "none"; // Set alert banner display to none, effectively hiding it
}

// Event listener for window load to initialize the traffic chart
window.addEventListener('load', function() {
    var ctx = document.getElementById('traffic-chart').getContext('2d');

    // Data for different time intervals of traffic chart
    var datasets = {
        hourly: {
            data: [750, 425, 1000, 1650, 1500, 1750, 845, 1850, 955, 1500, 2500],
            fill: 'origin', 
            backgroundColor: 'rgba(213, 214, 236, .3)', 
            borderColor: 'magenta', 
            borderWidth: 1, 
            tension: 0.4 
        },
        daily: {
            data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
            fill: 'origin', 
            backgroundColor: 'rgba(213, 214, 236, .3)', 
            borderColor: 'mediumslateblue', 
            borderWidth: 1, 
            tension: 0.4 
        },
        weekly: {
            data: [18000, 21500, 24000, 37500, 36000, 32300, 17500, 44400, 58000, 36000, 45000],
            fill: 'origin', 
            backgroundColor: 'rgba(213, 214, 236, .3)', 
            borderColor: 'royalblue', 
            borderWidth: 1, 
            tension: 0.4 
        },
        monthly: {
            data: [126000, 19500, 168000, 336000, 245000, 294000, 210000, 310800, 378000, 252000, 455000],
            fill: 'origin', 
            backgroundColor: 'rgba(213, 214, 236, .3)', 
            borderColor: 'mistyrose', 
            borderWidth: 1, 
            tension: 0.4 
        }
    };

    // Initialize the line chart for traffic data
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
            datasets: [datasets['hourly']] // Start with hourly data
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true // Start Y-axis from zero
                },
                x: {
                    ticks: {
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Do not display legend
                }
            }
        }
    });

    // Add event listeners to navigation links to switch between data intervals
    var links = document.querySelectorAll('.traffic-nav-link');
    var selectedLink = links[0]; // Default to first link as selected
    selectedLink.classList.add('selected');

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function() {
            var interval = this.textContent.toLowerCase(); // Get the interval type based on link text
            myChart.data.datasets[0] = datasets[interval]; // Update chart data
            myChart.update(); // Redraw the chart with new data

            selectedLink.classList.remove('selected'); // Remove 'selected' class from previously selected link
            this.classList.add('selected'); // Add 'selected' class to the currently clicked link
            selectedLink = this; // Update the selected link reference
        });
    }
});

// Initialize daily bar chart
var ctxDaily = document.getElementById('daily-chart').getContext('2d');
var dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        data: [75, 110, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderColor: '#7477BF',
        borderWidth: 1
    }]
};

var myDailyChart = new Chart(ctxDaily, {
    type: 'bar',
    data: dailyData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true // Ensure Y-axis begins at zero
            }
        },
        plugins: {
            legend: {
                display: false // Do not display the legend
            }
        }
    }
});

// Initialize mobile usage doughnut chart
var ctxMobile = document.getElementById('mobile-chart').getContext('2d');
var mobileData = {
    labels: ['Desktop', 'Tablet', 'Phones'],
    datasets: [{
        data: [70, 15, 15],
        backgroundColor: ['#7477BF', '#81C98F', '#51B6C8'],
        borderColor: ['#7477BF', '#81C98F', '#51B6C8'],
        borderWidth: 1
    }]
};

var myMobileChart = new Chart(ctxMobile, {
    type: 'doughnut',
    data: mobileData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // Position the legend on the right side
            },
            title: {
                display: false, // Do not display the title
            }
        }
    }
});

// Event listener for sending messages to users
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

send.addEventListener('click', () => {
    // Validation checks for user and message fields
    if (user.value === "" && message.value === "") {
        alert("Please fill out user and message fields before sending");
    } else if (user.value === "" ) {
        alert("Please fill out user field before sending");
    } else if (message.value === "" ) {
        alert("Please fill out message field before sending");
    } else {
        alert(`Message successfully sent to: ${user.value}`);
        user.value = "";  // Clear the user field
        message.value = "";  // Clear the message field
    }
});

// Autocomplete functionality for the user field
var names = ["Victoria Chambers", "Dan Oliver", "Dawn Wood", "Dale Byrd"];
var lastKeyWasBackspace = false;

document.getElementById("userField").addEventListener("keydown", function(e) {
    lastKeyWasBackspace = e.key === 'Backspace';
});

document.getElementById("userField").addEventListener("input", function(e) {
    if (!lastKeyWasBackspace) {
        var input = e.target;
        var current = input.value;
        var match = names.find(name => name.toUpperCase().startsWith(current.toUpperCase()));

        if (match) {
            input.value = match;
            input.setSelectionRange(current.length, match.length);
        }
    }
});

user.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission
        user.setSelectionRange(user.value.length, user.value.length); // Keep the cursor at the end of the input
    }
});

// Load settings from local storage
window.addEventListener('load', function() {
    var sendEmailStored = localStorage.getItem('sendEmail');
    var sendEmail = sendEmailStored !== null ? JSON.parse(sendEmailStored) : true;

    var setPublicProfileStored = localStorage.getItem('setPublicProfile');
    var setPublicProfile = setPublicProfileStored !== null ? JSON.parse(setPublicProfileStored) : true;
    
    var timezone = localStorage.getItem('timezone') || "Select a Timezone";

    document.getElementById('input-toggle1').checked = sendEmail;
    document.getElementById('input-toggle2').checked = setPublicProfile;
    document.getElementById('timezone').value = timezone;
});

// Event listeners for settings toggles and timezone selection
document.getElementById('input-toggle1').addEventListener('change', function() {
    localStorage.setItem('sendEmail', JSON.stringify(this.checked));
});

document.getElementById('input-toggle2').addEventListener('change', function() {
    localStorage.setItem('setPublicProfile', JSON.stringify(this.checked));
});

document.getElementById('timezone').addEventListener('change', function() {
    localStorage.setItem('timezone', this.value);
});

// Reset settings to default and clear local storage
document.getElementById('cancel').addEventListener('click', resetSettings);

function resetSettings() {
    document.getElementById('input-toggle1').checked = true;
    document.getElementById('input-toggle2').checked = true;
    document.getElementById('timezone').value = "Select a Timezone";

    localStorage.removeItem('sendEmail');
    localStorage.removeItem('setPublicProfile');
    localStorage.removeItem('timezone');
}
