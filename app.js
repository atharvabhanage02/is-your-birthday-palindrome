function reverseStr(str) {
    var splitChars = str.split('');
    var reverseChars = splitChars.reverse();
    var reversedStr = reverseChars.join('');
    return reversedStr;
}

function checkIfPalindrome(str) {
    var reversed = reverseStr(str);
    return str == reversed;
}

function convertDateToStr(date) {
    var dateStr = { day: '', month: '', year: '' };
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;

}

function getAllFormats(date) {
    var dateStr = convertDateToStr(date);
    // DD-MM-YYYY
    // MM-DD-YYYY
    // YYYY-MM-DD
    // DD-MM-YY
    // MM-DD-YY
    // YY-MM-DD
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeForAll(date) {
    var allFormats = getAllFormats(date);
    var flag = false;
    for (let index = 0; index < allFormats.length; index++) {
        if (checkIfPalindrome(allFormats[index])) {
            flag = true;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month == 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > daysInMonths[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindrome(date) {
    var count = 0;
    var nextDate = getNextDate(date);
    while (1) {
        count++;
        var isPalindrome = checkPalindromeForAll(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);

    }
    return [count, nextDate];
}
var inputDate = document.querySelector('#input-birthday');
var btnCheck = document.querySelector('#btn-check');
var outputElement = document.querySelector('#output');

function clickHandler(e) {
    var birthdayString = inputDate.value; // 2020-10-11

    if (birthdayString !== '') {
        var dateList = birthdayString.split('-'); // ['2020', '10', '11']

        var date = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        };

        var isPalindrome = checkPalindromeForAll(date);

        if (isPalindrome) {
            outputElement.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
        }
        else {
            var [count, nextDate] = getNextPalindrome(date);

            outputElement.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year},you missed it by ${count} days! 😐`;
        }
    }else{
        outputElement.innerText = "Please input your Birthday "
    }
}

btnCheck.addEventListener('click', clickHandler);

