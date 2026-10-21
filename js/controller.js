/* =====================================================================
   CONTROLLER — listens to the user, updates the Model, tells the View.
   ===================================================================== */

const Controller = {

  transitioning: false,
  audioUnlocked: false,

  init() {
  View.init();
  this.bindMenu();
  this.bindKeyboard();
  this.bindAudioUnlock();
  this.bindAudioButton();
  this.bindContactForm();
},

  /* ---------- Contact form (local draft download) ---------- */
  bindContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    const btn = form.querySelector(".form-send");

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (data._honey) return;  // honeypot caught a bot
      if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
        status.textContent = "Fill in all three fields first.";
        return;
      }
      if (!form.reportValidity()) return;
      const body = `Untuk: Himmel\nDari: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
      const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url; a.download = 'pesan-untuk-himmel.txt'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.textContent = 'Draf disimpan. Pesan belum dikirim.';
    });
  },

  /* ---------- Navigation ---------- */
goTo(screen) { 
  if (this.transitioning || screen === Model.state.screen) return; 
  this.transitioning = true; 
  this.play(); 

  View.wipe( 
      () => {                       // mid-wipe: swap screens while covered
        Model.state.screen = screen;
        View.showScreen(screen);
        if (screen === "projects") this.loadProjects();
        if (screen === "skills") this.loadSkills();
      },
      () => { this.transitioning = false; }
    );
  },

  select(index) {
    const n = View.els.menuItems.length;
    const next = (index + n) % n;
    if (next !== Model.state.menuIndex) this.play();
    Model.state.menuIndex = next;
    View.setMenuSelection(next);
  },

  /* ---------- Screen data loading ---------- */
  async loadProjects() {
    View.renderFeatured(Model.featured);
    if (Model.state.reposLoaded) return;
    const { repos, live } = await Model.fetchRepos();
    const status = live
      ? `${repos.length} repositories · live from GitHub`
      : "Showing pinned work · GitHub API unavailable right now";
    View.renderRepos(repos, status, Model);
    Model.state.reposLoaded = true;
  },

  loadSkills() {
    if (!Model.state.skillsBuilt) {
      View.renderSkills(Model.skills);
      Model.state.skillsBuilt = true;
    }
    View.animateSkillBars();
  },

  /* ---------- Sound (browsers block audio until first user gesture) ---------- */
  play() {
    if (this.audioUnlocked) View.playSelect();
  },

 bindAudioUnlock() {
    this.music = document.getElementById('bg-music');
    this.music.volume = 0.35;
    this.musicWanted = true;
    try { this.musicWanted = localStorage.getItem('himmel-music-muted') !== 'true'; } catch {}
    this.syncAudioButton = () => {
      const playing = this.musicWanted && !this.music.paused;
      const button = document.getElementById('audio-toggle');
      button.textContent = playing ? '🔊' : '🔇';
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', playing ? 'Matikan musik' : 'Putar musik');
      button.title = playing ? 'Matikan musik' : 'Putar musik';
      this.audioUnlocked = playing;
    };
    this.startMusic = async () => {
      if (!this.musicWanted) return;
      try { await this.music.play(); } catch {}
      if (!this.musicWanted) this.music.pause();
      this.syncAudioButton();
    };
    const unlock = e => {
      if (e.target.closest?.('#audio-toggle')) return;
      if (e.type === 'keydown' && !['Enter', ' ', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
      if (this.musicWanted && this.music.paused) this.startMusic();
    };
    addEventListener('pointerdown', unlock, { passive: true });
    addEventListener('keydown', unlock);
    this.music.addEventListener('play', () => this.syncAudioButton());
    this.music.addEventListener('pause', () => this.syncAudioButton());
    this.music.addEventListener('error', () => {
      this.audioUnlocked = false;
      const button = document.getElementById('audio-toggle');
      button.textContent = '🔇'; button.setAttribute('aria-pressed', 'false');
      button.title = 'Musik gagal dimuat; klik untuk mencoba lagi';
    });
    this.startMusic();
  },
  bindAudioButton() {
    const button = document.getElementById('audio-toggle');
    button.addEventListener('click', e => {
      e.stopPropagation();
      this.musicWanted = this.music.paused || !this.musicWanted;
      try { localStorage.setItem('himmel-music-muted', String(!this.musicWanted)); } catch {}
      if (this.musicWanted) this.startMusic();
      else {
        this.music.pause();
        View.els.sfx.pause();
        View.els.sfx.currentTime = 0;
        this.syncAudioButton();
      }
    });
  },

  /* ---------- Input bindings ---------- */
  bindMenu() {
    View.els.menuItems.forEach((item, i) => {
      item.addEventListener("mouseenter", () => this.select(i));
      item.addEventListener("click", () => this.goTo(item.dataset.target));
    });

    document.querySelectorAll("[data-back]").forEach(b =>
      b.addEventListener("click", () => this.goTo("home")));

    // Clicking the name always takes you home
    document.getElementById("big-name").addEventListener("click", () => {
      if (Model.state.screen !== "home") this.goTo("home");
      else this.play();
    });
  },

  bindKeyboard() {
    addEventListener("keydown", e => {
      if (e.target.matches("input, textarea, select")) return;
      if (Model.state.screen === "home") {
        if (e.key === "ArrowDown") { this.select(Model.state.menuIndex + 1); e.preventDefault(); }
        else if (e.key === "ArrowUp") { this.select(Model.state.menuIndex - 1); e.preventDefault(); }
        else if (e.key === "Enter") {
          this.goTo(View.els.menuItems[Model.state.menuIndex].dataset.target);
        }
      } else if (e.key === "Escape") {
        this.goTo("home");
      }
    });
  },
};

Controller.init();
