(() => {
    'use strict';

    const root = document.documentElement;
    const themeButton = document.querySelector('[data-theme-toggle]');
    const yearTargets = document.querySelectorAll('[data-current-year]');

    const getPreferredTheme = () => {
        const saved = localStorage.getItem('posnew-theme');
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    const applyTheme = (theme) => {
        root.dataset.theme = theme;
        if (themeButton) {
            themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
            themeButton.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
        }
        if (window.lucide) window.lucide.createIcons();
    };

    applyTheme(getPreferredTheme());

    if (themeButton) {
        themeButton.addEventListener('click', () => {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('posnew-theme', nextTheme);
            applyTheme(nextTheme);
        });
    }

    yearTargets.forEach((target) => {
        target.textContent = String(new Date().getFullYear());
    });

    const searchInput = document.querySelector('[data-tool-search]');
    const clearButton = document.querySelector('[data-search-clear]');
    const shortcut = document.querySelector('[data-search-shortcut]');
    const cards = [...document.querySelectorAll('[data-tool-card]')];
    const groups = [...document.querySelectorAll('[data-tool-group]')];
    const filters = [...document.querySelectorAll('[data-filter]')];
    const noResults = document.querySelector('[data-no-results]');
    const resultCount = document.querySelector('[data-result-count]');

    let activeFilter = 'all';

    const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const refreshTools = () => {
        if (!cards.length) return;
        const query = normalize(searchInput?.value.trim() || '');
        let totalVisible = 0;

        cards.forEach((card) => {
            const haystack = normalize(card.dataset.search || card.textContent || '');
            const categories = (card.dataset.category || '').split(' ');
            const matchesSearch = !query || haystack.includes(query);
            const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
            const visible = matchesSearch && matchesFilter;
            card.hidden = !visible;
            if (visible) totalVisible += 1;
        });

        groups.forEach((group) => {
            const visibleCards = group.querySelectorAll('[data-tool-card]:not([hidden])').length;
            group.hidden = visibleCards === 0;
            const countTarget = group.querySelector('[data-group-count]');
            if (countTarget) countTarget.textContent = `${visibleCards} ${visibleCards === 1 ? 'workspace' : 'workspaces'}`;
        });

        if (resultCount) resultCount.textContent = `${totalVisible} ${totalVisible === 1 ? 'workspace' : 'workspaces'} available`;
        if (noResults) noResults.classList.toggle('is-visible', totalVisible === 0);

        const hasQuery = Boolean(query);
        if (clearButton) clearButton.style.display = hasQuery ? 'grid' : 'none';
        if (shortcut) shortcut.style.display = hasQuery ? 'none' : 'block';
    };

    if (searchInput) {
        searchInput.addEventListener('input', refreshTools);
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                searchInput.value = '';
                refreshTools();
                searchInput.blur();
            }
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            refreshTools();
            searchInput.focus();
        });
    }

    filters.forEach((button) => {
        button.addEventListener('click', () => {
            activeFilter = button.dataset.filter;
            filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
            refreshTools();
        });
    });

    document.addEventListener('keydown', (event) => {
        const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
        if (event.key === '/' && searchInput && !isTyping) {
            event.preventDefault();
            searchInput.focus();
        }
    });

    refreshTools();
    if (window.lucide) window.lucide.createIcons();
})();
