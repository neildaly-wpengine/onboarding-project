import { RegistrationBody } from "../../../common/types";

export const registrationBody: RegistrationBody = {
    user: {
        email: 'test-user@mail.ie',
        firstName: 'Test',
        lastName: 'User',
        password: 'test',
        passwordConfirmation: 'test',
    }
}

export const successfulRegistrationResponse = {
    "status": "created",
    "user": {
        "id": 1,
        "email": "test-user@mail.ie",
        "password_digest": "",
        "created_at": "2020-06-29T09:49:48.548Z",
        "updated_at": "2020-06-29T09:49:48.548Z",
        "first_name": "Test",
        "last_name": "User",
        "initials_image_link": "https://eu.ui-avatars.com/api/?background=fff&color=000&name=Test+User"
    }
}
