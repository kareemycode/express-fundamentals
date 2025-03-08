import express from 'express'
import { convertURL, redirectURL } from './urlshortenerController.js'

const urlRouter = express.Router()

urlRouter.post('/convert', convertURL)

urlRouter.get('/:slug', redirectURL)

export default urlRouter