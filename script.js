console.log('Akwadra Social Platform Initialized');

// --- State & Data ---
const state = {
    isLoggedIn: false,
    currentUser: {
        name: 'مستخدم جديد',
        handle: '@user123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    currentTab: 'feed', // feed, live
    posts: [
        {
            id: 1,
            user: { name: 'محمد علي', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed' },
            content: 'يا له من يوم جميل! قمت للتو بتطوير تطبيق باستخدام Tailwind CSS 🚀 #برمجة #تصميم',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
            likes: 24,
            comments: 5,
            time: 'منذ ساعتين',
            isLiked: false
        },
        {
            id: 2,
            user: { name: 'سارة أحمد', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara' },
            content: 'قهوة الصباح هي الأفضل ☕️ من يوافقني الرأي؟',
            image: null,
            likes: 12,
            comments: 2,
            time: 'منذ 3 ساعات',
            isLiked: true
        }
    ],
    liveStreams: [
        {
            id: 101,
            host: 'جيمر محترف',
            title: 'لعب ببجي موبايل - رومات خاصة 🎮',
            viewers: 1200,
            thumb: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 102,
            host: 'الشيف منى',
            title: 'طبخ أشهى الحلويات 🍰',
            viewers: 450,
            thumb: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
    ]
};

// --- DOM Elements ---
const loginView = document.getElementById('login-view');
const appView = document.getElementById('app-view');
const feedContainer = document.getElementById('feed-content');
const activeStreamsContainer = document.getElementById('active-streams');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Preserve original card interaction but adapt logic
    const card = document.querySelector('.card');
    const loginForm = document.getElementById('login-form');
    const btnLoginAction = document.getElementById('btn-login-action');

    if (card) {
        card.addEventListener('click', () => {
            // Reveal login form
            card.classList.add('hidden');
            loginForm.classList.remove('hidden');
            loginForm.classList.add('animate-fade-in-up');
        });
    }

    if (btnLoginAction) {
        btnLoginAction.addEventListener('click', () => {
            handleLogin();
        });
    }

    renderPosts();
    renderLiveStreams();
});

// --- Functions ---

function handleLogin() {
    // Simulate login process
    const btn = document.getElementById('btn-login-action');
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> جاري الدخول...';
    
    setTimeout(() => {
        state.isLoggedIn = true;
        loginView.style.display = 'none';
        appView.classList.remove('hidden');
        appView.classList.add('animate-fade-in-up');
        document.body.classList.remove('bg-gray-100'); // Clean up body class if needed
    }, 1500);
}

function switchTab(tabName) {
    state.currentTab = tabName;
    
    // Update navigation styles
    document.querySelectorAll('.nav-item').forEach(el => {
        if (el.dataset.target === tabName) {
            el.classList.add('bg-indigo-50', 'text-indigo-600', 'font-bold', 'active-nav');
            el.classList.remove('text-gray-600');
        } else {
            el.classList.remove('bg-indigo-50', 'text-indigo-600', 'font-bold', 'active-nav');
            el.classList.add('text-gray-600');
        }
    });

    // Toggle Views
    const feedContent = document.getElementById('feed-content');
    const liveContent = document.getElementById('live-content');
    const createWidget = document.getElementById('create-post-widget');

    if (tabName === 'live') {
        feedContent.classList.add('hidden');
        createWidget.classList.add('hidden');
        liveContent.classList.remove('hidden');
        liveContent.classList.add('animate-fade-in-up');
    } else {
        liveContent.classList.add('hidden');
        feedContent.classList.remove('hidden');
        createWidget.classList.remove('hidden');
        feedContent.classList.add('animate-fade-in-up');
    }
}

function renderPosts() {
    feedContainer.innerHTML = '';
    state.posts.forEach(post => {
        const postHTML = `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-center mb-3">
                    <div class="flex items-center gap-3">
                        <img src="${post.user.avatar}" class="w-10 h-10 rounded-full border border-gray-200">
                        <div>
                            <h4 class="font-bold text-gray-800 text-sm hover:underline cursor-pointer">${post.user.name}</h4>
                            <span class="text-xs text-gray-400">${post.time}</span>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600"><i class="fas fa-ellipsis-h"></i></button>
                </div>
                
                <p class="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">${post.content}</p>
                
                ${post.image ? `
                <div class="rounded-xl overflow-hidden mb-4 shadow-sm group">
                    <img src="${post.image}" class="w-full h-auto object-cover max-h-96 group-hover:scale-105 transition-transform duration-700">
                </div>` : ''}

                <div class="flex items-center justify-between border-t border-gray-100 pt-3 text-gray-500 text-sm">
                    <button onclick="toggleLike(${post.id}, this)" class="flex items-center gap-2 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors ${post.isLiked ? 'text-red-500 font-bold' : ''}">
                        <i class="${post.isLiked ? 'fas' : 'far'} fa-heart ${post.isLiked ? 'heart-animation' : ''}"></i>
                        <span>${post.likes}</span>
                    </button>
                    <button class="flex items-center gap-2 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                        <i class="far fa-comment-dots"></i>
                        <span>${post.comments}</span>
                    </button>
                    <button class="flex items-center gap-2 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors">
                        <i class="fas fa-share"></i>
                        <span>مشاركة</span>
                    </button>
                </div>
            </div>
        `;
        feedContainer.insertAdjacentHTML('beforeend', postHTML);
    });
}

function toggleLike(postId, btn) {
    const post = state.posts.find(p => p.id === postId);
    if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        
        // Update UI immediately without re-render full list for performance
        const icon = btn.querySelector('i');
        const span = btn.querySelector('span');
        
        if (post.isLiked) {
            btn.classList.add('text-red-500', 'font-bold');
            icon.classList.remove('far');
            icon.classList.add('fas', 'heart-animation');
        } else {
            btn.classList.remove('text-red-500', 'font-bold');
            icon.classList.add('far');
            icon.classList.remove('fas', 'heart-animation');
        }
        span.innerText = post.likes;
    }
}

function createNewPost() {
    const input = document.getElementById('post-input');
    const content = input.value.trim();
    
    if (content) {
        const newPost = {
            id: Date.now(),
            user: state.currentUser,
            content: content,
            image: null,
            likes: 0,
            comments: 0,
            time: 'الآن',
            isLiked: false
        };
        
        state.posts.unshift(newPost);
        renderPosts();
        input.value = '';
        
        // Feedback animation
        const firstPost = feedContainer.firstElementChild;
        firstPost.classList.add('animate-fade-in-up');
    } else {
        alert('الرجاء كتابة محتوى للنشر');
    }
}

// --- Live Streaming Logic ---

function renderLiveStreams() {
    activeStreamsContainer.innerHTML = '';
    state.liveStreams.forEach(stream => {
        const streamHTML = `
            <div class="bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-lg transition-all">
                <div class="relative h-40">
                    <img src="${stream.thumb}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                         <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE
                    </div>
                    <div class="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        <i class="fas fa-eye"></i> ${stream.viewers}
                    </div>
                </div>
                <div class="p-3">
                    <h4 class="font-bold text-gray-800 truncate">${stream.title}</h4>
                    <div class="flex justify-between items-center mt-2">
                         <span class="text-xs text-gray-500">${stream.host}</span>
                         <button class="text-indigo-600 text-xs font-bold border border-indigo-100 px-2 py-1 rounded hover:bg-indigo-50">مشاهدة</button>
                    </div>
                </div>
            </div>
        `;
        activeStreamsContainer.insertAdjacentHTML('beforeend', streamHTML);
    });
}

function startLiveStream(isPrivate) {
    const modal = document.getElementById('live-room-modal');
    const typeBadge = document.getElementById('room-type-badge');
    
    modal.classList.remove('hidden');
    modal.classList.add('animate-fade-in-up');
    
    if (isPrivate) {
        typeBadge.innerHTML = '<i class="fas fa-lock text-yellow-400"></i> غرفة خاصة (مشفرة)';
    } else {
        typeBadge.innerHTML = '<i class="fas fa-globe text-blue-400"></i> بث عام (مرئي للجميع)';
    }
}

function closeLiveRoom() {
    const modal = document.getElementById('live-room-modal');
    modal.classList.add('hidden');
}

// Simple chat simulation loop
setInterval(() => {
    const modal = document.getElementById('live-room-modal');
    if (!modal.classList.contains('hidden')) {
        const chatBox = document.getElementById('live-chat-box');
        const messages = ['منور يا غالي!', 'الصوت واضح جداً', 'ممكن سؤال؟', '❤️❤️❤️', 'استمر يا بطل'];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        const randomUser = 'مستخدم ' + Math.floor(Math.random() * 100);
        
        const msgHTML = `
            <div class="flex gap-2 animate-fade-in-up">
                <span class="font-bold text-xs text-indigo-600">${randomUser}:</span>
                <span class="text-xs text-gray-700">${randomMsg}</span>
            </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', msgHTML);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}, 3000);