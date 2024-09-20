import { io } from 'socket.io-client'
import { baseURL } from '../context/AuthContext'

export const socket = io("http://localhost:4000")