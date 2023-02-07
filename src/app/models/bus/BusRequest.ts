export interface BusRequest {
    uuid: string;
    busNumber: string;
    mileage: string;
    manufactureYear: string;
    registrationNumber: string;
    firstRegistrationDate: string | null;
    brand: string;
    model: string;
    VIN: string;
    maximumTotalMass: string;
    deadWeightLoad: string;
    engineSize: string;
    numberOfSeating: string;
    numberOfStandingRoom: string;
    insuranceExpiryDate: string | null;
    serviceExpiryDate: string | null;
}