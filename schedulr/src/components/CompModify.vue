<template>
    <div class="comp-modify">
        <div class="d-flex flex-row-reverse">
            <button @click="addItem" class="btn btn-success btn-lg mt-3">+ Add</button>
        </div>
        <ul class="list-group mt-3">
            <li v-for="(program, index) in formData.programs" :key="index" class="list-group-item">
                <div class="d-flex justify-content-between">
                    <div class="form-group text-start me-3">
                        <label>Start At: </label>
                        <select v-model="program.start" class="form-select" aria-label="Default select example">
                            <option selected>Pick time</option>
                            <option v-for="(time, index) in timeranges" :key="index" :value="time">{{ time }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group text-start me-3">
                        <label>End At: </label>
                        <select v-model="program.end" class="form-select" aria-label="Default select example">
                            <option selected>Pick time</option>
                            <option v-for="(time, index) in timeranges" :key="index" :value="time">{{ time }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group text-start me-3">
                        <label>AM/PM: </label>
                        <select v-model="program.ampm" class="form-select" aria-label="Default select example">
                            <option selected>Pick AM/PM</option>
                            <option v-for="(period, index) in ampm" :key="index" :value="period">{{ period }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group text-start me-3">
                        <label>Program: </label>
                        <select v-model="program.program" class="form-select" aria-label="Default select example">
                            <option selected>Choose your program</option>
                            <option v-for="(program, index) in programs" :key="index" :value="program">{{ program.title
                                }}
                            </option>
                        </select>
                    </div>
                    <button @click="deleteItem(index)" class="btn btn-danger ms-auto">Delete</button>
                </div>
            </li>
        </ul>
        <p v-if="formData.programs.length == 0" class="p-5 text-muted text-center">
            You haven't added any program yet. Please add a program to your schedule.
            <br> You can add multiple programs to your schedule.
        </p>
        <div class="px-5 mt-4">
            <button @click="handleSubmit()" class="btn btn-primary btn-lg w-100 mt-3">Submit</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "CompModify",
    data() {
        return {
            timeranges: [
                "1:00",
                "1:30",
                "2:00",
                "2:30",
                "3:00",
                "3:30",
                "4:00",
                "4:30",
                "5:00",
                "5:30",
                "6:00",
                "6:30",
                "7:00",
                "7:30",
                "8:00",
                "8:30",
                "9:00",
                "9:30",
                "10:00",
                "10:30",
                "11:00",
                "11:30",
                "12:00"
            ],
            ampm: ["AM", "PM"],
            programs: [
                {
                    title: "Genshin Impact",
                    cover: "covers/cover_genshin.jpg",
                    color: "#128dff",
                },
                {
                    title: "Valorant",
                    cover: "covers/cover_valorant.webp",
                    color: "#ff5a5a",
                },
                {
                    title: "Minecraft",
                    cover: "covers/cover_minecraft.jpg",
                    color: "#1dc13c",
                },
                {
                    title: "AC Shadows",
                    cover: "covers/cover_acshadows.png",
                    color: "#ff0000",
                },
                {
                    title: "Civilization VI",
                    cover: "covers/cover_civ6.jpg",
                    color: "#ff9c00",
                },
                {
                    title: "GTA IV",
                    cover: "covers/cover_gta4.jpg",
                    color: "#ffffff",
                },
                {
                    title: "Just Chatting",
                    cover: "covers/cover_justchatting.jpg",
                    color: "#ffffff",
                },
                {
                    title: "IRL",
                    cover: "covers/cover_irl.png",
                    color: "#ffffff",
                },
                {
                    title: "Coding",
                    cover: "covers/cover_vscode.jpg",
                    color: "#009cff",
                },
            ],
            formData: {
                name: "",
                description: "",
                programs: [], // Array to hold program data
            },
        };
    },
    methods: {
        deleteItem(index) {
            this.formData.programs.splice(index, 1);
        },
        addItem() {
            this.formData.programs.push({ start: "", end: "", ampm: "PM", program: {} });
        },
        handleSubmit() {
            console.log("Form submitted:", this.formData);
            // Add your logic here

            this.formData.description = this.generateDescription();
            sessionStorage.setItem("formData", JSON.stringify(this.formData));
            this.$router.push({
                path: '/preview',
            });
        },
        generateDescription() {
            let description = ``;

            if(this.formData.programs.length == 0) {
                description = `แชทวันนี้ไม่มีรายการ live stream\n\n`;
                description += `เนื่องจาก....`;
                return description;
            }

            description = `แชทวันนี้เรามีรายการ live stream\n\n`
            this.formData.programs.forEach((program) => {
                description += `${program.start} - ${program.end} ${program.ampm} (UTC+7): ${program.program.title}\n`;
            });
            description += `\nดู LIVE: https://www.twitch.tv/barnista27`;
            return description;
        },
    },
};
</script>

<style scoped>
.comp-modify {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input,
textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
</style>