// types.ts
export interface UserAuth {
    status: string;
    data:   Data;
}

export interface Data {
    token: string;
    user:  User;
}

export interface User {
    id:           number;
    nombre:       string;
    correo:       string;
    cargo:        string;
    departamento: string;
    oficina:      string;
    estadoCuenta: string;
}

export interface ListResponse {
    status: string;
    data:   Datum[];
    total:  number;
}

export interface Datum {
    id:           number;
    nombre:       string;
    correo:       string;
    cargo:        string;
    departamento: string;
    oficina:      Oficina;
    estadoCuenta: EstadoCuenta;
}

export enum EstadoCuenta {
    Activada = "Activada",
    Desactivada = "Desactivada",
}

export enum Oficina {
    CulqiOffice = "Culqi Office",
}
