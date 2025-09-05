// /schedulr/src/models/programs.js
const modelPrograms = [
    {
        title: "Delta Force",
        cover: "covers/cover_deltaforce.jpg",
        color: "#0ff796",
        style: { color: "#0ff796" },
    },
    {
        title: "Genshin Impact",
        cover: "covers/cover_genshin.jpg",
        color: "#128dff",
        style: { color: "#128dff" },
    },
    {
        title: "Valorant",
        cover: "covers/cover_valorant.webp",
        color: "#ff5a5a",
        style: { color: "#ff5a5a" },
    },
    {
        title: "Minecraft",
        cover: "covers/cover_minecraft.jpg",
        color: "#1dc13c",
        style: { color: "#1dc13c" },
    },
    {
        title: "AC Shadows",
        cover: "covers/cover_acshadows.png",
        color: "#ff0000",
        style: { color: "#ff0000" },
    },
    {
        title: "Civilization VI",
        cover: "covers/cover_civ6.jpg",
        color: "#ff9c00",
        style: { color: "#ff9c00" },
    },
    {
        title: "GTA IV",
        cover: "covers/cover_gta4.jpg",
        color: "#000000",
        style: {
            color: "#000000",
            textShadow: "-2px -2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, 2px 2px 0 #ffffff",
        },
    },
    {
        title: "Battlefield 4",
        cover: "covers/cover_bf4.png",
        color: "#ffffff",
        style: {
            color: "#ffffff",
            textShadow: "1px 2px 16px deepskyblue",
        },
    },
    {
        title: "Metal Gear Rising",
        cover: "covers/cover_mgr.jpg",
        color: "#00ffff",
        style: {
            color: "#00ffff",
        },
    },
    {
        title: "Just Chatting",
        cover: "covers/cover_justchatting.jpg",
        color: "#ffffff",
        style: { color: "#ffffff" },
    },
    {
        title: "IRL",
        cover: "covers/cover_irl.png",
        color: "#ffffff",
        style: { color: "#ffffff" },
    },
    {
        title: "Coding",
        cover: "covers/cover_vscode.jpg",
        color: "#009cff",
        style: { color: "#009cff" },
    },
];

export default {
    generateDescription(programs) {
        // Generate a description based on the form data
        let description = ``;

        if (programs.length == 0) {
            description = `แชทวันนี้ไม่มีรายการ live stream\n\n`;
            description += `เนื่องจาก....`;
            return description;
        }

        description = `แชทวันนี้เรามีรายการ live stream\n\n`
        programs.forEach((program) => {
            description += `${program.start} - ${program.end} (UTC+7): ${program.title} ${program.description ?  '-'+program.description : ''}\n`;
        });
        description += `\nYouTube: www.youtube.com/@barnista27`;
        description += `\nTwitch: www.twitch.tv/barnista27`;
        description += `\nตารางไลฟ์: barnista-schedulr.web.app/live-schedule`

        return description;
    },
    modelPrograms
}