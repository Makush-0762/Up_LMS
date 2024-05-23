const topLine = {
    id: 'topLine',
    afterDatasetsDraw(chart,args, plugins){
        const {ctx, data} = chart;
        
        ctx.save();
        chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
            ctx.beginPath();
            ctx.strokeStyle = datapoint.options.backgroundColor; //? колір лінії (беремо актуальний)
            // console.log(datapoint.options.backgroundColor);
            console.log(data.datasets[0].data[index]);
            // console.log(ctx.borderRadius);
            ctx.lineWidth = 5; //? Висота лінії
            ctx.lineCap = 'round'; //? заокруглення країв лінії
            const halfWidth = datapoint.width / 2.5;
            ctx.moveTo(datapoint.x - halfWidth, datapoint.y - 6);
            ctx.lineTo(datapoint.x + halfWidth, datapoint.y - 6);
            ctx.stroke();

            //* Текст примытка до колонки
            ctx.font = '600 14px Poppins';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(data.datasets[0].data[index], datapoint.x, datapoint.y - 15)
        });
        ctx.restore(); 
    }
}

const cursorPlugin = {
    id: 'cursorPlugin',
    afterEvent: (chart, args) => {
        const {ctx, canvas, chartArea} = chart;
        const {offsetX, offsetY} = args.event;
        const elements = chart.getElementsAtEventForMode(args.event, 'nearest', { intersect: true }, false);

        if (elements.length) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    }
};

const urls = [
    'https://example.com/lesson1',
    'https://example.com/lesson2',
    'https://example.com/lesson3',
    'https://example.com/lesson4',
    'https://example.com/lesson5',
    'https://example.com/lesson6'
];

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Осн. Роботот.', 'МН інф', 'Комп. Практ', 'Англ. мова за ПС', 'Бази даних', 'Осв. Робот.'],
        datasets: [{
            label: 'Балів',
            data: [86, 76, 82, 84, 60, 89, 48],
            borderWidth: 1,
            // barPercentage: 15,
            barThickness: 70,
            maxBarThickness: 100,
            // minBarLength: 15,
            spanGaps: true,
            showLine: false,
        }]
    },
    options: {
        // responsive: false,
        // width: 800, // Встановлення фіксованої ширини
        // height: 400,
        onClick: (e, elements) => {
            if (elements.length > 0) {
                const element = elements[0];
                const datasetIndex = element.datasetIndex;
                const index = element.index;
                const url = urls[index];
                window.location.href = url;
            }
        },
        plugins: {
            legend: {
                display: false // Видалення легенди
            },
            tooltip: {
                titleAlign: 'center',
                // enabled: false,
                backgroundColor: 'rgba(12, 30, 51, 1)', // Червоний колір з прозорістю 0.8
                titleFont: {
                    size: 16,
                    weight: 'bold' // Жирний шрифт для заголовка
                },
                callbacks: {
                    label: function(context) {
                        return null; // Повертаємо null, щоб приховати текст
                    }
                },

            }
        },
        layout: {
            padding: {
                top: 32,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 100,
                ticks: {
                    font: {
                        size: 14 // Розмір шрифту для міток осі Y
                    }
                }
            },
            x: {
                grid: {
                    drawBorder: true,
                    color: 'rgba(0, 0, 0, 0)'
                },
                ticks: {
                    font: {
                        size: 14 // Розмір шрифту для міток осі Х
                    }
                }
            },
        },
        
        backgroundColor: ['#E1D2FF', '#E8FF8B', '#FDE1AC', '#BAE5F5', '#CCEFBF', '#FFAEDF'],
        borderRadius:{
            topRight: 10,
            topLeft: 10,
        },
    },
    plugins: [topLine, cursorPlugin],
});
