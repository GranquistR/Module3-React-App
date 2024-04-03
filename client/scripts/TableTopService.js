import FetchAPIService from './FetchAPIService.js'

export default class TableTopService {
  static async GetAllGames () {
    return FetchAPIService.get('../api/game').then((data) => {
      return data
    })
  }

  static async GetGameById (id) {
    return FetchAPIService.get('../api/game/' + id).then((data) => {
      return data
    })
  }

  static async AddGame (game) {
    return FetchAPIService.put('../api/add', game).then((data) => {
      return data
    })
  }

  static async DeleteGame (id) {
    return FetchAPIService.delete('../api/delete/' + id).then((data) => {
      return data
    })
  }
}
