// ===== Mock Data =====
let city = "amsterdam";
let timeRange = "week";

const totalConsumption = 1847;
const peakReduction = 12.3;
const co2Reduction = 245;
const efficiency = 87;

// Wijken (districts) data
const districtsData = [
  { name: "Centrum", verbruik: 320, duurzaam: 120 },
  { name: "Zuid", verbruik: 210, duurzaam: 90 },
  { name: "Oost", verbruik: 180, duurzaam: 60 },
  { name: "West", verbruik: 200, duurzaam: 80 },
  { name: "Noord", verbruik: 150, duurzaam: 40 },
];

// Piekanalyse (peak analysis)
const peakAnalysisData = [
  {
    time: "06:00 - 09:00",
    verbruik: 250,
    advies: "Slimme thermostaten aanzetten",
  },
  { time: "12:00 - 15:00", verbruik: 220, advies: "PV-panelen optimaliseren" },
  { time: "18:00 - 21:00", verbruik: 300, advies: "Apparaten spreiden" },
];

// Besparingssuggesties
const savingsSuggestions = [
  { advies: "Gebruik energiezuinige verlichting", besparing: "15%" },
  { advies: "Vermijd piekuren bij opladen van EV", besparing: "10%" },
  { advies: "Optimaliseer verwarming en koeling per wijk", besparing: "20%" },
];

// ===== Elementen =====
const kpiCardsContainer = document.getElementById("kpiCards");
const overviewCity =
  document.getElementById("overviewCity") || document.createElement("div");
const districtList = document.getElementById("districts");
const peakAnalysis = document.getElementById("analysis");
const savingsContainer = document.getElementById("suggestions");

// ===== KPIs =====
function renderKPIs() {
  const timeLabels = {
    day: ["24 uur", "Vandaag"],
    week: ["7 dagen", "Deze week"],
    month: ["30 dagen", "Deze maand"],
    year: ["365 dagen", "Dit jaar"],
  };

  kpiCardsContainer.innerHTML = `
    <div class="card">
      <h3>Totaal Verbruik⚡</h3>
      <p style="font-weight: bold;">${totalConsumption} MWh</p>
      <p>${timeLabels[timeRange][1]}</p>
      <span class="badge">${timeLabels[timeRange][0]}</span>
    </div>
    <div class="card">
      <h3>Piekreductie 🔽</h3>
      <p style="color:#10b981; font-weight: bold;">${peakReduction}%</p>
      <p>t.o.v. vorige periode</p>
      <span class="badge" style="background:#d1fae5;color:#065f46">Optimaal</span>
    </div>
    <div class="card">
      <h3>CO₂ Reductie ℹ️</h3>
      <p style="color:#3b82f6; font-weight: bold;">${co2Reduction} ton</p>
      <p>Bespaarde uitstoot</p>
      <span class="badge" style="background:#dbeafe;color:#1d4ed8">Impact</span>
    </div>
    <div class="card">
      <h3>Efficiëntie 💡</h3>
      <p style="color:#f59e0b; font-weight: bold;">${efficiency}%</p>
      <p>Gemiddelde score</p>
      <span class="badge" style="background:#fef3c7;color:#b45309">Goed</span>
    </div>
  `;
}

renderKPIs();

// ===== Tabs =====
document.querySelectorAll(".tab-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-button")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ===== Dropdowns =====
document.getElementById("citySelect").addEventListener("change", (e) => {
  city = e.target.value;
  overviewCity.textContent = `Real-time verbruiksdata voor ${capitalize(city)}`;
});
document.getElementById("timeRangeSelect").addEventListener("change", (e) => {
  timeRange = e.target.value;
  renderKPIs();
  renderEnergyChart();
  renderDistricts();
  renderPeakAnalysis();
  renderSavings();
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== Charts =====
function generateData() {
  if (timeRange === "day") {
    return Array.from({ length: 24 }, (_, i) => ({
      x: `${i}:00`,
      verbruik: Math.floor(Math.random() * 30 + 40 + Math.sin(i / 4) * 20),
      duurzaam: Math.floor(Math.random() * 15 + 15),
    }));
  } else if (timeRange === "week") {
    const days = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
    return days.map((d, i) => ({
      x: d,
      verbruik: Math.floor(Math.random() * 50 + 200),
      duurzaam: Math.floor(Math.random() * 30 + 80),
    }));
  } else if (timeRange === "month") {
    return Array.from({ length: 30 }, (_, i) => ({
      x: i + 1,
      verbruik: Math.floor(Math.random() * 50 + 200),
      duurzaam: Math.floor(Math.random() * 30 + 80),
    }));
  } else {
    const months = [
      "Jan",
      "Feb",
      "Mrt",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ];
    return months.map((m) => ({
      x: m,
      verbruik: Math.floor(Math.random() * 200 + 1500),
      duurzaam: Math.floor(Math.random() * 100 + 600),
    }));
  }
}

let energyChart;
function renderEnergyChart() {
  const ctx = document.getElementById("energyChart").getContext("2d");
  const data = generateData();
  if (energyChart) energyChart.destroy();
  energyChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((d) => d.x),
      datasets: [
        {
          label: "Totaal Verbruik (MWh)",
          data: data.map((d) => d.verbruik),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59,130,246,0.2)",
          fill: true,
        },
        {
          label: "Duurzame Energie (MWh)",
          data: data.map((d) => d.duurzaam),
          borderColor: "#10b981",
          backgroundColor: "rgba(16,185,129,0.2)",
          fill: true,
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { position: "bottom" } } },
  });
}
renderEnergyChart();
overviewCity.textContent = `Real-time verbruiksdata voor ${capitalize(city)}`;

// ===== Peak Analysis =====
let peakChart;

function renderPeakAnalysis() {
  // KPI waardes zetten
  document.getElementById("morningPeak").textContent =
    peakAnalysisData[0].verbruik + " MWh";

  document.getElementById("eveningPeak").textContent =
    peakAnalysisData[2].verbruik + " MWh";

  document.getElementById("lowPeak").textContent =
    Math.min(...peakAnalysisData.map((p) => p.verbruik)) + " MWh";

  // Chart bouwen
  const ctx = document.getElementById("peakChart").getContext("2d");

  if (peakChart) peakChart.destroy();

  peakChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: peakAnalysisData.map((p) => p.time),
      datasets: [
        {
          label: "Verbruik (MWh)",
          data: peakAnalysisData.map((p) => p.verbruik),
          backgroundColor: ["#ef4444", "#f59e0b", "#10b981"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
    },
  });
}
renderPeakAnalysis();

// ===== Districts =====
let districtChart;

function renderDistricts() {
  const cardsContainer = document.getElementById("districtCards");

  // Cards bouwen
  cardsContainer.innerHTML = districtsData
    .map(
      (d) => `
      <div class="district-card">
        <h4>${d.name}</h4>

        <div class="district-metric">
          <span>Totaal verbruik</span>
          <strong>${d.verbruik} MWh</strong>
        </div>

        <div class="district-metric">
          <span>Duurzaam</span>
          <strong style="color:#10b981;">${d.duurzaam} MWh</strong>
        </div>
      </div>
    `
    )
    .join("");

  // Chart bouwen
  const ctx = document.getElementById("districtChart").getContext("2d");

  if (districtChart) districtChart.destroy();

  districtChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: districtsData.map((d) => d.name),
      datasets: [
        {
          label: "Totaal Verbruik (MWh)",
          data: districtsData.map((d) => d.verbruik),
          backgroundColor: "#3b82f6",
        },
        {
          label: "Duurzame Energie (MWh)",
          data: districtsData.map((d) => d.duurzaam),
          backgroundColor: "#10b981",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}
renderDistricts();

// ===== Savings Suggestions =====
function renderSavings() {
  const suggestionCards = document.getElementById("suggestionCards");
  const aiCity = document.getElementById("aiCity");
  aiCity.textContent = capitalize(city);

  const suggestions = [
    {
      icon: "☀️",
      title: "Zonnepanelen Uitbreiding",
      description: "Installeer zonnepanelen op 340 openbare gebouwen. Geschat potentieel: 45 MWh per dag.",
      impact: "Hoog",
      savings: "€ 2.4M / jaar",
      co2Reduction: "320 ton CO₂",
      category: "Duurzame Energie"
    },
    {
      icon: "💡",
      title: "Slimme Straatverlichting",
      description: "Vervang traditionele straatverlichting door LED met bewegingssensoren. Reduceer verbruik met 60% tijdens daluren.",
      impact: "Hoog",
      savings: "€ 1.8M / jaar",
      co2Reduction: "240 ton CO₂",
      category: "Smart City"
    },
    {
      icon: "🌡️",
      title: "Gebouw Isolatie Programma",
      description: "Verbeter isolatie in 1.200 oudere gebouwen. Reduceer verwarmingskosten met gemiddeld 35%.",
      impact: "Gemiddeld",
      savings: "€ 3.1M / jaar",
      co2Reduction: "450 ton CO₂",
      category: "Energiebesparing"
    },
    {
      icon: "🔋",
      title: "Energie Opslag Systemen",
      description: "Installeer batterij-opslagsystemen bij zonne- en windparken om piekvraag te nivelleren.",
      impact: "Hoog",
      savings: "€ 1.5M / jaar",
      co2Reduction: "180 ton CO₂",
      category: "Infrastructuur"
    },
    {
      icon: "💨",
      title: "Windturbines in Haven",
      description: "Plaats 8 windturbines in havengebied. Capaciteit: 24 MW, voorziet 18.000 huishoudens van stroom.",
      impact: "Hoog",
      savings: "€ 4.2M / jaar",
      co2Reduction: "580 ton CO₂",
      category: "Duurzame Energie"
    },
    {
      icon: "⚡",
      title: "Smart Grid Optimalisatie",
      description: "Implementeer AI-gestuurd smart grid systeem voor betere vraag-aanbod balancering in realtime.",
      impact: "Gemiddeld",
      savings: "€ 980K / jaar",
      co2Reduction: "145 ton CO₂",
      category: "Smart City"
    }
  ];

  suggestionCards.innerHTML = suggestions.map(s => {
    let impactClass = s.impact === "Hoog" ? "impact-hoog" :
                      s.impact === "Gemiddeld" ? "impact-gemiddeld" :
                      "impact-laag";

    let categoryClass = s.category === "Duurzame Energie" ? "category-duurzaam" :
                        s.category === "Smart City" ? "category-smartcity" :
                        s.category === "Energiebesparing" ? "category-energie" :
                        "category-infrastructuur";

    return `
      <div class="suggestion-card">
        <div class="suggestion-card-header">
          <div class="suggestion-card-header-left">
            <div class="suggestion-icon">${s.icon}</div>
            <span class="badge ${categoryClass}">${s.category}</span>
          </div>
          <span class="badge ${impactClass}">${s.impact}</span>
        </div>
        <p class="suggestion-title">${s.title}</p>
        <p class="suggestion-description">${s.description}</p>
        <div class="suggestion-stats">
          <div class="suggestion-stat-box">
            <p>Besparing</p>
            <p>${s.savings}</p>
          </div>
          <div class="suggestion-stat-box">
            <p>CO₂ Reductie</p>
            <p>${s.co2Reduction}</p>
          </div>
        </div>
      </div>
    `;
  }).join("");
}
renderSavings();