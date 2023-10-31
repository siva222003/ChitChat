import {cleanEnv} from 'envalid'
import {port, str} from 'envalid/dist/validators'
export default cleanEnv(process.env,{
    MONGO_URI : str(),
    PORT : port(),
    NODE_ENV : str(),
    JWT_SECRET : str()
})