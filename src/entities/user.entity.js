export function UserEsquema(  
  name, lastname, email, password) {
    return [
      {
        name: {
          value: name.trim().toUpperCase(),
          type: "string",
          empty: false
        },
        lastname: {
            value: name.trim().toUpperCase(),
            type: "string",
            empty: false
          },
        email: {
          value: email.trim().toLowerCase(),
          type: "email",
          empty: false,
        },
        password: {
          value: password.trim(),
          type: "password"
        }
      }
    ];
  }