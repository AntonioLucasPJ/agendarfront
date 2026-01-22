export const mecanicos = [
    {
        id_mecanico: 1,
        name: 'Jose Matheus',
        specialty: "Mecanico",
        icon: 'M'
    },
    {
        id_mecanico: 2,
        name: 'Maria',
        specialty: 'Mecanica',
        icon: 'F'
    },
    {
        id_mecanico: 3,
        name: 'Fernanda',
        specialty: 'Mecanica',
        icon: 'F'
    },
    {
        id_mecanico: 4,
        name: 'Igor',
        specialty: 'Mecanico',
        icon: 'M'
    }
];
export const appointments = [
    {
        id_appointement: 1,
        service: 'Consulta',
        mecanico: 'Jose Matheus',
        specialty: "Mecanicos",
        broking_date: '2026-01-25',
        booking_hour: '08:30'
    },
    {
        id_appointement: 2,
        service: 'Consulta',
        mecanico: 'Maria',
        specialty: "Mecanicos",
        broking_date: '2026-01-25',
        booking_hour: '09:30'
    },
    {
        id_appointement: 3,
        service: 'Consulta',
        mecanico: 'Igor',
        specialty: "Mecanicos",
        broking_date: '2026-01-30',
        booking_hour: '10:30'
    },
]
export const mecanicos_services = [
    {
        id_service:1,
        description:'Consulta Simples',
        price:100
    },
    {
        id_service:2,
        description:"Consulta Detalhada",
        price:300
    },
    {
        id_service:3,
        description:"Pintura  e funilharia",
        price:500
    },
    {
        id_service:4,
        description:"Retifica Motor Parcial",
        price:5000
    }
]