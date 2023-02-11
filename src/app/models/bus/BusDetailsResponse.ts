import { UserBusResponse } from "../user/UserBusResponse";

export interface BusDetailsResponse {
    uuid: string;
    busNumber: string;
    mileage: string;
    manufactureYear: string;
    registrationNumber: string;
    firstRegistrationDate: string;
    brand: string;
    model: string;
    vin: string;
    maximumTotalMass: string;
    deadWeightLoad: string;
    engineSize: string;
    numberOfSeating: string;
    numberOfStandingRoom: string;
    insuranceExpiryDate: string;
    serviceExpiryDate: string;
    busStatus: string;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    users: Array<UserBusResponse>;
}