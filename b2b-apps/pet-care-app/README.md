# Pet Management Application User Guide


- Create a Mysql Database using the following database schema.

    ```sql
    CREATE DATABASE IF NOT EXISTS PET_DB;

    CREATE DATABASE IF NOT EXISTS CHANNEL_DB;

    CREATE TABLE PET_DB.Pet (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        breed VARCHAR(255) NOT NULL,
        dateOfBirth VARCHAR(255) NOT NULL,
        owner VARCHAR(255) NOT NULL,
        org VARCHAR(255) NOT NULL
    );

    CREATE TABLE PET_DB.Vaccination (
        id INT AUTO_INCREMENT PRIMARY KEY,
        petId VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        lastVaccinationDate VARCHAR(255) NOT NULL,
        nextVaccinationDate VARCHAR(255),
        enableAlerts BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (petId) REFERENCES Pet(id) ON DELETE CASCADE
    );

    CREATE TABLE PET_DB.Thumbnail (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fileName VARCHAR(255) NOT NULL,
        content MEDIUMBLOB NOT NULL,
        petId VARCHAR(255) NOT NULL,
        FOREIGN KEY (petId) REFERENCES Pet(id) ON DELETE CASCADE
    );

    CREATE TABLE PET_DB.Settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        owner VARCHAR(255) NOT NULL,
        org VARCHAR(255) NOT NULL,
        notifications_enabled BOOLEAN NOT NULL,
        notifications_emailAddress VARCHAR(255),
        UNIQUE (org, owner)
    );

    CREATE TABLE CHANNEL_DB.Doctor (
        id VARCHAR(255) PRIMARY KEY,
        org VARCHAR(255),
        createdAt VARCHAR(255),
        name VARCHAR(255),
        gender VARCHAR(255),
        registrationNumber VARCHAR(255),
        specialty VARCHAR(255),
        emailAddress VARCHAR(255),
        dateOfBirth VARCHAR(255),
        address VARCHAR(255)
    );

    CREATE TABLE CHANNEL_DB.Availability (
        doctorId VARCHAR(255),
        date VARCHAR(255),
        startTime VARCHAR(255),
        endTime VARCHAR(255),
        availableBookingCount INT,
        PRIMARY KEY (doctorId, date, startTime),
        FOREIGN KEY (doctorId) REFERENCES Doctor(id) ON DELETE CASCADE
    );

    CREATE TABLE CHANNEL_DB.Thumbnail (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fileName VARCHAR(255) NOT NULL,
        content MEDIUMBLOB NOT NULL,
        doctorId VARCHAR(255) NOT NULL,
        FOREIGN KEY (doctorId) REFERENCES Doctor(id) ON DELETE CASCADE
    );

    CREATE TABLE CHANNEL_DB.Booking (
        id VARCHAR(255) PRIMARY KEY,
        org VARCHAR(255),
        referenceNumber VARCHAR(255),
        emailAddress VARCHAR(255),
        createdAt VARCHAR(255),
        petOwnerName VARCHAR(255),
        mobileNumber VARCHAR(255),
        doctorId VARCHAR(255),
        petId VARCHAR(255),
        petName VARCHAR(255),
        petType VARCHAR(255),
        petDoB VARCHAR(255),
        status VARCHAR(255),
        date VARCHAR(255),
        sessionStartTime VARCHAR(255),
        sessionEndTime VARCHAR(255),
        appointmentNumber INT,
        FOREIGN KEY (doctorId) REFERENCES Doctor(id)
    );

    CREATE TABLE CHANNEL_DB.OrgInfo (
        orgName VARCHAR(255),
        name VARCHAR(255),
        address VARCHAR(255),
        telephoneNumber VARCHAR(255),
        registrationNumber VARCHAR(255),
        PRIMARY KEY (orgName)
    );
    ```

      