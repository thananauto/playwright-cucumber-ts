import * as dotenv from 'dotenv'

const getEnv = () => {
    dotenv.config({
        override: true,
        path: `src/environment/.env.${process.env.ENV}`,
    })
}

export { getEnv }
