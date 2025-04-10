import axios from 'axios'

export const accessToken = async() => {
    const authToken = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
    return await axios({
        method: 'POST',
        url : 'https://zoom.us/oauth/token',
        headers: {
        'Authorization' : 'Basic ' + authToken,
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data :{
        'grant_type' : 'account_credentials',
        'account_id' : `${process.env.ACCOUNT_ID}`
        }
  }).then((result) => {
    console.log(`New token created at ${new Date()}`)
    return result.data.access_token
  })
  .catch((err) => {console.log(err)});
}