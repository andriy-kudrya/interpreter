interface User {
    name: string
    age: number
    cityId: string
}

interface UserValidation {
    status: string
}

interface City {
    name: string
}

export type {
    User,
    UserValidation,
    City,
}