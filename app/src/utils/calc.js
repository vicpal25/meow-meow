
export function metersToMiles(meters) {
    return Math.round(meters * 0.000621371192);
}

export function mscTomph(msc) {
    return Math.round(msc * 3600 / 1610.3 * 1000) / 1000;
}

export function secondsToHours(seconds) {
    return Math.floor(seconds / 60);
}

export function converDate(date) {
    var timestamp = new Date(date);
    return timestamp.toLocaleDateString();
}