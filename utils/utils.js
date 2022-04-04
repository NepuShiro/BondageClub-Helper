import { BCH_VERSION } from "../BCH.user.js";

// Console logging cmd
const bchLog = (...args) => {
    console.log("BCH", `${w.BCH_VERSION}:`, ...args);
};

// Popup Notification
const bchNotify = async (text, duration = 5000, properties = {}) => {
    await waitFor(
        () => !!Player && new Date(ServerBeep?.Timer || 0) < new Date()
    );

    ServerBeep = {
        Timer: Date.now() + duration,
        Message: text,
        ...properties,
    };
};
