
import { REQUEST_MATCHES, RECEIVE_MATCHES } from '../actions';

export default function reducer(state = { stringToMatch: '', isFetchingMatches: false, matches: [] }, action) {
    switch (action.type) {
        case REQUEST_MATCHES:
            return Object.assign({}, state, {
                stringToMatch: action.stringToMatch,
                isFetchingMatches: true
            });
        case RECEIVE_MATCHES:
            return Object.assign({}, state, {
                stringToMatch: action.stringToMatch,
                isFetchingMatches: false,
                matches: action.matches,
                receivedAt: action.receivedAt
            });
        default:
            return state;
    }
}