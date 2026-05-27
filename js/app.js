/**
 * Any Timezone Converter - Main Application
 * Handles timezone conversion, UI interactions, and data management
 */

// ============================================================================
// Global State Management
// ============================================================================
const AppState = {
    sourceTimezone: '',
    destTimezone: '',
    sourceDateTime: null,
    favorites: [],
    darkMode: false,
    clockInterval: null
};

// ============================================================================
// Timezone Data
// ============================================================================
const timezones = [
    // Africa
    { value: 'Africa/Cairo', label: 'Cairo (Africa/Cairo)' },
    { value: 'Africa/Johannesburg', label: 'Johannesburg (Africa/Johannesburg)' },
    { value: 'Africa/Lagos', label: 'Lagos (Africa/Lagos)' },
    { value: 'Africa/Nairobi', label: 'Nairobi (Africa/Nairobi)' },
    
    // Americas
    { value: 'America/New_York', label: 'New York (America/New_York)' },
    { value: 'America/Chicago', label: 'Chicago (America/Chicago)' },
    { value: 'America/Denver', label: 'Denver (America/Denver)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (America/Los_Angeles)' },
    { value: 'America/Toronto', label: 'Toronto (America/Toronto)' },
    { value: 'America/Vancouver', label: 'Vancouver (America/Vancouver)' },
    { value: 'America/Mexico_City', label: 'Mexico City (America/Mexico_City)' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (America/Sao_Paulo)' },
    { value: 'America/Buenos_Aires', label: 'Buenos Aires (America/Buenos_Aires)' },
    { value: 'America/Lima', label: 'Lima (America/Lima)' },
    { value: 'America/Bogota', label: 'Bogotá (America/Bogota)' },
    
    // Asia
    { value: 'Asia/Dubai', label: 'Dubai (Asia/Dubai)' },
    { value: 'Asia/Kolkata', label: 'Kolkata (Asia/Kolkata)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (Asia/Shanghai)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (Asia/Tokyo)' },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong (Asia/Hong_Kong)' },
    { value: 'Asia/Singapore', label: 'Singapore (Asia/Singapore)' },
    { value: 'Asia/Seoul', label: 'Seoul (Asia/Seoul)' },
    { value: 'Asia/Bangkok', label: 'Bangkok (Asia/Bangkok)' },
    { value: 'Asia/Jakarta', label: 'Jakarta (Asia/Jakarta)' },
    { value: 'Asia/Manila', label: 'Manila (Asia/Manila)' },
    { value: 'Asia/Karachi', label: 'Karachi (Asia/Karachi)' },
    { value: 'Asia/Dhaka', label: 'Dhaka (Asia/Dhaka)' },
    
    // Europe
    { value: 'Europe/London', label: 'London (Europe/London)' },
    { value: 'Europe/Paris', label: 'Paris (Europe/Paris)' },
    { value: 'Europe/Berlin', label: 'Berlin (Europe/Berlin)' },
    { value: 'Europe/Rome', label: 'Rome (Europe/Rome)' },
    { value: 'Europe/Madrid', label: 'Madrid (Europe/Madrid)' },
    { value: 'Europe/Amsterdam', label: 'Amsterdam (Europe/Amsterdam)' },
    { value: 'Europe/Brussels', label: 'Brussels (Europe/Brussels)' },
    { value: 'Europe/Vienna', label: 'Vienna (Europe/Vienna)' },
    { value: 'Europe/Stockholm', label: 'Stockholm (Europe/Stockholm)' },
    { value: 'Europe/Moscow', label: 'Moscow (Europe/Moscow)' },
    { value: 'Europe/Istanbul', label: 'Istanbul (Europe/Istanbul)' },
    
    // Pacific
    { value: 'Pacific/Auckland', label: 'Auckland (Pacific/Auckland)' },
    { value: 'Australia/Sydney', label: 'Sydney (Australia/Sydney)' },
    { value: 'Australia/Melbourne', label: 'Melbourne (Australia/Melbourne)' },
    { value: 'Pacific/Fiji', label: 'Fiji (Pacific/Fiji)' },
    { value: 'Pacific/Honolulu', label: 'Honolulu (Pacific/Honolulu)' },
    
    // UTC
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' }
];

// ============================================================================
// DOM Elements
// ============================================================================
const elements = {
    // Timezone selectors (hidden inputs)
    sourceTimezone: document.getElementById('sourceTimezone'),
    destTimezone: document.getElementById('destTimezone'),
    
    // Custom dropdown elements
    sourceTimezoneDropdown: document.getElementById('sourceTimezoneDropdown'),
    sourceTimezoneSelected: document.getElementById('sourceTimezoneSelected'),
    sourceTimezoneOptions: document.getElementById('sourceTimezoneOptions'),
    sourceTimezoneSearch: document.getElementById('sourceTimezoneSearch'),
    sourceTimezoneList: document.getElementById('sourceTimezoneList'),
    
    destTimezoneDropdown: document.getElementById('destTimezoneDropdown'),
    destTimezoneSelected: document.getElementById('destTimezoneSelected'),
    destTimezoneOptions: document.getElementById('destTimezoneOptions'),
    destTimezoneSearch: document.getElementById('destTimezoneSearch'),
    destTimezoneList: document.getElementById('destTimezoneList'),
    
    // Date/Time inputs
    sourceDate: document.getElementById('sourceDate'),
    sourceTime: document.getElementById('sourceTime'),
    
    // Buttons
    currentTimeBtn: document.getElementById('currentTimeBtn'),
    swapBtn: document.getElementById('swapBtn'),
    darkModeToggle: document.getElementById('darkModeToggle'),
    copyBtn: document.getElementById('copyBtn'),
    shareBtn: document.getElementById('shareBtn'),
    favoritesBtn: document.getElementById('favoritesBtn'),
    addFavoriteBtn: document.getElementById('addFavoriteBtn'),
    
    // Display elements
    detectedTimezone: document.getElementById('detectedTimezone'),
    sourceDay: document.getElementById('sourceDay'),
    sourceOffset: document.getElementById('sourceOffset'),
    resultTime: document.getElementById('resultTime'),
    resultDate: document.getElementById('resultDate'),
    resultDay: document.getElementById('resultDay'),
    resultOffset: document.getElementById('resultOffset'),
    dayIndicator: document.getElementById('dayIndicator'),
    dayIndicatorText: document.getElementById('dayIndicatorText'),
    timeDifference: document.getElementById('timeDifference'),
    timeDifferenceText: document.getElementById('timeDifferenceText'),
    
    // Live clocks
    sourceClock: document.getElementById('sourceClock'),
    destClock: document.getElementById('destClock'),
    
    // Modal
    favoritesList: document.getElementById('favoritesList'),
    
    // Toast
    notificationToast: document.getElementById('notificationToast'),
    toastMessage: document.getElementById('toastMessage'),
    
    // Footer
    currentYear: document.getElementById('currentYear'),
    
    // ARIA
    conversionStatus: document.getElementById('conversionStatus')
};

// ============================================================================
// Initialization
// ============================================================================
function init() {
    // Initialize Day.js plugins first
    dayjs.extend(window.dayjs_plugin_utc);
    dayjs.extend(window.dayjs_plugin_timezone);
    
    // Set current year in footer
    elements.currentYear.textContent = new Date().getFullYear();
    
    // Populate timezone dropdowns
    populateTimezoneSelectors();
    
    // Detect and set user's timezone
    detectUserTimezone();
    
    // Set current date and time
    setCurrentDateTime();
    
    // Load saved preferences
    loadPreferences();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('Any Timezone Converter initialized successfully');
}

// ============================================================================
// Timezone Selector Population
// ============================================================================
function populateTimezoneSelectors() {
    // Sort timezones alphabetically
    const sortedTimezones = [...timezones].sort((a, b) =>
        a.label.localeCompare(b.label)
    );
    
    // Populate source timezone dropdown
    populateCustomDropdown('source', sortedTimezones);
    
    // Populate destination timezone dropdown
    populateCustomDropdown('dest', sortedTimezones);
}

function populateCustomDropdown(type, timezoneList) {
    const listElement = type === 'source' ? elements.sourceTimezoneList : elements.destTimezoneList;
    
    listElement.innerHTML = timezoneList.map(tz => `
        <div class="dropdown-option" data-value="${tz.value}">
            ${tz.label}
        </div>
    `).join('');
    
    // Add click event listeners to options
    listElement.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', () => {
            selectTimezone(type, option.dataset.value, option.textContent);
        });
    });
}

function selectTimezone(type, value, label) {
    if (type === 'source') {
        elements.sourceTimezone.value = value;
        elements.sourceTimezoneSelected.querySelector('.selected-text').textContent = label;
        AppState.sourceTimezone = value;
        closeDropdown('source');
        updateSourceInfo();
        performConversion();
        
        // Update selected state
        elements.sourceTimezoneList.querySelectorAll('.dropdown-option').forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === value);
        });
    } else {
        elements.destTimezone.value = value;
        elements.destTimezoneSelected.querySelector('.selected-text').textContent = label;
        AppState.destTimezone = value;
        closeDropdown('dest');
        performConversion();
        
        // Update selected state
        elements.destTimezoneList.querySelectorAll('.dropdown-option').forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === value);
        });
    }
}

function toggleDropdown(type) {
    const dropdown = type === 'source' ? elements.sourceTimezoneDropdown : elements.destTimezoneDropdown;
    const selected = type === 'source' ? elements.sourceTimezoneSelected : elements.destTimezoneSelected;
    const options = type === 'source' ? elements.sourceTimezoneOptions : elements.destTimezoneOptions;
    
    const isOpen = options.classList.contains('show');
    
    // Close all dropdowns first
    closeAllDropdowns();
    
    if (!isOpen) {
        selected.classList.add('active');
        options.classList.add('show');
        
        // Add dropdown-active class to parent sub-card for z-index management
        const subCard = dropdown.closest('.sub-card');
        if (subCard) {
            subCard.classList.add('dropdown-active');
        }
        
        // Focus search input
        const searchInput = type === 'source' ? elements.sourceTimezoneSearch : elements.destTimezoneSearch;
        setTimeout(() => searchInput.focus(), 100);
    }
}

function closeDropdown(type) {
    const dropdown = type === 'source' ? elements.sourceTimezoneDropdown : elements.destTimezoneDropdown;
    const selected = type === 'source' ? elements.sourceTimezoneSelected : elements.destTimezoneSelected;
    const options = type === 'source' ? elements.sourceTimezoneOptions : elements.destTimezoneOptions;
    const search = type === 'source' ? elements.sourceTimezoneSearch : elements.destTimezoneSearch;
    
    selected.classList.remove('active');
    options.classList.remove('show');
    search.value = '';
    filterDropdownOptions(type, '');
    
    // Remove dropdown-active class from parent sub-card
    const subCard = dropdown.closest('.sub-card');
    if (subCard) {
        subCard.classList.remove('dropdown-active');
    }
}

function closeAllDropdowns() {
    closeDropdown('source');
    closeDropdown('dest');
}

function filterDropdownOptions(type, searchTerm) {
    const listElement = type === 'source' ? elements.sourceTimezoneList : elements.destTimezoneList;
    const options = listElement.querySelectorAll('.dropdown-option');
    const term = searchTerm.toLowerCase();
    
    let visibleCount = 0;
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        const matches = text.includes(term);
        option.classList.toggle('hidden', !matches);
        if (matches) visibleCount++;
    });
    
    // Show/hide no results message
    let noResultsMsg = listElement.querySelector('.no-results');
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results';
            noResultsMsg.textContent = 'No timezones found';
            listElement.appendChild(noResultsMsg);
        }
    } else {
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

// ============================================================================
// User Timezone Detection
// ============================================================================
function detectUserTimezone() {
    try {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        elements.detectedTimezone.textContent = userTimezone;
        
        // Find the label for the detected timezone
        const tzData = timezones.find(tz => tz.value === userTimezone);
        const label = tzData ? tzData.label : userTimezone;
        
        // Set as default source timezone
        selectTimezone('source', userTimezone, label);
        
    } catch (error) {
        console.error('Error detecting timezone:', error);
        elements.detectedTimezone.textContent = 'Unable to detect';
    }
}

// ============================================================================
// Date/Time Management
// ============================================================================
function setCurrentDateTime() {
    const now = new Date();
    
    // Format date as YYYY-MM-DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    elements.sourceDate.value = `${year}-${month}-${day}`;
    
    // Format time as HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    elements.sourceTime.value = `${hours}:${minutes}`;
    
    updateSourceInfo();
    performConversion();
}

// ============================================================================
// Event Listeners Setup
// ============================================================================
function setupEventListeners() {
    // Custom dropdown toggles
    elements.sourceTimezoneSelected.addEventListener('click', () => toggleDropdown('source'));
    elements.destTimezoneSelected.addEventListener('click', () => toggleDropdown('dest'));
    
    // Dropdown search
    elements.sourceTimezoneSearch.addEventListener('input', (e) => {
        filterDropdownOptions('source', e.target.value);
    });
    elements.destTimezoneSearch.addEventListener('input', (e) => {
        filterDropdownOptions('dest', e.target.value);
    });
    
    // Prevent dropdown from closing when clicking inside options
    elements.sourceTimezoneOptions.addEventListener('click', (e) => {
        if (e.target === elements.sourceTimezoneSearch) {
            e.stopPropagation();
        }
    });
    elements.destTimezoneOptions.addEventListener('click', (e) => {
        if (e.target === elements.destTimezoneSearch) {
            e.stopPropagation();
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!elements.sourceTimezoneDropdown.contains(e.target)) {
            closeDropdown('source');
        }
        if (!elements.destTimezoneDropdown.contains(e.target)) {
            closeDropdown('dest');
        }
    });
    
    // Date/Time changes
    elements.sourceDate.addEventListener('change', handleDateTimeChange);
    elements.sourceTime.addEventListener('change', handleDateTimeChange);
    
    // Buttons
    elements.currentTimeBtn.addEventListener('click', setCurrentDateTime);
    elements.swapBtn.addEventListener('click', swapTimezones);
    elements.darkModeToggle.addEventListener('click', toggleDarkMode);
    elements.copyBtn.addEventListener('click', copyResult);
    elements.shareBtn.addEventListener('click', shareResult);
    if (elements.favoritesBtn) {
        elements.favoritesBtn.addEventListener('click', openFavoritesModal);
    }
    if (elements.addFavoriteBtn) {
        elements.addFavoriteBtn.addEventListener('click', addToFavorites);
    }
    
    // Popular timezone shortcuts
    document.querySelectorAll('.shortcut-badge').forEach(badge => {
        badge.addEventListener('click', (e) => {
            const timezone = e.target.dataset.timezone;
            const tzData = timezones.find(tz => tz.value === timezone);
            const label = tzData ? tzData.label : timezone;
            selectTimezone('dest', timezone, label);
        });
    });
    
    // Start live clocks
    startLiveClocks();
}

// ============================================================================
// Date/Time Change Handler
// ============================================================================
function handleDateTimeChange() {
    updateSourceInfo();
    performConversion();
}

// ============================================================================
// Source Info Update
// ============================================================================
function updateSourceInfo() {
    if (!elements.sourceDate.value || !elements.sourceTime.value || !AppState.sourceTimezone) {
        return;
    }
    
    try {
        const dateTimeStr = `${elements.sourceDate.value}T${elements.sourceTime.value}`;
        const sourceMoment = dayjs.tz(dateTimeStr, AppState.sourceTimezone);
        
        // Update day of week
        elements.sourceDay.textContent = sourceMoment.format('dddd');
        
        // Update UTC offset
        const offset = sourceMoment.format('Z');
        elements.sourceOffset.textContent = `UTC${offset}`;
    } catch (error) {
        console.error('Error updating source info:', error);
    }
}

// ============================================================================
// Timezone Conversion
// ============================================================================
function performConversion() {
    // Validate inputs
    if (!elements.sourceDate.value || !elements.sourceTime.value) {
        resetResultDisplay();
        return;
    }
    
    if (!AppState.sourceTimezone || !AppState.destTimezone) {
        resetResultDisplay();
        return;
    }
    
    try {
        // Create datetime string
        const dateTimeStr = `${elements.sourceDate.value}T${elements.sourceTime.value}`;
        
        // Parse in source timezone
        const sourceMoment = dayjs.tz(dateTimeStr, AppState.sourceTimezone);
        
        // Convert to destination timezone
        const destMoment = sourceMoment.tz(AppState.destTimezone);
        
        // Update result display
        elements.resultTime.textContent = destMoment.format('HH:mm');
        elements.resultDate.textContent = destMoment.format('MMMM D, YYYY');
        elements.resultDay.textContent = destMoment.format('dddd');
        
        // Update UTC offset
        const offset = destMoment.format('Z');
        elements.resultOffset.textContent = `UTC${offset}`;
        
        // Calculate day difference
        const sourceDayStart = sourceMoment.startOf('day');
        const destDayStart = destMoment.startOf('day');
        const dayDiff = destDayStart.diff(sourceDayStart, 'day');
        
        // Update day indicator
        if (dayDiff === 0) {
            elements.dayIndicatorText.textContent = 'Same day';
            elements.dayIndicator.style.display = 'none';
        } else if (dayDiff === 1) {
            elements.dayIndicatorText.textContent = 'Next day';
            elements.dayIndicator.style.display = 'flex';
        } else if (dayDiff === -1) {
            elements.dayIndicatorText.textContent = 'Previous day';
            elements.dayIndicator.style.display = 'flex';
        } else if (dayDiff > 1) {
            elements.dayIndicatorText.textContent = `${dayDiff} days ahead`;
            elements.dayIndicator.style.display = 'flex';
        } else {
            elements.dayIndicatorText.textContent = `${Math.abs(dayDiff)} days behind`;
            elements.dayIndicator.style.display = 'flex';
        }
        
        // Calculate time difference
        const hoursDiff = Math.abs(sourceMoment.utcOffset() - destMoment.utcOffset()) / 60;
        const hours = Math.floor(hoursDiff);
        const minutes = Math.round((hoursDiff - hours) * 60);
        
        if (hours === 0 && minutes === 0) {
            elements.timeDifferenceText.textContent = 'No time difference';
        } else if (minutes === 0) {
            elements.timeDifferenceText.textContent = `${hours} hour${hours !== 1 ? 's' : ''} difference`;
        } else {
            elements.timeDifferenceText.textContent = `${hours}h ${minutes}m difference`;
        }
        
        // Enable action buttons
        elements.copyBtn.disabled = false;
        elements.shareBtn.disabled = false;
        
        // Update ARIA live region
        elements.conversionStatus.textContent = `Converted to ${destMoment.format('HH:mm on MMMM D, YYYY')}`;
        
    } catch (error) {
        console.error('Conversion error:', error);
        showToast('Error performing conversion', 'error');
        resetResultDisplay();
    }
}

// ============================================================================
// Reset Result Display
// ============================================================================
function resetResultDisplay() {
    elements.resultTime.textContent = '--:--';
    elements.resultDate.textContent = 'Select timezones to convert';
    elements.resultDay.textContent = '--';
    elements.resultOffset.textContent = '--';
    elements.dayIndicator.style.display = 'none';
    elements.timeDifferenceText.textContent = '--';
    elements.copyBtn.disabled = true;
    elements.shareBtn.disabled = true;
}

// ============================================================================
// Swap Timezones
// ============================================================================
function swapTimezones() {
    const tempTimezone = AppState.sourceTimezone;
    const tempLabel = elements.sourceTimezoneSelected.querySelector('.selected-text').textContent;
    
    AppState.sourceTimezone = AppState.destTimezone;
    AppState.destTimezone = tempTimezone;
    
    // Update hidden inputs
    elements.sourceTimezone.value = AppState.sourceTimezone;
    elements.destTimezone.value = AppState.destTimezone;
    
    // Update displayed labels
    const destLabel = elements.destTimezoneSelected.querySelector('.selected-text').textContent;
    elements.sourceTimezoneSelected.querySelector('.selected-text').textContent = destLabel;
    elements.destTimezoneSelected.querySelector('.selected-text').textContent = tempLabel;
    
    // Update selected states
    elements.sourceTimezoneList.querySelectorAll('.dropdown-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.value === AppState.sourceTimezone);
    });
    elements.destTimezoneList.querySelectorAll('.dropdown-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.value === AppState.destTimezone);
    });
    
    updateSourceInfo();
    performConversion();
    
    showToast('Timezones swapped', 'success');
}

// ============================================================================
// Live Clocks
// ============================================================================
function startLiveClocks() {
    updateLiveClocks(); // Initial update
    
    AppState.clockInterval = setInterval(updateLiveClocks, 1000);
}

function updateLiveClocks() {
    if (AppState.sourceTimezone) {
        const sourceTime = dayjs().tz(AppState.sourceTimezone).format('HH:mm:ss');
        elements.sourceClock.textContent = sourceTime;
    } else {
        elements.sourceClock.textContent = '--:--:--';
    }
    
    if (AppState.destTimezone) {
        const destTime = dayjs().tz(AppState.destTimezone).format('HH:mm:ss');
        elements.destClock.textContent = destTime;
    } else {
        elements.destClock.textContent = '--:--:--';
    }
}

// ============================================================================
// Copy Result
// ============================================================================
function copyResult() {
    const resultText = `${elements.resultTime.textContent} on ${elements.resultDate.textContent} (${elements.resultDay.textContent})`;
    
    navigator.clipboard.writeText(resultText).then(() => {
        showToast('Result copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Copy failed:', err);
        showToast('Failed to copy result', 'error');
    });
}

// ============================================================================
// Share Result
// ============================================================================
function shareResult() {
    const shareText = `${elements.resultTime.textContent} on ${elements.resultDate.textContent} (${AppState.destTimezone})`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Timezone Conversion Result',
            text: shareText,
            url: shareUrl
        }).then(() => {
            showToast('Shared successfully!', 'success');
        }).catch(err => {
            if (err.name !== 'AbortError') {
                console.error('Share failed:', err);
                fallbackShare(shareText);
            }
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Result copied to clipboard for sharing!', 'success');
    }).catch(err => {
        console.error('Fallback share failed:', err);
        showToast('Failed to share result', 'error');
    });
}

// ============================================================================
// Favorites Management
// ============================================================================
function openFavoritesModal() {
    const modal = new bootstrap.Modal(document.getElementById('favoritesModal'));
    renderFavorites();
    modal.show();
}

function addToFavorites() {
    if (!AppState.sourceTimezone || !AppState.destTimezone) {
        showToast('Please select both timezones first', 'warning');
        return;
    }
    
    const favorite = {
        id: Date.now(),
        source: AppState.sourceTimezone,
        dest: AppState.destTimezone,
        sourceLabel: elements.sourceTimezone.options[elements.sourceTimezone.selectedIndex].text,
        destLabel: elements.destTimezone.options[elements.destTimezone.selectedIndex].text
    };
    
    // Check for duplicates
    const isDuplicate = AppState.favorites.some(fav => 
        fav.source === favorite.source && fav.dest === favorite.dest
    );
    
    if (isDuplicate) {
        showToast('This pair is already in favorites', 'warning');
        return;
    }
    
    AppState.favorites.push(favorite);
    saveFavorites();
    renderFavorites();
    showToast('Added to favorites!', 'success');
}

function renderFavorites() {
    if (AppState.favorites.length === 0) {
        elements.favoritesList.innerHTML = '<p class="text-muted text-center">No favorites saved yet</p>';
        return;
    }
    
    elements.favoritesList.innerHTML = AppState.favorites.map(fav => `
        <div class="favorite-item" data-id="${fav.id}">
            <div class="favorite-content">
                <div class="favorite-timezones">
                    <span class="favorite-tz">${fav.sourceLabel}</span>
                    <i class="fas fa-arrow-right mx-2"></i>
                    <span class="favorite-tz">${fav.destLabel}</span>
                </div>
            </div>
            <div class="favorite-actions">
                <button class="btn btn-sm btn-primary load-favorite" data-id="${fav.id}">
                    <i class="fas fa-check"></i> Load
                </button>
                <button class="btn btn-sm btn-danger delete-favorite" data-id="${fav.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners
    document.querySelectorAll('.load-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            loadFavorite(id);
        });
    });
    
    document.querySelectorAll('.delete-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            deleteFavorite(id);
        });
    });
}

function loadFavorite(id) {
    const favorite = AppState.favorites.find(fav => fav.id === id);
    if (!favorite) return;
    
    // Update source timezone
    selectTimezone('source', favorite.source, favorite.sourceLabel);
    
    // Update destination timezone
    selectTimezone('dest', favorite.dest, favorite.destLabel);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('favoritesModal'));
    modal.hide();
    
    showToast('Favorite loaded!', 'success');
}

function deleteFavorite(id) {
    AppState.favorites = AppState.favorites.filter(fav => fav.id !== id);
    saveFavorites();
    renderFavorites();
    showToast('Favorite deleted', 'success');
}

function saveFavorites() {
    localStorage.setItem('tzc_favorites', JSON.stringify(AppState.favorites));
}

function loadFavorites() {
    const saved = localStorage.getItem('tzc_favorites');
    if (saved) {
        try {
            AppState.favorites = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading favorites:', error);
            AppState.favorites = [];
        }
    }
}

// ============================================================================
// Dark Mode
// ============================================================================
function toggleDarkMode() {
    AppState.darkMode = !AppState.darkMode;
    document.body.classList.toggle('dark-mode', AppState.darkMode);
    
    // Update icon
    const icon = elements.darkModeToggle.querySelector('i');
    if (AppState.darkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    // Save preference
    localStorage.setItem('tzc_darkMode', AppState.darkMode);
}

// ============================================================================
// Preferences Management
// ============================================================================
function loadPreferences() {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('tzc_darkMode');
    if (savedDarkMode === 'true') {
        AppState.darkMode = true;
        document.body.classList.add('dark-mode');
        const icon = elements.darkModeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Load favorites
    loadFavorites();
}

// ============================================================================
// Toast Notifications
// ============================================================================
function showToast(message, type = 'info') {
    elements.toastMessage.textContent = message;
    
    // Remove existing type classes
    elements.notificationToast.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
    
    // Add appropriate class based on type
    switch (type) {
        case 'success':
            elements.notificationToast.classList.add('bg-success', 'text-white');
            break;
        case 'error':
            elements.notificationToast.classList.add('bg-danger', 'text-white');
            break;
        case 'warning':
            elements.notificationToast.classList.add('bg-warning', 'text-dark');
            break;
        default:
            elements.notificationToast.classList.add('bg-info', 'text-white');
    }
    
    const toast = new bootstrap.Toast(elements.notificationToast);
    toast.show();
}

// ============================================================================
// Initialize on DOM Load
// ============================================================================
document.addEventListener('DOMContentLoaded', init);
