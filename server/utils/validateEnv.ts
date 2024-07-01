import {cleanEnv} from 'envalid'
import {email, port, str} from 'envalid/dist/validators'
export default cleanEnv(process.env,{
    MONGO_URI : str(),
    PORT : port(),
    NODE_ENV : str(),
    JWT_SECRET : str(),
    SERVICE_MAIL : email(),
    SERVICE_PASSWORD : str(),
    CORS_ORIGIN_PRODUCTION : str(),
    CORS_ORIGIN_DEV : str(),
    ACCESS_TOKEN_EXPIRY : str(),
    REFRESH_TOKEN_EXPIRY : str(),
})