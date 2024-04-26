import FetchAPIService from './FetchAPIService.js'

export default class TableTopService {
  static async GetAllGames () {
    return FetchAPIService.get('../api/v2/game').then((data) => {
      return data
    })
  }

  static async GetGameById (id) {
    return FetchAPIService.get('../api/v2/game/' + id).then((data) => {
      return data
    })
  }

  static async AddGame (game) {
    return FetchAPIService.put('../api/v2/add', game).then((data) => {
      return data
    })
  }

  static async DeleteGame (id) {
    return FetchAPIService.delete('../api/v2/delete/' + id).then((data) => {
      return data
    })
  }
}
