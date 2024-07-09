// Get the alert banner element by its ID
const alertBanner = document.getElementById("alert");

// Create the HTML for the alert banner
alertBanner.innerHTML = `
  <div class="alert-banner">
    <p><strong>Alert:</strong> You have unread messages</p>
    <p class="alert-banner-close">x</p>
  </div>`;

// Event listener to close the alert banner when the close button is clicked
alertBanner.addEventListener('click', e => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none";
  }
});

// Get the new message notification list element by its ID
const newMessage = document.getElementById("notificationList");

// Event listener to close new messages when the close button is clicked
newMessage.addEventListener('click', e => {
  const message = e.target;
  if (message.classList.contains("close-message")) {
    message.parentNode.style.display = "none";
  }
});

// Get the traffic chart element by its ID
const trafficCanvas = document.getElementById("traffic-chart");

// Define traffic chart data
let trafficData = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [{
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    backgroundColor: 'rgba(176,160,242,0.5)', // Set background color of the chart
    borderColor: 'purple', // Set border color of the chart line
    pointBackgroundColor: 'orange', // Set background color for data points
    borderWidth: 1, // Set width of the chart line
    tension: 0.5, // Set tension of the chart line for smooth curves
  }]
};

// Define hourly chart data
let hourlyData = {
  labels: ["7-8am", "9-10am", "11-12am", "1-2pm", "3-4pm", "5-6pm", "7-8pm", "9-10pm", "11-12pm"],
  datasets: [{
    data: [150, 185, 140, 200, 150, 175, 125, 35, 50],
  }]
};

// Define daily chart data
let dailyData1 = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
  datasets: [{
    data: [2500, 1350, 1400, 1200, 2500, 1750, 2450],
  }]
};

// Define weekly chart data
let weeklyData = {
  labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"],
  datasets: [{
    data: [1200, 2500, 1750, 2500, 1350, 1400, 2450, 1750, 1500, 1050],
  }]
};

// Define monthly chart data
let monthlyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{
    data: [2200, 1500, 3750, 2500, 3350, 3400, 4450, 3349, 4845, 3160, 1850, 1950],
  }]
};

// Define options for the traffic chart
let trafficOptions = {
  backgroundColor: 'rgba(112, 104, 201,.5)', // Set background color for the chart area
  fill: true, // Fill the area under the line
  aspectRatio: 2.5, // Set aspect ratio of the chart
  animation: {
    duration: 0 // Disable animation
  },
  scales: {
    y: {
      beginAtZero: true // Start y-axis at zero
    }
  },
  plugins: {
    legend: {
      display: false // Hide legend
    }
  }
};

// Create the traffic chart
let trafficChart = new Chart(trafficCanvas, {
  type: 'line', // Set chart type to line
  data: trafficData, // Set data for the chart
  options: trafficOptions // Set options for the chart
});

// Function to update chart data
const updateChart = (chart, newData) => {
  chart.data.labels = newData.labels; // Update labels
  chart.data.datasets[0].data = newData.datasets[0].data; // Update data
  chart.update(); // Update the chart
};

// Event listener for traffic navigation
const trafficNavigation = document.querySelector('.traffic-nav');
trafficNavigation.addEventListener('click', (e) => {
  let targetNav = e.target;
  if (targetNav.tagName === 'LI') {
    targetNav.className = "active";
  }
  const trafficList = document.querySelectorAll('.traffic-nav li');
  for (let i = 0; i < trafficList.length; i++) {
    const activeList = trafficList[i];
    if (activeList.className === 'active') {
      activeList.className += ' traffic-active';
      let listName = activeList.textContent;
      if (listName === 'Hourly') {
        updateChart(trafficChart, hourlyData);
      } else if (listName === 'Daily') {
        updateChart(trafficChart, dailyData1);
      } else if (listName === 'Weekly') {
        updateChart(trafficChart, weeklyData);
      } else if (listName === 'Monthly') {
        updateChart(trafficChart, monthlyData);
      }
    } else {
      activeList.className = 'traffic-nav-link';
    }
  }
});

// Get the daily traffic bar chart element by its ID
const dailyCanvas = document.getElementById("dailyTraffic-chart");

// Define daily traffic bar chart data
const dailyData = {
  labels: ["S", "M", "T", "W", "Th", "F", "S"],
  datasets: [{
    label: '#of Hits', // Label for the dataset
    data: [75, 115, 175, 125, 225, 200, 100], // Data for the chart
    backgroundColor: '#21c2aa', // Set background color of the bars
    borderWidth: 1 // Set border width of the bars
  }]
};

// Define options for the daily traffic bar chart
const dailyOptions = {
  scales: {
    y: {
      beginAtZero: true // Start y-axis at zero
    }
  },
  plugins: {
    legend: {
      display: false // Hide legend
    }
  }
};

// Create the daily traffic bar chart
let dailyChart = new Chart(dailyCanvas, {
  type: 'bar', // Set chart type to bar
  data: dailyData, // Set data for the chart
  options: dailyOptions // Set options for the chart
});

// Get the mobile users doughnut chart element by its ID
const mobileCanvas = document.getElementById("mobileUsers-chart");

// Define mobile users doughnut chart data
const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"], // Labels for the doughnut sections
  datasets: [{
    label: "# of Users", // Label for the dataset
    data: [2000, 550, 500], // Data for the chart
    borderWidth: 0, // Set border width of the sections
    backgroundColor: [ // Set background colors for the sections
      'rgba(116, 116, 233, 0.97)',
      'lightgreen',
      '#21c2aa'
    ]
  }]
};

// Define options for the mobile users doughnut chart
const mobileOptions = {
  aspectRatio: 1.9, // Set aspect ratio of the chart
  plugins: {
    legend: {
      position: 'right', // Set legend position to the right
      labels: {
        boxWidth: 20, // Set width of the legend box
        fontStyle: 'bold' // Set font style of the legend text
      }
    }
  }
};

// Create the mobile users doughnut chart
let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut', // Set chart type to doughnut
  data: mobileData, // Set data for the chart
  options: mobileOptions // Set options for the chart
});

// Messaging section elements
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

// Event listener for sending message
send.addEventListener("click", (e) => {
  if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending!");
    e.preventDefault();
  } else if (user.value === "") {
    alert("Please fill out user field before sending!");
    e.preventDefault();
  } else if (message.value === "") {
    alert("Please fill out message field before sending!");
    e.preventDefault();
  } else {
    alert(`Awesome! Message successfully sent to ${user.value}!`);
  }
});

// Autocomplete function
let friendsList = ["Victoria Chambers", "Dale Byrn", "Dawn Wood", "Dan Oliver"];

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function(e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}

// Apply autocomplete to the user input field
autocomplete(document.getElementById("userField"), friendsList);

// Save and cancel button functionality with local storage
const saveBtn = document.getElementById('save');
const cancelBtn = document.getElementById('cancel');
const checkbox = document.querySelectorAll('input[type="checkbox"]');
const select = document.querySelector('select');

// Function to save settings to local storage
const saveInfo = () => {
  for (let i = 0; i < checkbox.length; i++) {
    localStorage.setItem(checkbox[i].value, checkbox[i].checked);
  }
  localStorage.setItem('timezone', select.value);
};

// Function to load settings from local storage
const loadInfo = () => {
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].checked = localStorage.getItem(checkbox[i].value) === 'true';
  }
  if (localStorage.getItem('timezone')) {
    select.value = localStorage.getItem('timezone');
  }
};

// Function to remove settings from local storage
const removeInfo = () => {
  for (let i = 0; i < checkbox.length; i++) {
    localStorage.setItem(checkbox[i].value, checkbox[i].checked = false);
  }
  localStorage.removeItem('timezone');
  select.value = '00';
};

// Event listener to save settings on click
saveBtn.addEventListener('click', () => {
  saveInfo();
  if (!checkbox.checked && !saveBtn.checked && timezone.value === 'default') {
    return null;
  } else {
    alert("Your settings are saved!");
  }
});

// Event listener to cancel settings on click
cancelBtn.addEventListener('click', () => {
  removeInfo();
  cancelBtn.style.backgroundColor = "#37474F";
  if (!checkbox.checked && !saveBtn.checked && timezone.value === 'default') {
    return null;
  } else {
    alert("Oops...Your settings are cancelled!");
  }
});

// Load settings on page load
loadInfo();
