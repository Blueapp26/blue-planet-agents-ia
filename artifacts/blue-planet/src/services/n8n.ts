export const triggerN8NWorkflow = async (lieu: string) => {
  const webhookUrl = "https://blueplanet.app.n8n.cloud/webhook-test/blue-planet-content";

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lieu }),
    });

    if (!response.ok) throw new Error('Erreur réseau');
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi à n8n:", error);
  }
};