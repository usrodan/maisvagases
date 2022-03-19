import Axios from '../../utils/axios'
import configs from '../../configs'

export default async function handler(req, res) {
  function removerAcentos(newStringComAcento) {
    var string = newStringComAcento
    var mapaAcentosHex = {
      a: /[\xE0-\xE6]/g,
      e: /[\xE8-\xEB]/g,
      i: /[\xEC-\xEF]/g,
      o: /[\xF2-\xF6]/g,
      u: /[\xF9-\xFC]/g,
      c: /\xE7/g,
      n: /\xF1/g
    }

    for (var letra in mapaAcentosHex) {
      var expressaoRegular = mapaAcentosHex[letra]
      string = string.replace(expressaoRegular, letra)
    }

    return string
  }

  const result = await Axios.get(
    `/items/${configs.sufix}_company?filter[title][eq]=${removerAcentos(
      req.body.name
    )}`
  )
  res.json(result.data.data ? result.data.data[0].id : 0)
}
