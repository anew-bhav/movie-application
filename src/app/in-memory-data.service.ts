import { InMemoryDbService } from 'angular-in-memory-web-api';

import { MOVIES } from './movie-data/movie.mock-data';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const movies = MOVIES;
        return { movies };
    }
}