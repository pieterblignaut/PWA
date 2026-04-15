const statusEl = document.getElementById("status");
const outEl = document.getElementById("out");

document.getElementById("ping").addEventListener("click", () =>
{
    outEl.textContent = "Pong @ " + new Date().toLocaleTimeString();
});

/*
if ("serviceWorker" in navigator)
{
    window.addEventListener("load", async () =>
    {
        try
        {
            const reg = await navigator.serviceWorker.register("./sw.js");
            statusEl.textContent = "Service worker registered: " + reg.scope;
        }
        catch (e)
        {
            statusEl.textContent = "SW registration failed: " + e;
        }
    });
}
else
{
    statusEl.textContent = "Service workers not supported in this browser.";
}
*/