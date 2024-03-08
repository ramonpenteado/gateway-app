CREATE TABLE "roles"(
    "id" UUID NOT NULL,
    "role_name" BIGINT NOT NULL
);
ALTER TABLE
    "roles" ADD PRIMARY KEY("id");
CREATE TABLE "students"(
    "id" UUID NOT NULL,
    "student_first_name" VARCHAR(255) NOT NULL,
    "student_last_name" VARCHAR(255) NOT NULL,
    "student_email" VARCHAR(255) NOT NULL,
    "student_password" VARCHAR(255) NOT NULL,
    "student_parent" UUID NULL,
    "student_crew" UUID NULL,
    "created_at" DATE NOT NULL DEFAULT 'datetime',
    "updated_at" DATE NOT NULL DEFAULT 'datetime',
    "student_username" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "students" ADD PRIMARY KEY("id");
ALTER TABLE
    "students" ADD CONSTRAINT "students_student_email_unique" UNIQUE("student_email");
ALTER TABLE
    "students" ADD CONSTRAINT "students_student_username_unique" UNIQUE("student_username");
CREATE TABLE "parents"(
    "id" UUID NOT NULL,
    "parent_first_name" VARCHAR(255) NOT NULL,
    "parent_last_name" VARCHAR(255) NOT NULL,
    "parent_email" VARCHAR(255) NOT NULL,
    "parent_password" VARCHAR(255) NOT NULL,
    "students" UUID NOT NULL,
    "roles" UUID NOT NULL
);
ALTER TABLE
    "parents" ADD PRIMARY KEY("id");
CREATE TABLE "presence"(
    "id" UUID NOT NULL,
    "court" UUID NOT NULL,
    "students" UUID NOT NULL
);
ALTER TABLE
    "presence" ADD PRIMARY KEY("id");
CREATE TABLE "court"(
    "id" UUID NOT NULL,
    "court_name" VARCHAR(255) NOT NULL,
    "court_date" DATE NOT NULL,
    "crew" UUID NOT NULL
);
ALTER TABLE
    "court" ADD PRIMARY KEY("id");
CREATE TABLE "crew"(
    "id" UUID NOT NULL,
    "crew_name" VARCHAR(255) NOT NULL,
    "students" UUID NOT NULL
);
ALTER TABLE
    "crew" ADD PRIMARY KEY("id");
ALTER TABLE
    "court" ADD CONSTRAINT "court_crew_foreign" FOREIGN KEY("crew") REFERENCES "crew"("id");
ALTER TABLE
    "students" ADD CONSTRAINT "students_id_foreign" FOREIGN KEY("id") REFERENCES "presence"("id");
ALTER TABLE
    "parents" ADD CONSTRAINT "parents_roles_foreign" FOREIGN KEY("roles") REFERENCES "roles"("id");
ALTER TABLE
    "presence" ADD CONSTRAINT "presence_court_foreign" FOREIGN KEY("court") REFERENCES "court"("id");
ALTER TABLE
    "parents" ADD CONSTRAINT "parents_students_foreign" FOREIGN KEY("students") REFERENCES "students"("id");
ALTER TABLE
    "crew" ADD CONSTRAINT "crew_students_foreign" FOREIGN KEY("students") REFERENCES "students"("id");