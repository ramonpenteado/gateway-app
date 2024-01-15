import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1704982637622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO users (email, password, active)
            VALUES
            (
                'ramon.penteado@gmail.com',
                'abc123',
                true
            )
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM users WHERE email = 'ramon.penteado@gmail.com'`)
    }

}
