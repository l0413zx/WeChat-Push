const fs = require('fs');
const axios = require('axios');


// 1. 获取时间
const formatWeek = (week) => {
    switch (week) {
        case 1:
            return '星期一'; break;
        case 2:
            return '星期二'; break;
        case 3:
            return '星期三'; break;
        case 4:
            return '星期四'; break;
        case 5:
            return '星期五'; break;
        case 6:
            return '星期六'; break;
        case 0:
            return '星期日'; break;
        default:
            break;
    }
}

const getDate = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const week = new Date().getDay();

    return `${year}年${month}月${day}日  ${formatWeek(week)}`;
}


// 2. 获取天气
const getWeather = (params) => {
    return new Promise((resolve, reject) => {

        const appid = params.wea_app_id;
        const appsecret = params.wea_app_secret;
        const cityid = params.wea_city_id;

        axios.get(`http://v1.yiketianqi.com/free/day?appid=${appid}&appsecret=${appsecret}&unescape=1&cityid=${cityid}`)
            .then(res => {
                const { data } = res;
                resolve({
                    wea: data.wea,
                    low: data.tem_night,
                    high: data.tem_day
                })
            })
            .catch(err => {
                reject(err);
            })
    })
}


// 3. 获取恋爱天数
const getLoveDays = () => {
    const startDate = new Date('2023-11-17');
    const currentUTCTime = new Date().toISOString();
    const beijingTime = new Date(new Date(currentUTCTime).getTime() + (8 * 60 * 60 * 1000)); // 将UTC时间转换为北京时间

    const oneDayMilliseconds = 24 * 60 * 60 * 1000;
    const daysDiff = Math.floor((beijingTime - startDate) / oneDayMilliseconds);

    return daysDiff.toString();
}


// 土味情话
const getLoveWords = () => {
    return new Promise((resolve, reject) => {

        const apiKey = '5381b2d3e4bf91210240a49e6b21264a';

        axios.get(`https://apis.tianapi.com/saylove/index?key=${apiKey}`)
            .then(res => {
                const { data: { result } } = res;
                const txt = result.content
                resolve(txt)
            })
            .catch(err => {
                reject(err);
            })
    })
}


module.exports = {
    getDate,
    getWeather,
    getLoveDays,
    getLoveWords
}
