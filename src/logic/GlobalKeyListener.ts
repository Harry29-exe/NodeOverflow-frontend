export const PressedKeys: { keys: string[] } = {
    keys: []
}

export const initGlobalKeyListener = () => {
    let handleKeyDown = (event: any) => {
        console.log("key down " + event.code);
        if (!PressedKeys.keys.includes(event.code)) {
            PressedKeys.keys.push(event.code);
        }
    }

    let handleKeyUp = (event: any) => {
        PressedKeys.keys = PressedKeys.keys.filter(k => k !== event.code);
    }
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
}