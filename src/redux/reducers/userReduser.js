import dayjs from "dayjs";
var date = dayjs(Date()).format(" MMMM-DD-YYYY");
const initialState = {
    token: [],
    userData: [
        {
            first_name: 'Adil',
            last_name: 'Mustafa',
            email: 'adilmustafa006@gmai.com',
            phone_number: '03047767750',
            gender: 'Male'
            //         first_name: '',
            //         last_name: '',
            //         email: '',
            //         phone_number: '',
            //         gendar: ''
        }
    ],
    // uid: '',
    // userName: '',
    // isuserLogin: false,
    // transactions: [1, 2, 3, 4],
    // users: [],
    // moreData: {
    //     city: '',
    // },
    TotalSum: Math.floor(Math.random() * 10000),
    // DATA: [
    //     {

    //         title: 'Latest transactions',
    //         name: 'to',
    //         data: [Math.random() * 10, Math.random() * 10, Math.random() * 10]
    //     },

    // ],

    DATA2: [
        {
            date: date,
            id: Math.random() * 10,
            title: 'Ali Hassan',
            amount: Math.floor(Math.random() * 100),
            total: Math.floor(Math.random() * (Math.random() * 100) * (Math.random() * 100)),
            description: 'By Jazz Cash'

        },
        {
            date: date,
            id: Math.random() * 10,
            title: 'Adil Mustafa',
            amount: Math.floor(Math.random() * 100),
            total: Math.floor(Math.random() * (Math.random() * 100) * (Math.random() * 100)),
            description: 'By Jazz Cash'

        },
        {
            date: date,
            id: Math.random() * 10,
            title: 'Anas Rasool',
            amount: Math.floor(Math.random() * 100),
            total: Math.floor(Math.random() * (Math.random() * 100) * (Math.random() * 100)),
            description: 'By Jazz Cash'

        },

    ],
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
        case 'setId':
            return {
                ...state,
                uid: action.id,
            }

        case 'setUserName':
            return {
                ...state,
                userName: action.userName
            }

        case 'setUserData':
            const { uid, userName } = action.Data
            return {
                ...state,
                uid: uid,
                userName: userName,
            }

        case 'isuserLogin':
            return {
                ...state,
                isuserLogin: action.isuserAthenticate
            }
        // case 'addtransaction':
        //     return {
        //         ...state,
        //         transactions: action.transactions
        //     }
        case 'Add':
            state.DATA2.push(action.payload)
            console.log(action.payload, 'test')
            return { ...state }
        // return state

        case 'Remove':
            return {
                ...state,
                transactions: action.transactions
            }

        case 'changeValue':
            return {
                ...state,
                changeValue: action.payload,
            }
        case 'changeValue':
            return {
                ...state,
                changeValue: action.payload,
            };
        case 'REGISTER_USER':
            console.log('===============payload=====================');
            console.log(action.payload);
            console.log('====================================');
            return {
                ...state,
                users: [...state.users, { ...action.payload }],
            };
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