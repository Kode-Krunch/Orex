import { reportsEnum } from '../enums/ReportsEnums';

const barcDataReport = {
    inputs: [
        {
            type: reportsEnum.inputType.select,
            label: 'Week',
            required: true,
            options: [
                { value: '28', label: 'Week 28' },
                { value: '29', label: 'Week 29' },
                { value: '30', label: 'Week 31' },
                { value: '31', label: 'Week 31' },
                { value: '32', label: 'Week 32' }
            ],
            stateKey: 'week',
        },
        {
            type: reportsEnum.inputType.select,
            label: 'Channel',
            required: true,
            options: [
                { value: 'PTC_Punjabi', label: 'PTC Punjabi' },
                { value: 'PTC_Chak_De', label: 'PTC Chak De' },
                { value: 'PTC_Music_v', label: 'PTC Music' },
                { value: 'PTC_Simran_v', label: 'PTC Simran' },
                { value: 'PTC_News', label: 'PTC News' },
                { value: 'PTC_Punjabi_Gold_v', label: 'PTC Punjabi Gold' },
            ],
            stateKey: 'channel',
        },

    ],
    report: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'USP_GRP_DATA',
        params: [
            {
                param: 'Channel',
                type: 'state',
                stateKey: 'channel',
                inputType: reportsEnum.inputType.select,
            },
            {
                param: 'Week',
                type: 'state',
                stateKey: 'week',
                inputType: reportsEnum.inputType.select,
            },



        ],
    },
};

export default barcDataReport;
