document.addEventListener('DOMContentLoaded', () => {
    // Tree Animation Initialization
    const trees = document.querySelectorAll('.tree');
    
    trees.forEach(tree => {
        tree.style.animationPlayState = 'paused';
    });

    setTimeout(() => {
        trees.forEach(tree => {
            tree.style.animationPlayState = 'running';
        });
    }, 1000); // Start animations after 1 second

    // Scroll Animation Initialization
    const scrollElements = document.querySelectorAll('.scroll-animation');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    handleScrollAnimation();

    // Chart.js Initialization with 3D and Interactivity
    const ctx = document.getElementById('treeCountChart').getContext('2d');
    const data = {
        labels: ['Taiwan', 'U.S.', 'UK'],
        datasets: [{
            data: [3000, 5000, 2000],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 2,
            borderColor: '#fff',
            hoverBorderColor: '#fff'
        }]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Live Tree Count by Region'
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: {
                    size: 16,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 14
                },
                footerFont: {
                    size: 12,
                    style: 'italic'
                },
                footerAlign: 'center'
            },
            datalabels: {
                color: '#fff',
                font: {
                    size: 14,
                    weight: 'bold'
                },
                formatter: (value, context) => {
                    return value + ' trees';
                }
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true
        }
    };
    
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options,
        plugins: [ChartDataLabels]
    });

    // Smooth Scroll Function
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdown.addEventListener('mouseenter', () => {
        dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdownContent.style.display = 'none';
    });
});
