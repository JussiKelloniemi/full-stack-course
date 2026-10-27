import express from 'express'
import router from './routes/goalRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'
import { fileURLToPath } from 'url'
import path from 'path'

const port = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/goals', router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})