import { API_WS_ROOT } from '../constants'
import actioncable from 'actioncable'

const cable = actioncable.createConsumer(API_WS_ROOT)

export default cable