import {
    Grid, html
} from "https://unpkg.com/gridjs?module";
import {leaderboard} from './data.js';

new Grid({
    columns: [
        {
            name: 'uuid',
            formatter: (_, row) => html(`<img src="https://visage.surgeplay.com/face/40/${row.cells[0].data}">`),
            width: '40px'
        },
        "Name",
        {
            name: "Wars",
            formatter: (_, row) => html(`${row.cells[2].data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`)
        },
        {
            name: "Guild XP",
            formatter: (_, row) => html(`${row.cells[3].data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`)
        },
        {
            name: "Activity",
            formatter: (_, row) => html(`${row.cells[4].data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`)
        }
    ],
    search: true,
    sort: true,
    data: leaderboard,
    className: {
        table: 'table-body'
    },
    style: {
        table: {
            border: '0px solid transparent'
        },
        th: {
            'background-color': 'white',
            color: '#111111',
            'border-bottom': '0px solid transparent',
            'text-align': 'left'
        },
        td: {
            'text-align': 'left',
            'font-size': '16px',
            'color': '#111111',
            'vertical-align': 'middle',
            'font-weight': '500'
        }
    },
    language: {
        'search': {
            'placeholder': 'Search'
        },
    }
}).render(document.getElementById("table"));
