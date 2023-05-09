type DoctorItem record {|
    string name;
    string gender;
    string registrationNumber;
    string specialty;
    string emailAddress;
    string dateOfBirth?;
    string address?;
    Availability[] availability;
|};

type Doctor record {|
    *DoctorItem;
    readonly string id;
    readonly string org;
    readonly string createdAt;
|};

type Thumbnail record {|
    string fileName;
    string content;
|};

type Availability record {|
    string date;
    TimeSlot[] timeSlots;
|};

type TimeSlot record {|
    string startTime;
    string endTime;
    int availableBookingCount;
|};

type BookingItem record {|
    string petOwnerName;
    string mobileNumber?;
    string doctorId;
    string petId;
    string petName;
    string petType;
    string petDoB;
    BookingStatus status;
    *Appointment;
|};

enum Status {
    CONFIRMED = "Confirmed",
    COMPLETED = "Completed"
}

type BookingStatus CONFIRMED|COMPLETED;

type Appointment record {|
    string date;
    string sessionStartTime;
    string sessionEndTime;
    int appointmentNumber;
|};

type Booking record {|
    *BookingItem;
    readonly string id;
    readonly string org;
    readonly string emailAddress;
    readonly string createdAt;
|};

type EmailContent record {|
    EmailType emailType;
    Property[] properties;
    string receipient;
    string emailSubject;
|};

type Property record {|
    string name;
    string value;
|};

enum EmailType {
    BOOKING_CONFIRMED = "Booking Confirmed"
}

