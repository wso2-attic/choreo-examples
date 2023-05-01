import ballerinax/java.jdbc;
import ballerinax/mysql.driver as _;
import ballerina/uuid;
import ballerina/sql;
import ballerina/log;
import ballerinax/mysql;
import ballerina/time;

configurable string dbHost = "localhost";
configurable string dbUsername = "admin";
configurable string dbPassword = "admin";
configurable string dbDatabase = "PET_DB";
configurable int dbPort = 3306;

table<Doctor> key(org, id) doctorRecords = table [];
table<Booking> key(org, id) bookingRecords = table [];

final mysql:Client|error dbClient;
boolean useDB = false;
map<Thumbnail> thumbnailMap = {};

const BOOKING_STATUS_CONFIRMED = "Confirmed";
const BOOKING_STATUS_COMPLETED = "Completed";

function init() returns error? {

    if dbHost != "localhost" && dbHost != "" {
        useDB = true;
    }

    sql:ConnectionPool connPool = {
        maxOpenConnections: 20,
        minIdleConnections: 20,
        maxConnectionLifeTime: 300
    };

    mysql:Options mysqlOptions = {
        connectTimeout: 10
    };

    dbClient = new (dbHost, dbUsername, dbPassword, dbDatabase, dbPort, options = mysqlOptions, connectionPool = connPool);

    if dbClient is sql:Error {
        if (!useDB) {
            log:printInfo("DB configurations are not given. Hence storing the data locally");
        } else {
            log:printError("DB configuraitons are not correct. Please check the configuration", 'error = <sql:Error>dbClient);
            return error("DB configuraitons are not correct. Please check the configuration");
        }
    }

    if useDB {
        log:printInfo("DB configurations are given. Hence storing the data in DB");
    }

}

function getConnection() returns jdbc:Client|error {
    return dbClient;
}

function getDoctors(string org) returns Doctor[]|error {

    Doctor[] doctorList = [];
    if (useDB) {
        // pets = check dbGetPetsByOwner(owner);
    } else {
        doctorRecords.forEach(function(Doctor doctor) {
            if doctor.org == org {
                doctorList.push(doctor);
            }
        });
    }
    return doctorList;
}

function getDoctorByIdAndOrg(string org, string doctorId) returns Doctor|()|error {

    if (useDB) {
        // return dbGetPetByOwnerAndPetId(owner, petId);
        return ();
    } else {
        Doctor? doctor = doctorRecords[org, doctorId];
        if doctor is () {
            return ();
        }
        return doctor;
    }
}

function getDoctorByEmailAndOrg(string org, string emailAddress) returns Doctor|()|error {

    Doctor doctor = {
        id: "",
        org: "",
        emailAddress: "",
        address: "",
        specialty: "",
        gender: "",
        registrationNumber: "",
        name: "",
        availability: [],
        createdAt: ""
    };
    if (useDB) {
        // return dbGetPetByOwnerAndPetId(owner, petId);
        return ();
    } else {
        foreach Doctor doc in doctorRecords {
            if doc.org == org && doc.emailAddress == emailAddress {
                doctor = doc;
                break;
            }
        }

        if doctor.id == "" {
            return ();
        }
        return doctor;
    }

}

// function getPetById(string petId) returns Pet|() {

//     if (useDB) {
//         Pet|()|error petResult = dbGetPetByPetId(petId);

//         if petResult is Pet {
//             return petResult;
//         } else {
//             return ();
//         }
//     } else {
//         string owner = from var petRecord in petRecords
//             where petRecord.id == petId
//             select petRecord.owner;

//         PetRecord? petRecord = petRecords[owner, petId];
//         if petRecord is () {
//             return ();
//         }

//         return getPetDetails(petRecord);
//     }
// }

function updateDoctorById(string org, string doctorId, DoctorItem updatedDoctorItem) returns Doctor|()|error {

    if (useDB) {
        // Pet|() oldPet = check dbGetPetByOwnerAndPetId(owner, petId);
        // if oldPet is () {
        //     return ();
        // }

        // Pet pet = {id: petId, owner: owner, ...updatedPetItem};
        // Pet|error updatedPet = dbUpdatePet(pet);

        // if updatedPet is error {
        //     return updatedPet;
        // }
        // enableAlerts(email, owner, updatedPet);
        // return updatedPet;
        return ();

    } else {
        Doctor? oldeDoctorRecord = doctorRecords[org, doctorId];
        if oldeDoctorRecord is () {
            return ();
        }
        doctorRecords.put({id: doctorId, org: org, createdAt: oldeDoctorRecord.createdAt, ...updatedDoctorItem});
        Doctor? doctor = doctorRecords[org, doctorId];
        return doctor;
    }
}

function deleteDoctorById(string org, string doctorId) returns string|()|error {

    if (useDB) {
        // return dbDeletePetById(owner, petId);
        return ();
    } else {
        Doctor? doctorRecord = doctorRecords[org, doctorId];
        if doctorRecord is () {
            return ();
        }
        _ = doctorRecords.remove([org, doctorId]);
        return "Doctor deleted successfully";
    }
}

function addDoctor(DoctorItem doctorItem, string org) returns Doctor|error {

    string docId = uuid:createType1AsString();
    time:Utc currentUtc = time:utcNow();
    time:Civil currentTime = time:utcToCivil(currentUtc);
    string timeString = civilToIso8601(currentTime);

    if (useDB) {
        // Pet pet = {id: petId, owner: owner, ...petItem};
        // Pet addedPet = check dbAddPet(pet);
        // enableAlerts(email, owner, addedPet);
        // return addedPet;
        return error("Not implemented");
    } else {
        doctorRecords.put({id: docId, createdAt: timeString, org: org, ...doctorItem});
        Doctor doctor = <Doctor>doctorRecords[org, docId];
        return doctor;
    }
}

function updateThumbnailByDoctorId(string org, string doctorId, Thumbnail thumbnail) returns string|()|error {

    if (useDB) {

        // string|()|error deleteResult = dbDeleteThumbnailById(petId);

        // if deleteResult is error {
        //     return deleteResult;
        // }

        // if thumbnail.fileName != "" {
        //     string|error result = dbAddThumbnailById(petId, thumbnail);

        //     if result is error {
        //         return result;
        //     }
        // }

        return "Thumbnail updated successfully";
    } else {

        string thumbnailKey = getThumbnailKey(org, doctorId);
        if thumbnail.fileName == "" {
            if thumbnailMap.hasKey(thumbnailKey) {
                _ = thumbnailMap.remove(thumbnailKey);
            }

        } else {
            thumbnailMap[thumbnailKey] = thumbnail;
        }

        return "Thumbnail updated successfully";
    }
}

function getThumbnailByDoctorId(string org, string doctorId) returns Thumbnail|()|string|error {

    if (useDB) {

        // Thumbnail|string|error getResult = dbGetThumbnailById(petId);

        // if getResult is error {
        //     return getResult;
        // } else if getResult is string {
        //     return getResult;
        // } else {
        //     return <Thumbnail>getResult;
        // }
        return ();

    } else {

        string thumbnailKey = getThumbnailKey(org, doctorId);
        if thumbnailMap.hasKey(thumbnailKey) {
            Thumbnail thumbnail = <Thumbnail>thumbnailMap[thumbnailKey];
            return thumbnail;
        } else {
            return ();
        }
    }
}

function getBookings(string org) returns Booking[]|error {

    Booking[] bookingList = [];
    if (useDB) {
        // pets = check dbGetPetsByOwner(owner);
    } else {
        bookingRecords.forEach(function(Booking booking) {
            if booking.org == org {
                bookingList.push(booking);
            }
        });
    }
    return bookingList;
}

function addBooking(BookingItem bookingItem, string org, string emailAddress) returns Booking|error {

    string bookingId = uuid:createType1AsString();
    time:Utc currentUtc = time:utcNow();
    time:Civil currentTime = time:utcToCivil(currentUtc);
    string timeString = civilToIso8601(currentTime);

    if (useDB) {
        return error("Not implemented");
    } else {
        bookingRecords.put({id: bookingId, org: org, emailAddress: emailAddress, createdAt: timeString, ...bookingItem});
        Booking booking = <Booking>bookingRecords[org, bookingId];
        return booking;
    }
}

function getBookingByIdAndOrg(string org, string bookingId) returns Booking|()|error {

    if (useDB) {
        // return dbGetPetByOwnerAndPetId(owner, petId);
        return ();
    } else {
        Booking? booking = bookingRecords[org, bookingId];
        if booking is () {
            return ();
        }
        return booking;
    }
}

function updateBookingById(string org, string bookingId, BookingItem updatedBookingItem) returns Booking|()|error {

    if (useDB) {
        return ();

    } else {
        Booking? oldeBookingRecord = bookingRecords[org, bookingId];
        if oldeBookingRecord is () {
            return ();
        }
        bookingRecords.put({
            id: bookingId,
            org: org,
            emailAddress: oldeBookingRecord.emailAddress,
            createdAt: oldeBookingRecord.createdAt,
            ...updatedBookingItem
        });
        Booking? booking = bookingRecords[org, bookingId];
        return booking;
    }
}

function deleteBookingById(string org, string bookingId) returns string|()|error {

    if (useDB) {
        // return dbDeletePetById(owner, petId);
        return ();
    } else {
        Booking? bookingRecord = bookingRecords[org, bookingId];
        if bookingRecord is () {
            return ();
        }
        _ = bookingRecords.remove([org, bookingId]);
        return "Booking deleted successfully";
    }
}

// function updateSettings(SettingsRecord settingsRecord) returns string|error {

//     if (useDB) {
//         string|error updatedResult = dbUpdateSettingsByOwner(settingsRecord);
//         if updatedResult is error {
//             return updatedResult;
//         }

//     } else {
//         settingsRecords.put(settingsRecord);
//     }

//     return "Settings updated successfully";
// }

// function getSettings(string owner, string email) returns Settings|error {

//     if (useDB) {

//         Settings|()|error settings = dbGetOwnerSettings(owner);

//         if settings is error {
//             return settings;
//         } else if settings is () {
//             Settings newSettings = getDefaultSettings(email);
//             SettingsRecord settingsRecord = {owner: owner, ...newSettings};
//             string|error updatedResult = dbUpdateSettingsByOwner(settingsRecord);
//             if updatedResult is error {
//                 return updatedResult;
//             }
//             return newSettings;
//         } else {
//             return settings;
//         }

//     } else {
//         SettingsRecord? settingsRecord = settingsRecords[owner];

//         if settingsRecord is () {
//             Settings settings = getDefaultSettings(email);
//             settingsRecords.put({owner: owner, ...settings});
//             return settings;
//         }
//         return {notifications: settingsRecord.notifications};
//     }

// }

// function getSettingsByOwner(string owner) returns Settings|() {

//     if (useDB) {

//         Settings|()|error settings = dbGetOwnerSettings(owner);

//         if settings is Settings {
//             return settings;
//         } else {
//             return ();
//         }

//     } else {
//         SettingsRecord? settingsRecord = settingsRecords[owner];

//         if settingsRecord is () {
//             return ();
//         }

//         return {notifications: settingsRecord.notifications};
//     }

// }

// function getAvailableAlerts(string nextDay) returns PetAlert[] {

//     PetAlert[] petAlerts = [];
//     string[] petIds = getPetIdsForEnabledAlerts(nextDay);

//     foreach var petId in petIds {
//         Pet|() pet = getPetById(petId);

//         if pet != () {
//             Settings|() settings = getSettingsByOwner(pet.owner);

//             if settings != () && settings.notifications.enabled && settings.notifications.emailAddress != "" {

//                 string email = <string>settings.notifications.emailAddress;
//                 Vaccination[] selectedVaccinations = [];
//                 Vaccination[] vaccinations = <Vaccination[]>pet.vaccinations;

//                 foreach var vac in vaccinations {
//                     if vac.nextVaccinationDate == nextDay && vac.enableAlerts == true {
//                         selectedVaccinations.push(vac);
//                     }
//                 }

//                 pet.vaccinations = selectedVaccinations;
//                 PetAlert petAlert = {...pet, emailAddress: email};
//                 petAlerts.push(petAlert);
//             }
//         }
//     }

//     return petAlerts;
// }

// function getPetIdsForEnabledAlerts(string nextDay) returns string[] {

//     string[] petIds = [];
//     if (useDB) {
//         string[]|error dbGetPetIdsForEnabledAlertsResult = dbGetPetIdsForEnabledAlerts(nextDay);

//         if dbGetPetIdsForEnabledAlertsResult is error {
//             return petIds;
//         } else {
//             return <string[]>dbGetPetIdsForEnabledAlertsResult;
//         }

//     } else {
//         petRecords.forEach(function(PetRecord petRecord) {

//             if petRecord.vaccinations is () {
//                 return;
//             }

//             Vaccination[] vaccinations = <Vaccination[]>petRecord.vaccinations;
//             vaccinations.forEach(function(Vaccination vaccination) {

//                 if vaccination.nextVaccinationDate == nextDay && <boolean>vaccination.enableAlerts {
//                     petIds.push(petRecord.id);
//                 }
//             });
//         });
//     }

//     return petIds;
// }


# Converts time:Civil time to string 20220712T054235Z
#
# + time - time:Civil time record.
# + return - Converted ISO 8601 string.
function civilToIso8601(time:Civil time) returns string {
    string year = time.year.toString();
    string month = time.month < 10 ? string `0${time.month}` : time.month.toString();
    string day = time.day < 10 ? string `0${time.day}` : time.day.toString();
    string hour = time.hour < 10 ? string `0${time.hour}` : time.hour.toString();
    string minute = time.minute < 10 ? string `0${time.minute}` : time.minute.toString();

    decimal? seconds = time.second;
    string second = seconds is () ? "00" : (seconds < 10.0d ? string `0${seconds}` : seconds.toString());

    time:ZoneOffset? zoneOffset = time.utcOffset;
    string timeZone = "Z";
    if zoneOffset is time:ZoneOffset {
        if zoneOffset.hours == 0 && zoneOffset.minutes == 0 {
            timeZone = "Z";
        } else {
            string hours = zoneOffset.hours.abs() < 10 ? string `0${zoneOffset.hours.abs()}` : zoneOffset.hours.abs().toString();
            string minutes = zoneOffset.minutes.abs() < 10 ? string `0${zoneOffset.minutes.abs()}` : zoneOffset.minutes.abs().toString();
            timeZone = zoneOffset.hours < 0 ? string `-${hours}${minutes}` : string `+${hours}${minutes}`;
        }
    }
    return string `${year}${month}${day}T${hour}${minute}${second}${timeZone}`;
}

// function getDefaultSettings(string email) returns Settings {

//     boolean enabled = false;
//     if email != "" {
//         enabled = true;
//     }

//     Settings settings = {notifications: {enabled: enabled, emailAddress: email}};
//     return settings;
// }

// function enableAlerts(string email, string owner, Pet pet) {

//     Vaccination[]? vaccinations = pet.vaccinations;

//     if vaccinations is () {
//         return;
//     }

//     foreach var vac in vaccinations {

//         if vac.enableAlerts == true {
//             Settings|error settings = getSettings(owner, email);
//             if settings is error {
//                 log:printError("Error getting settings", 'error = settings);
//             }
//             break;
//         }
//     }

// }

function getThumbnailKey(string org, string doctorId) returns string {
    return org + "-" + doctorId;
}
