import appConfig from 'configs/app.config'
import ApiService from './ApiService'
const axios = require('axios')

export async function apiGetUSP_Dashboard_Events(LocationCode, ChannelCode, Date) {
    return ApiService.fetchData({
        url: `/Dashboard/USP_Dashboard_Events/?LocationCode=${LocationCode}&ChannelCode=${ChannelCode}&Date=${Date}`,
        method: 'get',
    })
}


