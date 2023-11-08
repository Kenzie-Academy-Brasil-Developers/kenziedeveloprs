import { client } from "../database"
import format from "pg-format"
import { DeveloperUpdate, Developers, DevelopersCreate, DevelopersResult } from "../interfaces"


const create = async (payload: DevelopersCreate): Promise<Developers> => {
    const queryFormat: string = format (
        `INSERT INTO "developers" (%I) VALUES (%L) RETURNING* ;`,
        Object.keys(payload),
        Object.values(payload)
    )
    const queryResult: DevelopersResult = await client.query(queryFormat)
    return queryResult.rows[0]
}

const retrive = async (developerId: string): Promise<Developers> => {
    const queryResult: string =
        `SELECT
         d.id as "developerId",
         d.name as "name",
         d.email as "developerEmail",
         di. "developerSince" as "developerInfoDeveloperSince",
         di. "preferredOS" as "developerInfoPreferredOs"

        FROM "developers" d
        LEFT JOIN
        "developerInfos" di
      ON
        d.id = di."developerId"
      WHERE
        d.id = $1;`
    
    const query: DevelopersResult = await client.query(queryResult, [developerId])
    return query.rows[0]
}

// const partialUpdate = async ( payload: DeveloperUpdate, developersId: string):Promise<Developers> => {
//     const queryFormat: string = format(
//         'UPDATE "developers" SET (%I) = ROW(%L) WHERE "developersId" = $1 RETURNING *;',
//         Object.keys(payload),
//         Object.values(payload)
//     )

//     const queryResult: DevelopersResult = await client.query(queryFormat, [developersId])

//     return queryResult.rows[0]
// }

const partialUpdate = async (
    id: number,
    email: string,
    name: string | undefined
  ): Promise<Developers | null> => {
    const queryParams = [email, id];
    let resultQuery = `UPDATE developers SET email = %L`;
  
    if (name !== undefined) {
      resultQuery += `, name = %L`;
      queryParams.push(name);
    }
  
    resultQuery += ` WHERE id = %L RETURNING *`;
    const formatQuery = format(resultQuery, ...queryParams);
  
    const result = await client.query(formatQuery)
    const updateDev = result.rows[0];
    return updateDev;
  };
  

const destroy = async (developersID: string): Promise<void> => {
    await client.query('DELETE FROM "developers" WHERE "id" = $1;', [developersID])
}
    
export default { create, retrive, partialUpdate,  destroy }