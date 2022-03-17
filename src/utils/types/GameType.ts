export type dbField = {
    id: number,
    name: string
}

export interface GameType {
    id: number, 
    name: string, 
    developers: dbField[],
    publishers: dbField[],
    genres: dbField[],
    tags: dbField[],
    languages: dbField[],
    points: number,
    gameplayTime: number,
    steamScore: number,
    metascore: number, 
    price: number,
    soldCount: number,
    description: string,
    steamURL: string,
    HLTBURL: string,
    imageURL: string,
    releaseDate: string,
}

// class GameClass implements GameType{
//     constructor(game: GameType) {}

// }