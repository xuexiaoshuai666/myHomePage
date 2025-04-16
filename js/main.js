// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loader);

    // 在页面完全加载后隐藏加载动画
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('fade-out');
            setTimeout(function() {
                loader.remove();
            }, 500);
        }, 500);
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 汉堡菜单功能
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', function() {
            // 切换导航菜单
            nav.classList.toggle('nav-active');
            
            // 汉堡按钮动画
            burger.classList.toggle('toggle');
            
            // 导航链接动画
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 如果移动设备上菜单是打开的，点击后关闭它
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });

    // 滚动动画
    const scrollElements = document.querySelectorAll('.card, .scroll-animation');
    
    const elementInView = (el, scrollOffset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= window.innerHeight - scrollOffset);
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('animate');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('animate');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // 初始检查
    handleScrollAnimation();
    
    // 滚动时检查
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // 数字计数器动画
    const countElements = document.querySelectorAll('.stat-number');
    
    countElements.forEach(countElement => {
        const target = parseInt(countElement.getAttribute('data-count'));
        const duration = 2000; // 动画持续时间（毫秒）
        const step = target / (duration / 16); // 假设 60fps
        let current = 0;
        
        const updateCount = () => {
            if (current < target) {
                current += step;
                if (current > target) current = target;
                countElement.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                countElement.textContent = target;
            }
        };
        
        // 当元素进入视口时开始动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateCount);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(countElement);
    });

    // 添加页面加载欢迎信息
    console.log('网页已完全加载！');
}); 