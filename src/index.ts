import { sendDiscordNotification } from './discord';

async function main() {
  console.log('Roomspot Bot starting...');
  
  const exampleProperty = {
    description: 'Nice 2-bedroom apartment',
    price: '$1200/month',
    location: 'Downtown',
    url: 'https://example.com/property/123'
  };
  
  await sendDiscordNotification('New property found!', exampleProperty);
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the application
if (require.main === module) {
  main().catch(console.error);
}

export { main };
