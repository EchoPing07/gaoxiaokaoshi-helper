// ==UserScript==
// @name         高校考试网小助手
// @namespace    https://github.com/EchoPing07/gaoxiaokaoshi-helper
// @version      1.0
// @description  自动播放高校考试网视频课程，支持自动翻页、进度显示。基于 Yiero 原版重构，优化UI和用户体验
// @author       claude-opus-4-5-20251101 (原作者: Yiero)
// @match        http://www.gaoxiaokaoshi.com/*
// @license      MIT
// @original-script https://greasyfork.org/scripts/463301
// @original-author Yiero
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

/*
 * 高校考试网小助手
 * 
 * 原作者: Yiero
 * 原项目: https://greasyfork.org/scripts/463301
 * 原仓库: https://github.com/AliubYiero/TemperScripts (已失效)
 * 
 * 修改者: claude-opus-4-5-20251101
 * 修改内容: UI重构、添加控制面板、优化用户体验
 * 
 * MIT License - 保留原作者署名
 */

(function() {
    'use strict';

    const PRIMARY_COLOR = '#6bb3ff';
    const PRIMARY_GRADIENT = 'linear-gradient(135deg, #6bb3ff 0%, #4a9fef 100%)';
    const IS_LOGIN_PAGE = location.href.includes('Login.aspx');
    
    let isAutoMode = GM_getValue('autoMode', true);

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .gxks-panel {
                position: fixed;
                right: 20px;
                top: 100px;
                width: 300px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Microsoft YaHei', sans-serif;
                z-index: 99999;
                user-select: none;
            }

            .gxks-card {
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.12);
                overflow: hidden;
            }

            .gxks-header {
                background: ${PRIMARY_GRADIENT};
                padding: 14px 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: move;
            }

            .gxks-header-left {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .gxks-logo {
                width: 28px;
                height: 28px;
                background: rgba(255,255,255,0.2);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
            }

            .gxks-header-title {
                color: white;
                font-size: 14px;
                font-weight: 600;
            }

            .gxks-btn-icon {
                width: 28px;
                height: 28px;
                border: none;
                background: rgba(255,255,255,0.2);
                border-radius: 6px;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
                font-size: 12px;
            }

            .gxks-btn-icon:hover {
                background: rgba(255,255,255,0.3);
            }

            .gxks-login-tip {
                padding: 32px 20px;
                text-align: center;
                background: #ffffff;
            }

            .gxks-login-text {
                font-size: 14px;
                color: #64748b;
                margin-bottom: 12px;
            }

            .gxks-login-emoji {
                font-size: 24px;
                color: #94a3b8;
            }

            .gxks-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                padding: 12px;
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
            }

            .gxks-stat-card {
                background: #ffffff;
                border-radius: 8px;
                padding: 10px 12px;
            }

            .gxks-stat-header {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-bottom: 6px;
            }

            .gxks-stat-label {
                font-size: 11px;
                color: #64748b;
            }

            .gxks-stat-value {
                display: flex;
                align-items: baseline;
                gap: 3px;
            }

            .gxks-stat-current {
                font-size: 22px;
                font-weight: 700;
                color: ${PRIMARY_COLOR};
                line-height: 1;
            }

            .gxks-stat-separator {
                font-size: 14px;
                color: #94a3b8;
            }

            .gxks-stat-total {
                font-size: 16px;
                font-weight: 600;
                color: #64748b;
                line-height: 1;
            }

            .gxks-stat-unit {
                font-size: 11px;
                color: #94a3b8;
                margin-left: 2px;
            }

            .gxks-status {
                padding: 10px 12px;
                display: flex;
                align-items: center;
                gap: 8px;
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
            }

            .gxks-status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #22c55e;
                flex-shrink: 0;
            }

            .gxks-status-dot.active {
                animation: gxks-pulse 2s infinite;
            }

            .gxks-status-dot.paused { background: #f59e0b; }
            .gxks-status-dot.error { background: #ef4444; }
            .gxks-status-dot.stopped { background: #94a3b8; }

            @keyframes gxks-pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
            }

            .gxks-status-text {
                font-size: 12px;
                color: #475569;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .gxks-progress-container {
                padding: 10px 12px;
                background: #ffffff;
                border-bottom: 1px solid #e2e8f0;
            }

            .gxks-progress-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 6px;
            }

            .gxks-progress-title {
                font-size: 11px;
                color: #64748b;
            }

            .gxks-progress-value {
                font-size: 11px;
                color: ${PRIMARY_COLOR};
                font-weight: 600;
            }

            .gxks-progress-bar {
                height: 4px;
                background: #e2e8f0;
                border-radius: 2px;
                overflow: hidden;
            }

            .gxks-progress-fill {
                height: 100%;
                background: ${PRIMARY_GRADIENT};
                border-radius: 2px;
                transition: width 0.3s ease;
            }

            .gxks-control {
                padding: 12px;
                background: #ffffff;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .gxks-control-label {
                font-size: 13px;
                color: #334155;
                font-weight: 500;
            }

            .gxks-switch {
                position: relative;
                width: 44px;
                height: 24px;
                cursor: pointer;
            }

            .gxks-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .gxks-switch-slider {
                position: absolute;
                inset: 0;
                background: #cbd5e1;
                border-radius: 24px;
                transition: all 0.3s;
            }

            .gxks-switch-slider:before {
                content: '';
                position: absolute;
                width: 18px;
                height: 18px;
                left: 3px;
                bottom: 3px;
                background: white;
                border-radius: 50%;
                transition: all 0.3s;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }

            .gxks-switch input:checked + .gxks-switch-slider {
                background: ${PRIMARY_COLOR};
            }

            .gxks-switch input:checked + .gxks-switch-slider:before {
                transform: translateX(20px);
            }

            .gxks-content {
                max-height: 200px;
                overflow-y: auto;
            }

            .gxks-content::-webkit-scrollbar {
                width: 4px;
            }

            .gxks-content::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 2px;
            }

            .gxks-section-title {
                padding: 10px 12px 6px;
                font-size: 11px;
                font-weight: 600;
                color: #64748b;
                background: #ffffff;
            }

            .gxks-list {
                padding: 0 12px 12px;
                background: #ffffff;
            }

            .gxks-list-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background: #f8fafc;
                border-radius: 8px;
                margin-bottom: 6px;
                transition: all 0.2s;
            }

            .gxks-list-item:last-child { margin-bottom: 0; }
            .gxks-list-item:hover { background: #f1f5f9; }

            .gxks-list-item.active {
                background: #eff6ff;
                border: 1px solid #bfdbfe;
            }

            .gxks-checkbox {
                position: relative;
                width: 18px;
                height: 18px;
                flex-shrink: 0;
            }

            .gxks-checkbox input {
                position: absolute;
                opacity: 0;
                width: 100%;
                height: 100%;
                cursor: pointer;
                z-index: 1;
                margin: 0;
            }

            .gxks-checkbox-custom {
                position: absolute;
                inset: 0;
                background: #ffffff;
                border: 2px solid #cbd5e1;
                border-radius: 4px;
                transition: all 0.2s;
            }

            .gxks-checkbox input:checked + .gxks-checkbox-custom {
                background: ${PRIMARY_COLOR};
                border-color: ${PRIMARY_COLOR};
            }

            .gxks-checkbox-custom::after {
                content: '';
                position: absolute;
                left: 5px;
                top: 2px;
                width: 4px;
                height: 8px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg) scale(0);
                transition: transform 0.2s;
            }

            .gxks-checkbox input:checked + .gxks-checkbox-custom::after {
                transform: rotate(45deg) scale(1);
            }

            .gxks-item-info {
                flex: 1;
                min-width: 0;
            }

            .gxks-item-name {
                font-size: 12px;
                color: #334155;
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .gxks-item-status {
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                font-weight: 500;
                flex-shrink: 0;
            }

            .gxks-item-status.watching {
                background: #dcfce7;
                color: #16a34a;
            }

            .gxks-item-status.pending {
                background: #fef3c7;
                color: #d97706;
            }

            .gxks-empty {
                padding: 24px 12px;
                text-align: center;
                color: #94a3b8;
            }

            .gxks-empty-icon {
                font-size: 32px;
                margin-bottom: 8px;
                opacity: 0.5;
            }

            .gxks-empty-text { font-size: 12px; }

            .gxks-footer {
                padding: 10px 12px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 8px;
            }

            .gxks-btn {
                flex: 1;
                padding: 8px 12px;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
            }

            .gxks-btn-primary {
                background: ${PRIMARY_COLOR};
                color: white;
            }

            .gxks-btn-primary:hover { background: #4a9fef; }

            .gxks-btn-secondary {
                background: #ffffff;
                color: #475569;
                border: 1px solid #e2e8f0;
            }

            .gxks-btn-secondary:hover { background: #f1f5f9; }

            .gxks-toast {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                padding: 10px 20px;
                background: #1e293b;
                color: white;
                border-radius: 8px;
                font-size: 13px;
                display: flex;
                align-items: center;
                gap: 8px;
                opacity: 0;
                transition: all 0.3s;
                z-index: 100000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }

            .gxks-toast.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }

            .gxks-mini-btn {
                position: fixed;
                right: 20px;
                top: 100px;
                width: 48px;
                height: 48px;
                background: ${PRIMARY_GRADIENT};
                border: 3px solid white;
                border-radius: 50%;
                display: none;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(107,179,255,0.4);
                transition: all 0.2s;
                z-index: 99998;
                font-size: 20px;
            }

            .gxks-mini-btn:hover { transform: scale(1.1); }

            .gxks-panel.hidden { display: none; }
            .gxks-panel.hidden + .gxks-mini-btn { display: flex; }

            .gxks-panel.dragging,
            .gxks-panel.dragging * {
                transition: none !important;
                pointer-events: none !important;
            }
            
            .gxks-panel.dragging { pointer-events: auto !important; }
        `;
        document.head.appendChild(style);
    }

    let studyingLocalStorage = {
        localStudyingObj: null,
        get() {
            if (!localStorage.studying) {
                this.localStudyingObj = {}
            } else {
                this.localStudyingObj = JSON.parse(localStorage.studying)
            }
            return this.localStudyingObj
        },
        set(name, state = Object.keys(this.localStudyingObj).length + "") {
            if (!this.localStudyingObj) this.get()
            this.localStudyingObj[name] = state
            localStorage.studying = JSON.stringify(this.localStudyingObj)
        },
        removeItem(name) {
            const newLocalStudyingObj = {}
            for (const nameKey in this.localStudyingObj) {
                if (nameKey !== name) {
                    newLocalStudyingObj[nameKey] = this.localStudyingObj[nameKey]
                }
            }
            this.localStudyingObj = newLocalStudyingObj
            localStorage.studying = JSON.stringify(this.localStudyingObj)
        },
        clear(key = 'studying') {
            localStorage.removeItem(key)
        },
        isSameToday() {
            const dateObj = new Date()
            const today = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
            if (!localStorage.today) {
                localStorage.today = today
                return "0"
            }
            if (localStorage.today === today) {
                return 1
            }
            localStorage.today = today
            return 0
        }
    }

    let mainWindow
    let videoInfoForm = {
        _self: null,
        getMainIframeWindow() {
            const mainIframe = window.document.getElementById("mainIframe")
            mainWindow = mainIframe.contentWindow
        },
        get() {
            if (!mainWindow) this.getMainIframeWindow()
            this._self = mainWindow.document.querySelectorAll('tr')
        },
        getPageInfo() {
            if (!mainWindow) this.getMainIframeWindow()
            try {
                const pageText = mainWindow.document.querySelectorAll('.page > .fright > ul > li')[0].innerText
                const pages = pageText.split('/')
                return {
                    current: parseInt(pages[0]) || 1,
                    total: parseInt(pages[1]) || 1
                }
            } catch (e) {
                return { current: 1, total: 1 }
            }
        },
        getCourseStats() {
            if (!mainWindow) this.getMainIframeWindow()
            try {
                const rows = mainWindow.document.querySelectorAll('tr')
                let total = rows.length - 1
                let completed = 0
                for (let i = 1; i < rows.length; i++) {
                    const stateCell = rows[i].children[4]
                    if (stateCell && stateCell.innerText === '已完成') {
                        completed++
                    }
                }
                return { completed, total }
            } catch (e) {
                return { completed: 0, total: 0 }
            }
        },
        jumpNextPage() {
            if (!mainWindow) this.getMainIframeWindow()
            const pageInfo = this.getPageInfo()
            UIManager.updatePageInfo(pageInfo.current, pageInfo.total)
            if (pageInfo.current >= pageInfo.total) {
                console.log("已经是最后一页，全部视频观看完成")
                UIManager.setStatus('active', '🎉 全部视频观看完成！')
                UIManager.showToast('🎉', '恭喜！所有视频已观看完成')
                videoEvent.reloadVideo = () => console.log('finish')
                return 1
            }
            mainWindow.document.getElementById('PageSplit1_BtnNext').click()
            console.log("进入下一页")
            UIManager.setStatus('active', `正在加载第 ${pageInfo.current + 1} 页...`)
            UIManager.showToast('📄', `跳转到第 ${pageInfo.current + 1} 页`)
            mainWindow = null
            videoInfoForm._self = null
        },
    }

    let videoInfoTable = {
        localCourse: [],
        isLastPage: false,

        rewriteStudyState(trObj) {
            let newTrObj = {}
            const tdList = trObj.children
            for (let i = 0; i < tdList.length; i++) {
                const element = tdList[i]
                switch (i) {
                    case 0:
                        newTrObj.name = element.innerText
                        break
                    case 1:
                        newTrObj.type = element.innerText
                        break
                    case 2:
                        newTrObj.totalTime = element.innerText
                        break
                    case 3:
                        newTrObj.studiedTime = element.innerText
                        break
                    case 4:
                        if (studyingLocalStorage.get()[newTrObj.name]) {
                            newTrObj.state = "正在学习"
                            break
                        }
                        newTrObj.state = element.innerText
                        break
                    case 5:
                        newTrObj.studyBtn = element.children[0]
                        newTrObj.id = newTrObj.type + newTrObj.studyBtn.onclick.toString().split(',')[1].split(')')[0]
                        break
                    case 6:
                        newTrObj.examBtn = element.children[0]
                        break
                }
            }
            return newTrObj
        },

        getStudyState() {
            if (!videoInfoForm._self) videoInfoForm.get()
            const pageInfo = videoInfoForm.getPageInfo()
            UIManager.updatePageInfo(pageInfo.current, pageInfo.total)
            const courseStats = videoInfoForm.getCourseStats()
            UIManager.updateCourseProgress(courseStats.completed, courseStats.total)
            let videoInfoFormLength = videoInfoForm._self.length
            for (let i = 1; i < videoInfoFormLength; i++) {
                const course = this.rewriteStudyState(videoInfoForm._self[i])
                if (course.state === "已完成") {
                    continue
                }
                if (course.state === "正在学习") continue
                this.localCourse.unshift(course)
                return
            }
            this.isLastPage = videoInfoForm.jumpNextPage()
            setTimeout(() => {
                if (!this.isLastPage) {
                    videoInfoTable.getStudyState()
                    return
                }
            }, 300)
        }
    }

    let videoEvent = {
        examViewWindow: null,
        video: null,
        checkVideoCounter: 0,
        timer: null,

        getExamViewIframeWindow() {
            const examViewIframe = window.document.getElementById("ExamView")
            this.examViewWindow = examViewIframe.contentWindow
        },

        getVideoObj() {
            if (!videoInfoTable.localCourse[0]) {
                videoInfoTable.getStudyState()
            }
            setTimeout(() => {
                try {
                    videoInfoTable.localCourse[0].studyBtn.click()
                    UIManager.setStatus('active', '正在加载视频...')
                } catch (e) {
                    console.log('finish')
                }
            }, 1000)
            let _this = this
            setTimeout(() => {
                if (!_this.examViewWindow) _this.getExamViewIframeWindow()
                _this.video = _this.examViewWindow.document.querySelector('video')
            }, 3000)
        },

        playVideo() {
            if (!isAutoMode) return
            if (!this.video) this.getVideoObj()
            let _this = this
            this.timer = setInterval(_this.checkVideoPlay, 1000)
        },

        checkVideoPlay() {
            if (!isAutoMode) {
                clearInterval(videoEvent.timer)
                videoEvent.timer = null
                return
            }
            if (videoEvent.checkVideoCounter++ >= 8) {
                clearInterval(videoEvent.timer)
                videoEvent.timer = null
                UIManager.setStatus('error', '视频加载失败，正在重试...')
                videoEvent.reloadVideo()
                return
            }
            const video = videoEvent.video
            if (video && video.paused) {
                video.play()
                const hasReadTime = videoInfoTable.localCourse[0].studiedTime.split("分钟")[0]
                setTimeout(() => video.currentTime = (hasReadTime) * 60, 1000)
                video.volume = 0
                videoEvent.examViewWindow.document.querySelector('#J_prismPlayer').click()
            } else if (video && !video.paused) {
                console.log(`开始自动播放视频 「${videoInfoTable.localCourse[0].name}」`)
                clearInterval(videoEvent.timer)
                videoEvent.timer = null
                const course = videoInfoTable.localCourse[0]
                UIManager.setStatus('active', `正在播放: ${course.name}`)
                UIManager.addWatchingItem(course.id, course.name, true)
                UIManager.showToast('▶️', `开始播放: ${course.name}`)
                UIManager.updateProgress(0, true)
                videoEvent.setStorageEvent()
                videoEvent.setVideoEvent()
                videoEvent.checkVideoPlaying()
                studyingLocalStorage.set(course.name, course.id)
            }
        },

        checkVideoPlaying() {
            let serveTimerStr1, serveTimerStr2
            videoEvent.timer = setInterval(() => {
                if (!isAutoMode) {
                    clearInterval(videoEvent.timer)
                    videoEvent.timer = null
                    return
                }
                console.log("检查数据同步...")
                const courseStats = videoInfoForm.getCourseStats()
                UIManager.updateCourseProgress(courseStats.completed, courseStats.total)
                if (videoEvent.video && videoInfoTable.localCourse[0]) {
                    const current = videoEvent.video.currentTime
                    const total = videoEvent.video.duration
                    if (total > 0) {
                        const percent = Math.round((current / total) * 100)
                        UIManager.updateProgress(percent)
                    }
                }
                serveTimerStr1 = videoEvent.examViewWindow.document.getElementById('spTitle').innerText
                setTimeout(() => {
                    serveTimerStr2 = videoEvent.examViewWindow.document.getElementById('spTitle').innerText
                    if (serveTimerStr1 === serveTimerStr2) {
                        UIManager.setStatus('error', '数据同步异常，正在重试...')
                        videoEvent.reloadVideo()
                        return
                    }
                }, 1000)
            }, 1000 * 60)
        },

        reloadVideo() {
            if (!isAutoMode) return
            UIManager.setStatus('paused', '正在切换视频...')
            location.reload()
            studyingLocalStorage.removeItem(videoInfoTable.localCourse[0].name)
            videoEvent.checkVideoCounter = 0
            videoEvent.examViewWindow = null
            videoEvent.video = null
            videoEvent.timer = null
            setTimeout(videoEvent.playVideo, 1000)
        },

        setVideoEvent() {
            const video = videoEvent.video
            video.addEventListener('ended', () => {
                if (!isAutoMode) return
                UIManager.showToast('✅', `视频播放完成: ${videoInfoTable.localCourse[0].name}`)
                this.reloadVideo()
                console.log(`「${videoInfoTable.localCourse[0].name}」视频结束`)
            })
            video.addEventListener('pause', () => {
                if (!isAutoMode) return
                this.reloadVideo()
            })
        },

        setStorageEvent() {
            window.addEventListener('storage', e => {
                studyingLocalStorage.get()
            })
        },
    }

    const UIManager = {
        panel: null,
        isDragging: false,
        dragOffset: { x: 0, y: 0 },

        init() {
            this.createPanel()
            this.bindEvents()
        },

        createPanel() {
            const panel = document.createElement('div')
            panel.className = 'gxks-panel'
            
            if (IS_LOGIN_PAGE) {
                panel.innerHTML = `
                    <div class="gxks-card">
                        <div class="gxks-header" id="gxks-drag-handle">
                            <div class="gxks-header-left">
                                <div class="gxks-logo">📚</div>
                                <span class="gxks-header-title">刷课助手</span>
                            </div>
                            <button class="gxks-btn-icon" id="gxks-minimize" title="最小化">—</button>
                        </div>
                        <div class="gxks-login-tip">
                            <div class="gxks-login-text">你还没有登录哦</div>
                            <div class="gxks-login-emoji">(=^▽^=)</div>
                        </div>
                    </div>
                `
            } else {
                panel.innerHTML = `
                    <div class="gxks-card">
                        <div class="gxks-header" id="gxks-drag-handle">
                            <div class="gxks-header-left">
                                <div class="gxks-logo">📚</div>
                                <span class="gxks-header-title">刷课助手</span>
                            </div>
                            <button class="gxks-btn-icon" id="gxks-minimize" title="最小化">—</button>
                        </div>
                        <div class="gxks-stats">
                            <div class="gxks-stat-card">
                                <div class="gxks-stat-header">
                                    <span class="gxks-stat-label">课程页码</span>
                                </div>
                                <div class="gxks-stat-value">
                                    <span class="gxks-stat-current" id="gxks-page-current">1</span>
                                    <span class="gxks-stat-separator">/</span>
                                    <span class="gxks-stat-total" id="gxks-page-total">1</span>
                                    <span class="gxks-stat-unit">页</span>
                                </div>
                            </div>
                            <div class="gxks-stat-card">
                                <div class="gxks-stat-header">
                                    <span class="gxks-stat-label">本页进度</span>
                                </div>
                                <div class="gxks-stat-value">
                                    <span class="gxks-stat-current" id="gxks-course-completed">0</span>
                                    <span class="gxks-stat-separator">/</span>
                                    <span class="gxks-stat-total" id="gxks-course-total">0</span>
                                    <span class="gxks-stat-unit">课</span>
                                </div>
                            </div>
                        </div>
                        <div class="gxks-status">
                            <div class="gxks-status-dot ${isAutoMode ? 'active' : 'stopped'}" id="gxks-status-dot"></div>
                            <span class="gxks-status-text" id="gxks-status-text">${isAutoMode ? '正在初始化...' : '自动播放已关闭'}</span>
                        </div>
                        <div class="gxks-progress-container" id="gxks-progress-container" style="display: none;">
                            <div class="gxks-progress-header">
                                <span class="gxks-progress-title">视频进度</span>
                                <span class="gxks-progress-value" id="gxks-progress-value">0%</span>
                            </div>
                            <div class="gxks-progress-bar">
                                <div class="gxks-progress-fill" id="gxks-progress-fill" style="width: 0%"></div>
                            </div>
                        </div>
                        <div class="gxks-control">
                            <span class="gxks-control-label">自动播放</span>
                            <label class="gxks-switch">
                                <input type="checkbox" id="gxks-auto-toggle" ${isAutoMode ? 'checked' : ''}>
                                <span class="gxks-switch-slider"></span>
                            </label>
                        </div>
                        <div class="gxks-content">
                            <div class="gxks-section-title">观看记录</div>
                            <div class="gxks-list" id="gxks-watching-list">
                                <div class="gxks-empty">
                                    <div class="gxks-empty-icon">📭</div>
                                    <div class="gxks-empty-text">暂无观看记录</div>
                                </div>
                            </div>
                        </div>
                        <div class="gxks-footer">
                            <button class="gxks-btn gxks-btn-secondary" id="gxks-clear-records">清除记录</button>
                            <button class="gxks-btn gxks-btn-primary" id="gxks-refresh">刷新页面</button>
                        </div>
                    </div>
                `
            }

            document.body.appendChild(panel)
            this.panel = panel

            const miniBtn = document.createElement('div')
            miniBtn.className = 'gxks-mini-btn'
            miniBtn.innerHTML = '📚'
            miniBtn.onclick = () => this.togglePanel()
            document.body.appendChild(miniBtn)

            this.initDrag()
        },

        initDrag() {
            const handle = document.getElementById('gxks-drag-handle')
            handle.onmousedown = (e) => {
                if (e.target.closest('.gxks-btn-icon')) return
                this.isDragging = true
                this.panel.classList.add('dragging')
                const rect = this.panel.getBoundingClientRect()
                this.dragOffset.x = e.clientX - rect.left
                this.dragOffset.y = e.clientY - rect.top
                document.onmousemove = (e) => {
                    if (!this.isDragging) return
                    const x = Math.max(0, Math.min(e.clientX - this.dragOffset.x, window.innerWidth - this.panel.offsetWidth))
                    const y = Math.max(0, Math.min(e.clientY - this.dragOffset.y, window.innerHeight - this.panel.offsetHeight))
                    this.panel.style.left = x + 'px'
                    this.panel.style.top = y + 'px'
                    this.panel.style.right = 'auto'
                }
                document.onmouseup = () => {
                    this.isDragging = false
                    this.panel.classList.remove('dragging')
                    document.onmousemove = null
                    document.onmouseup = null
                }
                e.preventDefault()
            }
        },

        bindEvents() {
            document.getElementById('gxks-minimize').onclick = () => this.togglePanel()
            if (IS_LOGIN_PAGE) return
            document.getElementById('gxks-clear-records').onclick = () => this.clearRecords()
            document.getElementById('gxks-refresh').onclick = () => location.reload()
            document.getElementById('gxks-auto-toggle').onchange = (e) => {
                isAutoMode = e.target.checked
                GM_setValue('autoMode', isAutoMode)
                if (isAutoMode) {
                    this.setStatus('active', '自动播放已开启')
                    this.showToast('✅', '自动播放已开启')
                    videoEvent.playVideo()
                } else {
                    this.setStatus('stopped', '自动播放已关闭')
                    this.showToast('⏸️', '自动播放已关闭')
                    if (videoEvent.timer) {
                        clearInterval(videoEvent.timer)
                        videoEvent.timer = null
                    }
                    if (videoEvent.video) {
                        videoEvent.video.pause()
                    }
                }
            }
        },

        togglePanel() {
            this.panel.classList.toggle('hidden')
        },

        updatePageInfo(current, total) {
            document.getElementById('gxks-page-current').textContent = current
            document.getElementById('gxks-page-total').textContent = total
        },

        updateCourseProgress(completed, total) {
            document.getElementById('gxks-course-completed').textContent = completed
            document.getElementById('gxks-course-total').textContent = total
        },

        setStatus(status, text) {
            const dot = document.getElementById('gxks-status-dot')
            dot.className = 'gxks-status-dot ' + status
            document.getElementById('gxks-status-text').textContent = text
        },

        updateProgress(percent, show = true) {
            document.getElementById('gxks-progress-container').style.display = show ? 'block' : 'none'
            document.getElementById('gxks-progress-fill').style.width = percent + '%'
            document.getElementById('gxks-progress-value').textContent = percent + '%'
        },

        addWatchingItem(id, name, isActive = false) {
            const list = document.getElementById('gxks-watching-list')
            const empty = list.querySelector('.gxks-empty')
            if (empty) empty.remove()
            if (document.getElementById(`gxks-item-${id}`)) return
            const item = document.createElement('div')
            item.className = `gxks-list-item ${isActive ? 'active' : ''}`
            item.id = `gxks-item-${id}`
            item.innerHTML = `
                <label class="gxks-checkbox">
                    <input type="checkbox" checked data-id="${id}" data-name="${name}">
                    <span class="gxks-checkbox-custom"></span>
                </label>
                <div class="gxks-item-info">
                    <div class="gxks-item-name" title="${name}">${name}</div>
                </div>
                <span class="gxks-item-status ${isActive ? 'watching' : 'pending'}">
                    ${isActive ? '播放中' : '队列中'}
                </span>
            `
            item.querySelector('input').onchange = (e) => {
                if (!e.target.checked) this.removeWatchingItem(id, name)
            }
            list.appendChild(item)
        },

        removeWatchingItem(id, name) {
            const item = document.getElementById(`gxks-item-${id}`)
            if (item) item.remove()
            studyingLocalStorage.removeItem(name)
            const list = document.getElementById('gxks-watching-list')
            if (!list.children.length) {
                list.innerHTML = `
                    <div class="gxks-empty">
                        <div class="gxks-empty-icon">📭</div>
                        <div class="gxks-empty-text">暂无观看记录</div>
                    </div>
                `
            }
            this.showToast('🗑️', '已移除: ' + name)
        },

        clearRecords() {
            studyingLocalStorage.clear()
            document.getElementById('gxks-watching-list').innerHTML = `
                <div class="gxks-empty">
                    <div class="gxks-empty-icon">📭</div>
                    <div class="gxks-empty-text">暂无观看记录</div>
                </div>
            `
            this.showToast('✅', '已清除所有记录')
        },

        showToast(icon, message) {
            const existing = document.querySelector('.gxks-toast')
            if (existing) existing.remove()
            const toast = document.createElement('div')
            toast.className = 'gxks-toast'
            toast.innerHTML = `<span>${icon}</span><span>${message}</span>`
            document.body.appendChild(toast)
            requestAnimationFrame(() => toast.classList.add('show'))
            setTimeout(() => {
                toast.classList.remove('show')
                setTimeout(() => toast.remove(), 300)
            }, 2500)
        }
    }

    setTimeout(() => {
        if (window.document.URL.includes('Study')) return
        injectStyles()
        UIManager.init()
        if (IS_LOGIN_PAGE) return
        if (!studyingLocalStorage.isSameToday()) {
            studyingLocalStorage.clear()
        }
        const localCourse = studyingLocalStorage.get()
        for (const name in localCourse) {
            UIManager.addWatchingItem(localCourse[name], name, false)
        }
        setTimeout(() => {
            try {
                const pageInfo = videoInfoForm.getPageInfo()
                UIManager.updatePageInfo(pageInfo.current, pageInfo.total)
                const courseStats = videoInfoForm.getCourseStats()
                UIManager.updateCourseProgress(courseStats.completed, courseStats.total)
            } catch (e) {
                console.log('获取信息失败')
            }
        }, 500)
        if (isAutoMode) {
            UIManager.setStatus('active', '正在查找未学习视频...')
            videoEvent.playVideo()
        } else {
            UIManager.setStatus('stopped', '自动播放已关闭')
        }
    }, 1000)

})();
