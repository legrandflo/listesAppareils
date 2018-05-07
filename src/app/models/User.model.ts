//creation d'un model de données User qui correspond au formulaire user-list.component.ts

export class User {

    constructor(
                public firstName: string,
                public lastName: string,
                public email: string,
                public drinkPreference: string,
                public hobbies?: string[]
    )
    {}
}