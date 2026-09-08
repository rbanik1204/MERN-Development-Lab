const hour_tens = document.querySelector(".hours-tens-hand")
const hour_units = document.querySelector(".hours-units-hand")
const minute_tens = document.querySelector(".minutes-tens-hand")
const minute_units = document.querySelector(".minutes-units-hand")
const second_tens = document.querySelector(".seconds-tens-hand")
const second_units = document.querySelector(".seconds-units-hand")


function time() {
    let date = new Date();
    let seconds_ten = Math.floor(date.getSeconds() / 10)
    let seconds_unit = date.getSeconds() % 10

    let hours_ten = Math.floor(date.getHours() / 10)
    let hours_unit = date.getHours() % 10

    let minutes_ten = Math.floor(date.getMinutes() / 10);
    let minutes_unit = date.getMinutes() % 10

    second_tens.children[0].innerText = seconds_ten;
    second_tens.children[1].innerText = seconds_ten;
    second_units.children[0].innerText = seconds_unit;
    second_units.children[1].innerText = seconds_unit;

    minute_tens.children[0].innerText = minutes_ten;
    minute_tens.children[1].innerText = minutes_ten;

    minute_units.children[0].innerText = minutes_unit;
    minute_units.children[1].innerText = minutes_unit;
    hour_tens.children[0].innerText = hours_ten;
    hour_tens.children[1].innerText = hours_ten;
    hour_units.children[0].innerText = hours_unit;
    hour_units.children[1].innerText = hours_unit;
}
const t_id = setInterval(time, 1000);

// console.log(hours_ten,hours_unit," ",minutes_ten,minutes_unit," ",seconds_ten,seconds_unit)

