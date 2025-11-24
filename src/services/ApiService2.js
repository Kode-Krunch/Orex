import appConfig from 'configs/app.config'
const axios = require('axios')
const FormData = require('form-data')

const ApiService2 = {
    fetchData(param) {

        return new Promise((resolve, reject) => {
            let data = new FormData()
            data.append('username', param.data.userName)
            data.append('password', param.data.password)
            data.append('OTP', param.data.OTP)
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: appConfig.apiPrefix + '/login',
                headers: {},
                data: data,
            }

            axios
                .request(config)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },
}
const ApiService3 = {
    fetchData(param) {

        return new Promise((resolve, reject) => {
            let data = new FormData()
            data.append('Email', param.data.Email)
            data.append('Mobile', param.data.Mobile)
            data.append('LoginName', param.data.LoginName)
            data.append('Emp_FirstName', param.data.FirstName)
            data.append('Emp_LastName', param.data.LastName)
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: appConfig.apiPrefix + '/singup/',
                headers: {},
                data: data,
            }

            axios
                .request(config)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },
}

export { ApiService2, ApiService3 }
