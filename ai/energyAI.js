exports.analyzeEnergy = (value) => {
    if (value < 100) {
        return "✅ Laag energieverbruik – goed bezig!";
    }
    else if (value >= 100 && value <= 300) {
        return "⚠️ Normaal energieverbruik – let op piekmomenten.";
    }
    else {
        return "❌ Hoog energieverbruik – bespaar energie!";
    }
};

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