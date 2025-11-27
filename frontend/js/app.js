getEnergyData().then(data => {
    document.getElementById("energy-value").innerText =
        "Verbruik: " + data.value + " kWh";

    document.getElementById("ai-result").innerText =
        data.aiAdvice;
});