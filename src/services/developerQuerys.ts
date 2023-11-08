import format from "pg-format"
import { client } from "../database"
import { DeveloperInfos, DevelopersInfosCreate, DevelopersInfosResult } from "../interfaces"
import { AppError } from "../errors"

export const idDevelopersExists = async (payload: Number): Promise<DeveloperInfos> => {
    const queryFormat: string = format (
        'SELECT* FROM "developers" WHERE "developerId" = $1;',
        payload,
    )
    const queryResult: DevelopersInfosResult = await client.query(queryFormat)
    if(queryResult.rowCount > 0){
        throw new AppError("Developer infos already exists.", 409)
    }
    return queryResult.rows[0]
}

 export const developerQuery = async ( DeveloperInfos: DevelopersInfosCreate ): Promise<DevelopersInfosResult> => {
    const { developerSince, preferredOS, developerId } = DeveloperInfos;
    const query = `
    INSERT INTO "developerInfos" ("developerSince", "preferredOS", "developerId")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await client.query(query, [
      developerSince,
      preferredOS,
      developerId,
  ])
  
  return result.rows[0]
}

export const validPreferredOS = async (preferredOS: string): Promise<void> => {
    const query = format(`
    SELECT CASE 
    WHEN %L = 'Windows' THEN true
    WHEN %L = 'Linux' THEN true
    WHEN %L = 'MacOS' THEN true
    ELSE false
    END as is_valid`,
   preferredOS,
   preferredOS,
   preferredOS
   )

   const queryResult = await client.query(query)

   const ValidOs = queryResult.rows[0]?.is_valid
   if(!ValidOs){
    throw new AppError("Invalid OS option.", 400)
   }
}

export default { idDevelopersExists, validPreferredOS } 
