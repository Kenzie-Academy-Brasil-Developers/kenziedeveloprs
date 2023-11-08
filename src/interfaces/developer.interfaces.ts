import { QueryResult } from "pg"

type Developers  = {
    id: number;
    name: string;
    email: string;
}

type DevelopersResult = QueryResult<Developers>
type DevelopersCreate  = Omit<Developers, "id">
type DevelopersRead = Developers[]
type DeveloperUpdate = Partial<Developers>


export { Developers, DevelopersCreate, DevelopersResult, DevelopersRead, DeveloperUpdate}