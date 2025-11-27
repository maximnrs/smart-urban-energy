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
