const date = new Date();

// console.log(date.toLocaleString());
// console.log(date.getTime());

// const date2 = new Date("2022-09-25T09:46:00");
// console.log(date2.toLocaleString());
// console.log(date2.getTime());

// let days = date2.getTime() - (date.getTime() + 60000);
// date_diff = parseInt(days / (86400 * 1000));

// console.log(date_diff);

// const birthday2 = new Date();

// console.log(birthday2.toJSON().split("T")[0].slice(8, 10));

let tomorrow = new Date();
let test2 = tomorrow.setDate(tomorrow.getDate   () + 1);

let next_date = new Date(test2).toJSON().split("T")[0] + "T00:00:00";
console.log(next_date)
