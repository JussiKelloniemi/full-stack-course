import express from 'express'
import colors from 'colors'
// import course from './routes/courseRoutes.js'
import assignment from './routes/assignmentRoutes.js'
import user from './routes/userRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import { fileURLToPath } from 'url'
import path from 'path'

const port = process.env.PORT || 5000

connectDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/assignments', assignment)
// app.use('/api/courses', course)
app.use('/api/users', user)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('/{*splat}', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend/build/index.html')))
} else {
    app.get('/', (req ,res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})