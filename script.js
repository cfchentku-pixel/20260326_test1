document.addEventListener('DOMContentLoaded', function() {
    // ===== 專業技能資料 (對應 index.html 的項目) =====
    // 將技能名稱與強度百分比對應起來
    const professionalSkillsData = {
        '前端網頁開發(html/css/js)': 90,
        '後端網頁 (laravel)': 75,
        '平面設計插畫': 85, // HTML中的 <br> 會被 textContent 合併
        '品牌視覺規劃 (CIS)': 88,
        '介面/網頁設計 (UI/UX)': 95,
        'AutoCAD製圖/程式開發(Lisp)': 80,
        '3D建模彩現': 70,
        '設計企劃/專案管理': 92
    };

    // ===== 程式技能資料 (對應 index.html 的項目) =====
    // 將技能名稱與分數對應起來
    const programmingSkillsData = {
        'C++': 60,
        'VB.net': 50,
        'AutoLisp': 70,
        'Verilog': 55,
        'Python': 75,
        'Html/Css/Js': 95,
        'Pug/Sass': 85
    };

    const professionalSkillsList = document.querySelector('.listSkill');
    const programmingSkillsList = document.querySelector('.listProgram');

    // --- 處理專業技能，生成圓弧圖 ---
    if (professionalSkillsList) {
        const skillItems = professionalSkillsList.querySelectorAll('li');
        skillItems.forEach(item => {
            // 清理文字，移除換行和多餘空格，以匹配 data 物件的 key
            const skillName = item.textContent.replace(/(\r\n|\n|\r)/gm, "").trim();
            const percentage = professionalSkillsData[skillName] || 0; // 如果找不到對應技能，預設為 0

            const radius = 20;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100) * circumference;

            // 重新建構 li 內容以包含圓弧圖
            item.innerHTML = `
                <div class="skill-arc-container">
                    <svg>
                        <circle class="arc-bg" cx="25" cy="25" r="${radius}"></circle>
                        <circle class="arc-progress" cx="25" cy="25" r="${radius}"
                                stroke-dasharray="${circumference}"
                                stroke-dashoffset="${circumference}"></circle>
                    </svg>
                    <div class="arc-percentage">${percentage}%</div>
                </div>
                <span class="skill-name">${skillName}</span>
            `;

            // 使用 setTimeout 觸發 CSS 動畫
            setTimeout(() => {
                const progressCircle = item.querySelector('.arc-progress');
                if (progressCircle) {
                    progressCircle.style.strokeDashoffset = offset;
                }
            }, 100);
        });
    }

    // --- 處理程式技能，生成長條圖 ---
    if (programmingSkillsList) {
        const skillItems = programmingSkillsList.querySelectorAll('li');
        skillItems.forEach(item => {
            // 取得 li 中的第一個文字節點作為技能名稱
            const skillName = item.firstChild.textContent.trim();
            const score = programmingSkillsData[skillName] || 0; // 如果找不到，預設為 0

            const valueBar = item.querySelector('.bar .value');
            if (valueBar) {
                // 使用 setTimeout 觸發 CSS 動畫
                setTimeout(() => {
                    valueBar.style.width = `${score}%`;
                }, 100);
            }
        });
    }
});
