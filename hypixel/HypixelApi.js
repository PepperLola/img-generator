const axios = require('axios')

let BASE = 10000;
let GROWTH = 2500;
let HALF_GROWTH = GROWTH / 2;
let REVERSE_PQ_PREFIX = -(BASE - 0.5 * GROWTH) / GROWTH;
let REVERSE_CONST = REVERSE_PQ_PREFIX * REVERSE_PQ_PREFIX;
let GROWTH_DIVIDES_2 = 2 / GROWTH;

class HypixelApi {
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    async getUuidFromName(name) {
        return await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).then(res => {
            return res.data.id;
        })
    }

    async getPlayer(uuid) {
        let res = await axios.get(`https://api.hypixel.net/player?key=${this.apiKey}&uuid=${uuid}`).then(res => {
            return res.data;
        });

        if (res.success === false) {
            throw new Error("Error making HTTP request");
        }
        return res.player;
    }

    async getPlayerExp(uuid) {
        return await this.getPlayer(uuid).then(res => {
            return res.networkExp;
        });
    }

    async getPlayerLevel(uuid) {
        return await this.getPlayer(uuid).then(res => {
            let exp = res.networkExp;
            return this.getLevel(exp);
        });
    }

    getLevel(exp) {
        return exp < 0 ? 1 : Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * exp));
    }

    getExpFromLevel(level) {
        return level < 1 ? BASE : (Math.pow(level - 1 - REVERSE_PQ_PREFIX, 2) - REVERSE_CONST) / GROWTH_DIVIDES_2;
    }

    getExpBetweenLevels(level) {
        let lv = Math.floor(level);
        let x0 = this.getTotalExpToFullLevel(lv);
        if (level === lv) return x0;
        return (this.getTotalExpToFullLevel(lv + 1) - x0) * (level % 1) + x0;
    }

    getTotalExpToLevel(level) {
        let lv = Math.floor(level)
        let x0 = this.getTotalExpToFullLevel(lv);
        if (level === lv) return x0;
        return (this.getTotalExpToFullLevel(lv + 1) - x0) * (level % 1) + x0;
    }

    getTotalExpToFullLevel(level) {
        return (HALF_GROWTH * (level - 2) + BASE) * (level - 1);
    }

    getPercentageToNextLevel(exp) {
        let lv = this.getLevel(exp);
        let x0 = this.getTotalExpToLevel(lv);
        return (exp - x0) / (this.getTotalExpToLevel(lv + 1) - x0);
    }
}

module.exports.Hypixel = new HypixelApi();
