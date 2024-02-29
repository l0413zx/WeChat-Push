const { params } = require('./config');
const { getToken } = require('./getToken');
const { sendMessage } = require('./sendMessage');
const { getDate, getWeather, getLoveDays,getLoveWords } = require('./utils');


const start = async () => {
    let access_token = await getToken(params);
    let { wea, low, high } = await getWeather(params);
    let loveDays = getLoveDays();

    // let txt = await getLoveWords()

    const data = {
        today: { value: getDate() },
        city: { value: '庐阳区' },
        wea: { value: wea },
        low: { value: low },
        high: { value: high },
        days: { value: loveDays },
        txt: {value: '1111'},
    }

    sendMessage({
        access_token,
        ...params,
        data
    })
        .then(res => {
            if (res.data && res.data.errcode) {
                console.log('发送失败', res.data);
                return;
            }
            console.log('发送成功 - 请在微信上查看对应消息')
        })
        .catch(err => {
            console.log('发送失败', err);
        })
}

start();

