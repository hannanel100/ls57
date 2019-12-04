const dalFunc = require('./dal');
const fetch = require('node-fetch');
const dal = dalFunc();
const TABLE_NAME = 'phones';
function getPhoneOtp(phone, callback) {
    const query = `SELECT id FROM ${TABLE_NAME} WHERE phone LIKE '${phone}'`;
    dal.readOne(query, (e, res) => {
        if (e) {
            callback(e);
        } else {
            if (res.length > 0) {
                const otp = Math.floor(Math.random() * 999999);
                const resData = {
                    'id': res[0].id,
                    'otp': otp
                }
                const query = `UPDATE ${TABLE_NAME} SET otp=${resData.otp} WHERE id LIKE '${resData.id}'`
                dal.updateOtp(query, (e, res) => {
                    if (e) {
                        callback(e);
                    }
                    else {
                        const xml = `<Inforu>
                        <User>
                        <Username>kobieshka</Username>
                        <Password>qqQQ11!!</Password>
                        </User>
                        <Content Type="sms">
                        <Message>${resData.otp}</Message>
                        </Content>
                        <Recipients>
                        <PhoneNumber>0524500023</PhoneNumber>
                        </Recipients>
                        <Settings>
                        <Sender>0524500023</Sender>
                        </Settings>
                       </Inforu>
                       `;
                        fetch(`http://uapi.mesergo.co.il/SendMessageXml.ashx?InforuXML=${xml}`,
                            {
                                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                mode: 'cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: {
                                    'Content-Type': 'text/xml'
                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                redirect: 'follow', // manual, *follow, error
                                referrer: 'no-referrer', // no-referrer, *client
                                // body data type must match "Content-Type" header
                            },
                        )
                        callback(null, res);
                    }
                })
            }
            else {
                callback("no id found");
            }
        }
    })

}
function getPhoneDetails(otpPhone, callback) {
    const otp = otpPhone.split(';')[0];
    const phone = otpPhone.split(';')[1];
    const query = `SELECT * FROM ${TABLE_NAME} WHERE otp  LIKE ${otp}  AND phone LIKE '${phone}'`
    dal.readOne(query, (e, res) => {
        if (e) {
            callback(e);
        } else {
            callback(null, res);
        }
    })

}

module.exports.getPhoneOtp = getPhoneOtp;
module.exports.getPhoneDetails = getPhoneDetails;