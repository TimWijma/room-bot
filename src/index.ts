import { sendDiscordNotification } from "./discord";
import { getRooms, runRoomApplicationScript } from "./roomspot";


async function main() {
    console.log("Roomspot Bot starting...");

    try {
        const links = await getRooms();

        console.log("Fetched room links:", links);

        for (const link of links) {
            await sendDiscordNotification(link);
        }
    } catch (error) {
        console.error("Failed to apply to room:", error);
    }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});

// Start the application
if (require.main === module) {
    main().catch(console.error);
}

export { main };
