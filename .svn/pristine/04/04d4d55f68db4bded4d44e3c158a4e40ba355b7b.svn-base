import appConfig from "configs/app.config";
import ApiService from "./ApiService";

export async function apiGetCategoryMaster() {
    return ApiService.fetchData({
        url: `/categorymaster`,
        method: 'get',
    })
}

export async function apiPostCategoryMaster(data) {
    return ApiService.fetchData({
        url: `/categorymaster`,
        method: 'post',
        data
    })
}

export async function apiPutCategoryMaster(data) {
    return ApiService.fetchData({
        url: `/categorymaster/${data.CategoryCode}`,
        method: 'put',
        data
    })
}

const AddCategory = (row, token) => {
    return fetch(appConfig.apiPrefix + `/categorymaster`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            CategoryName: row.CategoryName,
            Type: row.CategoryName,
            IsActive: row.IsActive,
        }),
    });
};

const PutUpdateCategory = (row, token) => {
    //return fetch(appConfig.apiPrefix + `/aspectratiomaster/${row.VideoTypeCode}`, {
    return fetch(
        appConfig.apiPrefix + `/categorymaster/${row.CategoryCode}`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CategoryName: row.CategoryName,
                Type: row.CategoryName,
                IsActive: row.IsActive,
            }),
        },
    );
};




export async function apiGetLocalEventMaster() {
    return ApiService.fetchData({
        url: `/localeventmaster`,
        method: 'get',
    })
}
export async function apiGetLocalEventMasterDrop() {
    return ApiService.fetchData({
        url: `/localeventmaster/drop1/`,
        method: 'get',
    })
}
export async function apiGetLocalEventMasterDropBySubGenre(SubGenre) {
    return ApiService.fetchData({
        url: `/localeventmaster/dropbysubgenre/${SubGenre}`,
        method: 'get',
    })
}
export async function apiPostLocalEventMaster(data) {
    return ApiService.fetchData({
        url: `/localeventmaster`,
        method: 'post',
        data
    })
}

export async function apiPutLocalEventMaster(data) {
    console.log(data);
    return ApiService.fetchData({
        url: appConfig.apiPrefix + `/localeventmaster/${data.LocalEventCode}`,
        method: 'put',
        data
    })
}

export async function apiPostSportsMaster(data) {
    return ApiService.fetchData({
        url: `/SubGenreMaster/`,
        method: 'post',
        data
    })
}

export async function apiPostTeamMaster(data) {
    return ApiService.fetchData({
        url: `/teammaster/`,
        method: 'post',
        data
    })
}
export async function apiPutTeamMaster(data) {
    return ApiService.fetchData({
        url: `/teammaster/${data.TeamCode}`,
        method: 'put',
        data
    })
}
export async function apiGetTeamMaster() {
    return ApiService.fetchData({
        url: `/teammaster/`,
        method: 'get',
    })
}
export {
    AddCategory,
    PutUpdateCategory,
}
