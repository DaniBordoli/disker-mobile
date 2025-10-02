### 4) Set Password — Step 4
- __Base URL__: `https://staging.supra.social`
- __Endpoint__: `PATCH /api/v1/talents/users/:id`
- __Descripción__: Define la contraseña del usuario.

Request

```json
{
  "set_password": {
    "password": "password_123"
  }
}
```

Response (ejemplo)

```json
{
  "meta": { "message": "Password set successfully" },
  "data": {
    "user": {
      "id": 26,
      "email": "example@email.com",
      "signup_steps": {
        "step_confirmation": true,
        "step_password": true,
        "step_set_names": true,
        "step_personal_data": false
      }
    }
  }
}
```

Errores

- Status esperado: `422 Unprocessable Entity` (validación)

```json
{
  "meta": { "message": "Validation failed" },
  "errors": {
    "set_password": ["password is too short"]
  }
}
```

Uso en código

- Archivo: `src/services/api.ts`
- Función: `setUserPassword(userId, { set_password: { password } })`

### 5) Set Personal Data — Step 5
- __Base URL__: `https://staging.supra.social`
- __Endpoint__: `PATCH /api/v1/talents/users/:id`
- __Descripción__: Guarda datos personales del usuario.

Request

```json
{
  "set_personal_data": {
    "country": "Argentina",
    "city_uid": 1,
    "birthdate": "19-10-2011",
    "gender": "male"
  }
}
```

Response (ejemplo)

```json
{
  "meta": { "message": "Personal data saved successfully" },
  "data": {
    "user": {
      "id": 26,
      "email": "example@email.com",
      "signup_steps": {
        "step_confirmation": true,
        "step_password": true,
        "step_set_names": true,
        "step_personal_data": true
      }
    }
  }
}
```

Errores

- Status esperado: `422 Unprocessable Entity` (validación)

```json
{
  "meta": { "message": "Validation failed" },
  "errors": {
    "set_personal_data": [
      "birthdate is invalid"
    ]
  }
}
```

Uso en código

- Archivo: `src/services/api.ts`
- Función: `setPersonalData(userId, { set_personal_data: { country, city_uid, birthdate, gender } })`

# 📱 Disker Mobile — Guía Rápida

> Este documento lista únicamente las APIs implementadas en la app. Información de ambiente/ejecución fue removida a pedido.

---

## 📚 APIs implementadas

### 1) Register — Step 1
- __Base URL__: `https://staging.supra.social`
- __Endpoint__: `POST /api/v1/talents/users`
- __Descripción__: Crea un usuario talent y envía correo de confirmación.

Request

```json
{
  "user": {
    "email": "example@email.com"
  }
}
```

Response (ejemplo)

```json
{
  "meta": {
    "message": "Account created successfully. Please check your email to confirm your account."
  },
  "data": {
    "user": {
      "id": 26,
      "email": "example@email.com",
      "name": null,
      "role": "talent",
      "confirmed_at": null,
      "confirmation_sent_at": "2025-08-13T01:44:14-03:00",
      "personal_data": null,
      "created_at": "2025-08-13T01:44:14-03:00",
      "updated_at": "2025-08-13T01:44:14-03:00",
      "signup_steps": {
        "step_confirmation": false,
        "step_password": false,
        "step_set_names": false,
        "step_personal_data": false
      }
    }
  }
}
```

Errores

- Status esperado: `422 Unprocessable Entity` (validación)

```json
{
  "meta": {
    "message": "Validation failed"
  },
  "errors": {
    "email": [
      "has already been taken"
    ]
  }
}
```

Uso en código

- Archivo: `src/services/api.ts`
- Función: `registerUserStep1({ user: { email } })`

```ts
import { registerUserStep1 } from "../src/services/api";

async function doRegister(email: string) {
  try {
    const res = await registerUserStep1({ user: { email } });
    console.log(res.meta?.message);
  } catch (e: any) {
    console.warn(e.message, e.status, e.body);
  }
}
```

Notas

- El email mostrado en ejemplos es solo de muestra. Usar el email real del usuario.
- Configuración base: `src/config/index.ts` (`BASE_URL`).
- Tipos TS: `src/types/api.ts`.

### 2) Confirm Email — Step 2
- __Base URL__: `https://staging.supra.social`
- __Endpoint__: `GET /api/v1/talents/users/confirmation?confirmation_token=...`
- __Descripción__: Confirma el email del usuario con el código recibido por correo.

Request (query)

```txt
confirmation_token=ABC123
```

Response (ejemplo)

```json
{
  "meta": { "message": "Email confirmed successfully" },
  "data": {
    "access_token": "ACCESS_TOKEN_EXAMPLE",
    "refresh_token": "REFRESH_TOKEN_EXAMPLE",
    "user": {
      "id": 26,
      "email": "example@email.com",
      "confirmed_at": "2025-08-13T01:49:00-03:00",
      "signup_steps": {
        "step_confirmation": true,
        "step_password": false,
        "step_set_names": false,
        "step_personal_data": false
      }
    }
  }
}
```

Errores

- Status típico: `400 Bad Request` o `422 Unprocessable Entity` (token inválido o expirado)

Uso en código

- Archivo: `src/services/api.ts`
- Función: `confirmEmail(confirmationToken)`

### 3) Set Names — Step 3
- __Base URL__: `https://staging.supra.social`
- __Endpoint__: `PATCH /api/v1/talents/users/:id`
- __Descripción__: Actualiza nombre y apellido del usuario.

Request

```json
{
  "set_names": {
    "name": "John",
    "lastname": "Deer"
  }
}
```

Response (ejemplo)

```json
{
  "meta": {
    "message": "Names updated successfully"
  },
  "data": {
    "user": {
      "id": 26,
      "email": "example@email.com",
      "name": "John",
      "lastname": "Deer",
      "role": "talent",
      "confirmed_at": null,
      "confirmation_sent_at": "2025-08-13T01:44:14-03:00",
      "personal_data": null,
      "created_at": "2025-08-13T01:44:14-03:00",
      "updated_at": "2025-08-13T01:55:10-03:00",
      "signup_steps": {
        "step_confirmation": false,
        "step_password": false,
        "step_set_names": true,
        "step_personal_data": false
      }
    }
  }
}
```

Errores

- Status esperado: `422 Unprocessable Entity` (validación)

```json
{
  "meta": { "message": "Validation failed" },
  "errors": {
    "set_names": ["name can't be blank"]
  }
}
```

Uso en código

- Archivo: `src/services/api.ts`
- Función: `setUserNames(userId, { set_names: { name, lastname } })`
