import Database from "easy-json-database"
import { findBestMatch } from "string-similarity";
import { power } from "../typings/options";

export class MatchDetector {
    private database: Database;

    constructor(databasePath: string) {
        this.database = new Database(databasePath);
    }
    public addElement({ power, word }: { power: power; word: string; }) {
        if (this.database.has(word)) return false;

        this.database.set(word, power);
        return true;
    }
    public removeElement(word: string) {
        if (!this.database.has(word)) return false;

        this.database.delete(word);
        return true;
    }
    public get elements(): { word: string; power: power }[] {
        return this.database.all().map(x => ({ word: x.key, power: x.data as power }));
    }
    public test(text: string) {
        const includes: {key: string, data: power;}[] = this.database.all().filter(x => text.includes(x.key)).map(x => ({ key: x.key, data: parseInt(x.data as string) as power }));
    
        const percent = includes.length * 100 / text.split(/ +/g).length;
        if (percent >= this.getPercentageByStringLength(text.length)) return true;
    
        const highestPower = includes.sort((a, b) => a.data - b.data)[0].data;
        if (includes.filter(x => x.data === highestPower).length * 100 / includes.length >= 60 && highestPower > 5) return true;
    
        if (includes.map(x => x.data).sort((a, b) => a + b)[0] >= 4 * includes.length) return true;
        let matches = 0;
        for (const item of text.split(/ +/g)) {
            if (findBestMatch(item, includes.map(x => x.key)).bestMatch.rating > 0.6) matches++;
        }
        const matchesPercent = matches * 100 / text.split(/ +/g).length;
        if (matchesPercent >= this.getPercentageByStringLength(text.length)) return true;
        return false;
    }
    private getPercentageByStringLength(length: number): number {
        if (length < 10) return 100;
        if (length < 25) return 50;
        if (length < 40) return 60;
        if (length < 50) return 50;
        if (length < 60) return 40;
        if (length < 200) return 20;
        return 10;
    }
}