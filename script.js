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
    
    let arr = processStringConventional(inputFieldValue)
    const totalTime = getTotalTimeDifference(arr);
    console.log(`Total time: ${totalTime.hours} hours and ${totalTime.minutes} minutes.`);
    const output = `Total time: ${totalTime.hours} hours and ${totalTime.minutes} minutes.`
    document.getElementById("op").innerHTML = output
    return false
}
// calculate('10:15 1:15 2:00 7:00')

// const timeArray = ['12:30', '13:00', '14:30', '15:00'];

