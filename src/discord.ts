import 'dotenv/config';

interface Property {
  description: string;
  price: string;
  location: string;
  url: string;
}

export async function sendDiscordNotification(message: string, property: Property): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('DISCORD_WEBHOOK_URL environment variable is not set');
  }
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        embeds: [{
          title: "🏠 New Housing Found!",
          description: property.description,
          color: 0x00ff00,
          fields: [
            { name: "Price", value: property.price, inline: true },
            { name: "Location", value: property.location, inline: true },
            { name: "Link", value: property.url }
          ],
          timestamp: new Date().toISOString()
        }]
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
  }
}