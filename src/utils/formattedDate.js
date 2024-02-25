const date = new Date();
let day = date.getDate();
let month = date.getMonth() +  1;
let year = date.getFullYear();

// Ensure day and month are two digits
day = day <  10 ? '0' + day : day;
month = month <  10 ? '0' + month : month;

export const formattedDate = `${month}/${day}/${year}`;