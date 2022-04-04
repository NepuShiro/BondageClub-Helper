//import { BCH_VERSION } from "./BCH.user.js";

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

function sleep(ms) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Notify chat
const bchChatNotify = (node) => {
    const div = document.createElement("div");
    div.setAttribute("class", "ChatMessage bch-notification");
    div.setAttribute("data-time", ChatRoomCurrentTime());
    div.setAttribute("data-sender", Player.MemberNumber.toString());
    div.setAttribute("style", "background-color:rgba(106,61,204,0.35);");
    if (typeof node === "string") {
        div.appendChild(document.createTextNode(node));
    } else if (Array.isArray(node)) {
        div.append(...node);
    } else {
        div.appendChild(node);
    }

    const ShouldScrollDown = ElementIsScrolledToEnd("TextAreaChatLog");
    if (document.getElementById("TextAreaChatLog") !== null) {
        document.getElementById("TextAreaChatLog").appendChild(div);
        if (ShouldScrollDown) {
            ElementScrollToEnd("TextAreaChatLog");
        }
    }
};
