exports.getEnergyData = async (req, res) => {
  const value = await model.getEnergyValue();
  const advice = ai.analyzeEnergy(value);

  res.json({
    value: value,
    aiAdvice: advice,
  });
};
