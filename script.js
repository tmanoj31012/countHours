const processStringConventional = (arr)=>{
    let b = arr.split(" ")
    console.log("b",b)
    let c = [b[0]]
    for(let i of b.slice(1)){
        let[ hr,min] = i.split(":")
        hr = Number(hr)+12
        min = Number(min)
        c.push([hr,min].join(":"))
        console.log(hr,min)
    }
    console.log("c",c)
    return c
}
function convertTo24HourFormat(timeString) {
    const times = timeString.split(' ');

    let hours24 = [];
    let isAfter12 = false;

    for (let i = 0; i < times.length; i++) {
        const [hours, minutes] = times[i].split(':').map(Number);

        if (i > 0 && hours < hours24[i - 1].hours) {
            // If current hours is less than the previous one,
            // it means we have moved to the next period (AM/PM).
            isAfter12 = true;
        }

        let adjustedHours = hours;

        if (isAfter12 && hours !== 12) {
            // It's noon
            adjustedHours += 12;
        } 
        else if (isAfter12==true && hours === 12) {
            adjustedHours = 0;
            isAfter12 = false
            // 00:00 AM
        }
        console.log(adjustedHours,minutes)
        hours24.push({ hours: adjustedHours, minutes: minutes });
    }

    const formattedTimes = hours24.map(time => {
        return time.hours.toString().padStart(2, '0') + ':' + time.minutes.toString().padStart(2, '0');
    });
    console.log(hours24)
    return formattedTimes.join(' ');
}


function getTimeDifference(time1, time2) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const date1 = new Date(0, 0, 0, hours1, minutes1);
    const date2 = new Date(0, 0, 0, hours2, minutes2);

    // Calculate the time difference in milliseconds
    const timeDifference = Math.abs(date2 - date1);

    // Convert the time difference to hours and minutes
    const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutesDifference = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));

    return { hours: hoursDifference, minutes: minutesDifference };
}

function getTotalTimeDifference(timeArray) {
    let totalHours = 0;
    let totalMinutes = 0;

    for (let i = 0; i < timeArray.length - 1; i+=2) {
        const time1 = timeArray[i];
        const time2 = timeArray[i + 1];

        const { hours, minutes } = getTimeDifference(time1, time2);

        totalHours += hours;
        totalMinutes += minutes;
    }

    // Convert excess minutes to hours
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;

    return { hours: totalHours, minutes: totalMinutes };
}

const calculate = (str) => {
    // event.preventDefault()
    console.log("Hello")
    let inputFieldValue = document.getElementById("t1").value 
    // let inputFieldValue = str
    
    // let arr = processStringConventional(inputFieldValue)
    let arr = convertTo24HourFormat(inputFieldValue).split(" ")
    const totalTime = getTotalTimeDifference(arr);
    console.log(`Total time: ${totalTime.hours} hours and ${totalTime.minutes} minutes.`);
    const output = `Total time: ${totalTime.hours} hours and ${totalTime.minutes} minutes.`
    document.getElementById("op").innerHTML = output
    return false
}
// calculate('10:15 1:15 2:00 7:00')

// const timeArray = ['12:30', '13:00', '14:30', '15:00'];

