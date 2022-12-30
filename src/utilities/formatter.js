export function formatNumberWithCommas(value, decimalPlaces) {
    let nextValue = parseFloat(value.toString().replace(/[^0-9.]+/g, '')) || 0;

    if (typeof decimalPlaces === 'number' && decimalPlaces > 0) {
        const multiplier = Math.pow(10, decimalPlaces);
        nextValue = (Math.round(nextValue * multiplier) / multiplier).toFixed(decimalPlaces).toString();
    } else {
        nextValue = Math.round(nextValue).toString();
    }

    nextValue = nextValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return nextValue;
}

export function formatISOMonthDayYear(value) {
    // Accepts ISO date as input
    const fullDate = new Date(value);
    const month = ('0' + (fullDate.getMonth() + 1)).slice(-2);
    const date = ('0' + fullDate.getDate()).slice(-2);
    const year = fullDate.getFullYear();

    return `${month}/${date}/${year}`;
}
