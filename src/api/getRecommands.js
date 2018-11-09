import axios from 'axios'

function getRecommands () {
  const pagestart = arguments[0] ? arguments[0] : 0
  const limit = arguments[1] ? arguments[1] : 10
  const url = `https://laravel.boka.cn/api/retailer/myReferrals?pagestart=${pagestart}&limit=${limit}`
  return axios.get(url)
}

export default getRecommands
