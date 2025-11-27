async function getEnergyData() {
    const response = await fetch("http://localhost:3000/api/energy");
    return response.json();
}