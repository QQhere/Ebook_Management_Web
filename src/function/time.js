exports.time_dmy = (time) => {
    if (!time) return;
    let date = new Date(Date.UTC(time[0], time[1] - 1, time[2], time[3], time[4], time[5]));
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let formattedDate = date.toLocaleDateString('vi-VN', options);
    return formattedDate;
}

exports.time_hms_dmy = (time) => {
    if (!time) return;
    let date = new Date(Date.UTC(time[0], time[1] - 1, time[2], time[3], time[4], time[5]));
    let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'UTC' };
    let formattedDate = new Intl.DateTimeFormat('vi-VN', options).format(date);
    return formattedDate;
}