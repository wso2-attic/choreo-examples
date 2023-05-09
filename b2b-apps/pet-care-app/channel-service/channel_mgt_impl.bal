import ballerinax/java.jdbc;
import ballerinax/mysql.driver as _;
import ballerina/uuid;
import ballerina/sql;
import ballerina/log;
import ballerinax/mysql;
import ballerina/time;
import ballerina/http;

configurable string dbHost = "localhost";
configurable string dbUsername = "admin";
configurable string dbPassword = "admin";
configurable string dbDatabase = "CHANNEL_DB";
configurable int dbPort = 3306;
configurable string emailService = "localhost:9091";

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

function getDoctorById(string doctorId) returns Doctor|()|error {

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
            if doc.id == doctorId {
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

function getThumbnailKey(string org, string doctorId) returns string {
    return org + "-" + doctorId;
}

function sendEmail(Booking booking, Doctor doctor) returns error? {

    http:Client httpClient = check new (emailService);

    string emailSubject = "[Pet Care App][Booking Confirmation] Your booking is confirmed.";
    string emailAddress = booking.emailAddress;

    Property[] properties = [
        addProperty("emailAddress", emailAddress),
        addProperty("bookingId", booking.id),
        addProperty("appointmentDate", booking.date),
        addProperty("appointmentTimeSlot", booking.sessionStartTime + " - " + booking.sessionEndTime),
        addProperty("appointmentNo", booking.appointmentNumber.toString()),
        addProperty("appointmentFee", "$30"),
        addProperty("petName", booking.petName),
        addProperty("petType", booking.petType),
        addProperty("petDoB", booking.petDoB),
        addProperty("doctorName", doctor.name ),
        addProperty("doctorSpecialty", doctor.specialty),
        addProperty("hospitalName", "Hospital Name"),
        addProperty("hospitalAddress", "Hospital Address"),
        addProperty("hospitalTelephone", "Hospital Telephone")
    ];

    EmailContent emailContent = {
        emailType: BOOKING_CONFIRMED,
        receipient: emailAddress,
        emailSubject: emailSubject,
        properties: properties
    };

    http:Response response = check httpClient->/messages.post({
        emailContent
    });

    if (response.statusCode == 200) {
        return;
    } else {
        return error("Error while sending email, " + response.reasonPhrase);
    }
}

function addProperty(string name, string value) returns Property {
    Property prop = {name: name, value: value};
    return prop;
}
