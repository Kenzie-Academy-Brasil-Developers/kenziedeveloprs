import { client } from "../database"
import format from "pg-format"
import { DeveloperInfos, DevelopersInfosResult } from "../interfaces"
import { AppError } from "../errors"
import { QueryResult } from "pg";

const create = async (
    developerSince: string,
    preferredOS: string,
    developerId: number,
  ): Promise<QueryResult> => {
    const query = `
      INSERT INTO "developerInfos" ("developerSince", "preferredOS", "developerId")
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await client.query(query, [
      developerSince,
      preferredOS,
      developerId,
    ]);
  
    return result.rows[0];
  };

export default { create } 
