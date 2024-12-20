import { loggerLink } from "@trpc/client";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        console.log('in the function');

        await step.sleep("wait-a-minute", "10s");

        console.log('after sleep');

        await step.waitForEvent("wait-for-event", { event: "test/hello.world-2", timeout: "2m" });

        console.log('after waiting for event');

        await step.run('test/hello.world-3', () => {
            console.log('test/hello.world-3 executed');
        });

        return { message: `Hello ${event.data.email}!` };
    }
);
