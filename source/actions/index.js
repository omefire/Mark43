import { getNames } from '../scripts/resources/namesMockResource';

export const REQUEST_MATCHES = 'REQUEST_MATCHES';
export const RECEIVE_MATCHES = 'RECEIVE_MATCHES';


function requestMatches(stringToMatch) {
    return {
        type: REQUEST_MATCHES,
        stringToMatch
    }
}

function receiveMatches(stringToMatch, matches) {
    return {
        type: RECEIVE_MATCHES,
        stringToMatch,
        matches,
        receivedAt: Date.now()
    }
}

function fetchMatches(stringToMatch) {
    return dispatch => {
        dispatch(requestMatches(stringToMatch))
        getNames(stringToMatch, (matches) => {
            dispatch(receiveMatches(stringToMatch, matches))
        })
    }
}

let actions = {
    fetchMatches
}
export default actions;