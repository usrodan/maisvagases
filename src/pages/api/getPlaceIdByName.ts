import Axios from '../../utils/axios'
import configs from '../../configs'

export default async function handler(req, res) {
  const result = await Axios.get(
    `/items/${configs.sufix}_places?filter[title][eq]=${req.body.name}`
  )
  res.json(result.data.data ? result.data.data[0].id : 0)
}
