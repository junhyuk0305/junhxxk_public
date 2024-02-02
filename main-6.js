function colorReversal(element, trigger, color, start, end) {
    gsap.to(element, {
        scrollTrigger: {
            trigger: trigger,
            start: start,
            end: end,
            scrub: true,
            pin: true,
            markers: true,
        },
        color: color,
    });
};


function backgroundReversal(element, trigger, color, start, end) {
    gsap.to(element, {
        scrollTrigger: {
            trigger: trigger,
            start: start,
            end: end,
            scrub: true,
        },
        backgroundColor: color,
    });
};

// gsap.to("#ft", {
//     scrollTrigger: {
//         trigger: "#ft",
//         scrub: true,
//         markers: true,
//         pin: true,
//         start: "top center",
//         end: "top center",
//     },
//     backgroundColor: "#ffffff",
// });

//element / trigger / 색깔 / start / end
colorReversal(".menu-frame>a", "#ft", "#000000", "top top", "top top");
backgroundReversal(".menu-icon-line", "#ft", "#000000", "top top", "top top");
backgroundReversal("#ft", "#ft", "#ffffff", "top center", "top center");


//왼쪽에서 나오는 효과
function fadeInleft(element, trigger, animate) {
    gsap.to(element, {
        scrollTrigger: {
            trigger: trigger,
            start: "top center",
            end: "top center",
            scrub: true,
            markers: true,
            onEnter: () => document.querySelector(element).classList.add(animate),
            onLeaveBack: () => document.querySelector(element).classList.remove(animate),
        },
    });
};

fadeInleft(".ft-txt1", "#ft", "aninleft");
fadeInleft(".ft-txt2", "#ft", "aninleft");
fadeInleft(".ft-txt3", "#ft", "aninleft");
fadeInleft(".ft-line", "#ft", "aninline");
fadeInleft(".rt-txt-main", ".ft-line", "aninleft");



//simple parallex sections
let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);
gsap.utils.toArray("section").forEach((section, i) => {
    section.bg = section.querySelector(".bg");

    gsap.fromTo(section.bg, {
        backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
    }, {
        backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: () => i ? "top bottom" : "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
        }
    });

});

function fadeInleft(element, trigger, animate) {
    gsap.to(element, {
        scrollTrigger: {
            trigger: trigger,
            start: "top center",
            end: "top center",
            scrub: true,
            markers: true,
            onEnter: () => document.querySelector(element).classList.add(animate),
            onLeaveBack: () => document.querySelector(element).classList.remove(animate),
        },
    })
};

colorReversal(".menu-frame>a", "#can", "#ffffff", "top top", "top top");
backgroundReversal(".menu-icon-line", "#can", "#ffffff", "top top", "top top");




//여기서 부터해야됨. can 페이지 왼쪽 텍스트 고정시키기
// 근데 simple parllax 떄문에 pin이 이상하게 먹히니까 
// 먼저 그 코드 참고한 다음에 하기
// 그 다음에 오른쪽 slider
// 구현하고 싶은 기능: slider 를 트리거로 한 1. 배경화면 바꾸기 / 2. slider 효과주기 
// 각 slider보다 200px 정도 높은 위치에 start(top+200px 예를들어) 스크리은 center
// end는 다음 slider의 start 
// 현재의 slider 의 배경화면을 배경 이미로 옮겨주는 js 코드필요




//slider에 따른 배경화면 바꾸기

const sliders = document.querySelectorAll('.slider');
const canBg = document.querySelector('.can-bg')

const canTxt = document.querySelectorAll('.can-txt-frame');

sliders.forEach((slider, index) => {
    // gsap ScrollTrigger 효과 적용
    gsap.to(slider, {
        scrollTrigger: {
            trigger: slider,
            start: `top center`, // 변경된 부분
            end: "center center", // 변경된 부분
            scrub: true,
            markers: true,
            onUpdate: (self) => {
                const currentSlider = sliders[index];
                const backgroundImage = getComputedStyle(currentSlider).backgroundImage;
                canBg.style.backgroundImage = backgroundImage;

            },
        },
    });
});



// canTxt.forEach((txt, index) => {
//     // gsap ScrollTrigger 효과 적용
//     gsap.to(txt, {
//         scrollTrigger: {
//             trigger: slider,
//             start: `top center`, // 변경된 부분
//             end: "center center", // 변경된 부분
//             scrub: true,
//             markers: true,
//             onUpdate: (self) => {
//                 const currentSlider = sliders[index];
//                 const backgroundImage = getComputedStyle(currentSlider).backgroundImage;
//                 canBg.style.backgroundImage = backgroundImage;

//             },
//         },
//     });
// });

//workshop 부분 들어갈 때 메뉴 색 바뀌기
colorReversal(".menu-frame>a", "#project", "#000000", "top top", "top top");
backgroundReversal(".menu-icon-line", "#project", "#000000", "top top", "top top");



//workshop 부분에 밀리는 슬라이더
const sectionContainer = document.querySelector('.workshop-slider');
const sectionCol = document.querySelectorAll('.slider-col');
const isDesktop = window.matchMedia('(min-width: 768px)');

const colSide = document.querySelectorAll('.col-side');
const init = () => {
    if (isDesktop.matches) addSliderListeners();
    addSlidertxtListeners();
};




const addSliderListeners = () => {
    sectionCol[0].classList.add('active');
    
    sectionCol.forEach((col, index) => {
        col.addEventListener('mouseenter', () => {
            
            sectionCol.forEach((el) => el.classList.remove('active'));
            col.classList.add('active');

            if (index === sectionCol.length - 1) {
                col.classList.add('active');
            }
        });
    });
};

const addSlidertxtListeners = () => {
    const defaultTxt = [
        { index: 0, text: '내부 워크숍은 뭐시기저시기' },
        { index: 1, text: '프로젝트 워크숍은 뭐시기저시기' },
        { index: 2, text: '친목은 뭐시기저시기' },
    ];

    const updateTxt = [
        { index: 0, text: '첫 번째 섹션의 내용' },
        { index: 1, text: '두 번째 섹션의 내용' },
        { index: 2, text: '세 번째 섹션의 내용' },
    ];

    sectionCol.forEach((col, index) => {
        col.addEventListener('mouseenter', () => {
            colSide.forEach((txt, i) => {
                const currentSectionInfo = updateTxt.find(info => info.index == index);
                console.log(txt[i]);
                displayText(txt[i], currentSectionInfo.text);
            });
        });

        col.addEventListener('mouseleave', () => {
            colSide.forEach((txt, i) => {
                const currentSectionInfo = defaultTxt.find(info => info.index == index);
                displayText(txt[i], currentSectionInfo.text);
            });
        });
    });
};


const displayText = (txt, text) => {
    txt.innerHTML = text;
};

init();

