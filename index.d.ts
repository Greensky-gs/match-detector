import { power } from './dist/typings/options';

export class MatchDetector {
    public constructor(databasePath: string);

    public addElement(options: { word: string; power: power }): boolean;
    public removeElement(word: string): boolean;
    public test(text: string): boolean;

    public get elements(): { word: string; power: power }[];
}