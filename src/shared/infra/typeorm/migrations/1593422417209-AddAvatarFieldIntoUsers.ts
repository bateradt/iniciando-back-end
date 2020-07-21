import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFieldIntoUsers1593422417209
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('users', 'avatar');
    }
}
