export enum Command {
    STARTWS = '/startws',
    STOPWS = '/stopws',
    COMMANDS = '/commands'
}

export const USAGE_MESSAGES = {
    [Command.STARTWS]: "Usage: /startws <symbol> <kline>",
    [Command.STOPWS]: "Usage: /stopws",
};

export function getUsageMessages(): void {
    for (const [command, message] of Object.entries(USAGE_MESSAGES)) {
        console.log(`${command}: ${message}`);
    }
    console.log('\n')
}