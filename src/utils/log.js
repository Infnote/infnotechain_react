import Prefix from 'loglevel-message-prefix'
import Level from 'loglevel'

export const log = Prefix(Level)
log.setLevel('TRACE')