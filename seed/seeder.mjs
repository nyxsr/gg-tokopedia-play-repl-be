import {execSync} from 'child_process'
import "dotenv/config";


try {
    const databaseName = 'tokopedia-play-clone';
    execSync(`mongorestore ${process.env.MONGO_URL} --drop ${process.cwd()}/seed/datas/tokopedia-play-clone`)
    console.log('Database telah berhasil dilakukan seeding!')
} catch (error) {
    console.log('Database gagal dilakukan seeding!');
    console.error(error)
}