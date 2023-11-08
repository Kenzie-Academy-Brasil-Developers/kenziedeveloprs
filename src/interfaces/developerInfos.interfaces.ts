import { QueryResult } from "pg";

type DeveloperInfos = {
    id: number;
    developerSince: string;
    preferredOS: string;
    developerId: number;
}

type DevelopersInfosResult = QueryResult<DeveloperInfos>
type DevelopersInfosCreate = Omit<DeveloperInfos, "id">

export {DeveloperInfos, DevelopersInfosCreate, DevelopersInfosResult}