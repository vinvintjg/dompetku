const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("close", "hoverable");
  const adminArea = document.querySelector('.content-all');
  adminArea.style.margin = '95px 50px 50px 80px';
});
sidebarExpand.addEventListener("click", () => {
  sidebar.classList.remove("close", "hoverable");
  const adminArea = document.querySelector('.content-all');
  adminArea.style.margin= '95px 50px 50px 260px';
});

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    document.setI;
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

if (window.innerWidth < 768) {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}

var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});

var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});

const xValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{ 
            data: [300, 700, 2000, 5000, 6000, 2000, 5000, 4500, 3000, 5000, 3300, 7800],
            borderColor: "#0177FB", // Change line color to white
            backgroundColor: "#0177FB", // Change background color to white
            fill: false
          }]
        },
        options: {
          legend: {display: false},
          scales: {
            xAxes: [{
              ticks: {
                fontColor: "#000" // Change x-axis label color to white
              },
              gridLines: {
                // color: "rgba(255, 255, 255, 0.2)"
              }
            }],
            yAxes: [{
              ticks: {
                fontColor: "#000" // Change y-axis label color to white
              },
              gridLines: {
                // color: "rgba(255, 255, 255, 0.2)"
              }
            }]
          }
        }
      });


const xxValues = ["School", "Invest", "Meal"];
const yyValues = [55, 49, 44];
const barrColors = [
  "#0177FB",
  "#EAC941",
  "#D9D9D9",
  "#000",
];

const chart = new Chart("myPieChart", {
  type: "pie",
  data: {
    labels: xxValues,
    datasets: [{
      backgroundColor: barrColors,
      data: yyValues,
    }]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          let label = data.labels[tooltipItem.index]; // Mengambil nama kategori dari labels
          let value = data.datasets[0].data[tooltipItem.index]; // Mengambil nilai data
          let percentage = (value / data.datasets[0].data.reduce((a, b) => a + b) * 100).toFixed(2); // Menghitung persentase
          return label + ': ' + percentage + '%'; // Mengembalikan label dengan persentase
        }
      }
    },
    legend: {
      position: 'bottom', // Mengatur posisi label menjadi di bagian bawah
      labels: {
        fontSize: 10, // Mengatur ukuran teks label
        usePointStyle: true,
        pointStyle: 'circle',
      }
    },
    hoverOffset: 10 // Menambahkan hoverOffset
  }
});




function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// POP UP BALANCE
function openPopup() {
  var popup = document.getElementById('popup');
  popup.classList.add('show');
}

function closePopup() {
  var popup = document.getElementById('popup');
  popup.classList.remove('show');
}

function updateData() {
  console.log("Data updated!");
  closePopup();
}

// POP UP SLOTS
function openPopslot() {
  var popup = document.getElementById('popslot');
  popup.classList.add('show');
}

function closePopslot() {
  var popup = document.getElementById('popslot');
  popup.classList.remove('show');
}

function updateSlotData() {
  console.log("Data updated!");
  closePopslot();
}

const amountElement = document.getElementById('amount');
const unusedBalanceElement = document.getElementById('unusedBalance');
const usedBalanceElement = document.getElementById('usedBalance');
const toggleIcon = document.getElementById('toggleIcon');
let originalAmount = amountElement.textContent;
let originalunusedBalance = unusedBalanceElement.textContent;
let originalusedBalance = usedBalanceElement.textContent;

toggleIcon.addEventListener('click', function() {
  const isHidden = amountElement.classList.toggle('hidden');
  if (isHidden) {
    toggleIcon.classList.remove('bx-hide');
    toggleIcon.classList.add('bx-show');
    amountElement.textContent = '***.***.***,';
    unusedBalanceElement.textContent = '***.***.***';
    usedBalanceElement.textContent = '***.***.***';
  } else {
    toggleIcon.classList.remove('bx-show');
    toggleIcon.classList.add('bx-hide');
    amountElement.textContent = originalAmount;
    unusedBalanceElement.textContent = originalunusedBalance;
    usedBalanceElement.textContent = originalusedBalance;
  }
});

