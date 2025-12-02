import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserImage1763542858128 implements MigrationInterface {
  name = 'AddUserImage1763542858128';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image_url" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_1f838530159ac83c30cab951dc" UNIQUE ("user_id"), CONSTRAINT "PK_8c5d93e1b746bef23c0cf9aa3a6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_images" ADD CONSTRAINT "FK_1f838530159ac83c30cab951dca" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_images" DROP CONSTRAINT "FK_1f838530159ac83c30cab951dca"`,
    );
    await queryRunner.query(`DROP TABLE "user_images"`);
  }
}
