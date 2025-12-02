import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoctorSchedule1763638695943 implements MigrationInterface {
  name = 'DoctorSchedule1763638695943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."doctor_time_slot_status_enum" AS ENUM('available', 'booked', 'unavailable')`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctor_time_slot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "status" "public"."doctor_time_slot_status_enum" NOT NULL DEFAULT 'available', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "schedule_id" uuid, CONSTRAINT "PK_ade5a566b70f84fa28dc289c12a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."doctor_weekly_schedule_day_of_week_enum" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctor_weekly_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "day_of_week" "public"."doctor_weekly_schedule_day_of_week_enum" NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "is_home_visit" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "doctor_id" uuid, CONSTRAINT "UQ_d6706cd943bb4a0802c6df557ce" UNIQUE ("day_of_week"), CONSTRAINT "PK_50e18aafcd527825791db36d7d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_time_slot" ADD CONSTRAINT "FK_c130748a520162d29710c8c8ba2" FOREIGN KEY ("schedule_id") REFERENCES "doctor_weekly_schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_weekly_schedule" ADD CONSTRAINT "FK_2010fb263252e91e68adfa26fae" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctor_weekly_schedule" DROP CONSTRAINT "FK_2010fb263252e91e68adfa26fae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_time_slot" DROP CONSTRAINT "FK_c130748a520162d29710c8c8ba2"`,
    );
    await queryRunner.query(`DROP TABLE "doctor_weekly_schedule"`);
    await queryRunner.query(
      `DROP TYPE "public"."doctor_weekly_schedule_day_of_week_enum"`,
    );
    await queryRunner.query(`DROP TABLE "doctor_time_slot"`);
    await queryRunner.query(
      `DROP TYPE "public"."doctor_time_slot_status_enum"`,
    );
  }
}
