const express = require('express');

const app = express();

app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const districtRoutes = require('./routes/districtRoutes')
const formRoutes = require('./routes/formRoutes')
const stateRoute = require('./routes/stateRoute')
const villageRoutes = require('./routes/villageRoutes')
const assignLocation = require('./routes/locationAssignmentRoutes')

app.use('/api/user', userRoutes)

app.use('/api/district', districtRoutes)

app.use('/api/form', formRoutes)
app.use('/api/state', stateRoute)
app.use('/api/village', villageRoutes)
app.use('/api/location', assignLocation)

app.use('/api',(req,res)=> res.send('API is On'))

// require('./config/connectDB')
app.listen(4000,()=> {
    console.log('server is running on 4000')
})