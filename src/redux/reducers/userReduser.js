import dayjs from "dayjs";
var date = dayjs(Date()).format(" MMMM-DD-YYYY");
const initialState = {
    token: [],


    GraphData: [
        {
            name: 'Jan',
            population: Math.round(Math.random() * 100),
            color: '#b81ff0',
            legendFontColor: '#050505',
            legendFontSize: 15,
        },
        {
            name: 'Feb',
            population: Math.round(Math.random() * 100),
            color: '#f2f763',
            legendFontColor: '#050505',
            legendFontSize: 15,
        },
        {
            name: 'Mar',
            population: Math.round(Math.random() * 100),
            color: '#f51818',
            legendFontColor: '#050505',
            legendFontSize: 15,
        },
        {
            name: 'Apr',
            population: Math.round(Math.random() * 100),
            color: '#62f518',
            legendFontColor: '#050505',
            legendFontSize: 15,
        },
        {
            name: 'May',
            population: Math.round(Math.random() * 100),
            color: 'orange',
            legendFontColor: '#050505',
            legendFontSize: 15,
        },
        {
            name: 'Jun',
            population: Math.round(Math.random() * 100),
            color: 'blue',
            legendFontColor: '#050505',
            legendFontSize: 15,
        },
    ],
    LineChartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                data: [
                    Math.round(Math.random() * 100),
                    Math.round(Math.random() * 100),
                    Math.round(Math.random() * 100),
                    Math.round(Math.random() * 100),
                    Math.round(Math.random() * 100),
                    Math.round(Math.random() * 100),
                ]
            }
        ]
    }
};
const userReduser = (state = initialState, action) => {
    switch (action.type) {

        case 'RESET_PASSWORD':
            return {
                ...state,
                token: action.payload,
            };
        case 'setdata':
            return {
                ...state,
                userData: action.payload,
            };
        default:
            return initialState
    }
}
export default userReduser;