// Сканлайны + лёгкое «дыхание» зерна поверх всего сайта
const overlay = document.createElement('div');
overlay.style.cssText = `
  position: fixed; inset: 0; pointer-events: none; z-index: 9999;
  background:
    repeating-linear-gradient(0deg, transparent 0 3px, rgba(0,0,0,0.06) 3px 4px);
`;
document.body.appendChild(overlay);

setInterval(() => {
  overlay.style.opacity = String(0.9 + Math.random() * 0.1);
}, 90);

// Обратная связь: отправка и подтверждение
const form = document.querySelector('.feedback-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('feedback-status');
    const btn = form.querySelector('button');

    btn.disabled = true;
    btn.textContent = 'ОТПРАВЛЯЮ...';
    status.textContent = '';
    status.className = 'feedback-status';

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (resp.ok) {
        status.textContent = 'Отправлено. Услышу тебя, спасибо!';
        status.classList.add('ok');
        form.reset();
      } else {
        throw new Error('server');
      }
    } catch {
      status.textContent = 'Не отправилось. Попробуй ещё раз позже.';
      status.classList.add('err');
    } finally {
      btn.disabled = false;
      btn.textContent = 'ОТПРАВИТЬ';
    }
  });
}
