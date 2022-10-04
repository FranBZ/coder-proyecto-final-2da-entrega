import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { MONGO_USER, 
        MONGO_PASS, 
        type,
        project_id,
        private_key_id,
        private_key,
        client_email,
        client_id,
        auth_uri,
        token_uri,
        auth_provider_x509_cert_url,
        client_x509_cert_url 
    } = process.env

export const dbsConfig = {
    fileSystem: {
        pathCart: path.join(__dirname, './database/cart.txt'),
        pathProduct: path.join(__dirname, './database/products.txt')
    },
    mongodbAtlas: {
        cnxStr: `mongodb+srv://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}@cluster0.c94v8ws.mongodb.net/ecommerce`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        type: type,
        project_id: project_id,
        private_key_id: private_key_id,
        private_key: private_key,
        client_email: client_email,
        client_id: client_id,
        auth_uri: auth_uri,
        token_uri: token_uri,
        auth_provider_x509_cert_url: auth_provider_x509_cert_url,
        client_x509_cert_url: client_x509_cert_url
    }
}