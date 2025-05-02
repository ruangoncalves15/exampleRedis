import mysql, { Pool, PoolConnection } from 'mysql2/promise';
import { env } from '../configs/envs.config';

export const db: Pool = mysql.createPool({
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    waitForConnections: true,
    queueLimit: 0,
});

export async function withTransaction<T>(
    pool: Pool,
    callback: (conn: PoolConnection) => Promise<T>
): Promise<T> {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}
