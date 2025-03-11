import express from 'express'
import { convertURL, getUserURLs, redirectURL } from './urlshortenerController.js'

const urlRouter = express.Router()

urlRouter.get('/:username', getUserURLs)

urlRouter.post('/:username/convert', convertURL)

urlRouter.get('/:username/:slug', redirectURL)



export default urlRouter