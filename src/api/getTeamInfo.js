import Axios from 'axios'
import Env from 'env'

function getTeamInfo (id) {
  return Axios({
    url: `${Env.BokaApi}/api/team/info`,
    method: 'post',
    data: {
      id: id
    }
  })
}

export default getTeamInfo
