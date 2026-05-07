/* ============================================================
   C++ MCQ — App
   ============================================================ */

const STORE = {
    THEME:    'cppmcq.theme',
    AUTH:     'cppmcq.auth',
    STATS:    'cppmcq.stats',
    ACTIVE:   'cppmcq.activeQuiz',     // resume mid-quiz
    ATTEMPTS: 'cppmcq.examAttempts',   // per-student exam-mode lockout
};

// Time budgets (seconds). Practice mode is unlimited.
const EXAM_DURATION = {
    quick: 10 * 60,                 // 10 random Qs → 10 min
    chapterPerQ: 60,                // 1 min per question for chapter exams
    mixedPerQ: 30,                  // 30 s per question for the full mixed exam
};

// Resume window: drop the saved active quiz if older than this.
const ACTIVE_QUIZ_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

const state = {
    chapters: [],
    questions: [],
    students: [],
    user: null,         // { name, email }
    quiz: null,         // active quiz state
    schemaWarning: null, // banner text when bad questions were dropped
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------- Boot ---------- */
async function boot() {
    initTheme();
    initThemeToggle();

    try {
        const [q, s] = await Promise.all([
            fetch('questions.json').then(r => r.json()),
            fetch('students.json').then(r => r.json()),
        ]);
        state.chapters = q.chapters;
        const { ok, dropped } = validateQuestions(q.questions);
        state.questions = ok;
        if (dropped.length) {
            state.schemaWarning = `${dropped.length} question(s) were skipped because of malformed data. Re-run build_questions.py.`;
            console.warn('[mcq] dropped questions:', dropped);
        }
        state.students = s.students;
    } catch (err) {
        document.querySelector('main').innerHTML =
            '<div style="padding:40px;text-align:center;color:var(--error)">Failed to load data. Run <code>python3 build_questions.py</code> and <code>python3 build_students.py</code>, then serve the folder over HTTP (not file://).</div>';
        console.error(err);
        return;
    }

    // Restore session
    const savedAuth = localStorage.getItem(STORE.AUTH);
    if (savedAuth) {
        try {
            state.user = JSON.parse(savedAuth);
        } catch { /* ignore */ }
    }

    document.getElementById('logoutBtn').addEventListener('click', logout);

    routeFromState();
    initKeyboard();
}

function routeFromState() {
    if (!state.user) {
        renderLogin();
    } else {
        renderUserBadge();
        renderHome();
    }
}

/* ---------- Theme ---------- */
function initTheme() {
    const saved = localStorage.getItem(STORE.THEME) || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon();
}

function initThemeToggle() {
    document.getElementById('themeToggle').addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const nxt = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nxt);
        localStorage.setItem(STORE.THEME, nxt);
        updateThemeIcon();
    });
}

function updateThemeIcon() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.getElementById('iconSun').style.display = dark ? '' : 'none';
    document.getElementById('iconMoon').style.display = dark ? 'none' : '';
}

/* ---------- Auth ---------- */
function renderLogin() {
    document.getElementById('userBadge').hidden = true;
    const tpl = $('#tpl-login').content.cloneNode(true);
    const main = $('#app');
    main.innerHTML = '';
    main.appendChild(tpl);

    const form = $('#loginForm');
    const errorBox = $('.login-error', form);

    form.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(form);
        const email = String(fd.get('email') || '').trim().toLowerCase();
        const password = String(fd.get('password') || '');
        const remember = fd.get('remember') === 'on';

        const found = state.students.find(s =>
            s.email.toLowerCase() === email && s.password === password
        );

        if (!found) {
            errorBox.hidden = false;
            errorBox.textContent = 'Email or password is incorrect. Please try again.';
            return;
        }

        state.user = { id: found.id, name: found.name, email: found.email };
        if (remember) {
            localStorage.setItem(STORE.AUTH, JSON.stringify(state.user));
        } else {
            sessionStorage.setItem(STORE.AUTH, JSON.stringify(state.user));
        }

        renderUserBadge();
        renderHome();
    });

    $('input[name="email"]', form).focus();
}

function logout() {
    if (!confirm('Sign out? Your in-progress quiz (if any) will be lost.')) return;
    teardownExamGuards();
    if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
    clearActiveQuiz();
    localStorage.removeItem(STORE.AUTH);
    sessionStorage.removeItem(STORE.AUTH);
    state.user = null;
    state.quiz = null;
    renderLogin();
}

function renderUserBadge() {
    const badge = document.getElementById('userBadge');
    badge.hidden = false;
    const initials = (state.user.name || '').trim().split(/\s+/).slice(0, 2).map(s => s[0]).join('');
    $('.user-avatar', badge).textContent = initials || 'S';
    $('.user-name', badge).textContent = state.user.name;
    $('.user-email', badge).textContent = state.user.email;
}

/* ---------- Home ---------- */
function renderHome() {
    const tpl = $('#tpl-home').content.cloneNode(true);
    const main = $('#app');
    main.innerHTML = '';
    main.appendChild(tpl);

    renderHomeBanners();

    // Mode select (default practice)
    let mode = 'practice';
    const modeCards = $$('.mode-card');
    const updateChapterLockState = () => {
        $$('.chapter-card').forEach(card => {
            const ch = +card.dataset.chapter;
            const count = +card.dataset.count;
            const locked = mode === 'exam' && hasAttemptedExam(makeQuizKey('chapter', ch, count));
            card.classList.toggle('locked', locked);
            card.disabled = locked;
            const lockTag = card.querySelector('.chapter-lock');
            if (lockTag) lockTag.hidden = !locked;
        });
        const mixedBtn = $('#startMixed');
        if (mixedBtn) {
            const locked = mode === 'exam' && hasAttemptedExam(makeQuizKey('mixed', null, state.questions.length));
            mixedBtn.disabled = locked;
            mixedBtn.textContent = locked
                ? '✓ Mixed exam already submitted'
                : '▶ Start mixed (all 180)';
        }
    };
    modeCards.forEach(card => {
        if (card.dataset.mode === mode) card.classList.add('active');
        card.addEventListener('click', () => {
            modeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            mode = card.dataset.mode;
            if (mode === 'quick') {
                startQuiz({ scope: 'mixed', count: 10, mode: 'practice' });
                return;
            }
            updateChapterLockState();
        });
    });

    // Chapter cards
    const grid = $('#chaptersGrid');
    grid.innerHTML = '';
    const stats = loadStats();

    state.chapters.forEach(ch => {
        const count = state.questions.filter(q => q.chapter === ch.number).length;
        const best = stats.chapters?.[ch.number];
        const card = document.createElement('button');
        card.className = 'chapter-card';
        card.dataset.chapter = ch.number;
        card.dataset.count = count;
        card.innerHTML = `
            <div class="chapter-num">CH ${String(ch.number).padStart(2, '0')}</div>
            <div class="chapter-title">${escapeHtml(ch.title)}</div>
            <div class="chapter-meta">
                <span><strong>${count}</strong> questions</span>
                ${best ? `<span>Best: <strong>${best.pct}%</strong></span>` : ''}
            </div>
            <div class="chapter-lock" hidden>✓ Exam attempt submitted</div>
        `;
        card.addEventListener('click', () => {
            if (card.disabled) return;
            startQuiz({ scope: 'chapter', chapter: ch.number, mode });
        });
        grid.appendChild(card);
    });

    $('#startMixed').addEventListener('click', () => {
        const btn = $('#startMixed');
        if (btn.disabled) return;
        startQuiz({ scope: 'mixed', count: state.questions.length, mode });
    });

    updateChapterLockState();

    renderStatsPanel();

    $('#resetStats').addEventListener('click', () => {
        if (confirm('Erase all your saved scores on this device?')) {
            localStorage.removeItem(STORE.STATS);
            renderStatsPanel();
            renderHome();
        }
    });
}

function renderHomeBanners() {
    const main = $('#app');
    const host = main.querySelector('main, section.hero') || main.firstElementChild;
    if (!host) return;

    // Schema warning (one-shot per session)
    if (state.schemaWarning) {
        const warn = document.createElement('div');
        warn.className = 'banner warn';
        warn.textContent = state.schemaWarning;
        host.parentNode.insertBefore(warn, host);
        state.schemaWarning = null;       // show once per session
    }

    // Resume banner
    const saved = loadResumableQuiz();
    if (saved) {
        const banner = document.createElement('div');
        banner.className = 'banner info';
        const ageMin = Math.max(1, Math.round((Date.now() - saved.savedAt) / 60000));
        banner.innerHTML = `
            <div>
                <strong>Resume your quiz?</strong>
                <span class="muted">${escapeHtml(saved.title)} · question ${saved.index + 1} / ${saved.questions.length} · saved ${ageMin} min ago</span>
            </div>
            <div class="banner-actions">
                <button class="btn-primary" data-action="resume">Resume</button>
                <button class="btn-ghost subtle" data-action="discard">Discard</button>
            </div>
        `;
        host.parentNode.insertBefore(banner, host);
        banner.querySelector('[data-action="resume"]').addEventListener('click', () => {
            const restored = {
                title: saved.title, scope: saved.scope, chapter: saved.chapter,
                mode: saved.mode, quizKey: saved.quizKey,
                questions: saved.questions, index: saved.index,
                answers: saved.answers, started: saved.started,
                durationSec: saved.durationSec, flags: saved.flags || { tabSwitches: 0, copyAttempts: 0 },
                finished: false,
            };
            startQuiz({ _resume: restored });
        });
        banner.querySelector('[data-action="discard"]').addEventListener('click', () => {
            clearActiveQuiz();
            banner.remove();
        });
    }
}

function renderStatsPanel() {
    const panel = $('#statsPanel');
    if (!panel) return;
    const stats = loadStats();
    if (!stats.attempts || stats.attempts === 0) {
        panel.innerHTML = '<div class="stats-empty">No attempts yet — pick a chapter to start.</div>';
        return;
    }
    panel.innerHTML = `
        <div class="stat-row">
            <div class="stat-row-label">Attempts</div>
            <div class="stat-row-value">${stats.attempts}</div>
        </div>
        <div class="stat-row">
            <div class="stat-row-label">Questions answered</div>
            <div class="stat-row-value">${stats.answered}</div>
        </div>
        <div class="stat-row">
            <div class="stat-row-label">Correct</div>
            <div class="stat-row-value">${stats.correct}</div>
            <div class="stat-row-detail">${pct(stats.correct, stats.answered)}% of answered</div>
        </div>
        <div class="stat-row">
            <div class="stat-row-label">Best chapter</div>
            <div class="stat-row-value">${stats.bestLabel || '—'}</div>
            <div class="stat-row-detail">${stats.bestPct != null ? stats.bestPct + '%' : ''}</div>
        </div>
    `;
}

/* ---------- Quiz ---------- */
function startQuiz({ scope, chapter, count, mode, _resume }) {
    if (_resume) {
        state.quiz = _resume;
        renderQuiz();
        return;
    }

    let pool;
    let title;
    if (scope === 'chapter') {
        pool = state.questions.filter(q => q.chapter === chapter);
        const ch = state.chapters.find(c => c.number === chapter);
        title = `Chapter ${chapter}: ${ch.title}`;
    } else {
        pool = [...state.questions];
        title = scope === 'mixed' && count >= state.questions.length
            ? 'All chapters (mixed)'
            : `Quick warm-up (${count} random)`;
    }

    if (count && count < pool.length) {
        pool = shuffle(pool).slice(0, count);
    } else if (scope !== 'chapter') {
        pool = shuffle(pool);
    }

    state.quiz = {
        title,
        scope, chapter,
        mode,
        quizKey: makeQuizKey(scope, chapter, pool.length),
        questions: pool,
        index: 0,
        answers: new Array(pool.length).fill(null),
        started: Date.now(),
        durationSec: computeDuration({ scope, mode, count: pool.length }),
        finished: false,
        flags: { tabSwitches: 0, copyAttempts: 0 },
    };

    persistActiveQuiz();
    renderQuiz();
}

function makeQuizKey(scope, chapter, count) {
    if (scope === 'chapter') return `ch:${chapter}:${count}`;
    if (scope === 'mixed')   return `mixed:${count}`;
    return `quick:${count}`;
}

function computeDuration({ scope, mode, count }) {
    if (mode !== 'exam') return 0;                       // 0 = unlimited
    if (scope === 'chapter') return count * EXAM_DURATION.chapterPerQ;
    if (scope === 'mixed')   return count * EXAM_DURATION.mixedPerQ;
    return EXAM_DURATION.quick;
}

function renderQuiz() {
    const tpl = $('#tpl-quiz').content.cloneNode(true);
    const main = $('#app');
    main.innerHTML = '';
    main.appendChild(tpl);

    const q = state.quiz;
    $('.quiz-mode-badge').textContent = q.mode === 'practice' ? 'PRACTICE' : 'EXAM';
    $('.quiz-chapter-title').textContent = q.title;
    $('.quiz-student').textContent = `Student: ${state.user.name}`;

    $('[data-action="exit"]').addEventListener('click', () => {
        const msg = q.mode === 'exam'
            ? 'Exit the exam? Your progress on this attempt will be lost and the attempt will not be recorded.'
            : 'Exit quiz and return home? Your progress will be lost.';
        if (confirm(msg)) {
            teardownExamGuards();
            if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
            clearActiveQuiz();
            state.quiz = null;
            renderHome();
        }
    });

    $('[data-action="prev"]').addEventListener('click', () => move(-1));
    $('[data-action="next"]').addEventListener('click', () => move(+1));

    if (q.mode === 'exam') installExamGuards();
    startTimer();
    paintQuestion();
}

/* ---------- Exam-mode anti-cheat (active only while q.mode === 'exam') ---------- */
let examGuards = null;
function installExamGuards() {
    teardownExamGuards();

    const onVisibilityChange = () => {
        if (!state.quiz || state.quiz.finished) return;
        if (document.hidden) {
            state.quiz.flags.tabSwitches = (state.quiz.flags.tabSwitches || 0) + 1;
            persistActiveQuiz();
        } else {
            const n = state.quiz.flags.tabSwitches;
            if (n >= 3) {
                showToast('Auto-submitted: you left the exam tab 3 times.', 'danger');
                finishQuiz({ reason: 'tab-switch-limit' });
            } else if (n > 0) {
                showCheatBanner(
                    n >= 2
                        ? `Final warning — you left the tab ${n} times. One more switch will auto-submit your exam.`
                        : `You left the tab ${n} time. This is logged.`
                );
            }
        }
    };

    const blockEvent = (e) => {
        if (state.quiz?.mode === 'exam' && !state.quiz.finished) {
            state.quiz.flags.copyAttempts = (state.quiz.flags.copyAttempts || 0) + 1;
            e.preventDefault();
            return false;
        }
    };

    const onKey = (e) => {
        if (state.quiz?.mode !== 'exam' || state.quiz.finished) return;
        // Block Ctrl/Cmd+C, Ctrl/Cmd+X, Ctrl/Cmd+P, Ctrl/Cmd+S, F12, Ctrl/Cmd+U
        const meta = e.ctrlKey || e.metaKey;
        if ((meta && ['c', 'x', 'p', 's', 'u'].includes(e.key.toLowerCase())) || e.key === 'F12') {
            blockEvent(e);
        }
    };

    const onPopState = () => {
        if (state.quiz?.mode === 'exam' && !state.quiz.finished) {
            history.pushState({ exam: true }, '', location.href);
            showCheatBanner('Browser navigation is disabled during the exam.');
        }
    };

    const onBeforeUnload = (e) => {
        if (state.quiz?.mode === 'exam' && !state.quiz.finished) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    document.addEventListener('contextmenu', blockEvent);
    document.addEventListener('copy', blockEvent);
    document.addEventListener('cut', blockEvent);
    document.addEventListener('keydown', onKey);
    window.addEventListener('beforeunload', onBeforeUnload);

    // Trap a history entry so Back triggers popstate instead of leaving.
    history.pushState({ exam: true }, '', location.href);
    window.addEventListener('popstate', onPopState);

    examGuards = {
        teardown() {
            document.removeEventListener('visibilitychange', onVisibilityChange);
            document.removeEventListener('contextmenu', blockEvent);
            document.removeEventListener('copy', blockEvent);
            document.removeEventListener('cut', blockEvent);
            document.removeEventListener('keydown', onKey);
            window.removeEventListener('beforeunload', onBeforeUnload);
            window.removeEventListener('popstate', onPopState);
        },
    };
}

function teardownExamGuards() {
    if (examGuards) { examGuards.teardown(); examGuards = null; }
}

let timerHandle = null;
let warnedFiveMin = false;
let warnedOneMin = false;
function startTimer() {
    if (timerHandle) clearInterval(timerHandle);
    warnedFiveMin = false;
    warnedOneMin = false;
    const el = $('.quiz-timer');
    if (!el) return;
    const q = state.quiz;
    const limit = q.durationSec || 0;

    const tick = () => {
        if (!state.quiz || state.quiz.finished) return;
        const elapsed = Math.floor((Date.now() - state.quiz.started) / 1000);
        if (limit > 0) {
            const remaining = Math.max(0, limit - elapsed);
            el.textContent = formatMMSS(remaining);
            el.classList.toggle('warn',   remaining <= 300 && remaining > 60);
            el.classList.toggle('danger', remaining <= 60);
            if (!warnedFiveMin && remaining <= 300 && remaining > 60) {
                warnedFiveMin = true;
                showToast('5 minutes remaining', 'warn');
            }
            if (!warnedOneMin && remaining <= 60) {
                warnedOneMin = true;
                showToast('1 minute remaining — finish up!', 'danger');
            }
            if (remaining <= 0) {
                clearInterval(timerHandle);
                timerHandle = null;
                showToast("Time's up — submitting your answers.", 'danger');
                finishQuiz({ reason: 'timeout' });
            }
        } else {
            el.textContent = formatMMSS(elapsed);
        }
    };
    tick();
    timerHandle = setInterval(tick, 1000);
}

function formatMMSS(s) {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${m}:${ss}`;
}

function paintQuestion() {
    const q = state.quiz;
    const cur = q.questions[q.index];

    const counter = $('.quiz-counter');
    if (counter) counter.textContent = `Q ${q.index + 1} / ${q.questions.length}`;
    const fill = $('.progress-fill');
    if (fill) fill.style.width = `${((q.index + 1) / q.questions.length) * 100}%`;

    // Render stem (markdown subset)
    const stemEl = $('.q-stem');
    stemEl.innerHTML = renderMarkdown(cur.stem);
    try { if (window.Prism) Prism.highlightAllUnder(stemEl); } catch (e) { /* highlighting is decorative */ }

    // Options — shuffle deterministically per student so each student sees a
    // different A/B/C/D order, but the same student sees the same order on retry.
    const optEl = $('.q-options');
    optEl.innerHTML = '';
    optEl.setAttribute('role', 'radiogroup');
    optEl.setAttribute('aria-label', 'Answer options');
    const seed = (state.user?.email || 'anon') + '|' + cur.id;
    const displayOptions = seededShuffle(cur.options, seed);
    displayOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'q-option';
        btn.type = 'button';
        btn.dataset.letter = opt.letter;
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', 'false');
        btn.innerHTML = `
            <span class="q-option-letter" aria-hidden="true">${opt.letter}</span>
            <span class="q-option-text">${renderInline(opt.text)}</span>
        `;
        btn.addEventListener('click', () => selectOption(opt.letter));
        optEl.appendChild(btn);
    });

    // Restore previous selection / feedback
    const ans = q.answers[q.index];
    if (ans) {
        const sel = optEl.querySelector(`[data-letter="${ans}"]`);
        if (sel) {
            sel.classList.add('selected');
            sel.setAttribute('aria-checked', 'true');
        }
        if (q.mode === 'practice' && q.questions[q.index]._revealed) {
            revealCorrect();
        }
    }

    // Hide feedback box when navigating to a fresh question in exam mode
    const fb = $('.q-feedback');
    if (fb && (q.mode !== 'practice' || !q.questions[q.index]._revealed)) {
        fb.hidden = true;
        fb.classList.remove('correct', 'incorrect');
        fb.innerHTML = '';
    }

    // Buttons
    const prevBtn = $('[data-action="prev"]');
    if (prevBtn) prevBtn.disabled = q.index === 0;
    const nextBtn = $('[data-action="next"]');
    const isLast = q.index === q.questions.length - 1;
    if (nextBtn) nextBtn.textContent = isLast ? 'Finish ✓' : 'Next →';
}

function selectOption(letter) {
    const q = state.quiz;
    if (!q || q.finished) return;
    const cur = q.questions[q.index];
    q.answers[q.index] = letter;

    $$('.q-option').forEach(b => {
        b.classList.remove('selected');
        b.setAttribute('aria-checked', 'false');
    });
    const sel = document.querySelector(`.q-option[data-letter="${letter}"]`);
    if (sel) {
        sel.classList.add('selected');
        sel.setAttribute('aria-checked', 'true');
    }

    if (q.mode === 'practice') {
        cur._revealed = true;
        revealCorrect();
    }
    persistActiveQuiz();
}

function revealCorrect() {
    const q = state.quiz;
    const cur = q.questions[q.index];
    const chosen = q.answers[q.index];
    const correct = cur.answer;

    $$('.q-option').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.letter === correct) btn.classList.add('correct');
        else if (btn.dataset.letter === chosen) btn.classList.add('incorrect');
    });

    const fb = $('.q-feedback');
    fb.hidden = false;
    fb.classList.toggle('correct', chosen === correct);
    fb.classList.toggle('incorrect', chosen !== correct);
    fb.innerHTML = `
        <strong>${chosen === correct ? '✓ Correct.' : `✗ Correct answer: ${correct}.`}</strong>
        <div style="margin-top:6px">${renderInline(cur.explanation)}</div>
    `;
}

function move(dir) {
    const q = state.quiz;
    if (!q || q.finished) return;
    const isLast = q.index === q.questions.length - 1;
    if (dir === +1 && isLast) {
        finishQuiz({ reason: 'submitted' });
        return;
    }
    q.index = Math.max(0, Math.min(q.questions.length - 1, q.index + dir));
    persistActiveQuiz();
    paintQuestion();
}

function finishQuiz({ reason } = {}) {
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = null;
    teardownExamGuards();
    const q = state.quiz;
    if (!q || q.finished) return;
    q.finished = true;
    q.finishReason = reason || 'submitted';
    q.elapsed = Math.floor((Date.now() - q.started) / 1000);

    // Compute score
    let correct = 0, wrong = 0, skipped = 0;
    q.questions.forEach((qq, i) => {
        const a = q.answers[i];
        if (!a) skipped++;
        else if (a === qq.answer) correct++;
        else wrong++;
    });
    q.score = { correct, wrong, skipped, total: q.questions.length };
    q.score.pct = Math.round((correct / q.questions.length) * 100);

    saveAttempt(q);
    if (q.mode === 'exam') recordExamAttempt(q);
    clearActiveQuiz();
    renderResult();
}

/* ---------- Result ---------- */
function renderResult() {
    const tpl = $('#tpl-result').content.cloneNode(true);
    const main = $('#app');
    main.innerHTML = '';
    main.appendChild(tpl);

    const q = state.quiz;

    $('.result-student').textContent = `${state.user.name} · ${state.user.email}`;
    $('.result-title').textContent = q.score.pct >= 80
        ? '🎉 Excellent work!'
        : q.score.pct >= 60
            ? '👍 Solid attempt'
            : '📚 Keep practising';

    const m = String(Math.floor(q.elapsed / 60)).padStart(2, '0');
    const s = String(q.elapsed % 60).padStart(2, '0');
    $('.result-stats').innerHTML = `
        <strong>${q.score.correct}</strong> correct ·
        <strong>${q.score.wrong}</strong> wrong ·
        <strong>${q.score.skipped}</strong> skipped<br>
        Time: <strong>${m}:${s}</strong> · Quiz: <strong>${escapeHtml(q.title)}</strong>
    `;

    $('.result-pct').textContent = `${q.score.pct}%`;
    const ring = $('.ring-fg');
    ring.style.stroke = q.score.pct >= 80 ? 'var(--success)' :
                        q.score.pct >= 60 ? 'var(--accent)' :
                        q.score.pct >= 40 ? 'var(--warn)'    : 'var(--error)';
    setTimeout(() => {
        ring.style.strokeDashoffset = String(100 - q.score.pct);
    }, 80);

    $('[data-action="retry"]').addEventListener('click', () => {
        startQuiz({ scope: q.scope, chapter: q.chapter, count: q.questions.length, mode: q.mode });
    });
    $('[data-action="home"]').addEventListener('click', () => {
        state.quiz = null;
        renderHome();
    });

    let filter = 'all';
    const filters = $$('.review-filters .chip');
    filters.forEach(c => c.addEventListener('click', () => {
        filters.forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        filter = c.dataset.filter;
        paintReview(filter);
    }));
    paintReview('all');
}

function paintReview(filter) {
    const q = state.quiz;
    const list = $('.review-list');
    list.innerHTML = '';

    q.questions.forEach((qq, i) => {
        const a = q.answers[i];
        const status = !a ? 'skipped' : (a === qq.answer ? 'correct' : 'incorrect');
        if (filter === 'wrong' && status === 'correct') return;
        if (filter === 'right' && status !== 'correct') return;

        const item = document.createElement('div');
        item.className = `review-item ${status}`;
        item.innerHTML = `
            <div class="review-item-head">
                <span>Q${i + 1} · Chapter ${qq.chapter}</span>
                <span>${status === 'correct' ? '✓ Correct' : status === 'incorrect' ? '✗ Wrong' : '— Skipped'}</span>
            </div>
            <div class="review-stem">${renderMarkdown(qq.stem)}</div>
            <div class="review-answers">
                Your answer: <strong>${a ? a + ') ' + escapeHtml(letterToText(qq, a)) : '—'}</strong><br>
                Correct: <strong>${qq.answer}) ${escapeHtml(letterToText(qq, qq.answer))}</strong>
            </div>
            <div class="review-explain">${renderInline(qq.explanation)}</div>
        `;
        list.appendChild(item);
    });
    try { if (window.Prism) Prism.highlightAllUnder(list); } catch (e) { /* decorative */ }
}

function letterToText(q, letter) {
    const opt = q.options.find(o => o.letter === letter);
    return opt ? opt.text : '';
}

/* ---------- Stats / persistence ---------- */
function loadStats() {
    try { return JSON.parse(localStorage.getItem(STORE.STATS)) || {}; }
    catch { return {}; }
}

function saveAttempt(q) {
    const s = loadStats();
    s.attempts = (s.attempts || 0) + 1;
    s.answered = (s.answered || 0) + (q.score.correct + q.score.wrong);
    s.correct = (s.correct || 0) + q.score.correct;
    s.chapters = s.chapters || {};
    if (q.scope === 'chapter') {
        const prev = s.chapters[q.chapter];
        if (!prev || q.score.pct > prev.pct) {
            s.chapters[q.chapter] = { pct: q.score.pct, ts: Date.now() };
        }
    }
    // Best chapter
    let bestPct = -1, bestNum = null;
    Object.entries(s.chapters).forEach(([n, v]) => {
        if (v.pct > bestPct) { bestPct = v.pct; bestNum = +n; }
    });
    if (bestNum != null) {
        s.bestPct = bestPct;
        s.bestLabel = `Ch ${bestNum}`;
    }
    localStorage.setItem(STORE.STATS, JSON.stringify(s));
}

function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }

/* ---------- Active-quiz persistence (resume on refresh) ---------- */
function persistActiveQuiz() {
    const q = state.quiz;
    if (!q || q.finished || !state.user) return;
    const snap = {
        userEmail: state.user.email,
        title: q.title, scope: q.scope, chapter: q.chapter, mode: q.mode,
        quizKey: q.quizKey,
        questions: q.questions,         // full payload — small enough (≤180 Qs)
        index: q.index,
        answers: q.answers,
        started: q.started,
        durationSec: q.durationSec,
        flags: q.flags,
        savedAt: Date.now(),
    };
    try { localStorage.setItem(STORE.ACTIVE, JSON.stringify(snap)); }
    catch (e) { console.warn('[mcq] could not persist active quiz', e); }
}

function clearActiveQuiz() {
    localStorage.removeItem(STORE.ACTIVE);
}

function loadResumableQuiz() {
    if (!state.user) return null;
    let raw;
    try { raw = JSON.parse(localStorage.getItem(STORE.ACTIVE)); }
    catch { return null; }
    if (!raw) return null;
    if (raw.userEmail !== state.user.email) return null;
    if (Date.now() - (raw.savedAt || 0) > ACTIVE_QUIZ_TTL_MS) {
        clearActiveQuiz();
        return null;
    }
    return raw;
}

/* ---------- Exam attempt lockout ---------- */
function loadExamAttempts() {
    try { return JSON.parse(localStorage.getItem(STORE.ATTEMPTS)) || {}; }
    catch { return {}; }
}

function hasAttemptedExam(quizKey) {
    if (!state.user) return false;
    const all = loadExamAttempts();
    return Boolean(all[state.user.email]?.[quizKey]);
}

function recordExamAttempt(q) {
    if (!state.user) return;
    const all = loadExamAttempts();
    const byUser = all[state.user.email] || {};
    byUser[q.quizKey] = {
        pct: q.score.pct, ts: Date.now(),
        elapsed: q.elapsed, reason: q.finishReason,
        flags: q.flags,
    };
    all[state.user.email] = byUser;
    localStorage.setItem(STORE.ATTEMPTS, JSON.stringify(all));
}

/* ---------- Markdown subset ---------- */
function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderInline(text) {
    if (!text) return '';
    let s = escapeHtml(text);
    // bold **x** and italics *x*
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
    // inline code `x`
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    return s.replace(/\n/g, '<br>');
}

function renderMarkdown(text) {
    if (!text) return '';
    // Split out fenced code blocks
    const parts = [];
    let rest = text;
    const fence = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIdx = 0;
    let m;
    while ((m = fence.exec(text)) !== null) {
        if (m.index > lastIdx) parts.push({ type: 'text', value: text.slice(lastIdx, m.index) });
        parts.push({ type: 'code', lang: m[1] || 'cpp', value: m[2] });
        lastIdx = m.index + m[0].length;
    }
    if (lastIdx < text.length) parts.push({ type: 'text', value: text.slice(lastIdx) });

    return parts.map(p => {
        if (p.type === 'code') {
            const lang = (p.lang || 'cpp').toLowerCase();
            return `<pre class="language-${lang}"><code class="language-${lang}">${escapeHtml(p.value.replace(/\n$/, ''))}</code></pre>`;
        }
        return p.value
            .split(/\n{2,}/)
            .map(par => `<p>${renderInline(par)}</p>`)
            .join('');
    }).join('');
}

/* ---------- Utils ---------- */
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Deterministic shuffle so the same student always sees the same option order
// for a given question, but different students see different orders.
function seededShuffle(arr, seed) {
    const a = [...arr];
    let h = hashString(seed);
    // xorshift32 PRNG
    const next = () => {
        h ^= h << 13; h >>>= 0;
        h ^= h >>> 17;
        h ^= h << 5;  h >>>= 0;
        return h / 0xffffffff;
    };
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function hashString(s) {
    let h = 2166136261 >>> 0;            // FNV-1a 32-bit
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
    }
    return h || 1;                        // never 0 (xorshift would stall)
}

/* ---------- UI helpers (toasts + sticky cheat banner) ---------- */
function ensureToastHost() {
    let host = document.getElementById('toastHost');
    if (!host) {
        host = document.createElement('div');
        host.id = 'toastHost';
        host.className = 'toast-host';
        document.body.appendChild(host);
    }
    return host;
}

function showToast(message, kind = 'info', timeoutMs = 4000) {
    const host = ensureToastHost();
    const el = document.createElement('div');
    el.className = `toast toast-${kind}`;
    el.setAttribute('role', 'status');
    el.textContent = message;
    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 250);
    }, timeoutMs);
}

function showCheatBanner(message) {
    let bar = document.getElementById('cheatBanner');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'cheatBanner';
        bar.className = 'cheat-banner';
        bar.setAttribute('role', 'alert');
        document.body.appendChild(bar);
    }
    bar.textContent = message;
    bar.classList.add('show');
    clearTimeout(bar._t);
    bar._t = setTimeout(() => bar.classList.remove('show'), 6000);
}

function validateQuestions(qs) {
    const ok = [], dropped = [];
    if (!Array.isArray(qs)) return { ok, dropped: ['root not an array'] };
    qs.forEach(q => {
        const reasons = [];
        if (typeof q.id !== 'number' && typeof q.id !== 'string') reasons.push('missing id');
        if (typeof q.chapter !== 'number') reasons.push('chapter not number');
        if (typeof q.stem !== 'string' || !q.stem.trim()) reasons.push('empty stem');
        if (!Array.isArray(q.options) || q.options.length !== 4) reasons.push('options !=4');
        else {
            const letters = q.options.map(o => o && o.letter).join('');
            if (letters !== 'ABCD') reasons.push(`option letters=${letters}`);
            if (q.options.some(o => !o || typeof o.text !== 'string')) reasons.push('option text missing');
        }
        if (!['A', 'B', 'C', 'D'].includes(q.answer)) reasons.push('answer not A-D');
        if (typeof q.explanation !== 'string') reasons.push('explanation missing');
        if (reasons.length) dropped.push({ id: q.id, chapter: q.chapter, reasons });
        else ok.push(q);
    });
    return { ok, dropped };
}

/* ---------- Keyboard ---------- */
function initKeyboard() {
    document.addEventListener('keydown', e => {
        if (!state.quiz || state.quiz.finished) return;
        // Don't interfere with inputs
        if (e.target.matches('input, textarea')) return;

        // Number keys 1-4 pick the Nth *visible* option (post-shuffle).
        // Letter keys A-D pick by canonical answer letter.
        const numIdx = ['1', '2', '3', '4'].indexOf(e.key);
        if (numIdx >= 0) {
            const visible = $$('.q-option');
            const btn = visible[numIdx];
            if (btn) selectOption(btn.dataset.letter);
            return;
        }
        const letter = e.key.toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(letter)) {
            selectOption(letter);
            return;
        }
        if (e.key === 'ArrowLeft') move(-1);
        else if (e.key === 'ArrowRight' || e.key === 'Enter') move(+1);
    });
}

/* ---------- Go ---------- */
boot();
